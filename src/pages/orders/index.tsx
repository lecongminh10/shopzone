import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderList from "./order-list";
import { ordersState } from "@/state";
import { useAtomValue } from "jotai";

export default function OrdersPage() {
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get("status") || "all";
  const [status, setStatus] = useState(initialStatus);

  // Jotai atom theo trạng thái
  const orderAtom = ordersState(status);
  const orders = useAtomValue(orderAtom);

  const statuses = [
    { key: "all", label: "Tất cả" },
    { key: "0", label: "Chờ xử lý" },
    { key: "1", label: "Đã tiếp nhận" },
    { key: "2", label: "Đang giao" },
    { key: "5", label: "Đã nhận" },
    { key: "3", label: "Đã hủy" },
  ];

  // Khi URL thay đổi status → cập nhật state
  useEffect(() => {
    const urlStatus = searchParams.get("status");
    if (urlStatus) setStatus(urlStatus);
  }, [searchParams]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex overflow-x-auto flex-nowrap border-b border-gray-200 no-scrollbar">
        {statuses.map((statusItem) => (
          <button
            key={statusItem.key}
            onClick={() => setStatus(statusItem.key)}
            className={`flex-shrink-0 w-28 flex flex-col items-center py-2 text-sm font-medium transition-colors duration-200 ${
              status === statusItem.key
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-500"
            }`}
          >
            <span>{statusItem.label}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto p-4">
        <OrderList ordersState={ordersState(status)} filterStatus={status} />
      </div>
    </div>
  );
}
