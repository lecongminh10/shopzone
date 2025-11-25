import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  NotificationService,
  Notification,
} from "@/api/service/notification.sevice";
import {
  X,
  ArrowLeft,
  MoreVertical,
  Bell,
  ShoppingBag,
  Tag,
  AlertCircle,
  Clock,
  ShoppingCart,
} from "lucide-react";
import voucherIcon from "@/img/voucher.png";
interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
}

type TabType = "all" | "order" | "voucher";

export default function NotificationModal({
  open,
  onClose,
}: NotificationModalProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("all");

  // Fetch notifications khi modal mở
  useEffect(() => {
    if (open) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setError(null);
      setActiveTab("all");
    }
  }, [open]);

  // Fetch từ service
  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await NotificationService.getListNotification();

      if (response.success && response.data) {
        const list = Array.isArray(response.data)
          ? response.data
          : Array.isArray((response.data as any).items)
          ? (response.data as any).items
          : [];

        setNotifications(list);
        console.log("✅ Notifications fetched:", list);
      } else {
        setError(response.message || "Không thể tải danh sách thông báo");
        setNotifications([]);
      }
    } catch (err: any) {
      console.error("❌ Error fetching notifications:", err);
      setError(err?.message || "Đã xảy ra lỗi khi tải danh sách thông báo");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  // Format thời gian
  const formatDate = (timestamp?: number): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;

    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Filter notifications by tab
  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true;
    if (activeTab === "order") {
      return (
        notif.type === "order" ||
        notif.title?.toLowerCase().includes("đơn hàng")
      );
    }
    if (activeTab === "voucher") {
      return (
        notif.type === "voucher" ||
        notif.title?.toLowerCase().includes("voucher")
      );
    }
    return true;
  });

  // Count unread notifications
  const unreadCount = notifications.filter((n) => n.is_read === 0).length;
  const orderCount = notifications.filter(
    (n) => n.type === "order" || n.title?.toLowerCase().includes("đơn hàng")
  ).length;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0  backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-[2000] shadow-lg flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ maxHeight: "96vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="Quay lại"
              >
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-lg font-bold text-center absolute left-1/2 -translate-x-1/2">
                Thông báo
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-white sticky top-[57px] z-10">
              <button
                onClick={() => setActiveTab("all")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 text-sm font-medium transition-colors ${
                  activeTab === "all"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/30"
                    : "text-gray-600"
                }`}
              >
                <Bell size={18} />
                <span>Tất cả</span>
                {unreadCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("order")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 text-sm font-medium transition-colors ${
                  activeTab === "order"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/30"
                    : "text-gray-600"
                }`}
              >
                <ShoppingBag size={18} />
                <span>Đơn hàng</span>
                {orderCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                    {orderCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("voucher")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 text-sm font-medium transition-colors ${
                  activeTab === "voucher"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/30"
                    : "text-gray-600"
                }`}
              >
                <Tag size={18} />
                <span>Voucher</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <p className="text-red-500 text-center mb-4">{error}</p>
                  <button
                    onClick={fetchNotifications}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Thử lại
                  </button>
                </div>
              ) : (
                <>
                  {/* Summary Card */}
                  {unreadCount > 0 && (
                    <div className="mx-4 mt-4 p-4 bg-gray-100 rounded-lg flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bell className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Bạn có {unreadCount} thông báo mới
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Cập nhật lần cuối: Hôm nay
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Notifications List */}
                  {filteredNotifications.length === 0 ? (
                    <div className="flex items-center justify-center py-12 text-gray-500">
                      Không có thông báo nào
                    </div>
                  ) : (
                    <div className="px-4 py-2">
                      {filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="relative mb-3 bg-white border-l-4 border-red-500 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="p-4">
                            {/* Title with alert icon */}
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-gray-900 flex-1 pr-2">
                                {notification.title}
                              </h3>
                              {notification.is_read === 0 && (
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                    <AlertCircle
                                      className="text-white"
                                      size={12}
                                    />
                                  </div>
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                              )}
                            </div>

                            {/* Image and Content */}
                            <div className="flex gap-3 mb-2">
                              {notification.product_image && (
                                <div className="flex-shrink-0">
                                  <img
                                    src={notification.product_image}
                                    alt={notification.title}
                                    className="w-16 h-16 rounded-lg object-cover"
                                    onError={(e) =>
                                      ((
                                        e.target as HTMLImageElement
                                      ).style.display = "none")
                                    }
                                  />
                                </div>
                              )}
                              <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                                    <img
                                      src={
                                        notification.data?.product_image
                                          ? `https://socdo.vn${notification.data.product_image}` // ảnh sản phẩm
                                          : voucherIcon // ảnh mặc định (voucher)
                                      }
                                      alt={notification.title}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (
                                          e.target as HTMLImageElement
                                        ).style.display = "none";
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                                  {notification.content}
                                </p>
                              </div>
                            </div>
                            {notification.type === "order" && (
                              <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                                <ShoppingCart size={16} />
                                <span className="line-clamp-1">
                                  {notification.content
                                    .split("Đơn hàng")[1]
                                    ?.split("với")[0] ||
                                    notification.title ||
                                    "Chi tiết đơn hàng"}
                                </span>
                              </div>
                            )}

                            {/* Timestamp */}
                            {notification.created_at && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock size={14} />
                                <span>
                                  {formatDate(notification.created_at)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
