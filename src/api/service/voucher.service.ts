import { API_CONFIG } from '../types';
import { buildEndpointWithQuery } from '../utils/endpoint.util';
import { ApiResponse } from '../types';

// Voucher interfaces
export interface Voucher {
  id: number;
  shop: number;
  code: string;
  discount: number;
  max_discount: number;
  type: 'tru' | 'phantram'; // 'tru' = giảm trực tiếp, 'phantram' = giảm theo phần trăm
  scope: 'all' | 'sanpham'; // 'all' = áp dụng toàn bộ, 'sanpham' = chỉ áp dụng sản phẩm cụ thể
  product_ids?: string;
  condition_amount: number; // Số tiền tối thiểu để áp dụng voucher
  start: number; // Timestamp
  expired: number; // Timestamp
  status: number;
  description?: string;
  icon?: string;
  min_price?: number;
  max_price?: number;
  allow_combination: boolean;
  max_uses_per_user?: number;
  max_global_uses?: number;
  current_uses?: number;
  date_post?: string;
  start_readable?: string;
  expired_readable?: string;
  purpose?: 'default' | 'mini_game'; // Loại voucher: 'default' hoặc 'mini_game'
  from_mini_game?: boolean; // true nếu voucher từ mini game
  won_at?: string; // Thời gian trúng voucher (chỉ có với voucher từ mini game)
}

export interface VoucherListResponse extends ApiResponse {
  data: Voucher[];
  shop_id?: number;
  user_id?: number | null; // ID user (nếu có)
  count?: number;
}

export class VoucherService {
  /**
   * Get list of vouchers for a shop
   */
  static async getVouchers(options?: {
    shopId?: number;
    limit?: number;
    token?: string;
  }): Promise<VoucherListResponse> {
    const { shopId, limit = 100, token } = options || {};
    
    // Get user object from localStorage để đảm bảo có user_id
    let user: any = null;
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        user = JSON.parse(userStr);
      }
    } catch (e) {
      console.warn('⚠️ [VOUCHER_SERVICE] Cannot parse user from localStorage:', e);
    }
    
    // Get token from localStorage if not provided (user token, không cần seller token)
    let userToken = token;
    if (!userToken) {
      userToken = localStorage.getItem('token') || localStorage.getItem('token-seller') || '';
    }
    
    // Đảm bảo có token (cần thiết để API lấy user_id từ token)
    if (!userToken && user && user.user_id) {
      console.warn('⚠️ [VOUCHER_SERVICE] No token found but user object exists. API may not return mini_game vouchers.');
    }
    
    // Get shopId following priority: VITE_KEY_ID -> localStorage.getItem('Shop-Id') -> user object (localStorage.getItem('user'))
    let decodedShopId = shopId;
    if (!decodedShopId) {
      // Priority 1: VITE_KEY_ID from environment (highest priority)
      const envShopId = import.meta.env.VITE_KEY_ID;
      if (envShopId) {
        decodedShopId = parseInt(envShopId, 10);
      } else {
        // Priority 2: Shop-Id from localStorage
        const storedShopId = localStorage.getItem('Shop-Id');
        if (storedShopId) {
          decodedShopId = parseInt(storedShopId, 10);
        } else {
          // Priority 3: Fallback to user object from localStorage.getItem('user')
          if (user) {
            // Lấy từ user.shop_id hoặc user.shop
            decodedShopId = parseInt(user.shop_id || user.shop || API_CONFIG.KEY_ID, 10);
          } else {
            // Cuối cùng: fallback to API_CONFIG.KEY_ID
            decodedShopId = parseInt(API_CONFIG.KEY_ID, 10);
          }
        }
      }
    }
    
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    
    // Gửi user_id lên API (nếu có) để API lấy thêm voucher từ mini_game
    if (user && user.user_id) {
      params.append('user_id', user.user_id.toString());
    }
    
    const endpoint = buildEndpointWithQuery('list-voucher', params.toString());
    
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': userToken ? `Bearer ${userToken}` : '',
          'Shop-Id': decodedShopId.toString(),
        },
      });
      
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Invalid JSON response. Status: ${response.status}. Response: ${responseText.substring(0, 100)}`);
      }
      
      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP ${response.status}`);
      }
      
      // Log để debug (có thể bỏ sau)
      if (user && user.user_id) {
        console.log(`✅ [VOUCHER_SERVICE] Fetched vouchers for user_id: ${user.user_id}, shop_id: ${decodedShopId}, count: ${data.count || 0}`);
        if (data.user_id && data.user_id !== user.user_id) {
          console.warn(`⚠️ [VOUCHER_SERVICE] user_id mismatch: token has ${data.user_id}, localStorage has ${user.user_id}`);
        }
      }
      
      return data as VoucherListResponse;
    } catch (error: any) {
      console.error('❌ [VOUCHER_SERVICE] Error fetching vouchers:', error);
      throw error;
    }
  }
  
  /**
   * Calculate voucher discount based on order amount
   * Logic: ưu tiên min_price, nếu không có thì dùng condition_amount
   * Chỉ check điều kiện tối thiểu, không check max_price
   */
  static calculateDiscount(voucher: Voucher, orderAmount: number): number {
    if (!voucher) return 0;
    
    // Nếu có min_price > 0, ưu tiên dùng min_price thay vì condition_amount
    if (voucher.min_price && voucher.min_price > 0) {
      if (orderAmount < voucher.min_price) {
        return 0;
      }
    } else {
      // Nếu không có min_price hoặc min_price = 0, dùng condition_amount
      if (orderAmount < voucher.condition_amount) {
        return 0;
      }
    }
    
    if (voucher.type === 'tru') {
      // Giảm trực tiếp
      return Math.min(voucher.discount, orderAmount);
    } else if (voucher.type === 'phantram') {
      // Giảm theo phần trăm
      const discount = Math.floor((orderAmount * voucher.discount) / 100);
      // Nếu có max_discount, giới hạn tối đa
      if (voucher.max_discount > 0) {
        return Math.min(discount, voucher.max_discount);
      }
      return discount;
    }
    
    return 0;
  }
  
  /**
   * Format voucher discount text
   */
  static formatDiscount(voucher: Voucher): string {
    if (voucher.type === 'tru') {
      return `Giảm ${voucher.discount.toLocaleString('vi-VN')}₫`;
    } else if (voucher.type === 'phantram') {
      if (voucher.max_discount > 0) {
        return `Giảm ${voucher.discount}% (tối đa ${voucher.max_discount.toLocaleString('vi-VN')}₫)`;
      }
      return `Giảm ${voucher.discount}%`;
    }
    return '';
  }
}

