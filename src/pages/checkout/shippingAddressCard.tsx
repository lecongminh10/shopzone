import React, { useState, useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import ModalAddress from "./modalAddress";
import ModalCreateAddress from "./modalCreateAddress";
import { AddressService, Address } from "@/api/service/address.service";
import { defaultAddressIdState } from "@/state";

export default function ShippingAddressCard() {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const errorLoggedRef = useRef(false); // Để chỉ log lỗi một lần
  const setDefaultAddressId = useSetAtom(defaultAddressIdState); // Update global state để trigger tính lại phí ship

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await AddressService.getAddresses();
      if (response.success && response.data) {
        setAddresses(response.data);
        // Tìm địa chỉ mặc định
        const defaultAddr = response.data.find(addr => addr.is_default) || response.data[0] || null;
        
        // Debug: Kiểm tra data từ API
        if (defaultAddr) {
          console.log('📍 Default Address Data:', {
            id: defaultAddr.id,
            name: defaultAddr.name,
            phone: defaultAddr.phone,
            full_address: defaultAddr.full_address,
            is_default: defaultAddr.is_default
          });
        }
        
        setDefaultAddress(defaultAddr);
        // Update global state để trigger tính lại phí ship
        if (defaultAddr) {
          setDefaultAddressId(defaultAddr.id);
        } else {
          setDefaultAddressId(null);
        }
        // Reset error flag khi thành công
        errorLoggedRef.current = false;
        localStorage.removeItem('address_error_logged');
      }
    } catch (error: any) {
      // Chỉ log lỗi một lần cho toàn bộ session (dùng localStorage)
      const wasLogged = localStorage.getItem('address_error_logged');
      if (!wasLogged && !errorLoggedRef.current) {
        console.warn('⚠️ Không thể lấy danh sách địa chỉ. API sẽ tự động lấy địa chỉ mặc định từ DB.');
        errorLoggedRef.current = true;
        localStorage.setItem('address_error_logged', 'true');
      }
      // Không block UI - tiếp tục hiển thị UI bình thường
      setAddresses([]);
      setDefaultAddress(null);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setOpenAddressModal(false);
    // Refresh danh sách địa chỉ sau khi đóng modal
    fetchAddresses();
  };

  const handleSelectAddress = (address: Address) => {
    // Cập nhật địa chỉ được chọn làm mặc định
    setDefaultAddress(address);
    // Update global state để trigger tính lại phí ship
    setDefaultAddressId(address.id);
  };

  const handleCreateComplete = () => {
    setOpenCreateModal(false);
    // Refresh danh sách địa chỉ sau khi tạo mới
    fetchAddresses();
  };

  return (
    <>
      <div className="bg-white rounded-lg px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-sm font-semibold text-green-600">
              {defaultAddress ? "Địa chỉ nhận hàng" : "Thêm địa chỉ"}
            </h3>
          </div>
          <button onClick={() => setOpenAddressModal(true)}>
            <p className="text-blue-600 font-semibold-500">Thay đổi</p>
          </button>
        </div>
        <div className="space-y-1">
          {loading ? (
            <p className="text-sm text-gray-500">Đang tải...</p>
          ) : defaultAddress ? (
            <>
              <p className="text-sm font-medium text-gray-800">
                {defaultAddress.name || 'Chưa có tên'}
              </p>
              <p className="text-sm text-gray-600">
                {defaultAddress.phone || 'Chưa có số điện thoại'}
              </p>
              <p className="text-sm text-gray-600">
                {defaultAddress.full_address || 'Chưa có địa chỉ'}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500">Chưa có địa chỉ mặc định</p>
              <p className="text-sm text-gray-500">
                Vui lòng thêm địa chỉ nhận hàng để thanh toán
              </p>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <ModalAddress
        open={openAddressModal}
        onClose={handleModalClose}
        onAddAddress={() => setOpenCreateModal(true)}
        onSelectAddress={handleSelectAddress}
      />
      <ModalCreateAddress
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onComplete={handleCreateComplete}
        currentAddressCount={addresses.length}
      />
    </>
  );
}
