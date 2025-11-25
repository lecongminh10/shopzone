import React from 'react';
import { useAuth } from '@/components/simple-auth-provider';

const AuthStatus: React.FC = () => {
  const { user, token, isAuthenticated, isLoading, authenticate, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-blue-800 font-medium">Đang xác thực...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-yellow-800 font-medium">Chưa đăng nhập</h3>
            <p className="text-yellow-700 text-sm">Vui lòng đăng nhập để sử dụng ứng dụng</p>
          </div>
          <button
            onClick={authenticate}
            className="bg-yellow-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-yellow-700"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-green-800 font-medium">Đã đăng nhập</h3>
          <p className="text-green-700 text-sm">
            Xin chào, <strong>{user?.name}</strong>!
          </p>
          <div className="text-xs text-green-600 mt-1">
            User ID: {user?.user_id} | Shop ID: {user?.shop_id}
          </div>
        </div>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default AuthStatus;
