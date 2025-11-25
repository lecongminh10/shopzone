/**
 * Token Utility
 * Provides reusable functions for managing authentication tokens
 */

import { AuthService } from '../service/auth.service';
import { getShopIdFromParams } from '../../utils/launch-params';

export interface DecodedToken {
  user_id: number;
  [key: string]: any;
}

/**
 * Get shop ID with priority:
 * 1. Launch params (from URL) - highest priority
 * 2. VITE_KEY_ID (env)
 * 3. Shop-Id in localStorage
 * 4. default "23933"
 * @returns {string} The shop ID
 */
export function getShopId(): string {
  // Priority 1: Launch params from URL (highest priority)
  try {
    const launchShopId = getShopIdFromParams();
    if (launchShopId) {
      return launchShopId;
    }
  } catch (error) {
    console.warn('[TOKEN_UTIL] Error getting shop_id from launch params:', error);
  }
  
  // Priority 2: VITE_KEY_ID from env
  const envShopId = import.meta.env.VITE_KEY_ID;
  if (envShopId) {
    return envShopId;
  }
  
  // Priority 3: Shop-Id from localStorage
  const storedShopId = localStorage.getItem('Shop-Id');
  if (storedShopId) {
    return storedShopId;
  }
  
  // Priority 4: Fallback to default
  return "23933";
}

/**
 * Get shop ID as number with same priority as getShopId()
 * @returns {number} The shop ID as number
 */
export function getShopIdAsNumber(): number {
  const shopId = getShopId();
  return parseInt(shopId, 10) || 23933;
}

/**
 * Get seller token from localStorage
 * If not found, automatically fetch from API with retry logic
 * Also checks if Shop-Id matches VITE_KEY_ID, if not, fetches new token
 * @param retries - Number of retry attempts (default: 3)
 * @param retryDelay - Delay between retries in ms (default: 1000)
 * @returns {Promise<string>} The seller token
 * @throws {Error} If unable to get seller token after retries
 */
export async function getSellerToken(retries: number = 3, retryDelay: number = 1000): Promise<string> {
  // Get current shop_id with priority: launch params > VITE_KEY_ID > localStorage > default
  const currentShopId = getShopId();
  
  // Check if Shop-Id exists and matches current shop_id
  const storedShopId = localStorage.getItem('Shop-Id');
  const sellerToken = localStorage.getItem('sellerToken');
  
  // If Shop-Id doesn't match or doesn't exist, clear old token and fetch new one
  if (storedShopId !== currentShopId) {
    console.log(`[TOKEN_UTIL] Shop-Id không khớp (stored: ${storedShopId}, current: ${currentShopId}), sẽ lấy lại sellerToken`);
    if (sellerToken) {
      localStorage.removeItem('sellerToken');
      console.log('[TOKEN_UTIL] Đã xóa sellerToken cũ');
    }
    // Xóa shop_id cũ nếu có (để tránh các service dùng giá trị cũ)
    if (localStorage.getItem('shop_id')) {
      localStorage.removeItem('shop_id');
      console.log('[TOKEN_UTIL] Đã xóa shop_id cũ');
    }
    // Continue to fetch new token below
  } else if (sellerToken) {
    // Shop-Id matches and token exists, return it
    return sellerToken;
  }
  
  // If not in localStorage, fetch from API with retry logic
  let lastError: any;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[TOKEN_UTIL] Đang thử lấy seller token (lần ${attempt}/${retries})...`);
      const tokenResponse = await AuthService.getSellerToken();
      const newSellerToken = tokenResponse.data.seller_token;
      
      if (!newSellerToken) {
        throw new Error('Token rỗng từ API response');
      }
      
      // Lưu sellerToken và Shop-Id vào localStorage
      localStorage.setItem('sellerToken', newSellerToken);
      localStorage.setItem('Shop-Id', currentShopId);
      console.log(`[TOKEN_UTIL] ✅ Lấy seller token thành công và đã lưu Shop-Id: ${currentShopId}`);
      return newSellerToken;
    } catch (error: any) {
      lastError = error;
      const errorMessage = error?.message || 'Unknown error';
      
      // Kiểm tra các loại lỗi
      const isNetworkError = errorMessage.includes('Failed to fetch') || 
                            errorMessage.includes('NetworkError') ||
                            errorMessage.includes('không thể kết nối') ||
                            error?.name === 'TypeError';
      
      // 403 Forbidden - không retry vì đây không phải lỗi tạm thời
      const is403Error = errorMessage.includes('403') || 
                        errorMessage.includes('Forbidden') ||
                        error?.status === 403;
      
      console.warn(`[TOKEN_UTIL] ⚠️ Lỗi khi lấy token (lần ${attempt}/${retries}):`, {
        message: errorMessage,
        isNetworkError,
        is403Error,
        status: error?.status,
        statusText: error?.statusText,
        errorType: error?.name,
      });
      
      // Không retry nếu là 403 - đây là lỗi cấu hình, không phải lỗi tạm thời
      if (is403Error) {
        console.error('[TOKEN_UTIL] ❌ Lỗi 403 Forbidden - không retry. Có thể là lỗi proxy/CORS hoặc endpoint không tồn tại.');
        break; // Dừng retry loop ngay
      }
      
      // Nếu là network error (Failed to fetch), vẫn retry vì có thể là lỗi tạm thời
      // Nếu là lỗi khác (như 500, 400), cũng retry một lần nữa
      
      // If this is not the last attempt, wait before retrying
      if (attempt < retries) {
        console.log(`[TOKEN_UTIL] Đợi ${retryDelay}ms trước khi thử lại...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        // Exponential backoff: increase delay for each retry
        retryDelay *= 1.5;
      }
    }
  }
  
  // All retries failed - throw error with detailed information
  const errorMessage = lastError?.message || 'Unknown error';
  const isNetworkError = errorMessage.includes('Failed to fetch') || 
                        errorMessage.includes('NetworkError') ||
                        lastError?.name === 'TypeError';
  
  console.error(`[TOKEN_UTIL] ❌ Không thể lấy seller token sau ${retries} lần thử:`, {
    error: errorMessage,
    isNetworkError,
    status: lastError?.status,
    statusText: lastError?.statusText,
  });
  
  if (isNetworkError) {
    throw new Error('Unable to get seller token. Please check your connection.');
  }
  
  // For other errors, include the original error message
  throw new Error(`Unable to get seller token: ${errorMessage}`);
}

/**
 * Get seller token synchronously from localStorage
 * Does NOT fetch from API if not found (use async version instead)
 * @returns {string | null} The seller token or null if not found
 */
export function getSellerTokenSync(): string | null {
  return localStorage.getItem('sellerToken');
}

/**
 * Decode JWT token to get payload
 * @param {string} token - The JWT token to decode
 * @returns {DecodedToken | null} The decoded token payload or null if decoding fails
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.warn('[TOKEN_UTIL] Invalid token format');
      return null;
    }
    
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload as DecodedToken;
  } catch (error) {
    console.warn('[TOKEN_UTIL] Error decoding token:', error);
    return null;
  }
}

/**
 * Get shop_id from seller token
 * @param {string} sellerToken - The seller token (optional, will get from localStorage if not provided)
 * @returns {Promise<number>} The shop_id
 * @throws {Error} If unable to determine shop_id
 */
export async function getShopIdFromToken(sellerToken?: string): Promise<number> {
  const token = sellerToken || await getSellerToken();
  
  const decoded = decodeToken(token);
  
  if (!decoded || !decoded.user_id) {
    throw new Error('Unable to determine shop_id from token');
  }
  
  return decoded.user_id;
}

/**
 * Get shop_id from seller token synchronously
 * Uses token from localStorage only (does NOT fetch if not found)
 * @param {string} sellerToken - The seller token (optional, will get from localStorage if not provided)
 * @returns {number} The shop_id
 * @throws {Error} If unable to determine shop_id
 */
export function getShopIdFromTokenSync(sellerToken?: string): number {
  const token = sellerToken || getSellerTokenSync();
  
  if (!token) {
    throw new Error('No seller token found in localStorage');
  }
  
  const decoded = decodeToken(token);
  
  if (!decoded || !decoded.user_id) {
    throw new Error('Unable to determine shop_id from token');
  }
  
  return decoded.user_id;
}

/**
 * Get common request headers with seller token
 * @returns {Promise<Record<string, string>>} Headers object with Token-Seller
 * @throws {Error} If unable to get seller token
 */
export async function getSellerHeaders(): Promise<Record<string, string>> {
  const sellerToken = await getSellerToken();
  
  return {
    'Token-Seller': sellerToken,
  };
}

/**
 * Get common request headers with seller token synchronously
 * Uses token from localStorage only (does NOT fetch if not found)
 * @returns {Record<string, string>} Headers object with Token-Seller or empty object
 */
export function getSellerHeadersSync(): Record<string, string> {
  const sellerToken = getSellerTokenSync();
  
  if (!sellerToken) {
    return {};
  }
  
  return {
    'Token-Seller': sellerToken,
  };
}

