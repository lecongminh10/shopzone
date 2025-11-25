import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  AddressService,
  LocationService,
  Location,
  Address,
} from "@/api/service/address.service";

// Click outside handler hook
function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

interface ModalCreateAddressProps {
  onClose: () => void;
  open: boolean;
  onSubmit?: () => void;
  onComplete?: () => void;
  editingAddress?: Address | null;
  currentAddressCount?: number;
}

export default function ModalCreateAddress({
  onClose,
  open,
  onSubmit,
  onComplete,
  editingAddress,
  currentAddressCount = 0,
}: ModalCreateAddressProps) {
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    email: "",
  });

  // Location data
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);

  // Selected IDs
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(
    null
  );
  const [selectedWardId, setSelectedWardId] = useState<number | null>(null);

  // Location selector state
  const [showLocationPanel, setShowLocationPanel] = useState(false);
  const [activeLocationTab, setActiveLocationTab] = useState<
    "province" | "district" | "ward"
  >("province");
  const [locationSearch, setLocationSearch] = useState("");

  // Ref for click outside detection
  const locationPanelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useClickOutside(locationPanelRef, () => {
    if (showLocationPanel) {
      setShowLocationPanel(false);
    }
  });

  // Load provinces when modal opens or editingAddress changes
  useEffect(() => {
    if (open) {
      loadProvinces();

      // If editing, load address data
      if (editingAddress) {
        // Set form data from editing address
        setFormData({
          name: editingAddress.name || "",
          phone: editingAddress.phone || "",
          province: editingAddress.province || "",
          district: editingAddress.district || "",
          ward: editingAddress.ward || "",
          address: editingAddress.address || "",
          email: editingAddress.email || "",
        });
        setIsDefault(editingAddress.is_default || false);

        // Need to find IDs from location names
        // This will be done after provinces load
      }
    } else {
      // Reset form when modal closes
      setFormData({
        name: "",
        phone: "",
        province: "",
        district: "",
        ward: "",
        address: "",
        email: "",
      });
      setIsDefault(false);
      setSelectedProvinceId(null);
      setSelectedDistrictId(null);
      setSelectedWardId(null);
      setDistricts([]);
      setWards([]);
      setShowLocationPanel(false);
      setActiveLocationTab("province");
      setLocationSearch("");
    }
  }, [open, editingAddress]);

  // Load districts and wards when provinces are loaded and editing
  useEffect(() => {
    if (open && editingAddress && provinces.length > 0 && !selectedProvinceId) {
      // Find province ID from name
      const province = provinces.find(
        (p) => (p.name || p.tieu_de) === editingAddress?.province
      );
      if (province) {
        setSelectedProvinceId(province.id);
      }
    }
  }, [provinces, open, editingAddress, selectedProvinceId]);

  // Load wards when districts are loaded and editing
  useEffect(() => {
    if (
      open &&
      editingAddress &&
      districts.length > 0 &&
      selectedProvinceId &&
      !selectedDistrictId
    ) {
      // Find district ID from name
      const district = districts.find(
        (d) => (d.name || d.tieu_de) === editingAddress?.district
      );
      if (district) {
        setSelectedDistrictId(district.id);
      }
    }
  }, [districts, open, editingAddress, selectedProvinceId, selectedDistrictId]);

  // Load ward ID when wards are loaded and editing
  useEffect(() => {
    if (
      open &&
      editingAddress &&
      wards.length > 0 &&
      selectedDistrictId &&
      !selectedWardId
    ) {
      // Find ward ID from name
      const ward = wards.find(
        (w) => (w.name || w.tieu_de) === editingAddress?.ward
      );
      if (ward) {
        setSelectedWardId(ward.id);
      }
    }
  }, [wards, open, editingAddress, selectedDistrictId, selectedWardId]);

  // Load districts when province is selected (only if not editing or province changed)
  useEffect(() => {
    if (selectedProvinceId && !editingAddress) {
      loadDistricts(selectedProvinceId);
      setFormData((prev) => ({ ...prev, district: "", ward: "" }));
      setSelectedDistrictId(null);
      setSelectedWardId(null);
      setWards([]);
    } else if (selectedProvinceId && editingAddress && districts.length === 0) {
      // If editing and districts not loaded yet, load them
      loadDistricts(selectedProvinceId);
    }
  }, [selectedProvinceId, editingAddress]);

  // Also load districts when editing and province ID is set
  useEffect(() => {
    if (
      open &&
      editingAddress &&
      selectedProvinceId &&
      districts.length === 0
    ) {
      loadDistricts(selectedProvinceId);
    }
  }, [open, editingAddress, selectedProvinceId]);

  // Load wards when district is selected (only if not editing or district changed)
  useEffect(() => {
    if (selectedDistrictId && selectedProvinceId && !editingAddress) {
      loadWards(selectedDistrictId, selectedProvinceId);
      setFormData((prev) => ({ ...prev, ward: "" }));
      setSelectedWardId(null);
    } else if (
      selectedDistrictId &&
      selectedProvinceId &&
      editingAddress &&
      wards.length === 0
    ) {
      // If editing and wards not loaded yet, load them
      loadWards(selectedDistrictId, selectedProvinceId);
    }
  }, [selectedDistrictId, selectedProvinceId, editingAddress]);

  // Also load wards when editing and district ID is set
  useEffect(() => {
    if (
      open &&
      editingAddress &&
      selectedDistrictId &&
      selectedProvinceId &&
      wards.length === 0
    ) {
      loadWards(selectedDistrictId, selectedProvinceId);
    }
  }, [open, editingAddress, selectedDistrictId, selectedProvinceId]);

  const loadProvinces = async () => {
    try {
      setLoading(true);
      const response = await LocationService.getLocations({ type: "province" });
      if (response.success && response.data && response.data.items) {
        setProvinces(response.data.items);
      }
    } catch (error: any) {
      console.error("Error loading provinces:", error);
      toast.error("Không thể tải danh sách tỉnh/thành phố");
    } finally {
      setLoading(false);
    }
  };

  const loadDistricts = async (provinceId: number) => {
    try {
      setLoading(true);
      const response = await LocationService.getLocations({
        type: "district",
        tinh: provinceId,
      });
      if (response.success && response.data && response.data.items) {
        setDistricts(response.data.items);
      }
    } catch (error: any) {
      console.error("Error loading districts:", error);
      toast.error("Không thể tải danh sách quận/huyện");
    } finally {
      setLoading(false);
    }
  };

  const loadWards = async (districtId: number, provinceId: number) => {
    try {
      setLoading(true);
      const response = await LocationService.getLocations({
        type: "ward",
        huyen: districtId,
        tinh: provinceId,
      });
      if (response.success && response.data && response.data.items) {
        setWards(response.data.items);
      }
    } catch (error: any) {
      console.error("Error loading wards:", error);
      toast.error("Không thể tải danh sách xã/phường");
    } finally {
      setLoading(false);
    }
  };

  const handleProvinceSelect = (province: Location) => {
    setSelectedProvinceId(province.id);
    setFormData((prev) => ({
      ...prev,
      province: province.name || province.tieu_de || "",
    }));
    setActiveLocationTab("district");
    loadDistricts(province.id);
  };

  const handleDistrictSelect = (district: Location) => {
    setSelectedDistrictId(district.id);
    setFormData((prev) => ({
      ...prev,
      district: district.name || district.tieu_de || "",
    }));
    setActiveLocationTab("ward");
    if (selectedProvinceId) {
      loadWards(district.id, selectedProvinceId);
    }
  };

  const handleWardSelect = (ward: Location) => {
    setSelectedWardId(ward.id);
    setFormData((prev) => ({ ...prev, ward: ward.name || ward.tieu_de || "" }));
    setShowLocationPanel(false);
  };

  // Get display text for location input
  const getLocationDisplayText = () => {
    const parts: string[] = [];
    if (formData.province) parts.push(formData.province);
    if (formData.district) parts.push(formData.district);
    if (formData.ward) parts.push(formData.ward);
    return parts.length > 0
      ? parts.join(", ")
      : "Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã";
  };

  // Filter locations based on search
  const getFilteredLocations = () => {
    let locations: Location[] = [];
    if (activeLocationTab === "province") {
      locations = provinces;
    } else if (activeLocationTab === "district") {
      locations = districts;
    } else {
      locations = wards;
    }

    if (locationSearch.trim()) {
      const search = locationSearch.toLowerCase();
      return locations.filter((loc) =>
        (loc.name || loc.tieu_de || "").toLowerCase().includes(search)
      );
    }
    return locations;
  };

  const handleComplete = async () => {
    // Validate required fields
    if (
      !formData.name ||
      !formData.phone ||
      !formData.province ||
      !formData.district ||
      !formData.ward ||
      !formData.address
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    // Check max addresses limit (only when creating new, not editing)
    if (!editingAddress && currentAddressCount >= 5) {
      toast.error("Bạn chỉ có thể thêm tối đa 5 địa chỉ");
      return;
    }

    try {
      setSubmitting(true);
      const response = await AddressService.saveAddress({
        id: editingAddress?.id,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        email: formData.email,
        province: formData.province,
        district: formData.district,
        ward: formData.ward,
        is_default: isDefault ? 1 : 0,
      });

      if (response.success) {
        toast.success(
          editingAddress
            ? "Cập nhật địa chỉ thành công"
            : "Thêm địa chỉ thành công"
        );
        onSubmit?.();
        onComplete?.();
        onClose();
      } else {
        toast.error(
          response.message ||
            (editingAddress
              ? "Không thể cập nhật địa chỉ"
              : "Không thể thêm địa chỉ")
        );
      }
    } catch (error: any) {
      console.error("Error saving address:", error);
      toast.error(
        error?.message ||
          (editingAddress
            ? "Không thể cập nhật địa chỉ"
            : "Không thể thêm địa chỉ")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0  backdrop-blur-sm z-[1050]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 bg-white z-[1100] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="px-4 py-3 border-b border-gray-200 sticky bg-white z-10"
              style={{ top: "20px" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-800 transition-colors p-1 rounded-full"
                    disabled={submitting}
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
                  <h2 className="text-base font-medium text-gray-800">
                    {editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ"}
                  </h2>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="px-4 py-4 space-y-4" style={{ marginTop: "80px" }}>
              {/* Full Name and Phone in a row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Họ và tên
                    <span className="text-red-600 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập họ và tên"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Điện thoại
                    <span className="text-red-600 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Combined Location Selector */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Địa chỉ
                  <span className="text-red-600 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={getLocationDisplayText()}
                    onClick={() => setShowLocationPanel(!showLocationPanel)}
                    className="w-full px-3 py-2 pr-24 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer text-gray-900"
                    placeholder="Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã"
                    style={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        showLocationPanel ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Location Selection Panel */}
                {showLocationPanel && (
                  <div
                    ref={locationPanelRef}
                    className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
                  >
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLocationTab("province");
                          setLocationSearch("");
                        }}
                        className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                          activeLocationTab === "province"
                            ? "border-orange-500 text-orange-600 font-bold"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        Tỉnh/Thành phố
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedProvinceId) {
                            setActiveLocationTab("district");
                            setLocationSearch("");
                          }
                        }}
                        disabled={!selectedProvinceId}
                        className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                          activeLocationTab === "district"
                            ? "border-orange-500 text-orange-600 font-bold"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                        } ${
                          !selectedProvinceId
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        Quận/Huyện
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedDistrictId) {
                            setActiveLocationTab("ward");
                            setLocationSearch("");
                          }
                        }}
                        disabled={!selectedDistrictId}
                        className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                          activeLocationTab === "ward"
                            ? "border-orange-500 text-orange-600 font-bold"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                        } ${
                          !selectedDistrictId
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        Phường/Xã
                      </button>
                    </div>

                    {/* Search Input */}
                    <div className="p-3 border-b border-gray-200">
                      <input
                        type="text"
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        placeholder="Tìm kiếm..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Location List */}
                    <div className="max-h-64 overflow-y-auto">
                      {loading ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          Đang tải...
                        </div>
                      ) : getFilteredLocations().length === 0 ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          {locationSearch
                            ? "Không tìm thấy kết quả"
                            : "Không có dữ liệu"}
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-100">
                          {getFilteredLocations().map((location) => (
                            <button
                              key={location.id}
                              type="button"
                              onClick={() => {
                                if (activeLocationTab === "province") {
                                  handleProvinceSelect(location);
                                } else if (activeLocationTab === "district") {
                                  handleDistrictSelect(location);
                                } else {
                                  handleWardSelect(location);
                                }
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm text-gray-700"
                            >
                              {location.name || location.tieu_de}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Detailed Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Địa chỉ chi tiết
                  <span className="text-red-600 ml-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường, tòa nhà..."
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Nhập email (không bắt buộc)"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Set as Default Address */}
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  disabled={submitting}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <label
                  htmlFor="isDefault"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Đặt làm địa chỉ mặc định
                </label>
              </div>
            </div>

            {/* Complete Button */}
            <div className="px-4 py-4 pb-6 border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                onClick={handleComplete}
                disabled={submitting || loading}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg text-sm uppercase hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Đang xử lý..." : "HOÀN THÀNH"}
              </button>
              {currentAddressCount >= 5 && !editingAddress && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  Bạn đã đạt giới hạn tối đa 5 địa chỉ
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
