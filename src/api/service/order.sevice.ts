import { Order } from "@/types";
import { ApiResponse } from "../types";
import { buildEndpointWithQuery, buildEndpoint } from "../utils/endpoint.util";

export class OrderService {
  static async getOrders(
    bearerToken: string,
    options?: {
      status?: string | number;
      page?: number;
      limit?: number;
      search?: string;
    }
  ): Promise<Order[]> {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (options?.status !== undefined) {
        params.append('status', String(options.status));
      }
      if (options?.page) {
        params.append('page', String(options.page));
      }
      if (options?.limit) {
        params.append('limit', String(options.limit));
      }
      if (options?.search) {
        params.append('search', options.search);
      }

      // Build endpoint with /mini-app/v1 prefix
      const endpoint = buildEndpointWithQuery('list-order', params.toString());
      
      // Debug log to verify endpoint is built correctly
      console.log('[ORDER_SERVICE] Endpoint:', endpoint);
      console.log('[ORDER_SERVICE] BASE_URL:', import.meta.env.VITE_API_BASE_URL || 'https://api.socdo.vn');

      const headers: HeadersInit = {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      };

      // Get Shop-Id from token or localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          const shopId = user.shop_id || user.shop;
          if (shopId) {
            headers['Shop-Id'] = String(shopId);
          }
        } catch (e) {
          // Ignore parse error
        }
      }

      const response = await fetch(endpoint, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      if (!responseText || responseText.trim() === '') {
        throw new Error('Empty response from server');
      }

      // Remove BOM if present
      const cleanText = responseText.trim().replace(/^\uFEFF/, '');
      const data: ApiResponse<Order[]> = JSON.parse(cleanText);

      if (!data) return [];

      let orders: Order[] = [];

      if (data.success && Array.isArray(data.data)) {
        orders = data.data;
      } else if (Array.isArray((data as any)?.data?.orders)) {
        orders = (data as any).data.orders;
      } else if (Array.isArray((data as any)?.orders)) {
        orders = (data as any).orders;
      }

      return orders;
    } catch (error: any) {
      console.error("❌ Lỗi khi lấy danh sách đơn hàng:", error);
      return [];
    }
  }

  // Get order detail by ID
  static async getOrderDetail(
    bearerToken: string,
    orderId: number | string
  ): Promise<Order | null> {
    try {
      if (!orderId) {
        throw new Error("Order ID is required");
      }

      const params = new URLSearchParams({
        order_id: String(orderId),
      });

      // Build endpoint with /mini-app/v1 prefix
      const endpoint = buildEndpointWithQuery('get-detail-order', params.toString());
      
      if (import.meta.env.DEV) {
        console.log('[ORDER_SERVICE] Get Order Detail Endpoint:', endpoint);
      }

      const headers: HeadersInit = {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      };

      // Get Shop-Id from token or localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          const shopId = user.shop_id || user.shop;
          if (shopId) {
            headers['Shop-Id'] = String(shopId);
          }
        } catch (e) {
          // Ignore parse error
        }
      }

      const response = await fetch(endpoint, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      if (!responseText || responseText.trim() === '') {
        throw new Error('Empty response from server');
      }

      // Remove BOM if present
      const cleanText = responseText.trim().replace(/^\uFEFF/, '');
      const data: ApiResponse<Order> = JSON.parse(cleanText);

      if (!data || !data.success) {
        console.error('[ORDER_SERVICE] Failed to get order detail:', data);
        return null;
      }

      // Log để debug (chỉ trong development)
      if (import.meta.env.DEV) {
        console.log('[ORDER_SERVICE] API Response:', data);
        console.log('[ORDER_SERVICE] Order data:', data.data);
        console.log('[ORDER_SERVICE] Reviewed products:', (data.data as any).reviewed_products);
      }

      // Return order data from response.data (giữ nguyên structure từ API)
      return data.data as Order;
    } catch (error: any) {
      console.error("❌ Lỗi khi lấy chi tiết đơn hàng:", error);
      return null;
    }
  }

  // Cancel order
  static async cancelOrder(
    bearerToken: string,
    orderId: number | string,
    orderCode?: string
  ): Promise<ApiResponse<{ order_id: number; order_code: string; status: number; status_text: string }>> {
    try {
      if (!orderId && !orderCode) {
        throw new Error("Order ID or Order Code is required");
      }

      const endpoint = buildEndpoint('cannel-order');
      
      console.log('[ORDER_SERVICE] Cancel Order Endpoint:', endpoint);

      const headers: HeadersInit = {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      };

      const requestBody: any = {};
      if (orderId) {
        requestBody.order_id = orderId;
      }
      if (orderCode) {
        requestBody.order_code = orderCode;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      if (!responseText || responseText.trim() === '') {
        throw new Error('Empty response from server');
      }

      // Remove BOM if present
      const cleanText = responseText.trim().replace(/^\uFEFF/, '');
      const data: ApiResponse<{ order_id: number; order_code: string; status: number; status_text: string }> = JSON.parse(cleanText);

      if (!data || !data.success) {
        throw new Error(data.message || 'Failed to cancel order');
      }

      return data;
    } catch (error: any) {
      console.error("❌ Lỗi khi hủy đơn hàng:", error);
      throw error;
    }
  }
}
