import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  X,
  ExternalLink,
  List,
  Clock,
  Check,
  Truck,
  PackageCheck,
  XCircle,
} from "lucide-react";
import OrderList from "@/pages/orders/order-list";
import { ordersState } from "@/state";
import { Order } from "@/types";

interface OrdersModalProps {
  open: boolean;
  onClose: () => void;
  order?: Order;
}

export default function OrdersModal({
  open,
  onClose,
  order,
}: OrdersModalProps) {
  const [status, setStatus] = useState("all");

  const statuses = [
    { key: "all", label: "Tất cả", icon: List },
    { key: "0", label: "Chờ xử lý", icon: Clock },
    { key: "1", label: "Đã tiếp nhận", icon: Check },
    { key: "2", label: "Đang giao", icon: Truck },
    { key: "5", label: "Đã nhận", icon: PackageCheck },
    { key: "3", label: "Đã hủy", icon: XCircle },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay nền tối */}
          <motion.div
            className="fixed inset-0  backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal chính */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 z-[2000] shadow-lg flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="relative flex items-center mb-4">
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                <h2 className="text-lg font-semibold text-center">
                  Lịch sử đơn hàng
                </h2>
              </div>
              <button
                onClick={onClose}
                className="ml-auto text-gray-500 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>
            <div className="relative border-b pb-2">
              <div
                className="flex gap-5 overflow-x-auto px-2 scrollbar-hide snap-x snap-mandatory"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {statuses.map((s) => {
                  const IconComponent = s.icon;
                  return (
                    <div
                      key={s.key}
                      onClick={() => {
                        setStatus(s.key);
                      }}
                      className={`cursor-pointer text-sm pb-2 snap-start transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        status === s.key
                          ? "text-primary border-b-2 border-primary font-semibold"
                          : "text-gray-500 hover:text-primary"
                      }`}
                    >
                      <IconComponent size={16} />
                      {s.label}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto mt-3 max-h-[60vh]">
              <OrderList
                ordersState={ordersState(status === "all" ? "all" : status)}
                filterStatus={status} // dùng để lọc client nếu cần
                onBeforeNavigate={onClose} // Đóng modal trước khi navigate
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
