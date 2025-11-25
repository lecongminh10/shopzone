import { useState, useCallback, useEffect } from 'react';
import { apiServices } from './service';
import { UserInfo } from './types';
import toast from 'react-hot-toast';

// Zalo Mini App SDK types
interface ZaloUserInfo {
  id: string;
  name: string;
  avatar: string;
}

// Custom hook for API calls
export function useApiService() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = useCallback(async <T>(
    apiCall: () => Promise<T>,
    successMessage?: string,
    errorMessage?: string
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      if (successMessage) {
        toast.success(successMessage);
      }
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMsg);
      toast.error(errorMessage || errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    handleApiCall,
  };
}

// Zalo Authentication hook
export function useZaloAuth() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize authentication on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = apiServices.auth.getStoredToken();
      const storedUser = apiServices.auth.getStoredUser();

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        setIsAuthenticated(true);
      }
    };

    initAuth();
  }, []);

  // Authenticate with Zalo
  const authenticateWithZalo = useCallback(async (
    shopId?: number,
    additionalData?: {
      email?: string;
      mobile?: string;
    }
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiServices.auth.authenticateWithZalo(
        shopId,
        additionalData
      );

      if (result.success && result.user && result.token) {
        // Store authentication data
        apiServices.auth.storeAuthData(result.user, result.token);
        
        // Update state
        setUser(result.user);
        setToken(result.token);
        setIsAuthenticated(true);

        // Show success message
        if (result.isNewUser) {
          toast.success('Đăng ký thành công!');
        } else {
          toast.success('Đăng nhập thành công!');
        }

        return result;
      } else {
        setError(result.error || 'Xác thực thất bại');
        toast.error(result.error || 'Xác thực thất bại');
        return null;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Lỗi hệ thống';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    apiServices.auth.logout();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setError(null);
    toast.success('Đã đăng xuất!');
  }, []);

  // Get user profile
  const getUserProfile = useCallback(async () => {
    if (!token) return null;

    try {
      const response = await apiServices.auth.getUserProfile(token);
      if (response.success && response.data) {
        setUser(response.data);
        apiServices.auth.storeAuthData(response.data, token);
        return response.data;
      }
      return null;
    } catch (err) {
      console.error('Get user profile error:', err);
      return null;
    }
  }, [token]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    authenticateWithZalo,
    logout,
    getUserProfile,
  };
}
