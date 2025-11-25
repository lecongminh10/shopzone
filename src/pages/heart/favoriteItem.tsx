import { generateProductStats } from "@/components/ProductStats";
import { useAddToCart } from "@/hooks";
import { heartState } from "@/state/cart";
import { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import { useSetAtom } from "jotai";
import { Heart, MapPin, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function FavoriteItem({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(true);
  const { addToCart } = useAddToCart(product);
  const setHeart = useSetAtom(heartState);
  const [stats] = useState(() => generateProductStats());

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

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(1, { toast: true });
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-3 flex gap-3">
        {/* Hình ảnh bên trái */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <img
            src={product.image}
            className="w-full h-full object-cover rounded"
            alt={product.name}
          />
          <button
            type="button"
            className={`absolute top-1 left-1 p-1.5 rounded-full flex items-center justify-center shadow-md transition-colors ${
              isFavorite ? "bg-red-500" : "bg-white/80"
            }`}
            onClick={handleFavorite}
          >
            <Heart
              className={`w-3 h-3 ${
                isFavorite ? "text-white" : "text-gray-600"
              }`}
            />
          </button>
        </div>

        {/* Thông tin bên phải */}
        <div className="flex-1 flex flex-col relative min-w-0">
          <h3 className="text-sm text-gray-900 line-clamp-2 mb-1.5">
            {product.name}
          </h3>

          {/* Giá */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-sm font-bold text-danger">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Rating và Đã bán */}
          <div className="flex items-center text-[10px] text-gray-500 mb-1.5">
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">
                {stats.rating} ({stats.review})
              </span>
            </div>
            <span className="mx-1">|</span>
            <div>Đã bán {stats.sold}</div>
          </div>

          {/* Location */}
          <div className="flex items-center text-[10px] text-gray-500 mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            <span>Thành phố Hà Nội</span>
          </div>

          {/* Nút Add to Cart ở góc dưới bên phải */}
          <div className="absolute bottom-0 right-0">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full flex items-center justify-center shadow-lg transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
