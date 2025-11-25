import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { UIMatch, useMatches, useNavigate } from "react-router-dom";
import {
  cartState,
  cartTotalState,
  ordersState,
  selectedCartItemIdsState,
  userInfoKeyState,
  userInfoState,
} from "@/state";
import { Product } from "@/types";
import { getConfig } from "@/utils/template";
import { authorize, createOrder, openChat } from "zmp-sdk/apis";
import { useAtomCallback } from "jotai/utils";

export function useRealHeight(
  element: MutableRefObject<HTMLDivElement | null>,
  defaultValue?: number
) {
  const [height, setHeight] = useState(defaultValue ?? 0);
  useLayoutEffect(() => {
    if (element.current && typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        const [{ contentRect }] = entries;
        setHeight(contentRect.height);
      });
      ro.observe(element.current);
      return () => ro.disconnect();
    }
    return () => {};
  }, [element.current]);

  if (typeof ResizeObserver === "undefined") {
    return -1;
  }
  return height;
}

export function useRequestInformation() {
  const getStoredUserInfo = useAtomCallback(async (get) => {
    const userInfo = await get(userInfoState);
    return userInfo;
  });
  const setInfoKey = useSetAtom(userInfoKeyState);
  const refreshPermissions = () => setInfoKey((key) => key + 1);

  return async () => {
    const userInfo = await getStoredUserInfo();
    if (!userInfo) {
      await authorize({
        scopes: ["scope.userInfo", "scope.userPhonenumber"],
      }).then(refreshPermissions);
      return await getStoredUserInfo();
    }
    return userInfo;
  };
}

export function useAddToCart(product: Product) {
  const [cart, setCart] = useAtom(cartState);
  const [selectedIds, setSelectedIds] = useAtom(selectedCartItemIdsState);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      } catch (error) {
        console.error("Lỗi parse giỏ hàng:", error);
      }
    }
  }, [setCart]);

  const currentCartItem = useMemo(
    () => cart.find((item) => {
      // So khớp cả product.id và variant_id/phanloai_id (nếu có)
      if (item.product.id !== product.id) return false;
      // So khớp variant_id (ưu tiên) hoặc phanloai_id (backward compatible)
      const itemVariantId = item.product.variant_id ?? item.product.phanloai_id ?? null;
      const productVariantId = product.variant_id ?? product.phanloai_id ?? null;
      return itemVariantId === productVariantId;
    }),
    [cart, product.id, product.variant_id, product.phanloai_id]
  );

  const addToCart = (
    quantity: number | ((oldQuantity: number) => number),
    options?: { toast?: boolean; product?: Product; replace?: boolean }
  ) => {
    // Sử dụng product từ options nếu có, nếu không dùng product từ hook
    const productToUse = options?.product || product;
    
    console.log('🛒 [HOOKS] addToCart called:', {
      productId: productToUse.id,
      variantId: productToUse.variant_id,
      phanloaiId: productToUse.phanloai_id,
      hasVariants: !!productToUse.variants,
      variantsLength: productToUse.variants?.length || 0,
      productFromOptions: !!options?.product,
      productToUse: productToUse,
    });
    
    // Helper function để tạo itemKey từ product
    const getCartItemKey = (prod: Product) => {
      const variantId = prod.variant_id ?? prod.phanloai_id ?? null;
      return variantId ? `${prod.id}-${variantId}` : `${prod.id}`;
    };
    
    // Flag để track xem có thực sự thêm/cập nhật vào giỏ hàng không
    let actuallyAddedToCart = false;
    let shouldRemoveFromSelected = false;
    
    setCart((prevCart) => {
      const newCart = [...prevCart];
      // Tìm item có cùng product.id và variant_id/phanloai_id (nếu có)
      const currentItem = newCart.find((i) => {
        if (i.product.id !== productToUse.id) return false;
        // So khớp variant_id (ưu tiên) hoặc phanloai_id (backward compatible)
        const itemVariantId = i.product.variant_id ?? i.product.phanloai_id ?? null;
        const productVariantId = productToUse.variant_id ?? productToUse.phanloai_id ?? null;
        return itemVariantId === productVariantId;
      });

      // Tính số lượng mới
      // Nếu là function (từ QuantityInput onChange): dùng giá trị trực tiếp
      // Nếu là số:
      //   - replace=true: set số lượng mới trực tiếp (từ cart-item)
      //   - replace=false hoặc undefined: nếu đã có item thì cộng thêm, chưa có thì set (từ product-item)
      let newQuantity: number;
      if (typeof quantity === "function") {
        // Function: dùng giá trị trực tiếp (đã được tính từ QuantityInput)
        newQuantity = quantity(currentItem?.quantity ?? 0);
      } else if (options?.replace) {
        // Replace mode: set số lượng mới trực tiếp (từ cart-item)
        newQuantity = quantity;
      } else {
        // Add mode: nếu đã có item thì cộng thêm, chưa có thì set (từ product-item button click)
        newQuantity = currentItem ? currentItem.quantity + quantity : quantity;
      }

      // Kiểm tra stock trước khi cập nhật
      let maxStock: number | undefined;
      if (productToUse.variant_id && productToUse.variants) {
        // Nếu có variant_id, lấy stock từ variant
        maxStock = productToUse.variants.find(v => v.id === productToUse.variant_id)?.stock;
      } else {
        // Nếu không có variant, lấy stock từ product
        maxStock = productToUse.stock;
      }

      // Kiểm tra và giới hạn số lượng theo stock
      let finalQuantity = newQuantity;
      const isExceedingStock = maxStock !== undefined && finalQuantity > maxStock;
      
      if (isExceedingStock) {
        // Nếu số lượng vượt quá stock: LUÔN chỉ hiển thị lỗi, KHÔNG hiển thị success
        toast.error(`Số lượng tối đa là ${maxStock}`);
        actuallyAddedToCart = false; // Đánh dấu KHÔNG hiển thị success toast
        
        if (!currentItem) {
          // Nếu sản phẩm chưa có trong giỏ hàng: KHÔNG thêm vào
          return prevCart; // Không thay đổi giỏ hàng
        } else {
          // Nếu sản phẩm đã có trong giỏ hàng: vẫn giới hạn ở maxStock (cho phép cập nhật)
          // Nhưng KHÔNG hiển thị success toast vì đã vượt stock
          finalQuantity = maxStock;
        }
      } else {
        actuallyAddedToCart = true; // Không vượt stock, có thể thêm/cập nhật và hiển thị success
      }

      if (finalQuantity <= 0) {
        // Xóa sản phẩm nếu số lượng <= 0
        console.log('[HOOKS] Đang xóa sản phẩm khỏi giỏ hàng:', {
          productId: productToUse.id,
          variantId: productToUse.variant_id ?? productToUse.phanloai_id,
          currentCartLength: newCart.length,
        });
        
        const index = newCart.findIndex((i) => {
          if (i.product.id !== productToUse.id) return false;
          const itemVariantId = i.product.variant_id ?? i.product.phanloai_id ?? null;
          const productVariantId = productToUse.variant_id ?? productToUse.phanloai_id ?? null;
          return itemVariantId === productVariantId;
        });
        
        if (index > -1) {
          console.log('[HOOKS] ✅ Tìm thấy item tại index:', index, 'Đang xóa...');
          newCart.splice(index, 1);
          console.log('[HOOKS] ✅ Đã xóa. Cart mới có', newCart.length, 'items');
          shouldRemoveFromSelected = true;
        } else {
          console.warn('[HOOKS] ⚠️ Không tìm thấy item để xóa:', {
            productId: productToUse.id,
            variantId: productToUse.variant_id ?? productToUse.phanloai_id,
            cartItems: newCart.map(i => ({
              productId: i.product.id,
              variantId: i.product.variant_id ?? i.product.phanloai_id,
            })),
          });
        }
      } else if (currentItem) {
        // Cập nhật số lượng nếu sản phẩm đã có (cùng product.id và variant_id)
        currentItem.quantity = finalQuantity;
      } else {
        // Thêm mới với product đã được cập nhật (có variant_id nếu có)
        newCart.push({ product: productToUse, quantity: finalQuantity });
      }

      // 🔹 Lưu lại vào localStorage
      localStorage.setItem("cart", JSON.stringify(newCart));

      return newCart;
    });

    // Xóa khỏi selectedIds khi xóa khỏi giỏ hàng
    if (shouldRemoveFromSelected) {
      const itemKey = getCartItemKey(productToUse);
      setSelectedIds((prevIds) => prevIds.filter((id) => id !== itemKey));
    }
    
    // Tự động thêm vào selectedIds khi thêm/cập nhật sản phẩm vào giỏ hàng
    if (actuallyAddedToCart) {
      const itemKey = getCartItemKey(productToUse);
      
      // Chỉ thêm vào selectedIds nếu chưa có
      setSelectedIds((prevIds) => {
        if (!prevIds.includes(itemKey)) {
          return [...prevIds, itemKey];
        }
        return prevIds;
      });
    }

    // Chỉ hiển thị success toast nếu thực sự đã thêm/cập nhật vào giỏ hàng
    if (options?.toast && actuallyAddedToCart) {
      toast.success("🛒 Đã thêm vào giỏ hàng!");
    }
    // Nếu không thêm vào (vì vượt stock), đã hiển thị error ở trên, không hiển thị success
  };

  return {
    addToCart,
    cartQuantity: currentCartItem?.quantity ?? 0,
  };
}

export function useCart() {
  const [cart, setCart] = useAtom(cartState);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCart(parsed);
      } catch (err) {
        console.error("Lỗi parse cart:", err);
      }
    }
  }, [setCart]);

  return { cart, setCart };
}

export function useCustomerSupport() {
  return () =>
    openChat({
      type: "oa",
      id: getConfig((config) => config.template.oaIDtoOpenChat),
    });
}

export function useToBeImplemented() {
  return () =>
    toast("Chức năng dành cho các bên tích hợp phát triển...", {
      icon: "🛠️",
    });
}

export function useCheckout() {
  const totalAmount = useAtomValue(cartTotalState);
  const [cart, setCart] = useAtom(cartState);
  const requestInfo = useRequestInformation();
  const navigate = useNavigate();
  const refreshNewOrders = useSetAtom(ordersState("pending"));
  const mac = localStorage.getItem("mac") || "default-mac";

  return async () => {
    try {
      await requestInfo();

      await createOrder({
        amount: totalAmount,
        desc: "Thanh toán đơn hàng",
        mac,
        item: cart.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
      });
      setCart([]);
      refreshNewOrders();
      navigate("/orders", {
        viewTransition: true,
      });
      toast.success("Thanh toán thành công. Cảm ơn bạn đã mua hàng!", {
        icon: "🎉",
        duration: 5000,
      });
    } catch (error) {
      console.warn(error);
      toast.error(
        "Thanh toán thất bại. Vui lòng kiểm tra nội dung lỗi bên trong Console."
      );
    }
  };
}

export function useRouteHandle() {
  const matches = useMatches() as UIMatch<
    undefined,
    | {
        title?: string | Function;
        logo?: boolean;
        search?: boolean;
        back?: boolean;
        noFooter?: boolean;
        noBack?: boolean;
        noFloatingCart?: boolean;
        scrollRestoration?: number;
      }
    | undefined
  >[];
  const lastMatch = matches[matches.length - 1];

  return [lastMatch.handle, lastMatch, matches] as const;
}

export function useCheckoutCart() {
  const cart = useAtomValue(cartState);
  const selectedIds = useAtomValue(selectedCartItemIdsState);
  
  // Helper function để tạo itemKey từ cart item
  const getCartItemKey = (item: typeof cart[0]) => {
    const variantId = item.product.variant_id ?? item.product.phanloai_id ?? null;
    return variantId ? `${item.product.id}-${variantId}` : `${item.product.id}`;
  };
  
  return cart.filter((item) => selectedIds.includes(getCartItemKey(item)));
}
