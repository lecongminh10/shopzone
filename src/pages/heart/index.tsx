import { Product } from "@/types";
import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { loadable } from "jotai/utils";
import { productsState } from "@/state";
import FavoriteItem from "./favoriteItem";
import ProductItem from "@/components/product-item";
import { MapPin } from "lucide-react";
import iconShop from "@/img/icon_shop.png";

const getFavoriteStore = (): { [productId: number]: Product } => {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem("favoriteStore");
  return stored ? JSON.parse(stored) : {};
};

export default function HeartPage() {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  const loadableProducts = useAtomValue(loadable(productsState));
  const allProducts =
    loadableProducts.state === "hasData" ? loadableProducts.data : [];

  useEffect(() => {
    const favs = Object.values(getFavoriteStore());
    setFavoriteProducts(favs);
  }, []);

  const favoriteProductIds = new Set(favoriteProducts.map((p) => p.id));
  const otherProducts = allProducts.filter(
    (product) => !favoriteProductIds.has(product.id)
  );
  
  return (
    <div className="p-4">
      {favoriteProducts.length > 0 && (
        <div className="flex flex-col gap-3 mb-4">
          {favoriteProducts.map((product) => (
            <FavoriteItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {favoriteProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 mb-6">
          {/* Logo sóc */}
          <div className="mb-4">
            <img
              src={iconShop}
              alt="Logo sóc"
              className="w-24 h-24 object-contain"
            />
          </div>
          
          {/* Text "Bạn chưa yêu thích sản phẩm nào !" */}
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Bạn chưa yêu thích sản phẩm nào !
          </p>
        </div>
      )}

      {otherProducts.length > 0 && (
        <div className="my-4">
          <div className="flex items-center text-sm font-semibold mb-3">
            <span className="flex-grow border-t border-gray-300"></span>
            <span className="mx-2 text-xl">Sản phẩm dành cho bạn</span>
            <span className="flex-grow border-t border-gray-300"></span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {otherProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {favoriteProducts.length === 0 && otherProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Không có sản phẩm nào.</p>
        </div>
      )}
    </div>
  );
}
