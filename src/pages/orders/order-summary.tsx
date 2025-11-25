import { Order } from "@/types";
import { formatPrice } from "@/utils/format";
import { useNavigate } from "react-router-dom";

interface OrderSummaryProps {
  order: Order;
  onBeforeNavigate?: () => void; // Callback để đóng modal trước khi navigate
}

function OrderSummary({ order, onBeforeNavigate }: OrderSummaryProps) {
  const navigate = useNavigate();
  const productList = Object.values(order.products);

  // Format date from createdAtReadable or createdAt
  const formatDate = () => {
    // Nếu API đã có trường readable => chỉ lấy phần ngày/tháng/năm
    if (order.created_at_readable) {
      const [datePart] = order.created_at_readable.split(" ");
      return datePart;
    }

    // Nếu chỉ có timestamp thì format thủ công
    if (order.createdAt || order.createdAt) {
      const timestamp = order.createdAt ?? order.createdAt;
      const date = new Date(timestamp * 1000);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return "";
  };

  const statusKey = {
    "0": "Chờ Xử Lý",
    "1": "Đã tiếp Nhận",
    "2": "Đã Giao cho đơn vị vận chuyển",
    "3": "Yêu cầu hủy đơn hàng",
    "4": "Xác nhận hủy đơn hàng",
    "5": "Giao hàng thành công",
    "6": "Đã hoàn đơn",
    "7": "Lỗi khi giao hàng",
    "8": "Đang vận chuyển",
    "9": "Đang chờ lên lịch lại",
    "10": "Đã phân công tài xế",
    "11": "Đã lấy hàng",
    "12": "Đã đến bưu cục",
    "14": "Ngoại lệ trả hàng",
  };

  const handleViewDetails = () => {
    // Gọi callback để đóng modal nếu có (khi đang ở trong modal)
    if (onBeforeNavigate) {
      onBeforeNavigate();
    }
    
    localStorage.setItem("selectedOrder", JSON.stringify(order));
    navigate(`/order/${order.id}`, { state: order });
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="text-base font-bold text-gray-900 mb-1">
              #{(order as any).order_code || order.orderCode || order.id}
            </div>
            <div className="text-xs text-gray-500">{formatDate()}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">
              {statusKey[order.status] ?? order.status}
            </div>
            <div className="text-base font-semibold text-red-500">
              {formatPrice(order.total)}
            </div>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="px-4 py-3 w-full">
        {productList.map((product: any, idx: number) => {
          // Parse price: remove both comma and dot separators
          const productPrice = Number(product.gia_moi?.replace(/[,\.]/g, "") || 0);
          const subtotal = productPrice * product.soluong;

          const formatProductDetails = () => {
            const parts: string[] = [];
            if (product.color) parts.push(`Màu: ${product.color}`);
            if (product.size) parts.push(`Size: ${product.size}`);
            return parts.join(" ");
          };

          return (
            <div
              key={idx}
              className="flex items-start gap-3 mb-4 last:mb-0 w-full"
            >
              {/* Product Image */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 overflow-hidden rounded border border-gray-200">
                  <img
                    src={
                      product.minh_hoa?.startsWith("http")
                        ? product.minh_hoa
                        : `https://socdo.vn${product.minh_hoa}`
                    }
                    alt={product.tieu_de}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gray-200 text-gray-700 text-xs font-medium px-1.5 py-0.5 rounded border border-gray-300">
                  x{product.soluong}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 mb-1.5 line-clamp-2">
                  {product.tieu_de}
                </div>

                <div className="text-xs text-gray-500 mb-2">
                  {formatProductDetails()}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">GIÁ</div>
                    <div className="text-sm font-semibold text-red-500">
                      {formatPrice(productPrice)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-0.5">
                      THÀNH TIỀN
                    </div>
                    <div className="text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {formatPrice(subtotal)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between w-full">
        <div>
          <span className="text-sm text-gray-700">Tổng cộng: </span>
          <span className="text-sm font-semibold text-red-500">
            {formatPrice(order.total)}
          </span>
        </div>
        <button
          onClick={handleViewDetails}
          className="bg-gray-700 text-white text-xs font-medium px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          XEM CHI TIẾT
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
