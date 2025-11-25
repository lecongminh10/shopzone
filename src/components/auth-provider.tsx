import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthService } from '@/api/service/auth.service';
import { UserInfo } from '@/api/types';
import { getShopIdAsNumber } from '@/api/utils/token.util';
import { initializeLaunchParams, getShopIdFromParams, getAccountFromParams } from '@/utils/launch-params';
import toast from 'react-hot-toast';

// Auth Context
interface AuthContextType {
  user: UserInfo | null;
  token: string | null;
  sellerToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isNewUser: boolean;
  authenticate: () => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
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
  const [sellerToken, setSellerToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  const isAuthenticated = !!user && !!token;

  // Initialize authentication on app start
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Initialize launch parameters first (reads shop_id and account from URL)
      initializeLaunchParams();
      
      // Get shop_id and account from launch params
      const launchShopId = getShopIdFromParams();
      const launchAccount = getAccountFromParams();
      
      if (launchShopId) {
        console.log('[AUTH_PROVIDER] Shop ID from launch params:', launchShopId);
        // Store shop_id in localStorage for token.util.ts to use
        localStorage.setItem('Shop-Id', launchShopId);
      }
      
      if (launchAccount) {
        console.log('[AUTH_PROVIDER] Account from launch params:', launchAccount);
        // Store account for later use
        localStorage.setItem('launch-account', launchAccount);
      }
      
      // Check if user is already authenticated
      const storedUser = AuthService.getStoredUser();
      const storedToken = AuthService.getStoredToken();
      
      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
        
        // Verify token is still valid by getting user profile
        try {
          const profileResponse = await AuthService.getUserProfile(storedToken);
          if (profileResponse.success && profileResponse.data) {
            setUser(profileResponse.data);
            AuthService.storeAuthData(profileResponse.data, storedToken);
          }
        } catch (error) {
          AuthService.logout();
          setUser(null);
          setToken(null);
          
          // Auto-authenticate after clearing expired data
          await authenticate(true); // Skip loading state since we're already in init
          return; // Exit early since authenticate will handle loading state
        }
      } else {
        // Auto-authenticate when no stored data
        await authenticate(true); // Skip loading state since we're already in init
        return; // Exit early since authenticate will handle loading state
      }
    } catch (error) {
      console.error('❌ [AUTH_PROVIDER] Error initializing auth:', error);
      // Try to authenticate even if there's an error
      try {
        await authenticate(true); // Skip loading state since we're already in init
        return; // Exit early since authenticate will handle loading state
      } catch (authError) {
        console.error('❌ [AUTH_PROVIDER] Authentication failed:', authError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const authenticate = async (skipLoadingState = false) => {
    try {
      if (!skipLoadingState) {
        setIsLoading(true);
      }

      // Authenticate with backend - dùng Zalo SDK thật
      // getUserInfo sẽ tự động hiển thị popup xin quyền (autoRequestPermission: true)
      // Chỉ lấy được dữ liệu thật khi chạy trên Zalo App (không chạy được trên localhost)
      // Lấy shop ID với priority: launch params > env -> localStorage -> default
      const shopId = getShopIdAsNumber();
      console.log('[AUTH_PROVIDER] Using shop_id for authentication:', shopId);
      const authResult = await AuthService.authenticateWithZalo(shopId, {
        email: '',
        requestUserInfo: true, // Xin quyền user info
        avatarSize: 'normal', // Chọn kích thước avatar: "small", "normal", hoặc "large"
        autoRequestPermission: true, // Tự động hiển thị popup xin quyền
      });

      if (authResult.success && authResult.user && authResult.token) {
        // Store auth data
        AuthService.storeAuthData(authResult.user, authResult.token);
        
        // Update state
        setUser(authResult.user);
        setToken(authResult.token);
        setIsNewUser(authResult.isNewUser || false);
        
        // Show success message
        if (authResult.isNewUser) {
          toast.success(`Chào mừng ${authResult.user.name} đến với ứng dụng!`, {
            icon: '🎉',
            duration: 3000
          });
        } else {
          toast.success(`Chào mừng trở lại, ${authResult.user.name}!`, {
            icon: '👋',
            duration: 2000
          });
        }
      } else {
        // Xử lý khi user từ chối quyền (error code -1401)
        if (authResult.error?.includes('từ chối')) {
          toast.error('Bạn cần cấp quyền truy cập để sử dụng ứng dụng.', {
            icon: '⚠️',
            duration: 4000
          });
        } else {
          throw new Error(authResult.error || 'Xác thực thất bại');
        }
      }
    } catch (error: any) {
      console.error('❌ [AUTH_PROVIDER] Authentication failed:', error);
      
      // Xử lý lỗi khi user từ chối quyền
      if (error?.message?.includes('USER_DENIED_PERMISSION') || error?.message?.includes('từ chối')) {
        toast.error('Bạn cần cấp quyền truy cập để sử dụng ứng dụng.', {
          icon: '⚠️',
          duration: 4000
        });
      } else {
        toast.error(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
      }
      throw error;
    } finally {
      if (!skipLoadingState) {
        setIsLoading(false);
      }
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setToken(null);
    setSellerToken(null);
    setIsNewUser(false);
    toast.success('Đã đăng xuất thành công');
  };

  const refreshUser = async () => {
    if (!token) return;
    
    try {
      const profileResponse = await AuthService.getUserProfile(token);
      
      if (profileResponse.success && profileResponse.data) {
        setUser(profileResponse.data);
        AuthService.storeAuthData(profileResponse.data, token);
      }
    } catch (error) {
      console.error('❌ [AUTH_PROVIDER] Error refreshing user:', error);
    }
  };

  const contextValue: AuthContextType = {
    user,
    token,
    sellerToken,
    isAuthenticated,
    isLoading,
    isNewUser,
    authenticate,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protected routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading, authenticate } = useAuth();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        authenticate().catch(console.error);
      }
    }, [isAuthenticated, isLoading, authenticate]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Đang xác thực...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Đang đăng nhập...</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

