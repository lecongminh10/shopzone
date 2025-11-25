import { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import TransitionLink from "./transition-link";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "zmp-ui";
import { useAddToCart } from "@/hooks";
import QuantityInput from "./quantity-input";
import { ProductService } from "@/api/service/product.service";
import toast from "react-hot-toast";
import { useSetAtom } from "jotai";
import { heartState } from "@/state/cart";
import { Heart, MapPin, Plus, ShoppingCart, Zap } from "lucide-react";
import { generateProductStats } from "./ProductStats";
import iconCheck from "@/img/icon_check.jpg";

export interface ProductItemProps {
  product: Product;
  replace?: boolean;
}

export default function ProductItem(props: ProductItemProps) {
  const [selected, setSelected] = useState(false);
  const [productWithVariants, setProductWithVariants] =
    useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const hasFetchedRef = useRef(false);
  const isFetchingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldFetchRef = useRef(false);

  const [stats] = useState(() => generateProductStats());

  const [isFavorite, setIsFavorite] = useState(() => {
    const store = JSON.parse(localStorage.getItem("favoriteStore") || "{}");
    return !!store[props.product.id]; // true nếu sản phẩm đã được lưu
  });
  const setHeart = useSetAtom(heartState);
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsFavorite((prev) => {
      const newState = !prev;

      const store = JSON.parse(localStorage.getItem("favoriteStore") || "{}");

      if (newState) {
        store[props.product.id] = props.product; // chỉ lưu sản phẩm
      } else {
        delete store[props.product.id]; // xóa sản phẩm nếu bỏ tim
      }

      localStorage.setItem("favoriteStore", JSON.stringify(store));

      return newState;
    });
    setHeart((prev) => {
      if (prev.some((item) => item.product.id === props.product.id)) {
        return prev.filter((item) => item.product.id !== props.product.id);
      } else {
        return [...prev, { product: props.product, quantity: 1 }]; // ✅ đúng cú pháp
      }
    });
  };

  // Sử dụng product có variants nếu đã fetch, nếu không dùng product ban đầu
  const displayProduct = productWithVariants || props.product;
  const { addToCart, cartQuantity } = useAddToCart(displayProduct);

  const discountPercentage = displayProduct.originalPrice
    ? Math.round(
        100 - (displayProduct.price * 100) / displayProduct.originalPrice
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(1, { toast: true });
  };

  // Reset refs khi product.id thay đổi
  useEffect(() => {
    hasFetchedRef.current = false;
    isFetchingRef.current = false;
    shouldFetchRef.current = false;
    setProductWithVariants(null);
  }, [props.product.id]);

  // Fetch product detail để lấy variants
  const fetchProductDetail = useCallback(async () => {
    const productId = props.product.id;

    // Chỉ fetch nếu product chưa có variants và chưa có variant_id
    // Và chưa fetch trước đó và không đang fetch
    if (
      props.product.variants ||
      props.product.variant_id ||
      hasFetchedRef.current ||
      isFetchingRef.current
    ) {
      return;
    }

    // Đánh dấu đang fetch để tránh multiple calls
    isFetchingRef.current = true;
    setLoading(true);

    try {
      const response = await ProductService.getProductDetail({
        product_id: productId,
        include_variants: 1,
      });

      if (response.success && response.data) {
        // Map variants từ API
        const variants =
          response.data.variants?.map((v: any) => ({
            id: v.id,
            product_id: v.product_id,
            stock: v.stock,
            current_price: v.current_price,
            original_price: v.original_price,
            color: v.color,
            size: v.size,
            color_name: v.color_name,
            size_name: v.size_name,
            attributes: v.attributes?.map((attr: any) => ({
              attribute_id: attr.attribute_id,
              attribute_name: attr.attribute_name,
              value_id: attr.value_id,
              value_name: attr.value_name,
            })),
          })) || [];

        // Tạo product với variants và variant đầu tiên được chọn
        const productWithVariant: Product = {
          ...props.product,
          variants: variants,
          variant_id: variants.length > 0 ? variants[0].id : null,
          stock: response.data.stock,
        };

        // Cập nhật price từ variant đầu tiên nếu có
        if (variants.length > 0 && variants[0].current_price) {
          productWithVariant.price = variants[0].current_price;
          productWithVariant.originalPrice = variants[0].original_price;
        }

        setProductWithVariants(productWithVariant);
        // Đánh dấu đã fetch thành công
        hasFetchedRef.current = true;
      }
    } catch (error) {
      // Lỗi khi fetch, không làm gì, dùng product ban đầu
      console.warn("[PRODUCT_ITEM] Không thể fetch product detail:", error);
      // Vẫn đánh dấu đã fetch để tránh fetch lại nhiều lần khi lỗi
      hasFetchedRef.current = true;
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [props.product.id, props.product.variants, props.product.variant_id]);

  // Fetch và trả về product với variants (để dùng ngay sau khi fetch)
  const fetchProductDetailAndGetProduct =
    useCallback(async (): Promise<Product | null> => {
      const productId = props.product.id;

      // Nếu đã có variants hoặc đã fetch, trả về product hiện tại
      if (props.product.variants || props.product.variant_id) {
        return props.product;
      }

      // Nếu đang fetch, đợi một chút rồi thử lại
      if (isFetchingRef.current) {
        // Đợi fetch hoàn tất
        let attempts = 0;
        while (isFetchingRef.current && attempts < 10) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          attempts++;
        }
        // Sau khi fetch xong, trả về product với variants
        return productWithVariants || props.product;
      }

      // Nếu đã fetch trước đó, trả về product với variants
      if (hasFetchedRef.current) {
        return productWithVariants || props.product;
      }

      // Đánh dấu đang fetch để tránh multiple calls
      isFetchingRef.current = true;
      setLoading(true);

      try {
        const response = await ProductService.getProductDetail({
          product_id: productId,
          include_variants: 1,
        });

        if (response.success && response.data) {
          // Map variants từ API
          const variants =
            response.data.variants?.map((v: any) => ({
              id: v.id,
              product_id: v.product_id,
              stock: v.stock,
              current_price: v.current_price,
              original_price: v.original_price,
              color: v.color,
              size: v.size,
              color_name: v.color_name,
              size_name: v.size_name,
            })) || [];

          // Tạo product với variants và variant đầu tiên được chọn
          const productWithVariant: Product = {
            ...props.product,
            variants: variants,
            variant_id: variants.length > 0 ? variants[0].id : null,
            stock: response.data.stock,
          };

          // Cập nhật price từ variant đầu tiên nếu có
          if (variants.length > 0 && variants[0].current_price) {
            productWithVariant.price = variants[0].current_price;
            productWithVariant.originalPrice = variants[0].original_price;
          }

          setProductWithVariants(productWithVariant);
          // Đánh dấu đã fetch thành công
          hasFetchedRef.current = true;

          // Trả về product vừa fetch để dùng ngay
          return productWithVariant;
        }
      } catch (error) {
        // Lỗi khi fetch, không làm gì, dùng product ban đầu
        console.warn("[PRODUCT_ITEM] Không thể fetch product detail:", error);
        // Vẫn đánh dấu đã fetch để tránh fetch lại nhiều lần khi lỗi
        hasFetchedRef.current = true;
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }

      return props.product;
    }, [props.product]);

  // Tắt auto-fetch khi vào viewport - chỉ fetch khi user click button "Thêm vào giỏ"
  // useEffect này đã được disable để tránh fetch không cần thiết
  // Chỉ fetch khi user thực sự cần (click button "Thêm vào giỏ")

  return (
    <div
      ref={containerRef}
      className="flex flex-col cursor-pointer group bg-section rounded-xl shadow-[0_10px_24px_#0D0D0D17]"
      onClick={() => setSelected(true)}
    >
      <TransitionLink
        to={`/product/${props.product.id}`}
        replace={props.replace}
        className="p-2 pb-0 relative"
      >
        {({ isTransitioning }) => (
          <>
            <div className="relative">
              <img
                src={props.product.image}
                className="w-full aspect-square object-cover rounded-lg"
                style={{
                  viewTransitionName:
                    isTransitioning && selected // only animate the "clicked" product item in related products list
                      ? `product-image-${props.product.id}`
                      : undefined,
                }}
                alt={props.product.name}
              />
              <div className="absolute bottom-2 right-1 flex flex-col gap-2 z-10">
                <button
                  type="button"
                  className={`p-2 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                    isFavorite ? "bg-red-500" : "bg-gray-200"
                  }`}
                  onClick={handleFavorite}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite ? "text-white" : "text-gray-600"
                    }`}
                  />
                </button>

                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full flex items-center justify-center shadow-lg transition-colors"
                  onClick={handleAddToCart}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <ShoppingCart className="w-4 h-4" />
                    <Plus className="w-3 h-3 absolute -top-1 -right-1" />
                  </div>
                </button>
              </div>
              {discountPercentage > 0 && (
                <div className="absolute top-0 right-0 bg-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-lg rounded-tr-lg">
                  -{discountPercentage}%
                </div>
              )}
            </div>
            <div className="pt-2 pb-1.5">
              <div className="pt-1 pb-0.5">
                <div className="text-xs line-clamp-2 min-h-[2rem] overflow-hidden text-ellipsis">
                  {props.product.name}
                </div>
              </div>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-sm font-bold text-danger">
                  {formatPrice(props.product.price)}
                </span>

                <img
                  className=" h-5 flex-shrink-0"
                  src={iconCheck}
                  alt=""
                />
                
                {props.product.flash_sale && (
                  <Zap className="h-4 w-4 flex-shrink-0 text-orange-500 fill-orange-500 drop-shadow-sm" />
                )}
              </div>
              <div className="flex items-center mt-1 text-[10px] text-gray-500">
                <div className="flex items-center ">
                  <span className="text-yellow-500">★</span>
                  <span className="font-medium">
                    {props.product.rating?.average_rating 
                      ? props.product.rating.average_rating.toFixed(1) 
                      : stats.rating} ({props.product.rating?.total_reviews || stats.review})
                  </span>
                </div>

                <span className="mx-1">|</span>

                <div>Đã bán {props.product.sales_count || stats.sold}</div>
              </div>
              {props.product.warehouse_name && (
                <div className="flex items-center text-[10px] text-gray-500 mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{props.product.warehouse_name}</span>
                </div>
              )}
            </div>
          </>
        )}
      </TransitionLink>
    </div>
  );
}
