import React, { useState, useEffect } from "react";
import { VoucherService, Voucher } from "@/api/service/voucher.service";

interface ModalVoucherProps {
  open: boolean;
  onClose: () => void;
  onSelect: (voucher: Voucher) => void;
  selectedVoucherId?: number;
  orderAmount: number; // Tổng tiền đơn hàng để check điều kiện voucher
  shopId?: number; // Shop ID để lấy voucher của shop đó
}

export default function ModalVoucher({
  open,
  onClose,
  onSelect,
  selectedVoucherId,
  orderAmount,
  shopId,
}: ModalVoucherProps) {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchVouchers();
    }
  }, [open, shopId]);

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await VoucherService.getVouchers({
        shopId: shopId,
        limit: 100,
      });

      if (response.success && response.data) {
        // Hiển thị TẤT CẢ voucher, không filter
        // Voucher không đủ điều kiện sẽ được disable (không cho chọn)
        setVouchers(response.data);
      } else {
        setError(response.message || "Không thể tải danh sách voucher");
      }
    } catch (err: any) {
      console.error("❌ Error fetching vouchers:", err);
      setError(err.message || "Lỗi khi tải danh sách voucher");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVoucher = (voucher: Voucher) => {
    onSelect(voucher);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl shadow-xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Chọn Voucher</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto px-4 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="ml-3 text-gray-600">Đang tải...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-500 mb-2">⚠️</div>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={fetchVouchers}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
          ) : vouchers.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2 text-4xl">🎫</div>
              <p className="text-gray-600 mb-2">Không có voucher nào</p>
              <p className="text-sm text-gray-500">
                Hiện tại không có voucher nào khả dụng cho đơn hàng của bạn
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {vouchers.map((voucher) => {
                const discount = VoucherService.calculateDiscount(
                  voucher,
                  orderAmount
                );
                const isSelected = selectedVoucherId === voucher.id;
                
                // Check điều kiện tối thiểu: ưu tiên min_price, nếu không có thì dùng condition_amount
                let meetsMinAmount = false;
                if (voucher.min_price && voucher.min_price > 0) {
                  meetsMinAmount = orderAmount >= voucher.min_price;
                } else {
                  meetsMinAmount = orderAmount >= voucher.condition_amount;
                }
                
                // Check voucher đã hết lượt sử dụng toàn cục
                const isOutOfUses = voucher.max_global_uses && voucher.max_global_uses > 0 
                  && voucher.current_uses !== undefined 
                  && voucher.current_uses >= voucher.max_global_uses;
                
                // Voucher chỉ có thể sử dụng nếu đủ điều kiện tối thiểu VÀ chưa hết lượt
                const canUse = meetsMinAmount && !isOutOfUses;
                
                // Xác định lý do không thể sử dụng để hiển thị thông báo phù hợp
                let disableReason = '';
                if (!meetsMinAmount) {
                  const minAmount = (voucher.min_price && voucher.min_price > 0) 
                    ? voucher.min_price 
                    : voucher.condition_amount;
                  disableReason = `Cần đơn từ ${minAmount.toLocaleString("vi-VN")}₫`;
                } else if (isOutOfUses) {
                  disableReason = 'Voucher đã hết lượt sử dụng';
                }

                return (
                  <div
                    key={voucher.id}
                    className={`relative border-2 rounded-xl overflow-hidden transition-all ${
                      isSelected
                        ? "border-green-500 bg-green-50"
                        : canUse
                        ? "border-gray-200 bg-white hover:border-green-400 hover:shadow-md"
                        : "border-gray-200 bg-gray-50 opacity-60"
                    }`}
                  >
                    {/* Voucher Card */}
                    <div className="flex">
                      {/* Left: Discount Info */}
                      <div
                        className={`flex-shrink-0 w-24 flex flex-col items-center justify-center p-3 ${
                          isSelected ? "bg-green-500" : "bg-gradient-to-br from-green-400 to-green-600"
                        } text-white`}
                      >
                        <div className="text-xs font-medium mb-1">GIẢM</div>
                        {voucher.type === "tru" ? (
                          <div className="text-lg font-bold">
                            {voucher.discount.toLocaleString("vi-VN")}₫
                          </div>
                        ) : (
                          <div className="text-lg font-bold">{voucher.discount}%</div>
                        )}
                      </div>

                      {/* Right: Voucher Details */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 mb-1">
                              {voucher.code}
                            </h3>
                            {voucher.description && (
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {voucher.description}
                              </p>
                            )}
                          </div>
                          {isSelected && (
                            <div className="ml-2 flex-shrink-0">
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Voucher Info */}
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center text-xs text-gray-500">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              {voucher.min_price && voucher.min_price > 0 ? (
                                <>Áp dụng đơn từ {voucher.min_price.toLocaleString("vi-VN")}₫</>
                              ) : (
                                <>Áp dụng đơn từ {voucher.condition_amount.toLocaleString("vi-VN")}₫</>
                              )}
                            </span>
                          </div>
                          {voucher.expired_readable && (
                            <div className="flex items-center text-xs text-gray-500">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>HSD: {voucher.expired_readable}</span>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        {canUse ? (
                          <button
                            onClick={() => handleSelectVoucher(voucher)}
                            className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                              isSelected
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                          >
                            {isSelected ? "Đã chọn" : "Áp dụng"}
                          </button>
                        ) : (
                          <div className="w-full py-2 px-4 rounded-lg bg-gray-200 text-gray-500 text-sm text-center font-medium cursor-not-allowed">
                            {disableReason}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Dotted Edge Effect */}
                    <div className="absolute left-24 top-0 bottom-0 w-1 flex flex-col justify-between py-1">
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

