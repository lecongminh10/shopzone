import { httpClient } from "../http-client";
import { ApiResponse, UserInfo } from "../types";

// User Service
export class UserService {
  // Get user profile
  static async getUserProfile(token: string): Promise<ApiResponse<UserInfo>> {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return httpClient.get<ApiResponse<UserInfo>>("/user/profile", headers);
  }

  // Update user profile
  static async updateUserProfile(
    userData: Partial<UserInfo>,
    token: string
  ): Promise<ApiResponse<UserInfo>> {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return httpClient.put<ApiResponse<UserInfo>>(
      "/user/profile",
      userData,
      headers
    );
  }

  // Get user orders
  static async getUserOrders(token: string): Promise<ApiResponse> {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return httpClient.get<ApiResponse>("/user/orders", headers);
  }

  // Get user wallet
  static async getUserWallet(token: string): Promise<ApiResponse> {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return httpClient.get<ApiResponse>("/user/wallet", headers);
  }

  // Update user wallet
  static async updateUserWallet(
    walletData: any,
    token: string
  ): Promise<ApiResponse> {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return httpClient.put<ApiResponse>("/user/wallet", walletData, headers);
  }
}
