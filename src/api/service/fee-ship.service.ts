import { API_CONFIG } from '../types';
import { buildEndpoint, buildEndpointWithQuery } from '../utils/endpoint.util';
import { httpClient } from '../http-client';
import { ApiResponse } from '../types';
import { getSellerToken } from '../utils/token.util';

export interface FeeShipProductShippingInfo {
  has_free_shipping: boolean;
  shipping_type: string;
  free_ship_mode: number;
  free_ship_type: string;
  free_ship_discount_value: number;
  min_order_value: number;
  free_ship_label: string;
  free_ship_details: string;
  ship_support: number;
  ship_support_type: string;
}

export interface FeeShipProduct {
  id: number;
  sp_id: number;
  shop_id: number;
  title: string;
  image?: string | null;
  image_url?: string | null;
  link?: string | null;
  current_price: number;
  original_price: number;
  stock?: number;
  category_shop?: string;
  brand?: string;
  color?: string;
  size?: string;
  weight?: number;
  weight_ship?: number;
  warehouse_id?: number;
  shipping_info: FeeShipProductShippingInfo;
  images_list?: string[];
  view?: number; // Số lượt xem (dùng để tính rating count và sales count)
}

export interface FeeShipPagination {
  current_page: number;
  total_pages: number;
  total_records: number;
  per_page: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface FeeShipProductFilters {
  status?: number;
  active?: number;
  search?: string;
  page?: number;
  limit?: number;
  shop_id?: number;
}

export type FeeShipProductListResponse = ApiResponse<{
  products: FeeShipProduct[];
  pagination: FeeShipPagination;
  filters: FeeShipProductFilters;
}>;

export interface FeeShipProductListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: number;
}

// Shipping Quote interfaces
export interface ShippingQuoteProduct {
  id: number; // product_id (sanpham_shop.id)
  phanloai_id?: number | null; // phanloai_sanpham_shop.id (optional)
  quantity?: number; // Số lượng (default: 1)
}

export interface ShippingQuoteRequest {
  user_id: number;
  products: ShippingQuoteProduct[];
  receiver_province?: string;
  receiver_district?: string;
  receiver_ward?: string;
}

export interface BestShipping {
  fee: number;
  provider: string;
  carrier_name: string;
  carrier_id?: number;
  provider_code?: string;
  eta_text?: string;
}

export interface WarehouseQuote {
  kho_id: number;
  warehouse_location: string;
  weight: number;
  value: number;
  best_shipping: BestShipping;
  all_shipping_options: ShippingOption[];
  lowest_fee: number;
  items_count: number;
  items: Array<{
    product_id: number;
    phanloai_id: number | null;
    quantity: number;
    weight: number;
    value: number;
  }>;
}

export interface ShippingOption {
  provider: string;
  carrier_name: string;
  carrier_id?: number;
  fee: number;
  provider_code?: string;
  eta_text?: string;
}

export interface ShippingQuoteResponse {
  success: boolean;
  message: string;
  data: {
    total_fee: number;
    warehouses_count: number;
    warehouse_quotes: WarehouseQuote[];
    best_shipping_overall: BestShipping;
    best_simple: {
      fee: number;
      provider: string;
      eta_text?: string;
    };
    all_quotes: ShippingOption[];
    receiver_address: {
      province: string;
      district: string;
      ward: string;
    };
    input: {
      products: Array<{
        product_id: number;
        phanloai_id: number | null;
        quantity: number;
        kho_id: number;
        weight: number;
        value: number;
      }>;
      user_id: number;
    };
  };
}

// Fee Ship Service
export class FeeShipService {
  static async getFreeshipProducts(
    params: FeeShipProductListParams = {},
    options?: {
      token?: string;
      shopId?: number;
    }
  ): Promise<FeeShipProductListResponse> {
    const { page = 1, limit = 50, search, status = 1 } = params;

    // Lấy user token (Bearer token) cho Authorization header
    let userToken =
      options?.token ||
      localStorage.getItem('token') ||
      '';

    // Lấy seller token cho Token-Seller header
    let sellerToken: string;
    try {
      sellerToken = await getSellerToken();
    } catch (error) {
      throw new Error('Không thể lấy seller token. Vui lòng thử lại.');
    }

    let shopId = options?.shopId;
    if (!shopId) {
      // Luôn dùng API_CONFIG.KEY_ID (từ VITE_KEY_ID) thay vì lấy từ localStorage hoặc user
      // Vì Shop-Id là shop_id của app, không phải shop_id của user
      shopId = parseInt(API_CONFIG.KEY_ID, 10);
    }

    if (!shopId || shopId <= 0) {
      throw new Error('Shop ID is required. Please ensure you are logged in as a seller.');
    }

    // Build query params like banner.service.ts and category.service.ts
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      status: status.toString(),
    });
    if (search) {
      queryParams.append('search', search);
    }

    // Build endpoint using buildEndpointWithQuery like other services
    const endpoint = buildEndpointWithQuery('fee-list-product', queryParams.toString());

    const headers: Record<string, string> = {
      'Shop-Id': shopId.toString(),
      'Token-Seller': sellerToken,
    };

    // Chỉ thêm Authorization header nếu có userToken
    if (userToken) {
      headers['Authorization'] = `Bearer ${userToken}`;
    }

    const buildEmptyResponse = (
      message: string
    ): FeeShipProductListResponse => ({
      success: true,
      message,
      data: {
        products: [],
        pagination: {
          current_page: page,
          total_pages: 0,
          total_records: 0,
          per_page: limit,
          has_next: false,
          has_prev: false,
        },
        filters: {
          page,
          limit,
          status,
          ...(search ? { search } : {}),
          shop_id: shopId,
        },
      },
    });

    try {
      // Use fetch directly like checkout.service.ts (buildEndpoint returns full URL)
      const response = await fetch(endpoint, {
        method: 'GET',
        headers,
      });

      const responseText = await response.text();
      let data: FeeShipProductListResponse;
      
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ [FEE_SHIP_SERVICE] Invalid JSON response:', responseText);
        throw new Error(`Server returned invalid JSON. Status: ${response.status}`);
      }

      if (!response.ok) {
        const errorMessage = data.message || (data as any).error || `HTTP ${response.status}`;
        throw new Error(errorMessage);
      }

      return data;
    } catch (error: any) {
      const message =
        (error instanceof Error && error.message) ||
        (typeof error === 'string' ? error : '');

      if (
        typeof message === 'string' &&
        message.includes('Không có hành động nào được xử lý')
      ) {
        console.warn(
          '⚠️ [FeeShipService] Freeship endpoint chưa khả dụng trên server hiện tại. Trả về danh sách rỗng.',
          { endpoint }
        );
        return buildEmptyResponse(
          'Tính năng freeship đang được cập nhật, vui lòng thử lại sau.'
        );
      }

      throw error;
    }
  }

  // Get shipping fee from products
  static async getShippingFee(
    request: ShippingQuoteRequest,
    options?: {
      token?: string;
      shopId?: number;
    }
  ): Promise<ShippingQuoteResponse> {
    let shopId = options?.shopId;
    
    // Nếu không có shopId từ options, luôn dùng API_CONFIG.KEY_ID (từ VITE_KEY_ID)
    // Vì Shop-Id là shop_id của app, không phải shop_id của user
    if (!shopId) {
      shopId = parseInt(API_CONFIG.KEY_ID, 10);
    }
    
    // Lấy seller token cho Token-Seller header
    let sellerToken: string;
    try {
      sellerToken = await getSellerToken();
    } catch (error) {
      throw new Error('Không thể lấy seller token. Vui lòng thử lại.');
    }

    if (!shopId || shopId <= 0) {
      throw new Error('Shop ID is required. Please ensure you are logged in as a seller.');
    }

    try {
      const endpoint = buildEndpoint('fee-ship');
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Shop-Id': shopId.toString(),
        'Token-Seller': sellerToken,
      };
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          user_id: request.user_id,
          products: request.products,
          ...(request.receiver_province && { receiver_province: request.receiver_province }),
          ...(request.receiver_district && { receiver_district: request.receiver_district }),
          ...(request.receiver_ward && { receiver_ward: request.receiver_ward }),
        }),
      });

      // Lấy response text trước để kiểm tra
      const responseText = await response.text();
      
      // Kiểm tra nếu response không phải JSON hợp lệ
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ [FEE_SHIP_SERVICE] Invalid JSON response:', responseText);
        console.error('❌ [FEE_SHIP_SERVICE] Response status:', response.status);
        throw new Error(`Server returned invalid JSON. Status: ${response.status}. Response: ${responseText.substring(0, 200)}`);
      }

      if (!response.ok) {
        const errorMessage = data.message || data.error || `HTTP ${response.status}`;
        console.error('❌ [FEE_SHIP_SERVICE] API Error:', {
          status: response.status,
          message: errorMessage,
          response: data
        });
        throw new Error(errorMessage);
      }

      return data as ShippingQuoteResponse;
    } catch (error: any) {
      console.error('❌ [FEE_SHIP_SERVICE] Error fetching shipping fee:', error);
      // Re-throw với message rõ ràng hơn
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(error?.message || 'Unknown error occurred');
    }
  }

  // Get shipping support fee for a product
  static async getShippingSupport(
    productId: number,
    options?: {
      token?: string;
      shopId?: number;
    }
  ): Promise<ApiResponse<{
    product: {
      id: number;
      sp_id: number;
      shop_id: number;
      title: string;
      status: number;
      active: number;
      current_price: number;
      original_price: number;
      shipping_info: FeeShipProductShippingInfo;
    };
  }>> {
    let shopId = options?.shopId;
    
    // Nếu không có shopId từ options, luôn dùng API_CONFIG.KEY_ID (từ VITE_KEY_ID)
    // Vì Shop-Id là shop_id của app, không phải shop_id của user
    if (!shopId) {
      shopId = parseInt(API_CONFIG.KEY_ID, 10);
    }
    
    // Lấy seller token cho Token-Seller header
    let sellerToken: string;
    try {
      sellerToken = await getSellerToken();
    } catch (error) {
      throw new Error('Không thể lấy seller token. Vui lòng thử lại.');
    }

    if (!shopId || shopId <= 0) {
      throw new Error('Shop ID is required. Please ensure you are logged in as a seller.');
    }

    try {
      const endpoint = buildEndpoint('check-support-fee', {
        product_id: productId,
        shop_id: shopId
      });
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Shop-Id': shopId.toString(),
        'Token-Seller': sellerToken,
      };
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers,
      });

      const responseText = await response.text();
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ [FEE_SHIP_SERVICE] Invalid JSON response:', responseText);
        throw new Error(`Server returned invalid JSON. Status: ${response.status}`);
      }

      if (!response.ok) {
        const errorMessage = data.message || data.error || `HTTP ${response.status}`;
        console.error('❌ [FEE_SHIP_SERVICE] API Error:', {
          status: response.status,
          message: errorMessage,
          response: data
        });
        throw new Error(errorMessage);
      }

      return data as ApiResponse<{
        product: {
          id: number;
          sp_id: number;
          shop_id: number;
          title: string;
          status: number;
          active: number;
          current_price: number;
          original_price: number;
          shipping_info: FeeShipProductShippingInfo;
        };
      }>;
    } catch (error: any) {
      console.error('❌ [FEE_SHIP_SERVICE] Error fetching shipping support:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(error?.message || 'Unknown error occurred');
    }
  }
}

