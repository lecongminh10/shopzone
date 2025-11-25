import { useAddToCart } from "@/hooks";
import { CartItem as CartItemProps } from "@/types";
import { formatPrice } from "@/utils/format";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useAtom } from "jotai";
import { selectedCartItemIdsState } from "@/state";
import { Button, Icon } from "zmp-ui";
import QuantityInput from "@/components/quantity-input";
import { Checkbox } from "zmp-ui";
import toast from "react-hot-toast";

const SWIPE_TO_DELTE_OFFSET = 80;

export default function CartItem(props: CartItemProps) {
  const { addToCart, cartQuantity } = useAddToCart(props.product);
  const [selectedItemIds, setSelectedItemIds] = useAtom(
    selectedCartItemIdsState
  );

  // Tạo unique key cho cart item (kết hợp product.id và variant_id)
  const getCartItemKey = () => {
    const variantId =
      props.product.variant_id ?? props.product.phanloai_id ?? null;
    return variantId
      ? `${props.product.id}-${variantId}`
      : `${props.product.id}`;
  };

  const itemKey = getCartItemKey();
  const isSelected = selectedItemIds.includes(itemKey);

  console.log(props.product);

  const toggleSelect = () => {
    if (isSelected) {
      setSelectedItemIds(selectedItemIds.filter((id) => id !== itemKey));
    } else {
      setSelectedItemIds([...selectedItemIds, itemKey]);
    }
  };

  // Handler cho QuantityInput - nhận số lượng mới và set trực tiếp
  const handleQuantityChange = (newQuantity: number) => {
    // Kiểm tra stock trước khi cập nhật
    const maxStock =
      props.product.variant_id && props.product.variants
        ? props.product.variants.find((v) => v.id === props.product.variant_id)
            ?.stock
        : props.product.stock;

    if (maxStock !== undefined && newQuantity > maxStock) {
      toast.error(`Số lượng tối đa là ${maxStock}`);
      addToCart(maxStock, { replace: true });
    } else {
      // Set số lượng mới trực tiếp (không cộng thêm) - dùng replace: true
      addToCart(newQuantity, { replace: true });
    }
  };

  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const bind = useDrag(
    ({ last, offset: [ox] }) => {
      if (last) {
        if (ox < -SWIPE_TO_DELTE_OFFSET)
          api.start({ x: -SWIPE_TO_DELTE_OFFSET });
        else api.start({ x: 0 });
      } else {
        api.start({ x: Math.min(ox, 0), immediate: true });
      }
    },
    {
      from: () => [x.get(), 0],
      axis: "x",
      bounds: { left: -100, right: 0 },
      rubberband: true,
      preventScroll: true,
    }
  );

  return (
    <div className="relative border-b border-gray-200 last:border-b-0">
      <animated.div
        {...bind()}
        style={{ x }}
        className="bg-white p-4 flex items-start space-x-3 relative"
      >
        <div className="flex-shrink-0 pt-1">
          <Checkbox
            value={itemKey}
            checked={isSelected}
            onChange={toggleSelect}
            style={{ transform: "scale(0.8)" }}
          />
        </div>

        <img
          src={props.product.image}
          className="w-14 h-14 rounded-lg flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div
            className="text-xs font-medium line-clamp-2 mb-1"
            title={props.product.name}
          >
            {props.product.name}
          </div>

          {/* Hiển thị thông tin variant nếu có */}
          {props.product.variant_id &&
            props.product.variants &&
            (() => {
              const selectedVariant = props.product.variants.find(
                (v) => v.id === props.product.variant_id
              );
              if (selectedVariant) {
                const hasOnlyOneAttribute =
                  selectedVariant.size === "0" &&
                  selectedVariant.size_name === "+";

                if (hasOnlyOneAttribute) {
                  if (selectedVariant.color_name) {
                    return (
                      <div className="text-xs text-gray-500 mb-2 ">
                        Phân loại: {selectedVariant.color_name}
                      </div>
                    );
                  }
                } else {
                  const variantInfo: string[] = [];
                  if (selectedVariant.color_name) {
                    variantInfo.push(`Màu: ${selectedVariant.color_name}`);
                  }
                  if (
                    selectedVariant.size_name &&
                    selectedVariant.size_name !== "+"
                  ) {
                    variantInfo.push(`Loại: ${selectedVariant.size_name}`);
                  }
                  if (variantInfo.length > 0) {
                    return (
                      <div
                        className="text-xs text-gray-500 mb-2 line-clamp-1 overflow-hidden"
                        title={variantInfo.join(" • ")}
                      >
                        {variantInfo.join(" • ")}
                      </div>
                    );
                  }
                }
              }
              return null;
            })()}

          <div className="flex justify-between items-center w-full mt-2">
            <div className="flex flex-col">
              <div className="text-sm font-bold text-danger">
                {formatPrice(props.product.price)}
              </div>

              {props.product.originalPrice && (
                <div className="line-through text-gray-400 text-xs mt-0.5">
                  {formatPrice(props.product.originalPrice)}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {cartQuantity === 0 ? (
                <Button
                  variant="secondary"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(1, { toast: true });
                  }}
                >
                  Mua
                </Button>
              ) : (
                <QuantityInput
                  value={cartQuantity}
                  onChange={handleQuantityChange}
                  minValue={0}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("[CART_ITEM] Đang xóa sản phẩm:", {
              productId: props.product.id,
              variantId: props.product.variant_id ?? props.product.phanloai_id,
              itemKey: itemKey,
            });
            try {
              addToCart(0, { replace: true });
              console.log("[CART_ITEM] ✅ Đã gọi addToCart(0) để xóa");
            } catch (error) {
              console.error("[CART_ITEM] ❌ Lỗi khi xóa sản phẩm:", error);
              toast.error("Không thể xóa sản phẩm. Vui lòng thử lại.");
            }
          }}
          className="text-danger flex-shrink-0"
        >
          <Icon icon="zi-delete" size={20} />
        </button>
      </animated.div>
    </div>
  );
}
