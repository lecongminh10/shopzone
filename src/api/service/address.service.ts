import { API_CONFIG } from '../types';
import { buildEndpoint, buildEndpointWithQuery } from '../utils/endpoint.util';
import { httpClient } from '../http-client';
import { ApiResponse } from '../types';

// Address interface
export interface Address {
  id: number;
  user_id: number;
  name: string;
  phone: string;
  address: string;
  email?: string;
  province?: string;
  district?: string;
  ward?: string;
  full_address: string;
  is_default: boolean;
}

export interface AddressListResponse {
  success: boolean;
  message: string;
  data: Address[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}

// Address Service
export class AddressService {
  // Get addresses list
  static async getAddresses(options?: {
    page?: number;
    limit?: number;
    token?: string;
  }): Promise<AddressListResponse> {
    const {
      page = 1,
      limit = 100,
      token,
    } = options || {};

    // Get token from parameter or localStorage
    const userToken = token || localStorage.getItem('token');
    
    if (!userToken) {
      throw new Error('User is not authenticated');
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    try {
      const endpoint = buildEndpointWithQuery('list-address', params.toString());
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });

      // Đọc response text trước để kiểm tra
      const responseText = await response.text();
      
      // Kiểm tra nếu response không phải JSON hợp lệ
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        // Nếu không parse được JSON, throw error với message rõ ràng
        throw new Error(`Invalid JSON response. Status: ${response.status}. Response: ${responseText.substring(0, 100)}`);
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP ${response.status}`);
      }

      return data as AddressListResponse;
    } catch (error) {
      // Không log ở đây - component đã handle và log rồi
      // Re-throw error để component có thể handle
      throw error;
    }
  }

  // Delete address (supports both endpoints: delete-address or save-address with DELETE method)
  static async deleteAddress(addressId: number, token?: string, useSaveEndpoint: boolean = false): Promise<ApiResponse> {
    const userToken = token || localStorage.getItem('token');
    
    if (!userToken) {
      throw new Error('User is not authenticated');
    }

    try {
      let endpoint: string;
      
      if (useSaveEndpoint) {
        // Use save-address.php with DELETE method
        endpoint = buildEndpoint('save-address');
      } else {
        // Use dedicated delete-address endpoint
        endpoint = buildEndpoint(`delete-address/${addressId}`);
      }
      
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: useSaveEndpoint ? JSON.stringify({ id: addressId }) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      return data as ApiResponse;
    } catch (error) {
      console.error('❌ [ADDRESS_SERVICE] Error deleting address:', error);
      throw error;
    }
  }

  // Set default address
  static async setDefaultAddress(addressId: number, token?: string): Promise<ApiResponse> {
    const userToken = token || localStorage.getItem('token');
    
    if (!userToken) {
      throw new Error('User is not authenticated');
    }

    try {
      const endpoint = buildEndpoint(`set-default-address/${addressId}`);
      
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      return data as ApiResponse;
    } catch (error) {
      console.error('❌ [ADDRESS_SERVICE] Error setting default address:', error);
      throw error;
    }
  }

  // Create or update address
  static async saveAddress(addressData: {
    id?: number;
    name: string;
    phone: string;
    address: string;
    email?: string;
    province: string;
    district: string;
    ward: string;
    is_default?: number;
  }, token?: string): Promise<ApiResponse> {
    const userToken = token || localStorage.getItem('token');
    
    if (!userToken) {
      throw new Error('User is not authenticated');
    }

    try {
      const endpoint = buildEndpoint('save-address');
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          id: addressData.id || undefined,
          name: addressData.name,
          phone: addressData.phone,
          address: addressData.address,
          email: addressData.email || '',
          province: addressData.province,
          district: addressData.district,
          ward: addressData.ward,
          is_default: addressData.is_default || 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      return data as ApiResponse;
    } catch (error) {
      console.error('❌ [ADDRESS_SERVICE] Error saving address:', error);
      throw error;
    }
  }
}

// Location types for province/district/ward
export interface Location {
  id: number;
  name: string;  // API returns 'name' field
  tieu_de?: string;  // Legacy field name
  code?: string;
  slug?: string;
  order?: number;
  thu_tu?: number;
  link?: string;
  id_tinh?: string;
  id_huyen?: string;
  id_xa?: string;
  province_id?: number;
  district_id?: number;
  tinh?: number;
  huyen?: number;
  mien?: string;
  vung?: string;
  region?: string;
  area?: string;
}

export interface LocationListResponse {
  success: boolean;
  message: string;
  data: {
    type: string;
    items: Location[];
    pagination?: {
      current_page: number;
      total_pages: number;
      total_records: number;
      limit: number;
      has_next: boolean;
      has_prev: boolean;
    };
    filters?: {
      tinh?: number;
      huyen?: number;
      keyword?: string;
    };
  };
}

// Location Service
export class LocationService {
  // Get locations (province/district/ward)
  static async getLocations(options?: {
    type?: 'province' | 'district' | 'ward';
    tinh?: number;
    huyen?: number;
    keyword?: string;
    page?: number;
    limit?: number;
    token?: string;
  }): Promise<LocationListResponse> {
    const {
      type = 'province',
      tinh,
      huyen,
      keyword = '',
      page = 1,
      limit = 500,
      token,
    } = options || {};

    // Get token from parameter or localStorage
    const userToken = token || localStorage.getItem('token');
    
    if (!userToken) {
      throw new Error('User is not authenticated');
    }

    const params = new URLSearchParams({
      type,
      page: page.toString(),
      limit: limit.toString(),
    });

    if (tinh) {
      params.append('tinh', tinh.toString());
    }
    if (huyen) {
      params.append('huyen', huyen.toString());
    }
    if (keyword) {
      params.append('keyword', keyword);
    }

    try {
      const endpoint = buildEndpointWithQuery('locations', params.toString());
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      // API returns { success, message, data: { type, items, pagination, filters } }
      return data as LocationListResponse;
    } catch (error) {
      console.error('❌ [LOCATION_SERVICE] Error fetching locations:', error);
      throw error;
    }
  }
}
