import { useNavigate } from "react-router-dom";
import { Product } from "@/types";

interface SearchDropdownProps {
  products: Product[];
  onClose: () => void;
  limit?: number;
  keyWord?: string;
}

export default function SearchDropdown({
  products,
  onClose,
  limit,
  keyWord,
}: SearchDropdownProps) {
  const navigate = useNavigate();
  console.log("key", keyWord);

  // 🔹 lọc products theo keyWord
  const filteredProducts = keyWord
    ? products.filter((p) =>
        p.name.toLowerCase().includes(keyWord.toLowerCase())
      )
    : products;

  const visibleProducts = limit
    ? filteredProducts.slice(0, limit)
    : filteredProducts;

  const hasProducts = visibleProducts.length > 0;
  const hasKeyword = keyWord && keyWord.trim().length > 0;

  return (
    <div
      className="fixed left-0 z-[9999] bg-white text-black  w-full rounded-xl shadow-lg max-h-90"
      style={{ marginTop: "6px" }}
    >
      {/* Header luôn ở trên - Ẩn text "Sản phẩm nổi bật" khi có keyword */}
      <div className="flex justify-between items-center px-2 py-2 border-b border-gray-300 bg-white z-10">
        {!hasKeyword && (
          <p className="font-semibold text-sm flex-1 ">Sản phẩm nổi bật</p>
        )}
        {hasKeyword && <div className="flex-1"></div>}
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black text-xl font-bold ml-2"
        >
          ×
        </button>
      </div>

      {/* Scrollable list riêng */}
      <div className="overflow-y-auto max-h-[calc(15rem)] p-2">
        {hasProducts ? (
          visibleProducts.map((p) => (
            <div
              key={p.id}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md"
              onClick={() => {
                navigate(`/product/${p.id}`);
                onClose();
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-10 h-10 object-cover rounded-md"
              />
              <div className="truncate">
                <div className="font-medium text-sm truncate max-w-[300px] sm:max-w-[250px]">
                  {p.name}
                </div>
                <div className="text-xs text-gray-500">
                  {p.price.toLocaleString()}₫
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-8 px-4">
            <p className="text-sm text-gray-500 text-center">
              Hiện tại chưa có sản phẩm phù hợp
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
