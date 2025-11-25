import React, { useEffect, useState, useRef, useCallback } from "react";
import iconShop from "@/img/icon_shop.png";
import { FeeShipProduct, FeeShipService } from "@/api/service/fee-ship.service";
import { formatPrice } from "@/utils/format";
import {
  Star,
  ShoppingCart,
  Plus,
  Tag,
  Truck,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAddToCart } from "@/hooks";
import { Product } from "@/types";
import { ProductService } from "@/api/service/product.service";

export default function FreeshipPage() {
  const [products, setProducts] = useState<FeeShipProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const observerTarget = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const fetchProducts = useCallback(
    async (pageNum: number, append: boolean = false) => {
      try {
        if (pageNum === 1) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }
        setError(null);
        setInfoMessage(null);

        const response = await FeeShipService.getFreeshipProducts({
          page: pageNum,
          limit: 10,
        });

        if (!response.success) {
          throw new Error(
            response.message || "Không thể lấy sản phẩm freeship"
          );
        }

        const fetchedProducts = response.data?.products || [];
        const pagination = response.data?.pagination;

        if (append) {
          setProducts((prev) => [...prev, ...fetchedProducts]);
        } else {
          setProducts(fetchedProducts);
        }

        setTotalRecords(pagination?.total_records || fetchedProducts.length);
        setHasMore(pagination?.has_next || false);
        // Không hiển thị infoMessage từ response.message
        setInfoMessage(null);
      } catch (err: any) {
        console.error(
          "❌ [FREESHIP_PAGE] Lỗi khi lấy danh sách freeship:",
          err
        );
        setError(err.message || "Đã xảy ra lỗi khi lấy sản phẩm freeship");
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProducts(1, false);
  }, [fetchProducts]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isLoadingMore &&
          !isLoading
        ) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchProducts(nextPage, true);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, isLoading, page, fetchProducts]);

  const renderEmptyState = (title: string, description: string) => (
    <div className="flex-1 overflow-y-auto flex items-center justify-center">
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <img
          src={iconShop}
          alt="Cửa hàng"
          className="w-28 h-28 object-contain mb-4 opacity-80"
        />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 max-w-xs">{description}</p>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col bg-background">
        {renderEmptyState(
          "Đang tải sản phẩm freeship...",
          "Vui lòng chờ trong giây lát."
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col bg-background">
        {renderEmptyState("Không thể tải sản phẩm freeship", error)}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="w-full h-full flex flex-col bg-background">
        {renderEmptyState(
          "Hiện tại chưa có sản phẩm freeship",
          infoMessage || "Bạn hãy quay lại sau nhé!"
        )}
      </div>
    );
  }

  // Calculate discount percentage
  const getDiscountPercent = (original: number, current: number) => {
    if (original <= 0 || current >= original) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  // Add to Cart Button Component
  const AddToCartButton = ({ feeProduct }: { feeProduct: FeeShipProduct }) => {
    const product = convertToProduct(feeProduct);
    const { addToCart } = useAddToCart(product);

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      console.log("🛒 [FREESHIP] Button clicked!");
      console.log("🛒 [FREESHIP] Product before add to cart:", {
        productId: feeProduct.id,
        sp_id: feeProduct.sp_id,
      });

      try {
        // Fetch product detail to get variants
        const productDetailResponse = await ProductService.getProductDetail({
          product_id: feeProduct.id,
          shop_id: feeProduct.shop_id,
          include_variants: 1,
        });

        if (!productDetailResponse.success || !productDetailResponse.data) {
          console.warn(
            "⚠️ [FREESHIP] Không lấy được product detail, thêm không có variant"
          );
          addToCart(1, { toast: true });
          return;
        }

        const productDetail = productDetailResponse.data;
        const variants = productDetail.variants || [];

        console.log("🛒 [FREESHIP] Product detail fetched:", {
          hasVariants: variants.length > 0,
          variantsCount: variants.length,
          variants: variants,
        });

        // Nếu có variants, lấy variant đầu tiên
        if (variants && variants.length > 0) {
          const firstVariant = variants[0];

          // Đảm bảo firstVariant có đầy đủ thông tin
          if (
            !firstVariant ||
            firstVariant.id === null ||
            firstVariant.id === undefined
          ) {
            console.error(
              "❌ [FREESHIP] First variant is invalid:",
              firstVariant
            );
            // Nếu variant không hợp lệ, thêm bình thường
            addToCart(1, { toast: true });
            return;
          }

          // Map variants từ API format sang Product format
          const mappedVariants = variants.map((v) => ({
            id: v.id,
            product_id: v.product_id,
            stock: v.stock || 0,
            current_price: v.current_price || v.socdo_price || product.price,
            original_price: v.original_price || product.originalPrice || 0,
            color: v.color || "",
            size: v.size || "",
            color_name: v.color_name || v.color || "",
            size_name: v.size_name || v.size || "",
            attributes: v.attributes || [],
          }));

          const productWithFirstVariant: Product = {
            ...product,
            variant_id: firstVariant.id,
            phanloai_id: firstVariant.id, // backward compatible
            price:
              firstVariant.current_price ||
              firstVariant.socdo_price ||
              product.price,
            originalPrice: firstVariant.original_price || product.originalPrice,
            stock: firstVariant.stock || product.stock,
            variants: mappedVariants,
          };

          console.log("🛒 [FREESHIP] Adding to cart with first variant:", {
            productId: product.id,
            variantId: firstVariant.id,
            variantPrice:
              firstVariant.current_price || firstVariant.socdo_price,
            productWithVariant: productWithFirstVariant,
          });

          addToCart(1, {
            toast: true,
            product: productWithFirstVariant,
          });
        } else {
          // Không có variants, thêm bình thường
          console.log(
            "🛒 [FREESHIP] No variants found, adding without variant"
          );
          addToCart(1, { toast: true });
        }
      } catch (error) {
        console.error("❌ [FREESHIP] Error fetching product detail:", error);
        // Nếu có lỗi khi fetch, vẫn thêm vào cart không có variant
        addToCart(1, { toast: true });
      }
    };

    return (
      <button
        type="button"
        className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
        onClick={handleAddToCart}
      >
        <div className="relative">
          <ShoppingCart className="w-4 h-4" />
          <Plus className="w-3 h-3 absolute -top-1 -right-1" />
        </div>
      </button>
    );
  };

  // Mock rating (can be replaced with real data from API)
  const getRating = (product: FeeShipProduct) => 5.0;
  const getRatingCount = (product: FeeShipProduct) =>
    Math.floor((product.view || 0) / 10) || 24;

  // Convert FeeShipProduct to Product for add to cart
  const convertToProduct = (feeProduct: FeeShipProduct): Product => ({
    id: feeProduct.id,
    name: feeProduct.title,
    price: feeProduct.current_price,
    originalPrice: feeProduct.original_price,
    image: feeProduct.image_url || feeProduct.image || iconShop,
    stock: feeProduct.stock || 0,
    variant_id: null,
    phanloai_id: null,
    variants: [],
    category: {
      id: 0,
      name: feeProduct.category_shop || "",
    },
  });

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => {
              const imageUrl =
                product.image_url ||
                (product.image
                  ? product.image.startsWith("http")
                    ? product.image
                    : `https://socdo.vn${product.image}`
                  : iconShop);
              const hasDiscount =
                product.original_price > 0 &&
                product.original_price > product.current_price;
              const discountPercent = hasDiscount
                ? getDiscountPercent(
                    product.original_price,
                    product.current_price
                  )
                : 0;
              const shippingInfo = product.shipping_info;
              const rating = getRating(product);
              const ratingCount = getRatingCount(product);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer group relative"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Product Image */}
                  <div className="relative w-full aspect-square flex items-center justify-center bg-white p-2">
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover rounded"
                    />
                    {/* Discount Badge */}
                    {discountPercent > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        -{discountPercent}%
                      </div>
                    )}
                    {/* Add to Cart Button */}
                    <AddToCartButton feeProduct={product} />
                  </div>

                  {/* Product Info */}
                  <div className="p-2 flex flex-col">
                    {/* Product Title */}
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1.5 min-h-[2.5rem]">
                      {product.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base font-bold text-red-500">
                        {formatPrice(product.current_price || 0)}
                      </span>
                      {/* Icons instead of line-through price */}
                      {shippingInfo?.has_free_shipping && (
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                            <Truck className="w-3 h-3 text-white" />
                          </div>
                          {shippingInfo.ship_support > 0 && (
                            <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
                              <ShieldCheck className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                            <BadgeCheck className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={12}
                            className={`${
                              star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-1">
                        {rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({ratingCount})
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Loading More Indicator */}
          {isLoadingMore && (
            <div className="flex justify-center py-4">
              <div className="text-sm text-gray-500">Đang tải thêm...</div>
            </div>
          )}

          {/* Infinite Scroll Trigger */}
          {hasMore && !isLoadingMore && (
            <div ref={observerTarget} className="h-4" />
          )}
        </div>
      </div>
    </div>
  );
}
