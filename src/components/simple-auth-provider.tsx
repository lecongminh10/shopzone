import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import { AuthService } from "@/api/service/auth.service";
import { UserInfo } from "@/api/types";
import { getSellerToken, getShopIdAsNumber, getShopId } from "@/api/utils/token.util";
import toast from "react-hot-toast";
import { RequestPermissionModal } from "./RequestPermissionModal";

// Auth Context
interface AuthContextType {
  user: UserInfo | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isNewUser: boolean;
  authenticate: () => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  showPhoneModal: boolean;
  setShowPhoneModal: (show: boolean) => void;
  setUser: (user: UserInfo | null) => void;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const isInitializingRef = useRef(false); // Prevent double initialization

  const isAuthenticated = !!user && !!token;

  // Initialize authentication on app start
  useEffect(() => {
    // Prevent double initialization (React Strict Mode in dev)
    if (isInitializingRef.current) {
      return;
    }
    isInitializingRef.current = true;
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Bước 1: Kiểm tra và fetch seller token ngay lập tức nếu chưa có
      // Đây là bước QUAN TRỌNG - seller token cần cho tất cả API calls
      // getSellerToken() sẽ tự động kiểm tra Shop-Id và fetch lại token nếu cần
      const existingSellerToken = localStorage.getItem('sellerToken');
      const storedShopId = localStorage.getItem('Shop-Id');
      // Lấy shop ID từ env -> localStorage -> hash code (23933)
      const currentShopId = getShopId();
      
      // Kiểm tra nếu Shop-Id không khớp hoặc không có token
      if (!existingSellerToken || storedShopId !== currentShopId) {
        if (storedShopId !== currentShopId) {
          console.log(`[AUTH_PROVIDER] Shop-Id không khớp (stored: ${storedShopId}, current: ${currentShopId}), sẽ lấy lại sellerToken`);
        } else {
          console.log('[AUTH_PROVIDER] Không tìm thấy seller token, đang fetch ngay...');
        }
        try {
          // Đợi fetch token xong với timeout để không block quá lâu
          // getSellerToken() sẽ tự động xóa token cũ và fetch token mới nếu Shop-Id không khớp
          const fetchTokenPromise = getSellerToken();
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout: Không thể fetch token trong 10 giây')), 10000)
          );
          
          await Promise.race([fetchTokenPromise, timeoutPromise]);
          console.log('[AUTH_PROVIDER] ✅ Đã fetch seller token thành công');
        } catch (error: any) {
          console.warn('[AUTH_PROVIDER] ⚠️ Không thể fetch seller token ngay lúc khởi động:', error.message);
          // Không throw error ở đây - app vẫn có thể hoạt động, token sẽ được retry khi cần dùng
          // Các service khác sẽ tự động retry khi gọi getSellerToken()
        }
      } else {
        console.log('[AUTH_PROVIDER] ✅ Đã có seller token trong localStorage và Shop-Id khớp');
      }
      
      // Bước 2: Check if user is already authenticated (sau khi đã có seller token)
      const storedUser = AuthService.getStoredUser();
      const storedToken = AuthService.getStoredToken();

      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);

        // Verify token is still valid by getting user profile
        // Only verify if we don't have recent data (avoid unnecessary calls)
        try {
          const profileResponse = await AuthService.getUserProfile(storedToken);
          if (profileResponse.success && profileResponse.data) {
            setUser(profileResponse.data);
            AuthService.storeAuthData(profileResponse.data, storedToken);
          }
        } catch (error: any) {
          // Handle network errors gracefully (don't logout on network errors)
          const errorMessage = error?.message?.toLowerCase() || '';
          if (errorMessage.includes('failed to fetch') || 
              errorMessage.includes('networkerror') ||
              errorMessage.includes('network error') ||
              errorMessage.includes('không thể kết nối') ||
              errorMessage.includes('kết nối đến server')) {
            console.warn('⚠️ [SIMPLE_AUTH_PROVIDER] Network error when verifying token, using stored data');
            // Keep using stored data if network error
            setIsLoading(false);
            return;
          }
          
          // Token expired or invalid - clear stored data but DON'T auto-authenticate
          if (error?.message?.includes('401') || error?.message?.includes('Unauthorized')) {
            console.warn('⚠️ [SIMPLE_AUTH_PROVIDER] Token expired or invalid, clearing stored data');
            AuthService.logout();
            setUser(null);
            setToken(null);
            // User cần tự động đăng nhập bằng cách click nút "Đăng nhập"
            setIsLoading(false);
            return;
          }
          
          // Other errors - clear data
          AuthService.logout();
          setUser(null);
          setToken(null);
        }
      } else {
        // Không có stored data - không tự động đăng nhập
        // User cần tự động đăng nhập bằng cách click nút "Đăng nhập"
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error(
        "❌ [SIMPLE_AUTH_PROVIDER] Error initializing auth:",
        error
      );
      // Clear any invalid data
      AuthService.logout();
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const authenticate = async (skipLoadingState = false) => {
    try {
      if (!skipLoadingState) {
        setIsLoading(true);
      }

      // Use Zalo SDK thật - dùng getUserInfo với autoRequestPermission: true
      // getUserInfo sẽ tự động hiển thị popup xin quyền nếu chưa có
      // Chỉ lấy được dữ liệu thật khi chạy trên Zalo App (không chạy được trên localhost)
      // Lấy shop ID từ VITE_KEY_ID hoặc Shop-Id trong localStorage
      const shopId = getShopIdAsNumber();
      const authResult = await AuthService.authenticateWithZalo(shopId, {
        requestPhone: false, // Chưa xin phone trong lần đầu
        requestUserInfo: true, // Xin quyền user info
        email: "",
        avatarSize: "normal", // Chọn kích thước avatar: "small", "normal", hoặc "large"
        autoRequestPermission: true, // Tự động hiển thị popup xin quyền
      });

      if (authResult.success && authResult.user && authResult.token) {
        // Lấy seller token từ localStorage (đã lưu trong authenticateWithZalo)
        const sellerToken = localStorage.getItem("sellerToken");
        AuthService.storeAuthData(
          authResult.user,
          authResult.token,
          sellerToken || undefined
        );
        setUser(authResult.user);
        setToken(authResult.token);
        setIsNewUser(authResult.isNewUser || false);

        // Kiểm tra nếu user chưa có số điện thoại
        if (!authResult.user.mobile || authResult.user.mobile === "") {
          setShowPhoneModal(true);
        }

        toast.success(`Chào mừng ${authResult.user.name}!`, {
          icon: "🎉",
          duration: 2000,
        });
      } else {
        // Xử lý khi user từ chối quyền (error code -1401)
        if (authResult.error?.includes("từ chối")) {
          toast.error("Bạn cần cấp quyền truy cập để sử dụng ứng dụng.", {
            icon: "⚠️",
            duration: 4000,
          });
        } else {
          throw new Error(authResult.error || "Xác thực thất bại");
        }
      }
    } catch (error: any) {
      console.error("❌ [SIMPLE_AUTH_PROVIDER] Authentication failed:", error);
      
      // Xử lý lỗi khi user từ chối quyền (error code -1401)
      if (
        error?.message?.includes("USER_DENIED_PERMISSION") ||
        error?.message?.includes("từ chối")
      ) {
        toast.error("Bạn cần cấp quyền truy cập để sử dụng ứng dụng.", {
          icon: "⚠️",
          duration: 4000,
        });
      } else {
        toast.error(error.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } finally {
      if (!skipLoadingState) {
        setIsLoading(false);
      }
    }
  };

  const logout = () => {
    AuthService.logout();
    // KHÔNG xóa sellerToken vì đó là token của shop, không phải của user
    // Chỉ xóa token và user data của user
    setUser(null);
    setToken(null);
    setIsNewUser(false);
    toast.success("Đã đăng xuất thành công");
  };

  const refreshUser = async () => {
    // Sử dụng token từ state hoặc từ localStorage
    const currentToken = token || AuthService.getStoredToken();
    if (!currentToken) {
      console.warn("⚠️ [SIMPLE_AUTH_PROVIDER] No token available for refreshUser");
      return;
    }

    try {
      const profileResponse = await AuthService.getUserProfile(currentToken);

      if (profileResponse.success && profileResponse.data) {
        setUser(profileResponse.data);
        AuthService.storeAuthData(profileResponse.data, currentToken);
      }
    } catch (error: any) {
      // Handle network errors gracefully - don't log as error
      const errorMessage = error?.message?.toLowerCase() || '';
      if (errorMessage.includes('failed to fetch') || 
          errorMessage.includes('networkerror') ||
          errorMessage.includes('network error') ||
          errorMessage.includes('không thể kết nối') ||
          errorMessage.includes('kết nối đến server')) {
        console.warn("⚠️ [SIMPLE_AUTH_PROVIDER] Network error refreshing user (using cached data):", error.message);
      } else {
        console.error("❌ [SIMPLE_AUTH_PROVIDER] Error refreshing user:", error);
      }
    }
  };

  // Handle phone permission granted
  const handlePhonePermissionGranted = async (phoneToken: string) => {
    try {
      if (token) {
        const success = await AuthService.updatePhoneNumber(token, phoneToken);
        if (success) {
          // Refresh user info
          await refreshUser();

          toast.success("Đã cập nhật số điện thoại thành công!", {
            icon: "📞",
            duration: 2000,
          });
        } else {
          console.error(
            "❌ [SIMPLE_AUTH_PROVIDER] Failed to update phone number"
          );
          toast.error("Không thể cập nhật số điện thoại. Vui lòng thử lại.");
        }
      }
    } catch (error) {
      console.error("❌ [SIMPLE_AUTH_PROVIDER] Error updating phone:", error);
      toast.error("Lỗi khi cập nhật số điện thoại.");
    }
  };

  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    isNewUser,
    authenticate,
    logout,
    refreshUser,
    showPhoneModal,
    setShowPhoneModal,
    setUser,
    setToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}

      {/* Phone Permission Modal */}
      <RequestPermissionModal
        visible={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        onSuccess={handlePhonePermissionGranted}
      />
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

