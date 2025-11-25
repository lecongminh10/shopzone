import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Order } from "@/types";
import { formatPrice } from "@/utils/format";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "zmp-ui";
import { Star } from "lucide-react";
import { ProductReviewService } from "@/api/service/productReview.sevicer";
import { OrderService } from "@/api/service/order.sevice";
import ProductReviewForm from "../checkout/productReviewForm";
import toast from "react-hot-toast";
import { AuthService } from "@/api";
import { openChat } from "zmp-sdk/apis";
import { getConfig } from "@/utils/template";

interface ProductReview {
  productId: string;
  rating: number;
  comment: string;
  images: string[];
}

export default function OrderDetailPage() {
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>((state as Order) || null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<Record<string, ProductReview>>({});
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(0);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const reviewSectionRef = useRef<HTMLDivElement | null>(null);

  // Fetch order from API function (extracted for reuse)
  const fetchOrderFromAPI = async (orderId: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("⚠️ Không có token để fetch order detail");
        return;
      }

      console.log("🔄 Fetching order detail from API for order ID:", orderId);
      const orderDetail = await OrderService.getOrderDetail(token, orderId);

      if (orderDetail) {
        console.log("✅ Order detail fetched successfully:", orderDetail);
        setOrder(orderDetail);
        // Cập nhật localStorage với dữ liệu đầy đủ
        localStorage.setItem("selectedOrder", JSON.stringify(orderDetail));
      } else {
        console.warn("⚠️ Không lấy được order detail từ API");
      }
    } catch (error) {
      console.error("❌ Lỗi khi fetch order detail:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchedOrderIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!id) return;
      if (fetchedOrderIdsRef.current.has(id)) return; // đã fetch trước đó

      let initialOrder: Order | null = null;

      if (state) {
        initialOrder = state as Order;
        setOrder(initialOrder);
      } else {
        const savedOrder = localStorage.getItem("selectedOrder");
        if (savedOrder) {
          initialOrder = JSON.parse(savedOrder);
          setOrder(initialOrder);
        }
      }

      await fetchOrderFromAPI(id);

      fetchedOrderIdsRef.current.add(id); // đánh dấu đã fetch
    };

    fetchOrderDetail();
  }, [id, state]);

  const paymentRecords =
    (order as any)?.payment_records || (order as any)?.paymentRecords || [];
  const latestPaymentRecord =
    paymentRecords.length > 0 ? paymentRecords[0] : null;

  const isBankTransferPending = (() => {
    if (!order) return false;
    const paymentMethodRaw =
      (order as any).payment_method_latest ||
      (order as any).payment_method ||
      order.paymentMethod ||
      "";
    const paymentStatusRaw =
      (order as any).payment_status ||
      (order as any).paymentStatus ||
      latestPaymentRecord?.status ||
      "";
    return (
      paymentMethodRaw.toLowerCase().includes("bank_transfer") &&
      paymentStatusRaw.toLowerCase() === "pending"
    );
  })();

  useEffect(() => {
    if (!isBankTransferPending || !order) {
      setCountdownSeconds(0);
      return undefined;
    }

    const createdAtSource =
      latestPaymentRecord?.created_at ||
      (order as any).created_at_readable ||
      (order as any).created_at;

    if (!createdAtSource) {
      setCountdownSeconds(0);
      return undefined;
    }

    const parseDateTime = (value: any): Date | null => {
      if (!value) return null;
      if (typeof value === "number") {
        return new Date(value * 1000);
      }
      if (typeof value === "string") {
        // Replace space with T to make it ISO-like (local time)
        const normalized = value.replace(" ", "T");
        const date = new Date(normalized);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return null;
    };

    const createdAtDate = parseDateTime(createdAtSource);
    if (!createdAtDate) {
      setCountdownSeconds(0);
      return undefined;
    }

    const expirationTime = createdAtDate.getTime() + 15 * 60 * 1000;

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.round((expirationTime - now) / 1000));
      setCountdownSeconds(diff);
    };

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(intervalId);
  }, [isBankTransferPending, latestPaymentRecord, order]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const hours = Math.floor(mins / 60);
    const displayMinutes = mins % 60;
    return [
      hours.toString().padStart(2, "0"),
      displayMinutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  const [bankTransferInfo, setBankTransferInfo] = useState<{
    bankCode?: string;
    orderCode?: string;
    orderId?: number;
    amount?: number;
    accountNumber?: string; // sửa từ number → string
    bankName?: string;
    bankFullName?: string;
    recipient?: string;
    qrCodeUrl?: string; // tên khớp với biến
  } | null>(null);

  useEffect(() => {
    const fetchBankInfo = async () => {
      if (!isBankTransferPending || !order) return;

      try {
        const response = await AuthService.getSellerToken();
        const bankAccount = response.data.bank_accounts?.[0];

        if (!bankAccount) {
          console.warn("Không tìm thấy tài khoản ngân hàng mặc định");
          return;
        }

        const bankCode = bankAccount.bank?.code; // fallback VPBank
        const accountNumber = bankAccount.account_number;
        const recipient = bankAccount.account_holder;
        const bankName = bankAccount.bank?.code;
        const bankFullName = bankAccount.bank?.name;

        const amount = Number(order.total || 0);
        const orderCode =
          order.order_code || order.orderCode || String(order.id);

        const qrCodeUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent()}`;

        setBankTransferInfo({
          bankCode,
          accountNumber,
          recipient,
          bankName,
          bankFullName,
          amount,
          orderCode,
          qrCodeUrl,
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin ngân hàng:", error);
      }
    };

    fetchBankInfo();
  }, [isBankTransferPending, order]);

  const handleCopy = (value: string, label?: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    const displayLabel = label ? label.replace(/^\s+|\s+$/g, "") : "thông tin";
    toast.success(`Đã sao chép ${displayLabel} vào bộ nhớ tạm`);
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Đang tải thông tin đơn hàng...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-4 text-center text-gray-500">
        Không tìm thấy thông tin đơn hàng.
      </div>
    );
  }

  // Lấy reviewed_products từ order (có thể là reviewed_products hoặc reviewedProducts)
  const reviewedProducts =
    (order as any).reviewed_products || (order as any).reviewedProducts || {};

  // Nếu order.products là object (key-value) → chuyển sang mảng với key
  const productList = Array.isArray(order.products)
    ? order.products.map((p: any, idx: number) => ({
        ...p,
        productKey: String(p.id || idx),
      }))
    : Object.entries(order.products).map(([key, value]) => ({
        ...value,
        productKey: key, // Giữ lại key làm productKey để match với reviewed_products
      }));

  // Kiểm tra xem có ít nhất một review thực sự (object, không phải false) không
  const hasRealReviews = Object.values(reviewedProducts).some(
    (review: any) => review && typeof review === "object" && review !== null
  );

  // Log productList và reviewedProducts mapping
  console.log(
    "🔗 Product List với ProductKey:",
    productList.map((p: any) => ({
      productKey: p.productKey,
      tieu_de: p.tieu_de,
      hasReview:
        !!reviewedProducts[p.productKey] &&
        reviewedProducts[p.productKey] !== false,
    }))
  );
  console.log("🔗 Reviewed Products Keys:", Object.keys(reviewedProducts));
  console.log("🔗 Has Real Reviews:", hasRealReviews);

  // Tính tổng tiền sản phẩm
  let subtotal = 0;
  productList.forEach((product: any) => {
    // Parse price: remove both comma and dot separators
    const price = Number(product.gia_moi?.replace(/[,\.]/g, "") || 0);
    subtotal += price * product.soluong;
  });

  const shippingFeeValue =
    (order as any).shipping_fee !== undefined
      ? Number((order as any).shipping_fee)
      : order.shippingFee || 0;
  const shipSupportValue =
    (order as any).ship_support !== undefined
      ? Number((order as any).ship_support)
      : 0;
  const discountValue =
    (order as any).discount !== undefined
      ? Number((order as any).discount)
      : order.discount || 0;
  const couponCode =
    (order as any).coupon_code || (order as any).couponCode || "";
  const pointsUsedValue =
    (order as any).points_used !== undefined
      ? Number((order as any).points_used)
      : 0;
  const shippingProviderValue =
    (order as any).shipping_provider || order.shippingProvider || "";
  const rawStatusValue =
    (order as any).status !== undefined
      ? Number((order as any).status)
      : order.status;
  const orderStatusText =
    (order as any).status_text ||
    (order as any).statusText ||
    (order as any).status_name ||
    "";
  const paymentStatusText = (() => {
    const rawMethod =
      (order as any).payment_method_latest ||
      (order as any).payment_method ||
      order.paymentMethod ||
      "";
    if (!rawMethod) {
      return "";
    }
    const method = rawMethod.toLowerCase();
    if (method.includes("bank_transfer") || method.includes("bank")) {
      return "Banking";
    }
    if (method.includes("cod")) {
      return "COD";
    }
    return rawMethod;
  })();

  const getPaymentMethodText = () => {
    // Ưu tiên sử dụng payment_method_latest từ API response
    const paymentMethod =
      (order as any).payment_method_latest ||
      order.paymentMethod ||
      (order as any).payment_method;

    if (paymentMethod) {
      const method = paymentMethod.toLowerCase();
      if (method.includes("cod")) {
        return "Thanh toán khi nhận hàng";
      }
      if (method.includes("bank_transfer") || method.includes("bank")) {
        return "Chuyển khoản nhanh 24/7";
      }
      return paymentMethod;
    }
    return "Thanh toán khi nhận hàng";
  };

  // Star Rating Component
  const StarRating = ({
    rating,
    onRatingChange,
    productId,
  }: {
    rating: number;
    onRatingChange: (rating: number) => void;
    productId: string;
  }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
          >
            <Star
              size={24}
              className={`transition-colors ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  // Handle review change
  const handleReviewChange = (
    productId: string,
    field: keyof ProductReview,
    value: any
  ) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        productId,
        [field]: value,
      },
    }));
  };

  // Handle submit review

  // Remove uploaded image

  // Handle cancel order
  const handleCancelOrder = () => {
    if (!order) {
      toast.error("Không tìm thấy thông tin đơn hàng");
      return;
    }
    setShowCancelModal(true);
  };

  const confirmCancelOrder = async () => {
    if (!order) {
      toast.error("Không tìm thấy thông tin đơn hàng");
      setShowCancelModal(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập để thực hiện thao tác này");
        setShowCancelModal(false);
        return;
      }

      const orderId = order.id;
      const orderCode = (order as any).order_code || order.orderCode;

      const response = await OrderService.cancelOrder(
        token,
        orderId,
        orderCode
      );

      if (response.success) {
        toast.success("Đã gửi yêu cầu hủy đơn hàng thành công");
        setShowCancelModal(false);

        // Refresh order data
        if (id) {
          await fetchOrderFromAPI(id);
        }
      } else {
        toast.error(response.message || "Không thể hủy đơn hàng");
      }
    } catch (error: any) {
      console.error("Error canceling order:", error);
      toast.error(
        error?.message || "Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại!"
      );
    } finally {
      setShowCancelModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full space-y-0">
        {isBankTransferPending && countdownSeconds > 0 && (
          <div className="bg-white px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Icon icon="zi-home" className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700">
                {getPaymentMethodText()}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-xs text-orange-600">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-400 text-white">
                !
              </span>
              <span className="flex-1">
                Cần thanh toán sớm trong{" "}
                <span className="font-semibold">
                  {formatCountdown(countdownSeconds)}
                </span>
              </span>
            </div>

            {bankTransferInfo && (
              <div className="mt-3 rounded-lg border border-gray-200 bg-white px-3 py-3">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs font-semibold text-gray-900">
                      Chuyển khoản nhanh 24/7
                    </div>
                    <div className="text-[11px] text-gray-500">
                      VPBank • {bankTransferInfo.bankFullName}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-gray-500">Số tiền</div>
                    <div className="text-sm font-semibold text-red-500">
                      {formatPrice(bankTransferInfo.amount ?? 0)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-lg border border-gray-200 p-3 bg-gray-50">
                    <img
                      src={bankTransferInfo.qrCodeUrl}
                      alt="QR Thanh toán"
                      className="h-40 w-40"
                    />
                  </div>
                  <div className="w-full space-y-2 text-xs text-gray-600">
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-2 py-1.5">
                      <span className="font-medium text-gray-700">
                        Số tài khoản
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {bankTransferInfo.accountNumber}
                        </span>
                        <button
                          onClick={() =>
                            handleCopy(
                              bankTransferInfo.accountNumber || "",
                              "số tài khoản"
                            )
                          }
                          className="rounded border border-gray-300 px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-100"
                        >
                          Sao chép
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-2 py-1.5">
                      <span className="font-medium text-gray-700">
                        Người nhận
                      </span>
                      <span className="max-w-[55%] text-right text-gray-900">
                        {bankTransferInfo.recipient}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-2 py-1.5">
                      <span className="font-medium text-gray-700">
                        Nội dung
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">
                          {bankTransferInfo.orderCode}
                        </span>
                        <button
                          onClick={() =>
                            handleCopy(bankTransferInfo.orderCode || "nội dung")
                          }
                          className="rounded border border-gray-300 px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-100"
                        >
                          Sao chép
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-50 px-3 py-2 text-[11px] text-blue-600">
                    Vui lòng chuyển đúng số tiền và nội dung để đơn hàng được
                    ghi nhận.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Shipping Address Section */}
        <div className="bg-white px-4 py-4 border-b border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-900">
              Địa chỉ nhận hàng
            </h2>
            {/* Reward Points Section - Không hiển thị nếu reward_status = 2 */}
            {(order as any).reward_points !== null &&
              (order as any).reward_points !== undefined &&
              (order as any).reward_status !== null &&
              (order as any).reward_status !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Điểm thưởng:</span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      (order as any).reward_status === 1
                        ? "bg-green-50 text-green-700"
                        : (order as any).reward_status === 0
                        ? "bg-orange-50 text-orange-800"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span className="font-bold">
                      +{Number((order as any).reward_points).toLocaleString('vi-VN')}
                    </span>
                    <span className="text-[10px]">
                      {(order as any).reward_status === 1
                        ? "đã được cộng"
                        : (order as any).reward_status === 0
                        ? "tạm giữ"
                        : ""}
                    </span>
                  </span>
                </div>
              )}
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-2.5">
              <div className="flex items-start gap-2">
                <span className="text-sm text-gray-500 min-w-[100px]">
                  Họ Tên:
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {(order as any).customer_name || order.customerName}
                </span>
              </div>
              {(order as any).email && (
                <div className="flex items-start gap-2">
                  <span className="text-sm text-gray-500 min-w-[100px]">
                    Email:
                  </span>
                  <span className="text-sm text-gray-700">
                    {(order as any).email}
                  </span>
                </div>
              )}
              <div className="flex items-start gap-2">
                <span className="text-sm text-gray-500 min-w-[100px]">
                  Số điện thoại:
                </span>
                <span className="text-sm text-gray-700">
                  {(order as any).phone || order.phone}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sm text-gray-500 min-w-[100px] flex-shrink-0">
                  Địa chỉ:
                </span>
                <span className="text-sm text-gray-700 leading-relaxed">
                  {(order as any).full_address ? (
                    (order as any).full_address
                  ) : (
                    <>
                      {order.address}
                      {(order as any).ward_name &&
                        `, ${(order as any).ward_name}`}
                      {(order as any).district_name &&
                        `, ${(order as any).district_name}`}
                      {(order as any).province_name &&
                        `, ${(order as any).province_name}`}
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Product Details Section */}
        <div className="bg-white px-4 py-4 border-b border-gray-100">
          {productList.map((product: any, idx) => (
            <div key={idx} className="flex items-start gap-3 mb-3 last:mb-0">
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded border border-gray-200">
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
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 mb-1 line-clamp-2">
                  {product.tieu_de}
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  {product.color} {product.size && `• ${product.size}`}
                </div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    {product.gia_cu && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(
                          Number(product.gia_cu?.replace(/[,\.]/g, "") || 0)
                        )}
                      </span>
                    )}
                    <span className="text-sm font-semibold text-gray-900">
                      {formatPrice(
                        Number(product.gia_moi?.replace(/[,\.]/g, "") || 0)
                      )}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    x{product.soluong}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-700">Thành tiền: </span>
            <span className="text-sm font-semibold text-gray-900">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>

        {/* Note Section - Hiển thị ghi chú đơn hàng */}
        {(order as any).note &&
          (order as any).note !== "0" &&
          (order as any).note.trim() !== "" && (
            <div className="bg-white px-4 py-4 border-b border-gray-100">
              <div className="flex items-start gap-3">
                <Icon
                  icon="zi-note"
                  className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Ghi chú đơn hàng
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg px-3 py-2.5">
                    {(order as any).note}
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Reviews Section - Hiển thị đánh giá đã có */}
        {/* Chỉ hiển thị khi có ít nhất một review thực sự (object, không phải false) */}
        {order.status === 5 && hasRealReviews && (
          <div
            ref={reviewSectionRef}
            className="bg-white px-4 py-4 border-b border-gray-100"
          >
            <h2 className="text-sm font-medium text-gray-900 mb-4">
              Đánh giá sản phẩm
            </h2>
            <div className="space-y-4">
              {productList.map((product: any) => {
                const productKey = product.productKey;
                const existingReview = reviewedProducts[productKey];

                // Chỉ hiển thị review nếu là object (không phải false)
                if (
                  !existingReview ||
                  existingReview === false ||
                  typeof existingReview !== "object"
                )
                  return null;

                return (
                  <div
                    key={productKey}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded border border-gray-200">
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
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 line-clamp-2 mb-2">
                          {product.tieu_de}
                        </div>
                        {/* Rating Display */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={`${
                                  star <= (existingReview.rating || 0)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          {existingReview.is_verified_purchase && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                              ✓ Đã mua
                            </span>
                          )}
                        </div>
                        {/* Review Content */}
                        {existingReview.content && (
                          <div className="text-sm text-gray-700 mb-2">
                            {existingReview.content}
                          </div>
                        )}
                        {/* Review Images */}
                        {existingReview.images &&
                          existingReview.images.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {existingReview.images.map(
                                (image: string, imgIdx: number) => (
                                  <div
                                    key={imgIdx}
                                    className="w-16 h-16 rounded border border-gray-200 overflow-hidden"
                                  >
                                    <img
                                      src={
                                        image.startsWith("http")
                                          ? image
                                          : `https://socdo.vn${image}`
                                      }
                                      alt={`Review ${imgIdx + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        {/* Review Date */}
                        {existingReview.created_at_readable && (
                          <div className="text-xs text-gray-500 mt-2">
                            {existingReview.created_at_readable}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Review Form - Chỉ hiển thị cho sản phẩm chưa đánh giá */}
        {order.status === 5 && (
          <ProductReviewForm
            key={order.id}
            order={order}
            onReviewSubmitted={async (productId: string) => {
              // Refresh order từ API để lấy reviewed_products mới nhất
              if (id) {
                await fetchOrderFromAPI(id);

                // Scroll đến phần review section sau khi refresh
                setTimeout(() => {
                  if (reviewSectionRef.current) {
                    reviewSectionRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }, 500); // Đợi một chút để DOM update và order được refresh
              }
            }}
          />
        )}
        

        {/* Support Section */}
        <div className="bg-white px-4 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-900 mb-3">
            Bạn cần hỗ trợ?
          </h2>
          <div className="space-y-2">
            <button
              className="w-full flex items-center justify-between py-2"
              onClick={async () => {
                try {
                  const oaId = getConfig((config) => config.template.oaIDtoOpenChat);
                  const orderCode = order ? ((order as any).order_code || order.orderCode || order.id) : '';
                  const message = orderCode 
                    ? `Cho tôi biết tình trạng đơn hàng hiện tại của tôi\n\nMã đơn hàng: ${orderCode}`
                    : "Cho tôi biết tình trạng đơn hàng hiện tại của tôi";
                  
                  if (oaId) {
                    await openChat({
                      type: "oa",
                      id: oaId,
                      message: message,
                    });
                  }
                } catch (error) {
                  console.error("Error opening chat:", error);
                  // Fallback: mở link Zalo nếu openChat thất bại
                  const zaloOaId = import.meta.env.VITE_ZALO_OA_ID || import.meta.env.VITE_SHOP_USERNAME;
                  if (zaloOaId) {
                    const orderCode = order ? ((order as any).order_code || order.orderCode || order.id) : '';
                    const message = orderCode 
                      ? `Cho tôi biết tình trạng đơn hàng hiện tại của tôi\n\nMã đơn hàng: ${orderCode}`
                      : "Cho tôi biết tình trạng đơn hàng hiện tại của tôi";
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://zalo.me/${zaloOaId}?message=${encodedMessage}`, "_blank");
                  }
                }
              }}
            >
              <div className="flex items-center gap-3">
                <Icon icon="zi-chat" className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">Liên hệ Shop</span>
              </div>
              <Icon icon="zi-chevron-right" className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
        {/* Order ID and Total Section */}
        <div className="bg-white px-4 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-700">Mã đơn hàng</span>
            <span className="text-sm font-medium text-gray-900">
              {(order as any).order_code || order.orderCode || order.id}
            </span>
          </div>
          <div className="space-y-1.5 text-sm text-gray-700">
            {orderStatusText && (
              <div className="flex items-center justify-between">
                <span>Trạng thái đơn hàng</span>
                <span className="font-medium text-gray-900">
                  {orderStatusText === "Xác nhận hủy đơn hàng"
                    ? "Đơn hàng đã được hủy"
                    : orderStatusText}
                </span>
              </div>
            )}
            {paymentStatusText && (
              <div className="flex items-center justify-between">
                <span>Trạng thái thanh toán</span>
                <span className="font-medium text-gray-900">
                  {paymentStatusText}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-1.5 text-sm text-gray-700">
            {shippingProviderValue && (
              <div className="flex items-center justify-between">
                <span>Đơn vị vận chuyển</span>
                <span className="font-medium text-gray-900">
                  {shippingProviderValue}
                </span>
              </div>
            )}
            {shippingFeeValue > 0 && (
              <div className="flex items-center justify-between">
                <span>Phí vận chuyển</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(shippingFeeValue)}
                </span>
              </div>
            )}
            {shipSupportValue > 0 && (
              <div className="flex items-center justify-between">
                <span>Hỗ trợ phí ship</span>
                <span className="font-medium text-green-600">
                  -{formatPrice(shipSupportValue)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span>
                Voucher
                {couponCode ? ` (${couponCode})` : ""}
              </span>
              <span
                className={`font-medium ${
                  discountValue > 0 ? "text-red-500" : "text-gray-900"
                }`}
              >
                {discountValue > 0
                  ? `-${formatPrice(discountValue)}`
                  : formatPrice(0)}
              </span>
            </div>
            {pointsUsedValue > 0 && (
              <div className="flex items-center justify-between">
                <span>Điểm đã sử dụng</span>
                <span className="font-medium text-red-500">
                  -{formatPrice(pointsUsedValue)} ({pointsUsedValue.toLocaleString('vi-VN')} điểm)
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-700">Tổng thanh toán</span>
            <span className="text-sm font-semibold text-red-500">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
        {/* Cancel Order Button - chỉ hiển thị khi trạng thái cho phép */}
        {[0, 1].includes(rawStatusValue) && (
          <div className="bg-white px-4 py-4 pb-6">
            <button
              onClick={handleCancelOrder}
              className="w-full py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Hủy đơn hàng
            </button>
          </div>
        )}
      </div>
      {showCancelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl space-y-4">
            <div className="space-y-2 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Xác nhận hủy đơn
              </h3>
              <p className="text-sm text-gray-600">
                Bạn có chắc chắn muốn hủy đơn hàng{" "}
                <span className="font-medium">
                  {(order as any).order_code || order.orderCode || order.id}
                </span>{" "}
                không?
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Giữ lại
              </button>
              <button
                onClick={confirmCancelOrder}
                className="flex-1 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
              >
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
