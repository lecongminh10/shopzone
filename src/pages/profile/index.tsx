import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/components/simple-auth-provider";
import { AuthService } from "@/api/service/auth.service";
import LoginModal from "@/components/LoginModal";
import { Icon } from "zmp-ui";
import toast from "react-hot-toast";
import { openChat } from "zmp-sdk/apis";
import { getConfig } from "@/utils/template";

// Icon components
function PendingIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H15V15H12V17H15V20H17V17H20V15H17V12Z"
        fill="#DC2626"
      />
    </svg>
  );
}
function PickupIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Vòng tròn */}
      <circle cx="12" cy="12" r="10" fill="#DC2626" />
      {/* Dấu tick trắng */}
      <path
        d="M8 12.5L10.5 15L16 9.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 8H17L15 4H3C1.9 4 1 4.9 1 6V17H3C3 18.66 4.34 20 6 20S9 18.66 9 17H15C15 18.66 16.34 20 18 20S21 18.66 21 17H23V12L20 8ZM6 18.5C5.17 18.5 4.5 17.83 4.5 17S5.17 15.5 6 15.5 7.5 16.17 7.5 17 6.83 18.5 6 18.5ZM18 18.5C17.17 18.5 16.5 17.83 16.5 17S17.17 15.5 18 15.5 19.5 16.17 19.5 17 18.83 18.5 18 18.5ZM17 12V9.5H19.5L21.46 12H17Z"
        fill="#DC2626"
      />
    </svg>
  );
}

function DeliveredBoxIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hình hộp */}
      <path
        d="M3 7L12 2L21 7V17L12 22L3 17V7Z"
        stroke="#DC2626"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Nắp hộp */}
      <path
        d="M3 7L12 12L21 7"
        stroke="#DC2626"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Đường chia giữa hộp */}
      <path
        d="M12 12V22"
        stroke="#DC2626"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Dấu tick xác nhận trên hộp */}
      <path
        d="M8.5 13.5L10.5 15.5L15 11"
        stroke="#DC2626"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
        fill="#DC2626"
      />
    </svg>
  );
}

export default function ProfilePage() {
  const {
    user,
    isAuthenticated,
    isLoading,
    authenticate,
    logout,
    token,
    refreshUser,
  } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [wasAuthenticated, setWasAuthenticated] = useState(isAuthenticated);
  const returnUrl = searchParams.get("returnUrl") || null;

  // Redirect về returnUrl sau khi đăng nhập thành công
  useEffect(() => {
    // Chỉ redirect khi:
    // 1. Đã đăng nhập
    // 2. Có returnUrl
    // 3. Không đang loading
    // 4. Vừa chuyển từ chưa đăng nhập sang đã đăng nhập (để tránh redirect khi đã đăng nhập sẵn)
    if (isAuthenticated && returnUrl && !isLoading && !wasAuthenticated) {
      // Đợi một chút để đảm bảo state đã được cập nhật
      const timer = setTimeout(() => {
        navigate(returnUrl);
      }, 100);
      return () => clearTimeout(timer);
    }

    // Cập nhật wasAuthenticated để track trạng thái trước đó
    if (isAuthenticated !== wasAuthenticated) {
      setWasAuthenticated(isAuthenticated);
    }
  }, [isAuthenticated, returnUrl, isLoading, navigate, wasAuthenticated]);

  // Format avatar URL - thêm domain nếu là đường dẫn tương đối
  const formatAvatarUrl = (avatar?: string): string => {
    if (!avatar) return "https://via.placeholder.com/60";
    // Nếu đã có http/https thì giữ nguyên
    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar;
    }
    // Nếu là đường dẫn tương đối (bắt đầu bằng /) thì thêm domain
    if (avatar.startsWith("/")) {
      return `https://socdo.vn${avatar}`;
    }
    // Nếu không có / ở đầu, thêm cả / và domain
    return `https://socdo.vn/${avatar}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-full bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <h2 className="text-lg font-semibold mb-2">Chưa đăng nhập</h2>
            <p className="text-gray-600 mb-4">
              Vui lòng đăng nhập để xem thông tin cá nhân
            </p>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-red-500 text-white px-6 py-2.5 rounded-lg font-medium"
          >
            Đăng nhập
          </button>
        </div>

        {isLoginModalOpen && (
          <LoginModal
            onClose={() => setIsLoginModalOpen(false)}
            open={isLoginModalOpen}
            returnUrl={returnUrl}
          />
        )}
      </div>
    );
  }

  const formatK = (value: number) => {
    const formatted = (value / 1000).toFixed(3);
    return parseFloat(formatted) + " " + "đ";
  };

  const balance = user?.total_points || 0;
  const formattedBalance = balance.toLocaleString('vi-VN') + " điểm";

  // Custom Icon Components
  const ReceiptIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H17V12H7V10ZM7 14H15V16H7V14Z"
        fill="currentColor"
      />
    </svg>
  );

  const TagIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7.01V17C3 18.1 3.9 19 5 19H16C16.67 19 17.27 18.67 17.63 18.16L21 15L17.63 5.84ZM7 9C7.55 9 8 9.45 8 10C8 10.55 7.55 11 7 11C6.45 11 6 10.55 6 10C6 9.45 6.45 9 7 9Z"
        fill="currentColor"
      />
    </svg>
  );

  const ArchiveIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.54 5.23L19.15 3.55C18.88 3.21 18.47 3 18 3H6C5.53 3 5.12 3.21 4.85 3.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V6.5C21 6.02 20.83 5.57 20.54 5.23ZM12 17.5L6.5 12H9V10H15V12H17.5L12 17.5ZM4.94 5H19.06L18.12 3.84C18.05 3.75 17.93 3.68 17.82 3.65H6.18C6.07 3.68 5.95 3.75 5.88 3.84L4.94 5Z"
        fill="currentColor"
      />
    </svg>
  );

  const HeadphoneIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3C7.03 3 3 7.03 3 12V19C3 20.1 3.9 21 5 21H9V12H5C5 8.13 8.13 5 12 5S19 8.13 19 12H15V21H19C20.1 21 21 20.1 21 19V12C21 7.03 16.97 3 12 3Z"
        fill="currentColor"
      />
    </svg>
  );

  const BugIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 8H17.19C16.74 7.22 16.12 6.55 15.37 6.04L16.85 4.56L15.44 3.15L13.92 4.67C13.34 4.23 12.69 3.91 12 3.71V1H10V3.71C9.31 3.91 8.66 4.23 8.08 4.67L6.56 3.15L5.15 4.56L6.63 6.04C5.88 6.55 5.26 7.22 4.81 8H2V10H4.09C4.03 10.33 4 10.66 4 11V13H2V15H4V17C4 17.34 4.03 17.67 4.09 18H2V20H4.81C5.85 21.79 7.78 23 10 23H14C16.22 23 18.15 21.79 19.19 20H22V18H19.91C19.97 17.67 20 17.34 20 17V15H22V13H20V11C20 10.66 19.97 10.33 19.91 10H22V8H20ZM14 19H10C8.34 19 7 17.66 7 16V11C7 9.34 8.34 8 10 8H14C15.66 8 17 9.34 17 11V16C17 17.66 15.66 19 14 19Z"
        fill="currentColor"
      />
    </svg>
  );

  const LogoutIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
        fill="currentColor"
      />
    </svg>
  );

  const handleChangeAvatar = () => {
    // Create a hidden file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp,image/gif";
    input.style.display = "none";

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
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Định dạng file không hợp lệ. Chỉ chấp nhận: JPG, PNG, WEBP, GIF"
        );
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
          // Update user data in context
          await refreshUser();

          toast.dismiss(loadingToast);
          toast.success("Đã cập nhật ảnh đại diện thành công");
        } else {
          throw new Error(
            response.message || "Có lỗi xảy ra khi cập nhật avatar"
          );
        }
      } catch (error: any) {
        console.error("❌ [PROFILE_PAGE] Error uploading avatar:", error);
        const errorMessage = error?.message?.toLowerCase() || "";
        if (
          errorMessage.includes("network error") ||
          errorMessage.includes("không thể kết nối") ||
          errorMessage.includes("failed to fetch")
        ) {
          toast.error(
            "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và thử lại."
          );
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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuSections = [
    {
      title: "Tài khoản",
      items: [
        {
          icon: "zi-user",
          label: "Thông tin cá nhân",
          onClick: () => navigate("/profile/edit"),
          customIcon: null,
        },
        {
          icon: "zi-receipt",
          label: "Đơn hàng đã mua",
          onClick: () => navigate("/orders?status=5"),
          customIcon: ReceiptIcon,
        },
      ],
    },
    {
      title: "Cá nhân",
      items: [
        {
          icon: "zi-location",
          label: "Sổ địa chỉ",
          onClick: () => navigate("/shipping-address"),
          customIcon: null,
        },
        {
          icon: "zi-tag",
          label: "Mã giảm giá",
          onClick: () => navigate("/vouchers"),
          customIcon: TagIcon,
        },
        {
          icon: "zi-archive",
          label: "Đã huỷ & Trả lại",
          onClick: () => navigate("/orders?status=3"),
          customIcon: ArchiveIcon,
        },
      ],
    },
    {
      title: "Hỗ trợ",
      items: [
        {
          icon: "zi-chat",
          label: "Liên hệ shop",
          onClick: async () => {
            try {
              const oaId = getConfig(
                (config) => config.template.oaIDtoOpenChat
              );

              if (oaId) {
                await openChat({
                  type: "oa",
                  id: oaId,
                  message: "Xin chào nhà bán hàng 🤗🤗🤗",
                });
              }
            } catch (error) {
              console.error("Error opening chat:", error);
              // Fallback: mở link Zalo nếu openChat thất bại
              const zaloOaId =
                import.meta.env.VITE_ZALO_OA_ID ||
                import.meta.env.VITE_SHOP_USERNAME;
              if (zaloOaId) {
                const message = encodeURIComponent("Xin chào nhà bán hàng");
                window.open(
                  `https://zalo.me/${zaloOaId}?message=${message}`,
                  "_blank"
                );
              }
            }
          },
        },
        {
          icon: "zi-bug",
          label: "Báo lỗi cho chúng tôi",
          onClick: async () => {
            try {
              const oaId = getConfig(
                (config) => config.template.oaIDtoOpenChat
              );

              if (oaId) {
                await openChat({
                  type: "oa",
                  id: oaId,
                  message:
                    "Hiện tại tôi phát hiện thấy lỗi trên nền tảng của bạn nha 😎😎😎",
                });
              }
            } catch (error) {
              console.error("Error opening chat:", error);
              // Fallback: mở link Zalo nếu openChat thất bại
              const zaloOaId =
                import.meta.env.VITE_ZALO_OA_ID ||
                import.meta.env.VITE_SHOP_USERNAME;
              if (zaloOaId) {
                const message = encodeURIComponent(
                  "Hiện tại tôi phát hiện thấy lỗi trên nền tảng của bạn nha"
                );
                window.open(
                  `https://zalo.me/${zaloOaId}?message=${message}`,
                  "_blank"
                );
              }
            }
          },
          customIcon: BugIcon,
        },
      ],
    },
    {
      title: "",
      items: [
        {
          icon: "",
          label: "Đăng xuất",
          onClick: handleLogout,
          customIcon: LogoutIcon,
        },
      ],
    },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header - Fixed và có padding-top để tránh status bar */}
      <div
        className="sticky top-0 z-50 bg-white border-b border-gray-200"
        style={{ paddingTop: "var(--safe-top, 30px)" }}
      >
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="mr-3 p-1"
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
          <h1 className="text-lg font-semibold text-black">
            Tài khoản của tôi
          </h1>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="bg-white px-4 py-5">
        <div className="flex items-center mb-4">
          <div className="relative mr-4">
            <img
              src={formatAvatarUrl(user?.avatar || (user as any)?.avatar_url)}
              alt={user?.name}
              className="w-15 h-15 rounded-full object-cover"
              style={{ width: "60px", height: "60px" }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleChangeAvatar();
              }}
              className="absolute bottom-0 right-0 bg-red-500 rounded-full p-1.5 border-2 border-white hover:bg-red-600 transition-colors"
              aria-label="Change avatar"
              title="Đổi ảnh đại diện"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 1.5L10.5 3.5M9 1L10 2L7 5H4.5V2.5L9 1ZM2.5 7.5V9.5H4.5L7.5 6.5L5.5 4.5L2.5 7.5Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Name và Balance */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-black mb-1">
              {user?.name || "User Name"}
            </h2>
            <p className="text-sm text-gray-600">
              Điểm tích lũy: {formattedBalance}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex overflow-x-auto gap-4 mt-4 px-2 no-scrollbar">
          <button
            onClick={() => navigate("/orders?status=0")}
            className="flex-shrink-0 flex flex-col items-center w-20"
          >
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-2">
              <PendingIcon />
            </div>
            <span className="text-xs text-black">Chờ xác nhận</span>
          </button>

          <button
            onClick={() => navigate("/orders?status=1")}
            className="flex-shrink-0 flex flex-col items-center w-20"
          >
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-2">
              <PickupIcon />
            </div>
            <span className="text-xs text-black">Đã xác nhận</span>
          </button>

          <button
            onClick={() => navigate("/orders?status=2")}
            className="flex-shrink-0 flex flex-col items-center w-20"
          >
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-2">
              <DeliveryIcon />
            </div>
            <span className="text-xs text-black">Đang giao hàng</span>
          </button>

          <button
            onClick={() => navigate("/orders?status=5")}
            className="flex-shrink-0 flex flex-col items-center w-20"
          >
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-2">
              <DeliveredBoxIcon />
            </div>
            <span className="text-xs text-black">Đã nhận</span>
          </button>

          <button
            onClick={() => navigate("/reviews")}
            className="flex-shrink-0 flex flex-col items-center w-20 relative"
          >
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-2">
              <ReviewIcon />
            </div>
            <span className="absolute top-0 right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
            <span className="text-xs text-black">Đánh giá</span>
          </button>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="mt-2">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white mb-2">
            {section.title && (
              <div className="px-4 pt-3">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  {section.title}
                </h3>
              </div>
            )}
            <div className={section.title ? "px-4 pb-3" : "px-4 py-3"}>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const isLogout = item.label === "Đăng xuất";
                  return (
                    <button
                      key={itemIndex}
                      onClick={item.onClick}
                      className={`w-full flex items-center justify-between py-3 px-2 rounded-lg ${
                        isLogout
                          ? "hover:bg-red-50 text-red-500"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        {item.customIcon ? (
                          <div
                            className={`mr-3 flex items-center ${
                              isLogout ? "text-red-500" : "text-gray-700"
                            }`}
                          >
                            <item.customIcon />
                          </div>
                        ) : (
                          <Icon
                            icon={item.icon as any}
                            className={`mr-3 ${
                              isLogout ? "text-red-500" : "text-gray-700"
                            }`}
                          />
                        )}
                        <span
                          className={`text-sm ${
                            isLogout ? "text-red-500 font-medium" : "text-black"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {!isLogout && (
                        <Icon
                          icon="zi-chevron-right"
                          className="text-gray-400"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
