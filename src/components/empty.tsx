import { EmptyBoxIcon, EmptyCartIcon, SearchIconLarge } from "./vectors";
import { useNavigate } from "react-router-dom";
import iconShop from "@/img/icon_shop.png";

export function EmptySearchResult() {
  return (
    <div className="flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      <SearchIconLarge />
      <div className="text-inactive text-center text-2xs">
        Không có sản phẩm bạn tìm kiếm
      </div>
    </div>
  );
}

export function EmptyCategory() {
  return (
    <div className="h-full flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      <EmptyBoxIcon />
      <div className="text-inactive text-center text-2xs">
        Không có sản phẩm trong danh mục này
      </div>
    </div>
  );
}

export function EmptyOrder() {
  return (
    <div className="h-full flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      <EmptyBoxIcon />
      <div className="text-inactive text-center text-2xs">
        Hiện tại bạn chưa có đơn hàng nào
      </div>
    </div>
  );
}

export function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      <img
        src={iconShop}
        alt="Cửa hàng"
        className="w-24 h-24 object-contain opacity-80"
      />
      <div className="text-inactive text-center text-2xs">
        Ui là trời ! Bạn chưa thêm sản phẩm nào vào giỏ hàng !
      </div>
      <button
        onClick={() => navigate("/flash-sale")}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Mua sắm ngay
      </button>
    </div>
  );
}
