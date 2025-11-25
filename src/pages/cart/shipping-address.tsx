import { shippingAddressState } from "@/state";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Icon } from "zmp-ui";
import { AddressService, Address } from "@/api/service/address.service";
import ModalCreateAddress from "@/pages/checkout/modalCreateAddress";

function ShippingAddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useAtom(shippingAddressState);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

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

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress({
      alias: address.name,
      name: address.name,
      phone: address.phone,
      address: address.full_address,
    });
    toast.success("Đã chọn địa chỉ");
    navigate(-1);
  };

  const handleDeleteAddress = async (
    addressId: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();

    try {
      // Use save-address.php with DELETE method
      const response = await AddressService.deleteAddress(
        addressId,
        undefined,
        true
      );
      if (response.success) {
        toast.success("Đã xóa địa chỉ");
        fetchAddresses(); // Reload list
      }
    } catch (error: any) {
      console.error("❌ Error deleting address:", error);
      toast.error(error?.message || "Không thể xóa địa chỉ");
    }
  };

  const handleSetDefault = async (addressId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await AddressService.setDefaultAddress(addressId);
      if (response.success) {
        toast.success("Đã đặt làm địa chỉ mặc định");
        fetchAddresses(); // Reload list
      }
    } catch (error: any) {
      console.error("❌ Error setting default address:", error);
      toast.error(error?.message || "Không thể đặt địa chỉ mặc định");
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-background pt-5">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-800"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h2 className="text-lg font-bold text-gray-800">Địa chỉ nhận hàng</h2>
          </div>
          <button
            onClick={() => {
              if (addresses.length >= 5) {
                toast.error("Bạn chỉ có thể thêm tối đa 5 địa chỉ");
                return;
              }
              setEditingAddress(null);
              setShowModal(true);
            }}
            className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white font-medium text-sm rounded-lg transition-colors"
            style={{ marginRight: 80 }}
          >
            Thêm mới
          </button>
        </div>
      </div>

      {/* Address List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600">Đang tải...</span>
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2 text-4xl">📍</div>
            <p className="text-gray-600 mb-2">Bạn chưa có địa chỉ nào</p>
            <p className="text-sm text-gray-500 mb-4">
              Thêm địa chỉ mới để nhận hàng
            </p>
            <button
              onClick={() => {
                if (addresses.length >= 5) {
                  toast.error("Bạn chỉ có thể thêm tối đa 5 địa chỉ");
                  return;
                }
                setEditingAddress(null);
                setShowModal(true);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Thêm địa chỉ mới
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                onClick={() => handleSelectAddress(address)}
                className="relative border-2 rounded-xl overflow-hidden transition-all bg-white border-gray-200 hover:border-green-400 hover:shadow-md cursor-pointer"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-semibold text-gray-800 text-base">
                          {address.email || address.name}
                        </span>
                        {address.is_default && (
                          <span className="bg-green-100 text-green-600 text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
                            Mặc định
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {address.phone}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {address.full_address}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingAddress(address);
                          setShowModal(true);
                        }}
                        className="text-blue-500 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa địa chỉ"
                      >
                        <Icon icon="zi-edit-text" size={20} />
                      </button>
                      <button
                        onClick={(e) => handleDeleteAddress(address.id, e)}
                        className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa địa chỉ"
                      >
                        <Icon icon="zi-delete" size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Address Modal */}
      <ModalCreateAddress
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingAddress(null);
        }}
        onComplete={() => {
          fetchAddresses(); // Reload addresses after creating/editing
        }}
        editingAddress={editingAddress}
        currentAddressCount={addresses.length}
      />
    </div>
  );
}

export default ShippingAddressPage;
