import { buildEndpoint } from "../utils/endpoint.util";
import { getSellerToken } from "../utils/token.util";
import { AuthService } from "./auth.service";
import { ApiResponse } from "../types";

// Notification types

export interface NotificationData {
  order_id?: number;
  order_code?: string;
  product_title?: string;
  product_image?: string;
  product_price?: number;
  old_status?: number;
  new_status?: number;
  total_amount?: number;
}

export interface NotificationListResponse {
  success: boolean;
  message: string;
  data: Notification[];
}

export interface Notification {
  id: number;
  title: string;
  content: string;
  type?: string;
  image?: string;
  product_image?: string;
  link?: string;
  is_read?: number;
  created_at?: number;
  updated_at?: number;
  data?: NotificationData; // <-- thêm vào đây
}

// Notification Service
export class NotificationService {
  static async getListNotification(): Promise<NotificationListResponse> {
    try {
      const endpoint = buildEndpoint("get-list-notification");

      let headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      const userToken = AuthService.getStoredToken();
      if (userToken) headers["Authorization"] = `Bearer ${userToken}`;
      else headers["Token-Seller"] = await getSellerToken();

      const response = await fetch(endpoint, { method: "GET", headers });
      const text = await response.text();
      const data = JSON.parse(text || "{}");

      if (!response.ok) {
        throw new Error(data?.message || `HTTP ${response.status}`);
      }

      // Lấy array notifications từ data.notifications
      const notifications = Array.isArray(data.data?.notifications)
        ? data.data.notifications
        : [];

      return {
        success: data.success ?? false,
        message: data.message ?? "",
        data: notifications,
      };
    } catch (err: any) {
      console.error("❌ [NotificationService] Error:", err);
      return {
        success: false,
        message: err.message || "Lỗi fetch notifications",
        data: [],
      };
    }
  }
}
