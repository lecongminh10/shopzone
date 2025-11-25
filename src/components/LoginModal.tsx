import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { getUserInfo, getPhoneNumber, authorize } from "zmp-sdk/apis";
import { AuthService } from "@/api/service/auth.service";
import { useAuth } from "@/components/simple-auth-provider";
import { getConfig } from "@/utils/template";
import { getShopIdAsNumber } from "@/api/utils/token.util";
import toast from "react-hot-toast";

interface LoginModalProps {
  onClose: () => void;
  open: boolean;
  returnUrl?: string | null;
}

export default function LoginModal({ onClose, open, returnUrl }: LoginModalProps) {
  const [phoneEnabled, setPhoneEnabled] = useState(false); // mặc định chưa chọn
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    refreshUser,
    setUser: setAuthUser,
    setToken: setAuthToken,
  } = useAuth();
  const [userInfo, setUserInfo] = useState<{
    name: string;
    avatar: string;
  } | null>(null);
  const isDeniedRef = useRef(false); // Track if user clicked "Từ chối"
  const abortControllerRef = useRef<AbortController | null>(null);
  const hasUserInfoPermissionRef = useRef(false); // Track if userInfo permission already granted

  const shopName = getConfig((c) => c.template.shopName);
  const logoUrl = getConfig((c) => c.template.logoUrl);

  useEffect(() => {
    // Reset deny flag and user info when modal opens
    if (open) {
      isDeniedRef.current = false;
      abortControllerRef.current = new AbortController();
      setUserInfo(null); // Reset user info khi mở modal
      setPhoneEnabled(false); // Reset phone enabled
      hasUserInfoPermissionRef.current = false; // Reset permission flag
    }

    const fetchUserInfo = async () => {
      // Không fetch nếu user đã click "Từ chối"
      if (isDeniedRef.current) {
        return;
      }

      try {
        // Bước 1: Xin quyền userInfo trước
        let hasUserInfoPermission = false;
        try {
          const authorizeResponse = await authorize({
            scopes: ["scope.userInfo"],
          });

          // Kiểm tra nếu user đã click "Từ chối" trong lúc authorize
          if (isDeniedRef.current) {
            return;
          }

          // Kiểm tra response - có thể là object rỗng trong local hoặc object có scope.userInfo
          if (authorizeResponse && typeof authorizeResponse === "object") {
            // Nếu có scope.userInfo và là true, hoặc response rỗng (local dev)
            hasUserInfoPermission =
              authorizeResponse["scope.userInfo"] === true ||
              Object.keys(authorizeResponse).length === 0;
            // Lưu trạng thái quyền đã được cấp
            hasUserInfoPermissionRef.current = hasUserInfoPermission;
          } else {
            hasUserInfoPermission = true; // Fallback
            hasUserInfoPermissionRef.current = true;
          }
          console.log(
            "✅ [LOGIN_MODAL] Authorize response:",
            authorizeResponse
          );
          console.log(
            "✅ [LOGIN_MODAL] UserInfo permission granted:",
            hasUserInfoPermissionRef.current
          );
        } catch (authorizeError: any) {
          // Kiểm tra nếu user đã click "Từ chối"
          if (isDeniedRef.current) {
            return;
          }

          // Xử lý khi user từ chối quyền (error code -201)
          if (authorizeError?.code === -201 || authorizeError?.error === -201) {
            console.warn(
              "⚠️ [LOGIN_MODAL] User denied authorization (error code: -201)"
            );
            // Không set user info, để null
            return;
          } else {
            console.error(
              "❌ [LOGIN_MODAL] Error authorizing:",
              authorizeError
            );
            // Trong local, có thể không có authorize API
            hasUserInfoPermission = true; // Fallback cho local
          }
        }

        // Kiểm tra lại nếu user đã click "Từ chối"
        if (isDeniedRef.current) {
          return;
        }

        // Bước 2: Lấy user info nếu đã có quyền hoặc trong local
        if (hasUserInfoPermission) {
          try {
            const response = await getUserInfo({
              autoRequestPermission: false, // Đã authorize rồi
              avatarType: "normal",
            });

            // Kiểm tra lại nếu user đã click "Từ chối" sau khi getUserInfo
            if (isDeniedRef.current) {
              return;
            }

            if (response?.userInfo) {
              const { name, avatar } = response.userInfo;
              setUserInfo({
                name: name || "User",
                avatar: avatar || "",
              });
              console.log("✅ [LOGIN_MODAL] User info:", response.userInfo);
            }
          } catch (userInfoError: any) {
            // Kiểm tra nếu user đã click "Từ chối"
            if (isDeniedRef.current) {
              return;
            }

            console.error(
              "❌ [LOGIN_MODAL] Error getting user info:",
              userInfoError
            );
            // Không set user info khi có lỗi
          }
        }
      } catch (error: any) {
        // Kiểm tra nếu user đã click "Từ chối"
        if (isDeniedRef.current) {
          return;
        }

        console.error("❌ [LOGIN_MODAL] Error in fetchUserInfo:", error);
        // Không set user info khi có lỗi
      }
    };

    if (open) {
      fetchUserInfo();
    }

    // Cleanup: abort any ongoing requests when modal closes
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Reset user info khi modal đóng
      setUserInfo(null);
    };
  }, [open]);

  const handleAllow = async () => {
    if (!phoneEnabled) {
      toast.error("Vui lòng bật quyền truy cập số điện thoại");
      return;
    }

    setIsProcessing(true);

    try {
      // Bước 1: Xin quyền phoneNumber trước
      let hasPhonePermission = false;
      try {
        const authorizeResponse = await authorize({
          scopes: ["scope.userPhonenumber"],
        });
        // Kiểm tra response - có thể là object rỗng trong local hoặc object có scope.userPhonenumber
        if (authorizeResponse && typeof authorizeResponse === "object") {
          // Nếu có scope.userPhonenumber và là true, hoặc response rỗng (local dev)
          hasPhonePermission =
            authorizeResponse["scope.userPhonenumber"] === true ||
            Object.keys(authorizeResponse).length === 0;
        } else {
          hasPhonePermission = true; // Fallback
        }
        console.log(
          "✅ [LOGIN_MODAL] Phone permission authorized:",
          hasPhonePermission,
          authorizeResponse
        );
      } catch (authorizeError: any) {
        // Xử lý khi user từ chối quyền (error code -201)
        if (authorizeError?.code === -201 || authorizeError?.error === -201) {
          console.warn(
            "⚠️ [LOGIN_MODAL] User denied phone authorization (error code: -201)"
          );
          toast.error(
            "Bạn cần cấp quyền truy cập số điện thoại để sử dụng ứng dụng"
          );
          setIsProcessing(false);
          return;
        } else {
          console.error(
            "❌ [LOGIN_MODAL] Error authorizing phone:",
            authorizeError
          );
          // Trong local, có thể không có authorize API
          hasPhonePermission = true; // Fallback cho local
        }
      }

      // Bước 2: Lấy phone token và birthday trước khi authenticate
      let phoneToken: string | null = null;
      let birthday: string | null = null;

      if (hasPhonePermission) {
        try {
          // Gọi getPhoneNumber để lấy token số điện thoại
          // Thử gọi với options để đảm bảo nhận được token
          console.log("🔍 [LOGIN_MODAL] Calling getPhoneNumber()...");
          const phoneResponse = await getPhoneNumber({});
          console.log("📱 [LOGIN_MODAL] getPhoneNumber response:", phoneResponse);
          console.log("📱 [LOGIN_MODAL] getPhoneNumber response type:", typeof phoneResponse);
          console.log("📱 [LOGIN_MODAL] getPhoneNumber response keys:", phoneResponse ? Object.keys(phoneResponse) : 'null');
          
          // Xử lý nhiều format response từ getPhoneNumber
          // Format 1: {token: "..."}
          // Format 2: {phone_token: "..."}
          // Format 3: {number: "..."} - có thể là số điện thoại trực tiếp (trong dev mode)
          if (phoneResponse?.token) {
            phoneToken = phoneResponse.token;
            console.log("✅ [LOGIN_MODAL] Phone token received (from token field):", phoneToken.substring(0, 20) + "...");
          } else if (phoneResponse?.phone_token) {
            phoneToken = phoneResponse.phone_token;
            console.log("✅ [LOGIN_MODAL] Phone token received (from phone_token field):", phoneToken.substring(0, 20) + "...");
          } else if (phoneResponse?.number && phoneResponse.number !== '') {
            // Nếu có number trực tiếp (có thể trong dev mode), không cần token
            console.log("⚠️ [LOGIN_MODAL] getPhoneNumber returned number directly (dev mode?):", phoneResponse.number);
            // Trong trường hợp này, có thể không cần token, nhưng vẫn cần token để decode
            phoneToken = null;
            console.warn("⚠️ [LOGIN_MODAL] getPhoneNumber returned number but no token. Cannot decode phone number.");
            toast.error("Không thể lấy token số điện thoại. Vui lòng thử lại.");
          } else {
            phoneToken = null;
            console.warn("⚠️ [LOGIN_MODAL] getPhoneNumber returned no token or number");
            console.warn("⚠️ [LOGIN_MODAL] Response keys:", Object.keys(phoneResponse || {}));
            toast.error("Không thể lấy token số điện thoại. Vui lòng thử lại.");
          }
        } catch (phoneError: any) {
          // Xử lý khi user từ chối quyền số điện thoại
          if (phoneError?.code === -1401 || phoneError?.error === -1401) {
            console.warn(
              "⚠️ [LOGIN_MODAL] User denied phone permission (error code: -1401)"
            );
            toast.error(
              "Bạn cần cấp quyền truy cập số điện thoại để sử dụng ứng dụng"
            );
            setIsProcessing(false);
            return;
          } else {
            console.error(
              "❌ [LOGIN_MODAL] Error getting phone number:",
              phoneError
            );
            // Không dùng mock token nữa - để backend xử lý
            phoneToken = null;
            toast.error("Không thể lấy token số điện thoại: " + (phoneError?.message || "Unknown error"));
          }
        }
      } else {
        console.warn("⚠️ [LOGIN_MODAL] No phone permission, cannot get phone token");
        phoneToken = null;
      }

      // Lấy birthday từ userInfo nếu có (Zalo SDK có thể cung cấp birthday)
      if (userInfo) {
        try {
          const userInfoResponse = await getUserInfo({
            autoRequestPermission: false,
            avatarType: "normal",
          });
          // Zalo SDK có thể trả về birthday trong userInfo hoặc response
          // Type assertion vì Zalo SDK UserInfo có thể khác với UserInfo của chúng ta
          const zaloUserInfo = userInfoResponse?.userInfo as any;
          if (zaloUserInfo?.birthday) {
            birthday = zaloUserInfo.birthday;
            console.log("✅ [LOGIN_MODAL] Birthday received:", birthday);
          } else if ((userInfoResponse as any)?.birthday) {
            birthday = (userInfoResponse as any).birthday;
            console.log(
              "✅ [LOGIN_MODAL] Birthday received from response:",
              birthday
            );
          }
        } catch (birthdayError) {
          console.warn(
            "⚠️ [LOGIN_MODAL] Could not get birthday:",
            birthdayError
          );
          // Không block flow nếu không lấy được birthday
        }
      }

      // Bước 3: Authenticate user với phone_token và birthday
      // Backend sẽ tự động kiểm tra số điện thoại và đăng nhập hoặc tạo user mới
      // Gọi authenticateWithZalo trực tiếp với phone_token và birthday
      // Lấy shop ID từ env -> localStorage -> hash code (23933)
      const shopId = getShopIdAsNumber();
      const authResult = await AuthService.authenticateWithZalo(shopId, {
        requestPhone: false, // Đã lấy phone_token ở trên rồi
        requestUserInfo: true,
        email: "",
        avatarSize: "normal",
        autoRequestPermission: false, // Đã có quyền rồi
        phone_token: phoneToken || undefined, // Convert null to undefined
        birthday: birthday || undefined, // Convert null to undefined
      });

      if (authResult.success && authResult.user && authResult.token) {
        // Lấy seller token từ localStorage
        const sellerToken = localStorage.getItem("sellerToken");
        AuthService.storeAuthData(
          authResult.user,
          authResult.token,
          sellerToken || undefined
        );

        // Update state trong AuthProvider ngay lập tức
        // Để UI cập nhật ngay không cần đợi refreshUser
        setAuthUser(authResult.user);
        setAuthToken(authResult.token);

        // Refresh user data để lấy thông tin mới nhất từ server
        // Sau khi state đã được update
        await refreshUser();

        // Đảm bảo modal đóng sau khi authenticate thành công
        onClose();

        toast.success("Đăng nhập thành công!");
      } else {
        throw new Error(authResult.error || "Đăng nhập thất bại");
      }

      // Không cần toast success ở đây vì refreshUser có thể đã show toast
      // toast.success("Đăng nhập thành công!");
    } catch (error: any) {
      console.error("❌ [LOGIN_MODAL] Error during authentication:", error);
      toast.error(error.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 shadow-lg max-h-[90vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Logo */}
            <div className="flex flex-col items-center px-6 pt-4 pb-2">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-primary flex items-center justify-center mb-2">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={shopName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-2xl">🛒</span>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="px-6 pb-2">
              <h2 className="text-xl font-bold text-center">
                Cho phép {shopName} nhận các thông tin của bạn
              </h2>
            </div>

            {/* Description */}
            <div className="px-6 pb-4 text-center text-sm text-gray-600">
              {shopName} cần truy cập một số thông tin cơ bản từ tài khoản của
              bạn.{" "}
              <a href="#" className="text-blue-500 underline">
                Tìm hiểu thêm
              </a>
            </div>

            {/* Permission Items */}
            <div className="px-6 pb-4">
              {/* User Info Permission (luôn bật, không tắt được) */}
              {userInfo && (
                <div className="flex items-center gap-3 border-y border-gray-200 py-3">
                  <div>
                    {userInfo.avatar ? (
                      <img
                        src={userInfo.avatar}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full object-cover bg-gray-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">?</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p>{userInfo.name || "User"}</p>
                    <div className="flex-1 text-sm">Tên, ảnh đại diện Zalo</div>
                  </div>

                  {/* Toggle (disabled, luôn bật) */}
                  <div className="ml-auto relative w-12 h-6 rounded-full bg-blue-500 cursor-not-allowed opacity-80">
                    <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full translate-x-6" />
                  </div>
                </div>
              )}

              {/* Phone Permission (có thể chọn/tắt) */}
              <div className="flex items-center gap-3 border-b border-gray-200 py-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                      fill="#6B7280"
                    />
                  </svg>
                </div>
                <div className="flex-1 text-sm">
                  Số điện thoại liên kết với Zalo
                </div>
                <button
                  onClick={() => setPhoneEnabled(!phoneEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    phoneEnabled ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      phoneEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => {
                  isDeniedRef.current = true; // Đánh dấu user đã từ chối
                  if (abortControllerRef.current) {
                    abortControllerRef.current.abort(); // Hủy bỏ các request đang chạy
                  }
                  setUserInfo(null); // Reset user info
                  setPhoneEnabled(false); // Reset phone enabled
                  onClose(); // Đóng modal
                }}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-900 rounded-3xl font-medium"
              >
                Từ chối
              </button>
              <button
                onClick={handleAllow}
                disabled={!phoneEnabled || isProcessing}
                className={`flex-1 py-3 px-4 rounded-3xl font-medium transition-colors ${
                  phoneEnabled && !isProcessing
                    ? "bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isProcessing ? "Đang xử lý..." : "Cho phép"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
