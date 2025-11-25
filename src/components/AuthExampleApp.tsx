import React, { useEffect, useState } from 'react';
import { AuthService } from '../api/service/auth.service';
import { RequestPermissionModal } from './RequestPermissionModal';
import { API_CONFIG } from '../api/types';

interface User {
  user_id: number;
  name: string;
  mobile: string;
  email: string;
  avatar: string;
}

const App: React.FC = () => {
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleAuth();
  }, []);

  const handleAuth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Đăng nhập không xin quyền phone trước
      const result = await AuthService.authenticateWithZalo(
        parseInt(API_CONFIG.KEY_ID),
        { 
          requestPhone: false, // Chưa xin phone
          requestUserInfo: true, // Xin quyền user info
          email: '' // Có thể để trống
        }
      );

      if (result.success && result.user && result.token) {
        setUser(result.user);
        AuthService.storeAuthData(result.user, result.token);
        
        // Sau khi đăng nhập thành công, hiện modal xin phone (tùy chọn)
        if (!result.user.mobile || result.user.mobile === '') {
          setShowPhoneModal(true);
        }
      } else {
        setError(result.error || 'Xác thực thất bại');
      }
    } catch (err: any) {
      console.error('❌ [APP] Authentication failed:', err);
      setError(err.message || 'Lỗi hệ thống');
    } finally {
      setLoading(false);
    }
  };

  const handlePhonePermissionGranted = async (phoneToken: string) => {
    try {
      const token = AuthService.getStoredToken();
      if (token) {
        const success = await AuthService.updatePhoneNumber(token, phoneToken);
        if (success) {
          // Refresh user info
          const profileResponse = await AuthService.getUserProfile(token);
          if (profileResponse.success && profileResponse.data) {
            setUser(profileResponse.data);
            AuthService.storeAuthData(profileResponse.data, token);
          }
        } else {
          console.error('❌ [APP] Failed to update phone number');
        }
      }
    } catch (error) {
      console.error('❌ [APP] Error updating phone:', error);
    }
  };

  const handleRequestPhoneLater = () => {
    // Có thể lưu flag để hiện lại sau
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setShowPhoneModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang đăng nhập...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Lỗi xác thực</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={handleAuth}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">👤</div>
          <p className="text-gray-600">Chưa đăng nhập</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        {/* User Info */}
        <div className="text-center mb-6">
          <img 
            src={user.avatar || '/default-avatar.png'} 
            alt="Avatar" 
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600">User ID: {user.user_id}</p>
        </div>

        {/* User Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <span className="text-gray-500 w-20">Email:</span>
            <span className="text-gray-800">{user.email || 'Chưa cập nhật'}</span>
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-500 w-20">Phone:</span>
            <span className="text-gray-800">
              {user.mobile ? (
                user.mobile.startsWith('PHONE_TOKEN:') ? 
                  'Đang xử lý...' : 
                  user.mobile
              ) : (
                <button 
                  onClick={() => setShowPhoneModal(true)}
                  className="text-blue-500 hover:text-blue-600 underline"
                >
                  Thêm số điện thoại
                </button>
              )}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button 
            onClick={() => setShowPhoneModal(true)}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            📞 Cập nhật số điện thoại
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            👋 Đăng xuất
          </button>
        </div>

        {/* Debug Info */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold text-gray-700 mb-2">Debug Info:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div>User ID: {user.user_id}</div>
            <div>Mobile: {user.mobile || 'null'}</div>
            <div>Email: {user.email || 'null'}</div>
          </div>
          
          <div className="mt-3 space-x-2">
            <button 
              onClick={() => AuthService.debugZaloSDKResponse()}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Debug Zalo SDK
            </button>
            
            <button 
              onClick={() => AuthService.testGetZaloUserInfo()}
              className="text-xs bg-green-500 text-white px-2 py-1 rounded"
            >
              Test Zalo Info
            </button>
          </div>
        </div>
      </div>

      {/* Phone Permission Modal */}
      <RequestPermissionModal
        visible={showPhoneModal}
        onClose={() => {
          setShowPhoneModal(false);
          handleRequestPhoneLater();
        }}
        onSuccess={handlePhonePermissionGranted}
      />
    </div>
  );
};

export default App;
