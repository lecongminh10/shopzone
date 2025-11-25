import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AddressService, Address } from "@/api/service/address.service";
import toast from "react-hot-toast";

interface ModalAddressProps {
  onClose: () => void;
  open: boolean;
  onAddAddress?: () => void;
  onSelectAddress?: (address: Address) => void;
}

export default function ModalAddress({
  onClose,
  open,
  onAddAddress,
  onSelectAddress,
}: ModalAddressProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [settingDefault, setSettingDefault] = useState<number | null>(null); // Track which address is being set as default

  useEffect(() => {
    if (open) {
      fetchAddresses();
    }
  }, [open]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await AddressService.getAddresses();
      if (response.success && response.data) {
        setAddresses(response.data);
      }
    } catch (error: any) {
      console.error("❌ Error fetching addresses:", error);
      toast.error(error?.message || "Không thể tải danh sách địa chỉ");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAddress = async (address: Address) => {
    // Nếu địa chỉ đã là mặc định, chỉ đóng modal
    if (address.is_default) {
      if (onSelectAddress) {
        onSelectAddress(address);
      }
      onClose();
      return;
    }

    try {
      setSettingDefault(address.id);

      // Gọi API để set địa chỉ này làm mặc định
      await AddressService.setDefaultAddress(address.id);

      // Refresh danh sách địa chỉ sau khi set default
      await fetchAddresses();

      // Thông báo thành công
      toast.success("Đã đặt địa chỉ làm mặc định");

      // Gọi callback nếu có
      if (onSelectAddress) {
        onSelectAddress(address);
      }

      // Đóng modal sau khi set default thành công
      onClose();
    } catch (error: any) {
      console.error("❌ Error setting default address:", error);
      toast.error(error?.message || "Không thể đặt địa chỉ làm mặc định");
    } finally {
      setSettingDefault(null);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0  backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 shadow-lg max-h-[90vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-medium text-gray-800">
                  Sổ địa chỉ của tôi
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onAddAddress}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:bg-green-600 transition-colors"
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Thêm địa chỉ</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
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
            </div>

            {/* Content */}
            <div className="px-4 py-4">
              {loading ? (
                <div className="py-12">
                  <p className="text-center text-gray-500 text-sm">
                    Đang tải...
                  </p>
                </div>
              ) : addresses.length === 0 ? (
                <div className="py-12">
                  <p className="text-center text-gray-700 text-sm">
                    Bạn chưa có địa chỉ nào!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => {
                    const isSettingDefault = settingDefault === address.id;
                    const isDisabled = isSettingDefault;

                    return (
                      <div
                        key={address.id}
                        onClick={() =>
                          !isDisabled && handleSelectAddress(address)
                        }
                        className={`bg-white border rounded-lg p-4 transition-colors ${
                          isDisabled
                            ? "border-gray-300 opacity-60 cursor-not-allowed"
                            : address.is_default
                            ? "border-green-500 cursor-pointer hover:border-green-600"
                            : "border-gray-200 cursor-pointer hover:border-green-500"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-800">
                                {address.name}
                              </span>
                              {address.is_default && (
                                <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                                  Mặc định
                                </span>
                              )}
                              {isSettingDefault && (
                                <span className="text-xs text-blue-600">
                                  Đang đặt làm mặc định...
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {address.phone}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.full_address}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
