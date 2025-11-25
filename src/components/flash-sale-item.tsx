import { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import TransitionLink from "./transition-link";
import { useEffect, useState } from "react";
import { useAddToCart } from "@/hooks";
import { ShoppingCart, Plus, Heart, Check, MapPin } from "lucide-react";
import { useSetAtom } from "jotai";
import { heartState } from "@/state/cart";
import { generateProductStats } from "./ProductStats";
import iconCheck from "@/img/icon_check.jpg";

export interface FlashSaleItemProps {
  product: Product;
  replace?: boolean;
}

// Hook countdown (giữ nguyên)
function useCountdown(timeRemaining: number | undefined) {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!timeRemaining) return { hours: 0, minutes: 0, seconds: 0 };
    const totalSeconds = Math.floor(timeRemaining);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  });

  useEffect(() => {
    if (!timeRemaining) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        if (hours === 0 && minutes === 0 && seconds === 0)
          clearInterval(interval);
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining]);

  const formatTime = (num: number) => num.toString().padStart(2, "0");
  return {
    hours: formatTime(timeLeft.hours),
    minutes: formatTime(timeLeft.minutes),
    seconds: formatTime(timeLeft.seconds),
  };
}

// Lấy favorite từ localStorage khi component mount
const getFavoriteStore = (): { [productId: number]: Product } => {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem("favoriteStore");
  return stored ? JSON.parse(stored) : {};
};

export default function FlashSaleItem({
  product,
  replace,
}: FlashSaleItemProps) {
  const [selected, setSelected] = useState(false);
  const { addToCart } = useAddToCart(product);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = getFavoriteStore();
    return !!favorites[product.id];
  });

  const [stats] = useState(() => generateProductStats());

  const setHeart = useSetAtom(heartState);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsFavorite((prev) => {
      const newState = !prev;

      const store = JSON.parse(localStorage.getItem("favoriteStore") || "{}");

      if (newState) {
        store[product.id] = product; // chỉ lưu sản phẩm
      } else {
        delete store[product.id]; // xóa sản phẩm nếu bỏ tim
      }

      localStorage.setItem("favoriteStore", JSON.stringify(store));

      return newState;
    });
    setHeart((prev) => {
      if (prev.some((item) => item.product.id === product.id)) {
        return prev.filter((item) => item.product.id !== product.id);
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const discountPercentage = product.originalPrice
    ? Math.round(100 - (product.price * 100) / product.originalPrice)
    : 0;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(1, { toast: true });
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer group">
      <TransitionLink
        to={`/product/${product.id}`}
        replace={replace}
        className="flex flex-col"
        onClick={() => setSelected(true)}
      >
        <div className="relative w-full h-46 flex-shrink-0 p-2 flex items-center justify-center bg-white">
          <img
            src={product.image}
            className="w-full h-40 object-cover"
            alt={product.name}
          />
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              -{discountPercentage}%
            </div>
          )}
          <div className="absolute bottom-2 right-2 flex flex-col gap-2 z-10">
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
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full flex items-center justify-center shadow-lg transition-colors"
              onClick={handleAddToCart}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                <Plus className="w-3 h-3 absolute -top-1 -right-1" />
              </div>
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col p-2">
          <div className="pt-1 pb-0.5">
            <div className="text-xs line-clamp-2 min-h-[2rem] overflow-hidden text-ellipsis">
              {product.name}
            </div>
          </div>

          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-danger">
              {formatPrice(product.price)}
            </span>
            <img
              className=" h-5 flex-shrink-0"
              src={iconCheck}
              alt=""
            />
          </div>

          {/* ⭐ Rating + Đã bán */}
          <div className="flex items-center mt-1 text-[10px] text-gray-500">
            <div className="flex items-center ">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">
                {product.rating?.average_rating 
                  ? product.rating.average_rating.toFixed(1) 
                  : stats.rating} ({product.rating?.total_reviews || stats.review})
              </span>
            </div>

            <span className="mx-1">|</span>

            <div>Đã bán {product.sales_count || stats.sold}</div>
          </div>
        </div>
      </TransitionLink>
    </div>
  );
}
