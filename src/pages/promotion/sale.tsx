import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FlashSaleService,
  FlashSale as FlashSaleType,
  FlashSaleProduct,
} from "@/api/service/flash-sale.service";
import { formatPrice } from "@/utils/format";
import { useAddToCart } from "@/hooks";
import { Product, ProductVariant } from "@/types";

// Countdown timer hook
function useCountdown(timeRemaining?: number) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!timeRemaining) return;

    const totalSeconds = Math.max(0, Math.floor(timeRemaining));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setTimeLeft({
      days,
      hours,
      minutes,
      seconds,
    });

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else clearInterval(interval);

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return {
    days: formatTime(timeLeft.days),
    hours: formatTime(timeLeft.hours),
    minutes: formatTime(timeLeft.minutes),
    seconds: formatTime(timeLeft.seconds),
    isEnded:
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0,
  };
}

export default function SalePage() {
  const navigate = useNavigate();
  const [flashSales, setFlashSales] = useState<FlashSaleType[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("00:00");
  const [loading, setLoading] = useState(false);
  const [selectedFlashSale, setSelectedFlashSale] =
    useState<FlashSaleType | null>(null);

  useEffect(() => {
    fetchFlashSales();
  }, []);

  const fetchFlashSales = async () => {
    try {
      setLoading(true);
      const response = await FlashSaleService.getFlashSales({
        status: 1,
        include_products: 1,
      });

      if (response.success && response.data?.flashsales) {
        setFlashSales(response.data.flashsales);
        // Set first active flash sale as selected
        const active = response.data.flashsales.find((fs) => fs.is_active);
        if (active) {
          setSelectedFlashSale(active);
          setSelectedTimeSlot(active.start_time || "00:00");
        }
      }
    } catch (error) {
      console.error("❌ Error fetching flash sales:", error);
    } finally {
      setLoading(false);
    }
  };

  // Time slots
  const timeSlots = [
    { time: "00:00", label: "Sáng sớm" },
    { time: "09:00", label: "Buổi sáng" },
    { time: "16:00", label: "Buổi chiều tối" },
  ];

  // Get flash sale for selected time slot
  const currentFlashSale =
    flashSales.find(
      (fs) => fs.start_time === selectedTimeSlot || fs.is_active
    ) || selectedFlashSale;

  const countdown = useCountdown(currentFlashSale?.time_remaining);

  return (
    <div className="w-full h-full flex flex-col bg-background">
      {/* Header */}

      {/* Flash Sale Banner */}
      {currentFlashSale && (
        <div className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">
                Giảm giá sốc, đừng bỏ lỡ!
              </h3>
              <p className="text-sm opacity-90">
                Hàng ngàn sản phẩm với giá siêu ưu đãi
              </p>
            </div>
            <div className="bg-black bg-opacity-30 px-4 py-3 rounded-lg text-center">
              <div className="text-xs mb-2">
                {countdown.isEnded ? "Đã kết thúc" : "Còn lại"}
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold">{countdown.days}</div>
                  <div className="text-xs opacity-80">Ngày</div>
                </div>
                <div className="text-lg font-bold">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold">{countdown.hours}</div>
                  <div className="text-xs opacity-80">Giờ</div>
                </div>
                <div className="text-lg font-bold">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold">{countdown.minutes}</div>
                  <div className="text-xs opacity-80">Phút</div>
                </div>
                <div className="text-lg font-bold">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold">{countdown.seconds}</div>
                  <div className="text-xs opacity-80">Giây</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shop Info */}

      {/* Seller Section */}

      {/* Product List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            <span className="ml-3 text-gray-600">Đang tải...</span>
          </div>
        ) : !currentFlashSale ||
          !currentFlashSale.products ||
          currentFlashSale.products.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2 text-4xl">⚡</div>
            <p className="text-gray-600 mb-2">Không có sản phẩm flash sale</p>
            <p className="text-sm text-gray-500">
              Hiện tại không có sản phẩm flash sale nào
            </p>
          </div>
        ) : (
          <div className="px-4 py-4 space-y-4">
            {currentFlashSale.products.map((product: FlashSaleProduct) => {
              const discountPercentage = product.original_price
                ? Math.round(
                    100 - (product.current_price * 100) / product.original_price
                  )
                : 0;

              return (
                <FlashSaleProductCard
                  key={product.id}
                  product={product}
                  discountPercentage={discountPercentage}
                  onNavigate={() =>
                    navigate(`/product/${product.sp_id || product.id}`)
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

interface FlashSaleProductCardProps {
  product: FlashSaleProduct;
  discountPercentage: number;
  onNavigate: () => void;
}

function FlashSaleProductCard({
  product,
  discountPercentage,
  onNavigate,
}: FlashSaleProductCardProps) {
  const baseProduct = useMemo<Product>(() => {
    const price = Number(product.current_price) || 0;
    const originalPrice = Number(product.original_price) || undefined;
    const stock = Number(product.stock) || 0;

    return {
      id: product.sp_id || product.id,
      name: product.title,
      image: product.image_url || product.image,
      price,
      originalPrice,
      stock,
      category: {
        id: Number(product.category_shop) || 0,
        name: product.category || "",
      },
      detail: product.brand || "",
    };
  }, [product]);

  const flashSaleVariants = useMemo<ProductVariant[]>(() => {
    if (!Array.isArray(product.flash_sale_variants)) {
      return [];
    }

    return product.flash_sale_variants
      .map((variant) => {
        const rawVariantId = variant.variant_id as unknown;
        const parsedVariantId =
          typeof rawVariantId === "string"
            ? parseInt(rawVariantId, 10)
            : Number(rawVariantId);

        if (!rawVariantId || Number.isNaN(parsedVariantId)) {
          return null;
        }

        const currentPrice =
          Number(
            variant.flash_price ?? product.current_price ?? baseProduct.price
          ) || 0;
        const originalPrice =
          Number(
            variant.original_price ?? product.original_price ?? currentPrice
          ) || currentPrice;
        const stock =
          Number(variant.quantity ?? product.stock ?? baseProduct.stock) || 0;

        return {
          id: parsedVariantId,
          product_id: product.sp_id || product.id,
          stock,
          current_price: currentPrice,
          original_price: originalPrice,
          color: variant.color || "",
          size: variant.size || "",
          color_name: variant.color || "",
          size_name: variant.size || "",
          attributes: [],
        } as ProductVariant;
      })
      .filter((variant): variant is ProductVariant => Boolean(variant));
  }, [baseProduct.price, baseProduct.stock, product]);

  const cheapestVariant = useMemo<ProductVariant | null>(() => {
    if (flashSaleVariants.length === 0) {
      return null;
    }

    return flashSaleVariants.reduce((cheapest, current) => {
      return current.current_price < cheapest.current_price
        ? current
        : cheapest;
    }, flashSaleVariants[0]);
  }, [flashSaleVariants]);

  const productForCart = useMemo<Product>(() => {
    if (!cheapestVariant) {
      return baseProduct;
    }

    return {
      ...baseProduct,
      price: cheapestVariant.current_price,
      originalPrice:
        cheapestVariant.original_price ?? baseProduct.originalPrice,
      stock: cheapestVariant.stock ?? baseProduct.stock,
      variant_id: cheapestVariant.id,
      phanloai_id: cheapestVariant.id,
      variants: flashSaleVariants,
    };
  }, [baseProduct, cheapestVariant, flashSaleVariants]);

  const { addToCart } = useAddToCart(productForCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(1, {
      toast: true,
      product: productForCart,
    });
  };

  const displayPrice = useMemo(
    () =>
      Number(
        productForCart.price ?? baseProduct.price ?? product.current_price ?? 0
      ),
    [baseProduct.price, product.current_price, productForCart.price]
  );

  const displayOriginalPrice = useMemo(() => {
    const original =
      productForCart.originalPrice ??
      baseProduct.originalPrice ??
      product.original_price;
    return original ? Number(original) : undefined;
  }, [
    baseProduct.originalPrice,
    product.original_price,
    productForCart.originalPrice,
  ]);

  const displayDiscount = useMemo(() => {
    if (displayOriginalPrice && displayOriginalPrice > 0) {
      return Math.max(
        0,
        Math.round(100 - (displayPrice * 100) / displayOriginalPrice)
      );
    }
    return discountPercentage;
  }, [discountPercentage, displayOriginalPrice, displayPrice]);

  return (
    <div
      className="flex bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={onNavigate}
    >
      {/* Image */}
      <div className="relative w-32 h-32 flex-shrink-0">
        <img
          src={product.image_url || product.image}
          className="w-full h-full object-cover"
          alt={product.title}
        />
        {displayDiscount > 0 && (
          <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {displayDiscount}%
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
            {product.title}
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold text-red-500">
              {formatPrice(displayPrice)}
            </span>
            {displayOriginalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(displayOriginalPrice)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>BÁN CHẠY</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded flex items-center justify-center transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
