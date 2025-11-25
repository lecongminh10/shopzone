import { API_CONFIG } from '../types';
import { buildEndpointWithQuery } from '../utils/endpoint.util';
import { getShopIdFromToken, getSellerHeaders } from '../utils/token.util';

export interface FlashSaleVariant {
  variant_id: number;
  color: string;
  size: string;
  original_price: number;
  flash_price: number;
  quantity: number;
  discount_percent: number;
  savings: number;
}

export interface FlashSaleProduct {
  id: number;
  sp_id: number;
  title: string;
  image: string;
  image_url: string;
  link: string;
  category: string;
  category_shop: string;
  status: number;
  stock: number;
  original_price: number;
  current_price: number;
  brand: string;
  color: string;
  size: string;
  weight: string;
  images: string;
  view: number;
  date_post: number;
  active: number;
  flash_sale_variants: FlashSaleVariant[];
}

export interface FlashSale {
  id: number;
  shop_id: number;
  title: string;
  type: string;
  status: number;
  timeline: string;
  date_start: number;
  date_end: number;
  date_post: number;
  start_time: string;
  end_time: string;
  post_time: string;
  time_remaining: number;
  is_active: boolean;
  products: FlashSaleProduct[];
  products_count: number;
  main_products: string[];
  sub_ids: string[];
}

export interface FlashSaleListResponse {
  success: boolean;
  message: string;
  data: {
    flashsales: FlashSale[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_records: number;
      per_page: number;
      has_next: boolean;
      has_prev: boolean;
    };
    filters: {
      status: number;
      loai: string;
      include_products: number;
      shop_id: number;
    };
  };
}

export class FlashSaleService {
  /**
   * Get flash sale list
   */
  static async getFlashSales(options?: {
    shop_id?: number;
    status?: number;
    loai?: string;
    page?: number;
    limit?: number;
    include_products?: number;
  }): Promise<FlashSaleListResponse> {
    const {
      shop_id,
      status = 1,
      loai = 'flash_sale',
      page = 1,
      limit = 100,
      include_products = 1,
    } = options || {};

    // Get shop_id from token
    const decodedShopId = shop_id || await getShopIdFromToken();

    const params = new URLSearchParams({
      shop_id: decodedShopId.toString(),
      status: status.toString(),
      loai: loai,
      page: page.toString(),
      limit: limit.toString(),
      include_products: include_products.toString(),
    });

    try {
      const endpoint = buildEndpointWithQuery('list-flashsale-shop', params.toString());
      const headers = await getSellerHeaders();
      const response = await fetch(endpoint, {
        method: 'GET',
        headers,
      });

      const contentType = response.headers.get('content-type');

      // Always read as text first to handle parsing errors better
      const responseText = await response.text();

      // Read response content only once
      let data: any;
      if (contentType && contentType.includes('application/json')) {
        try {
          // Try to parse JSON
          if (!responseText || responseText.trim() === '') {
            throw new Error('Empty response from server');
          }
          
          // Remove BOM if present
          const cleanText = responseText.trim().replace(/^\uFEFF/, '');
          data = JSON.parse(cleanText);
        } catch (parseError: any) {
          console.error('❌ [FLASH_SALE_SERVICE] JSON parse error:', parseError);
          console.error('❌ [FLASH_SALE_SERVICE] Parse error details:', {
            message: parseError.message,
            name: parseError.name,
            stack: parseError.stack,
          });
          console.error('❌ [FLASH_SALE_SERVICE] Response text (first 500 chars):', responseText.substring(0, 500));
          console.error('❌ [FLASH_SALE_SERVICE] Response text (last 200 chars):', responseText.substring(Math.max(0, responseText.length - 200)));
          throw new Error(`Failed to parse JSON response: ${parseError.message}. Response may be corrupted or invalid.`);
        }
      } else {
        console.error('❌ [FLASH_SALE_SERVICE] Non-JSON response:', responseText.substring(0, 200));
        
        if (response.status === 403) {
          throw new Error('HTTP 403 Forbidden - Có thể là lỗi CORS hoặc server không cho phép truy cập. Vui lòng kiểm tra cấu hình CORS trên server.');
        }
        
        if (!response.ok) {
          throw new Error(responseText.length > 100 ? `HTTP ${response.status}` : responseText);
        }
        throw new Error('Server returned non-JSON response');
      }

      if (!response.ok) {
        const errorMessage = data?.message || `HTTP ${response.status}`;
        
        // Provide helpful error message for 403
        if (response.status === 403) {
          throw new Error('HTTP 403 Forbidden - Có thể là lỗi CORS hoặc server không cho phép truy cập. Vui lòng kiểm tra cấu hình CORS trên server.');
        }
        
        throw new Error(errorMessage);
      }

      // Validate response structure before returning
      if (!data || typeof data !== 'object') {
        console.error('❌ [FLASH_SALE_SERVICE] Invalid data structure:', data);
        throw new Error('Invalid response data structure from server');
      }

      return data as FlashSaleListResponse;
    } catch (error: any) {
      console.error('❌ [FLASH_SALE_SERVICE] Error fetching flash sales:', error);
      console.error('❌ [FLASH_SALE_SERVICE] Error details:', {
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
      });
      throw error;
    }
  }

  /**
   * Get a single flash sale by ID
   */
  static async getFlashSaleById(flashSaleId: number, shop_id?: number): Promise<FlashSale | null> {
    const response = await this.getFlashSales({
      shop_id,
      limit: 1000, // Get all to find the one we want
    });

    if (response.success && response.data.flashsales) {
      const flashSale = response.data.flashsales.find(fs => fs.id === flashSaleId);
      return flashSale || null;
    }

    return null;
  }
}

