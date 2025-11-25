// VoucherCard.tsx
import React, { useState } from "react";
import ModalVoucher from "./modalVoucher";
import { Voucher, VoucherService } from "@/api/service/voucher.service";

interface VoucherCardProps {
  title?: string;
  value?: number;
  orderAmount: number; // Tổng tiền đơn hàng
  onSelect?: (voucher: Voucher | null, discount: number) => void;
  selectedVoucher?: Voucher | null;
  shopId?: number; // Shop ID để lấy voucher của shop đó
}

export default function VoucherCard({
  title = "Voucher Shop",
  value = 0,
  orderAmount,
  onSelect,
  selectedVoucher,
  shopId,
}: VoucherCardProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleSelectVoucher = (voucher: Voucher) => {
    // Sử dụng VoucherService để tính discount chính xác
    const calculatedDiscount = VoucherService.calculateDiscount(voucher, orderAmount);
    onSelect?.(voucher, calculatedDiscount);
    setOpenModal(false);
  };

  const handleRemoveVoucher = () => {
    onSelect?.(null, 0);
  };

  return (
    <>
      <div className="bg-white rounded-lg px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                clipRule="evenodd"
              />
            </svg>
            {selectedVoucher ? (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-800 truncate">
                  {selectedVoucher.code}
                </span>
                <span className="text-sm text-red-600 font-medium flex-shrink-0">
                  -{value.toLocaleString('vi-VN')}₫
                </span>
              </div>
            ) : (
              <>
                <span className="text-sm">{title}</span>
                <span className="text-sm text-gray-500">
                  {value > 0 ? `${value.toLocaleString('vi-VN')}₫` : 'Chưa chọn'}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {selectedVoucher && (
              <button
                onClick={handleRemoveVoucher}
                className="text-gray-400 hover:text-red-600 text-sm transition-colors"
                title="Bỏ chọn voucher"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            <button
              className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
              onClick={() => setOpenModal(true)}
            >
              {selectedVoucher ? 'Đổi voucher' : 'Chọn Voucher'}
            </button>
          </div>
        </div>
      </div>

      <ModalVoucher
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSelect={handleSelectVoucher}
        selectedVoucherId={selectedVoucher?.id}
        orderAmount={orderAmount}
        shopId={shopId}
      />
    </>
  );
}
