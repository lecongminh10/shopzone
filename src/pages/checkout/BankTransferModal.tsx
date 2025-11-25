import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { formatPrice } from "@/utils/format";

interface BankTransferInfo {
  orderCode?: string;
  orderId?: number;
  amount?: number;
  accountNumber?: number;
  bankName?: string;
  bankFullName?: string;
  recipient?: string;
  qrCode?: string;
}

interface BankTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  bankTransferInfo: BankTransferInfo | null;
}

export default function BankTransferModal({
  isOpen,
  onClose,
  bankTransferInfo,
}: BankTransferModalProps) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15 * 60); // 15 phút

  // Countdown timer cho modal thanh toán
  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
    return undefined;
  }, [isOpen, countdown]);

  // Reset countdown khi modal mở
  useEffect(() => {
    if (isOpen) {
      setCountdown(15 * 60);
    }
  }, [isOpen]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} phút ${secs} giây`;
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Đã sao chép ${label}`);
  };

  const handleConfirmTransfer = () => {
    toast.success("Cảm ơn bạn đã xác nhận chuyển khoản!");
    onClose();
    setTimeout(() => {
      if (bankTransferInfo?.orderId) {
        navigate(`/order/${bankTransferInfo.orderId}`);
      } else {
        navigate("/orders/pending");
      }
    }, 1000);
  };

  const handleOpenBankingApp = () => {
    toast("Đang mở ứng dụng ngân hàng...", { icon: "ℹ️" });
  };

  if (!isOpen || !bankTransferInfo) {
    return null;
  }

  return (
    <div className="fixed inset-0  bg-opacity-50 z-50 flex items-end justify-center pb-0">
      <div className="bg-white rounded-t-xl w-full max-h-[70vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between rounded-t-xl">
          <h3 className="text-sm font-semibold text-gray-900">
            Thanh toán bằng chuyển khoản
          </h3>
          <button
            onClick={() => {
              onClose();
              if (bankTransferInfo?.orderId) {
                navigate(`/order/${bankTransferInfo.orderId}`);
              } else {
                navigate("/orders/pending");
              }
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg
              className="w-4 h-4"
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

        {/* Countdown Banner */}
        <div className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 flex items-center justify-between">
          <span className="text-white text-xs font-medium">
            Thanh toán trong vòng
          </span>
          <span className="text-white text-xs font-bold">
            {formatCountdown(countdown)}
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* QR Code Section */}
          <div className="px-4 py-3 pb-4">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              {/* QR Code Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-red-600 font-bold text-xs">VIETQR™</span>
                <div className="text-right">
                  <div className="text-xs text-gray-600 leading-tight">
                    {bankTransferInfo.bankFullName}
                  </div>
                </div>
              </div>

              {/* QR Code Image */}
              <div className="flex justify-center my-3">
                {bankTransferInfo.qrCode ? (
                  <img
                    src={bankTransferInfo.qrCode}
                    alt="QR Code"
                    className="w-40 h-40 rounded-lg"
                  />
                ) : (
                  <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-400 text-xs">QR Code</span>
                  </div>
                )}
              </div>

              {/* Napas Logo and Info */}
              <div className="flex flex-col items-center gap-1 mt-2">
                <div className="text-blue-600 font-semibold text-xs">
                  napas 247
                </div>
                {bankTransferInfo.accountNumber && (
                  <div className="text-xs text-gray-500">
                    {bankTransferInfo.accountNumber}
                  </div>
                )}
                {bankTransferInfo.amount && (
                  <div className="text-xs text-gray-500">
                    Số tiền: {formatPrice(bankTransferInfo.amount)}
                  </div>
                )}
              </div>
            </div>

            {/* Bank Info */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 font-medium">
                  Ngân hàng thụ hưởng
                </span>
                <span className="text-xs font-semibold text-gray-900">
                  {bankTransferInfo.bankName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 font-medium flex items-center gap-1">
                  Số tài khoản
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-gray-900">
                    {bankTransferInfo.accountNumber}
                  </span>
                  <button
                    onClick={() =>
                      handleCopyToClipboard(
                        String(bankTransferInfo.accountNumber || ""),
                        "số tài khoản"
                      )
                    }
                    className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded hover:bg-blue-200 transition-colors"
                  >
                    Sao chép
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 font-medium flex items-center gap-1">
                  Số tiền
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-gray-900">
                    {formatPrice(bankTransferInfo.amount || 0)}
                  </span>
                  <button
                    onClick={() =>
                      handleCopyToClipboard(
                        String(bankTransferInfo.amount || 0),
                        "số tiền"
                      )
                    }
                    className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded hover:bg-blue-200 transition-colors"
                  >
                    Sao chép
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-600 font-medium">
                  Người nhận
                </span>
                <span className="text-xs font-semibold text-gray-900 text-right max-w-[60%]">
                  {bankTransferInfo.recipient}
                </span>
              </div>
            </div>

            {/* Important Notice */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed flex-1">
                  Vui lòng chuyển ĐÚNG: số tài khoản - số tiền và chuyển nhanh
                  Napas 24/7 để đơn hàng được ghi nhận thành công.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 bg-white px-3 py-2.5 pt-3 border-t border-gray-200 flex gap-2 rounded-b-xl">
          <button
            onClick={handleOpenBankingApp}
            className="flex-1 py-2 border border-blue-500 text-blue-600 text-xs font-medium rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors"
          >
            Mở ứng dụng ngân hàng
          </button>
          <button
            onClick={handleConfirmTransfer}
            className="flex-1 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            Tôi đã chuyển khoản
          </button>
        </div>
      </div>
    </div>
  );
}
