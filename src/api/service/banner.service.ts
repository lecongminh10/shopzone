import { API_CONFIG } from '../types';
import { getShopIdFromToken, getSellerHeaders, getShopIdAsNumber } from '../utils/token.util';
import { buildEndpointWithQuery } from '../utils/endpoint.util';

// Banner types
export interface Banner {
  id: number;
  shop_id: number;
  title: string;
  image: string;
  link: string;
  background: string;
  target: string;
  order: number;
  position: string;
  image_url: string;
  background_url: string;
  open_in_new_tab: boolean;
  is_active: boolean;
  clickable: boolean;
}

export interface BannerListResponse {
  success: boolean;
  message: string;
  data: {
    banners: Banner[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_records: number;
      per_page: number;
      has_next: boolean;
      has_prev: boolean;
    };
    filters: {
      position: string;
      target: string;
      shop_id: number;
    };
  };
}

// Banner Service
export class BannerService {
  // Get banners list
  static async getBanners(options?: {
    shop_id?: number;
    position?: 'all' | 'banner_doitac' | string;
    target?: 'all' | '_blank' | '_self';
    page?: number;
    limit?: number;
  }): Promise<BannerListResponse> {
    const {
      shop_id,
      position = 'all',
      target = 'all',
      page = 1,
      limit = 100,
    } = options || {};

    // Use shop_id from parameter, or get from URL params (priority: URL > env > localStorage > default)
    // Fallback to token if still not available
    const decodedShopId = shop_id || getShopIdAsNumber() || await getShopIdFromToken();

    const params = new URLSearchParams({
      shop_id: decodedShopId.toString(),
      position,
      target,
      page: page.toString(),
      limit: limit.toString(),
    });

    try {
      const endpoint = buildEndpointWithQuery('list-banner-shop', params.toString());
      
      // Try to get headers, but handle token errors gracefully
      let headers: Record<string, string>;
      try {
        headers = await getSellerHeaders();
      } catch (tokenError: any) {
        // If we can't get the token, return empty banners instead of throwing
        if (tokenError?.message?.includes('Unable to get seller token')) {
          console.warn('⚠️ [BANNER_SERVICE] Không thể lấy token người bán, trả về danh sách banner rỗng', {
            error: tokenError?.message,
            shop_id: decodedShopId,
          });
          return {
            success: true,
            message: 'No banners available',
            data: {
              banners: [],
              pagination: {
                current_page: 1,
                total_pages: 0,
                total_records: 0,
                per_page: limit,
                has_next: false,
                has_prev: false,
              },
              filters: {
                position,
                target,
                shop_id: decodedShopId,
              },
            },
          } as BannerListResponse;
        }
        throw tokenError;
      }
      
      let response: Response;
      try {
        response = await fetch(endpoint, {
          method: 'GET',
          headers,
        });
      } catch (fetchError: any) {
        // Handle network errors (server down, CORS, etc.)
        if (fetchError?.message?.includes('Failed to fetch') || 
            fetchError?.name === 'TypeError' ||
            fetchError?.message?.includes('NetworkError')) {
          console.warn('⚠️ [BANNER_SERVICE] Network error fetching banners (handled gracefully):', fetchError.message);
          throw new Error('Network error: Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
        }
        throw fetchError;
      }

      let data: any;
      let responseText: string = '';
      try {
        responseText = await response.text();
        if (!responseText || responseText.trim() === '') {
          // Empty response - return empty banners
          console.warn('⚠️ [BANNER_SERVICE] Empty response from server');
          return {
            success: true,
            message: 'No banners found',
            data: {
              banners: [],
              pagination: {
                current_page: 1,
                total_pages: 0,
                total_records: 0,
                per_page: limit,
                has_next: false,
                has_prev: false,
              },
              filters: {
                position,
                target,
                shop_id: decodedShopId,
              },
            },
          } as BannerListResponse;
        }
        
        // Check if response is HTML (error page from nginx)
        if (responseText.trim().startsWith('<html') || responseText.trim().startsWith('<!DOCTYPE')) {
          console.error('❌ [BANNER_SERVICE] Received HTML error page instead of JSON:', responseText.substring(0, 200));
          
          if (response.status === 403) {
            throw new Error('HTTP 403 Forbidden - Có thể là lỗi CORS hoặc server không cho phép truy cập. Vui lòng kiểm tra cấu hình CORS trên server.');
          }
          
          throw new Error(`Invalid response from server: ${response.status} ${response.statusText}`);
        }
        
        // Remove BOM if present and parse JSON
        const cleanText = responseText.trim().replace(/^\uFEFF/, '');
        data = JSON.parse(cleanText);
      } catch (jsonError: any) {
        // Handle JSON parse errors
        console.error('❌ [BANNER_SERVICE] Failed to parse JSON response:', {
          status: response.status,
          statusText: response.statusText,
          error: jsonError.message,
        });
        console.error('❌ [BANNER_SERVICE] Response text (first 500 chars):', responseText.substring(0, 500));
        console.error('❌ [BANNER_SERVICE] Response text (last 200 chars):', responseText.substring(Math.max(0, responseText.length - 200)));
        
        // Provide helpful error message for 403
        if (response.status === 403) {
          throw new Error('HTTP 403 Forbidden - Có thể là lỗi CORS hoặc server không cho phép truy cập. Vui lòng kiểm tra cấu hình CORS trên server.');
        }
        
        throw new Error(`Invalid response from server: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        const errorMessage = data?.message || `HTTP ${response.status}`;
        console.error(`❌ [BANNER_SERVICE] Failed to fetch banners:`, {
          status: response.status,
          message: errorMessage,
          data: data,
        });
        
        // Provide helpful error message for 403
        if (response.status === 403) {
          throw new Error('HTTP 403 Forbidden - Có thể là lỗi CORS hoặc server không cho phép truy cập. Vui lòng kiểm tra cấu hình CORS trên server.');
        }
        
        throw new Error(errorMessage);
      }

      return data as BannerListResponse;
    } catch (error: any) {
      // Network errors are expected and handled gracefully - log as warning
      if (error?.message?.includes('Network error') || 
          error?.message?.includes('không thể kết nối') ||
          error?.message?.includes('Failed to fetch') ||
          error?.message?.includes('NetworkError')) {
        console.warn('⚠️ [BANNER_SERVICE] Network error fetching banners (handled gracefully):', error.message);
      } else if (error?.message?.includes('Unable to get seller token')) {
        // Token errors are handled above, but log as warning if we reach here
        console.warn('⚠️ [BANNER_SERVICE] Token error (should be handled gracefully):', error.message);
      } else if (error?.message) {
        // Only log if error has a meaningful message
        console.error('❌ [BANNER_SERVICE] Error fetching banners:', error.message);
      } else {
        // Log error object details if message is missing
        console.error('❌ [BANNER_SERVICE] Error fetching banners:', error?.toString() || JSON.stringify(error));
      }
      // Re-throw with a meaningful error message
      throw error;
    }
  }
}

