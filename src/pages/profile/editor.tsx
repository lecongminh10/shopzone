import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/simple-auth-provider";
import { AuthService } from "@/api/service/auth.service";
import { UserInfo } from "@/api/types";
import { Button, Input } from "zmp-ui";
import toast from "react-hot-toast";

function ProfileEditorPage() {
  const navigate = useNavigate();
  const { user, token, refreshUser, isLoading: authLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<UserInfo | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Initialize with user data from context (already loaded by AuthProvider)
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }

    if (!token) {
      toast.error("Vui lòng đăng nhập để xem thông tin");
      navigate(-1);
      return;
    }

    // Use user from context if available
    if (user) {
      setProfileData(user);
      return;
    }

    // If we have token but no user in context, try to get from localStorage or fetch
    if (token && !user) {
      // First try to get from localStorage
      const storedUser = AuthService.getStoredUser();
      if (storedUser) {
        setProfileData(storedUser);
        return;
      }

      // If still no user, try to fetch from API
      setIsLoadingProfile(true);
      AuthService.getUserProfile(token)
        .then((response) => {
          if (response.success && response.data) {
            setProfileData(response.data);
            AuthService.storeAuthData(response.data, token);
          }
          setIsLoadingProfile(false);
        })
        .catch((error: any) => {
          // Handle network errors gracefully - don't show error if it's a network issue
          const errorMessage = error?.message?.toLowerCase() || '';
          if (!errorMessage.includes('network error') && 
              !errorMessage.includes('không thể kết nối') &&
              !errorMessage.includes('failed to fetch')) {
            console.error("❌ [PROFILE_EDITOR] Error loading user profile:", error);
            toast.error("Không thể tải thông tin người dùng");
          }
          setIsLoadingProfile(false);
        });
    }
  }, [user, token, navigate, authLoading]); // Update when user, token, or authLoading changes

  // Parse date from timestamp or date string to day, month, year
  const parseDate = (date?: number | string): { day: number; month: number; year: number } => {
    if (!date) return { day: 0, month: 0, year: 0 };
    
    let d: Date;
    if (typeof date === "number") {
      d = new Date(date * 1000);
    } else if (typeof date === "string" && date.includes("/")) {
      // Parse DD/MM/YYYY
      const parts = date.split("/");
      if (parts.length === 3) {
        d = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
      } else {
        d = new Date(date);
      }
    } else {
      d = new Date(date);
    }
    
    if (isNaN(d.getTime())) {
      return { day: 0, month: 0, year: 0 };
    }
    
    return {
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
    };
  };

  // Format date from day, month, year to DD/MM/YYYY
  const formatDateToString = (day: number, month: number, year: number): string => {
    if (!day || !month || !year) return "";
    return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
  };

  // Initialize date state
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  
  // Initialize address state (controlled component)
  const [addressValue, setAddressValue] = useState("");

  // Update date state and address when user data changes
  useEffect(() => {
    const currentUser = profileData || user;
    if (currentUser) {
      // Try birthday first, then created_at as fallback
      const birthday = (currentUser as any)?.birthday || (currentUser as any)?.ngaysinh;
      const parsedDate = parseDate(birthday || (currentUser as any)?.created_at || currentUser?.created);
      if (parsedDate.day && parsedDate.month && parsedDate.year) {
        setSelectedDay(parsedDate.day);
        setSelectedMonth(parsedDate.month);
        setSelectedYear(parsedDate.year);
      }
      
      // Update address value from user data
      const address = (currentUser as any)?.address || (currentUser as any)?.dia_chi;
      if (address && typeof address === 'string' && address.trim()) {
        setAddressValue(address.trim());
      } else {
        setAddressValue("");
      }
    }
  }, [profileData, user]);

  // Get valid days for selected month and year
  const getValidDays = (month: number, year: number): number[] => {
    if (!month || !year) return Array.from({ length: 31 }, (_, i) => i + 1);
    
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  // Validate and adjust day when month/year changes
  useEffect(() => {
    if (selectedMonth && selectedYear && selectedDay) {
      const maxDay = new Date(selectedYear, selectedMonth, 0).getDate();
      if (selectedDay > maxDay) {
        setSelectedDay(maxDay);
      }
    }
  }, [selectedMonth, selectedYear]);

  // Format gender
  const formatGender = (gender?: string) => {
    if (!gender) return "";
    if (gender.toLowerCase() === "male" || gender.toLowerCase() === "nam") return "Nam";
    if (gender.toLowerCase() === "female" || gender.toLowerCase() === "nữ") return "Nữ";
    return gender;
  };

  // Format avatar URL - thêm domain nếu là đường dẫn tương đối
  const formatAvatarUrl = (avatar?: string): string => {
    if (!avatar) return "https://via.placeholder.com/80";
    // Nếu đã có http/https thì giữ nguyên
    if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
      return avatar;
    }
    // Nếu là đường dẫn tương đối (bắt đầu bằng /) thì thêm domain
    if (avatar.startsWith('/')) {
      return `https://socdo.vn${avatar}`;
    }
    // Nếu không có / ở đầu, thêm cả / và domain
    return `https://socdo.vn/${avatar}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!token) {
      toast.error("Vui lòng đăng nhập để cập nhật thông tin");
      return;
    }

    setIsSaving(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Build data object, only include non-empty values
      const data: {
        name?: string;
        email?: string;
        mobile?: string;
        birthday?: string;
        gender?: string;
        address?: string;
      } = {};
      
      const name = (formData.get("name") as string)?.trim();
      const email = (formData.get("email") as string)?.trim();
      const mobile = (formData.get("mobile") as string)?.trim();
      const birthday = (formData.get("birthday") as string)?.trim();
      const gender = (formData.get("gender") as string)?.trim();
      // Get address from state (controlled component)
      const address = addressValue.trim();
      
      if (name) data.name = name;
      if (email) data.email = email;
      if (mobile) data.mobile = mobile;
      if (birthday) data.birthday = birthday;
      if (gender) data.gender = gender;
      if (address) data.address = address;
      
      // Debug log
      console.log("📝 [PROFILE_EDITOR] Updating profile with data:", data);

      // Call API to update user profile
      const response = await AuthService.updateProfile(token, data);
      
      if (response.success && response.data) {
        // Update user data in context
        await refreshUser();
        toast.success("Đã cập nhật thông tin tài khoản");
        navigate(-1);
      } else {
        throw new Error(response.message || "Có lỗi xảy ra khi cập nhật");
      }
    } catch (error: any) {
      console.error("❌ [PROFILE_EDITOR] Error updating profile:", error);
      // Handle network errors gracefully
      const errorMessage = error?.message?.toLowerCase() || '';
      if (errorMessage.includes('network error') || 
          errorMessage.includes('không thể kết nối') ||
          errorMessage.includes('failed to fetch')) {
        toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và thử lại.");
      } else {
        toast.error(error.message || "Có lỗi xảy ra khi cập nhật");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangeAvatar = () => {
    // Create a hidden file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/webp,image/gif';
    input.style.display = 'none';
    
    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      
      if (!file) {
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File quá lớn. Kích thước tối đa là 5MB");
        return;
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Định dạng file không hợp lệ. Chỉ chấp nhận: JPG, PNG, WEBP, GIF");
        return;
      }
      
      if (!token) {
        toast.error("Vui lòng đăng nhập để cập nhật avatar");
        return;
      }
      
      try {
        // Show loading toast
        const loadingToast = toast.loading("Đang tải ảnh lên...");
        
        // Upload avatar
        const response = await AuthService.uploadAvatar(token, file);
        
        if (response.success && response.data) {
          // Update profileData với avatar mới
          if (profileData) {
            setProfileData({
              ...profileData,
              avatar: response.data.avatar_url || response.data.avatar,
              avatar_url: response.data.avatar_url || response.data.avatar,
            });
          }
          
          // Update user data in context
          await refreshUser();
          
          toast.dismiss(loadingToast);
          toast.success("Đã cập nhật ảnh đại diện thành công");
        } else {
          throw new Error(response.message || "Có lỗi xảy ra khi cập nhật avatar");
        }
      } catch (error: any) {
        console.error("❌ [PROFILE_EDITOR] Error uploading avatar:", error);
        const errorMessage = error?.message?.toLowerCase() || '';
        if (errorMessage.includes('network error') || 
            errorMessage.includes('không thể kết nối') ||
            errorMessage.includes('failed to fetch')) {
          toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và thử lại.");
        } else {
          toast.error(error.message || "Có lỗi xảy ra khi cập nhật avatar");
        }
      }
    };
    
    // Trigger file input
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  // Use profileData from context, fallback to user from context
  const displayUser = profileData || user;

  // Show loading if auth is loading or profile is loading
  if (authLoading || isLoadingProfile) {
    return (
      <div className="min-h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  // Show loading if we have token but no user data yet
  if (!displayUser && token) {
    return (
      <div className="min-h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  // Redirect if no token
  if (!token) {
    return null; // useEffect will handle navigation
  }

  return (
    <div className="min-h-full bg-gray-50" style={{ paddingTop: "20px" }}>
      {/* Header */}
      <div className="sticky z-50 bg-white border-b border-gray-200" style={{ top: "20px" }}>
        <div className="flex items-center justify-start px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1"
            aria-label="Back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-black">Thông tin cá nhân</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* Avatar Section */}
        <div className="bg-white rounded-lg mx-4 mt-4 p-4">
          <div className="flex items-center">
            <img
              src={formatAvatarUrl(displayUser?.avatar || (displayUser as any)?.avatar_url)}
              alt={displayUser?.name}
              className="w-20 h-20 rounded-full object-cover mr-4"
            />
            <button
              type="button"
              onClick={handleChangeAvatar}
              className="flex items-center px-4 py-2 border border-red-200 rounded-lg bg-white text-red-500 hover:bg-red-50 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M8.5 1.5L10.5 3.5M9 1L10 2L7 5H4.5V2.5L9 1ZM2.5 7.5V9.5H4.5L7.5 6.5L5.5 4.5L2.5 7.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-medium">Đổi ảnh đại diện</span>
            </button>
          </div>
        </div>

        {/* Basic Information Section */}
        <div className="bg-white rounded-lg mx-4 mt-4 p-4">
          <h2 className="text-base font-bold text-black mb-4">Thông tin cơ bản</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Họ và tên
              </label>
              <Input
                name="name"
                defaultValue={displayUser?.name || ""}
                placeholder="Nhập họ và tên"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <Input
                name="email"
                type="text"
                defaultValue={displayUser?.email || ""}
                placeholder="Nhập email"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Số điện thoại
              </label>
              <Input
                name="mobile"
                type="text"
                defaultValue={displayUser?.mobile || ""}
                placeholder="Nhập số điện thoại"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Ngày sinh
              </label>
              <div className="flex gap-2">
                {/* Day Select */}
                <div className="flex-1">
                  <select
                    name="birthday-day"
                    value={selectedDay || ""}
                    onChange={(e) => setSelectedDay(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "36px" }}
                  >
                    <option value="">Ngày</option>
                    {getValidDays(selectedMonth, selectedYear).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Month Select */}
                <div className="flex-1">
                  <select
                    name="birthday-month"
                    value={selectedMonth || ""}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "36px" }}
                  >
                    <option value="">Tháng</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Year Select */}
                <div className="flex-1">
                  <select
                    name="birthday-year"
                    value={selectedYear || ""}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "36px" }}
                  >
                    <option value="">Năm</option>
                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Hidden input for form submission */}
                <input
                  type="hidden"
                  name="birthday"
                  value={formatDateToString(selectedDay, selectedMonth, selectedYear)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Giới tính
              </label>
              <Input
                name="gender"
                type="text"
                defaultValue={formatGender((displayUser as any)?.gender || displayUser?.gioi_tinh) || ""}
                placeholder="Nhập giới tính"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Địa chỉ
              </label>
              <textarea
                name="address"
                rows={3}
                value={addressValue}
                onChange={(e) => setAddressValue(e.target.value)}
                placeholder="Xã/Phường - Huyện/Quận - Tỉnh/Thành phố"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-6 space-y-3 bg-gray-50">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-3 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/shipping-address")}
            className="w-full py-3 px-4 bg-white text-red-500 border border-red-200 rounded-lg font-medium hover:bg-red-50 transition-colors"
          >
            Quản lý số địa chỉ
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEditorPage;
