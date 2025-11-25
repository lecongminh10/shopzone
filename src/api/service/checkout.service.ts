import { API_CONFIG } from '../types';
import { buildEndpoint } from '../utils/endpoint.util';
import { ApiResponse } from '../types';

// Checkout request interface
export interface CheckoutRequest {
  products: Array<{
    id: number; // sanpham_shop.id
    phanloai_id?: number | null; // Nếu có phân loại
    quantity: number;
    name?: string; // Tên sản phẩm (optional, dùng cho Zalo SDK)
    price?: number; // Giá sản phẩm (optional, dùng cho Zalo SDK)
  }>;
  address_id?: number; // Địa chỉ mặc định
  name?: string; // Tên người nhận
  phone?: string; // SĐT người nhận
  email?: string; // Email người nhận
  address?: string; // Địa chỉ chi tiết
  province_id?: number; // ID tỉnh
  district_id?: number; // ID huyện
  subtotal: number; // Tổng tiền hàng
  coupon_code?: string; // Mã voucher
  discount: number; // Số tiền giảm
  points_used?: number; // Số điểm tích lũy đã sử dụng
  shipping_fee: number; // Phí ship
  ship_support?: number; // Hỗ trợ phí ship (VND)
  ship_support_type?: 'all_products' | 'individual_products'; // Loại hỗ trợ: toàn bộ đơn hàng hoặc theo sản phẩm
  ship_support_products?: number[]; // Danh sách product_id được hỗ trợ (nếu individual_products)
  total: number; // Tổng tiền thanh toán
  payment_method?: string; // Phương thức thanh toán (mặc định "cod")
  note?: string; // Ghi chú
  shipping_provider?: string; // Đơn vị vận chuyển (ví dụ: "SUPERAI-6-BEST Express")
  tracking_code?: string | null; // Mã tracking
  ninja_response?: any; // Response từ shipping API
}

// Checkout response interface
export interface CheckoutOrder {
  id: number;
  order_code: string;
  warehouse_id: number;
  subtotal: number;
  discount: number;
  shipping_fee: number;
  total: number;
}

export interface CheckoutResponse extends ApiResponse {
  data: {
    orders: CheckoutOrder[];
    total_orders: number;
    order_ids: number[];
    checkout_sdk?: {
      appId: string;
      orderId: string;
      amount: number;
      desc: string;
      item: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
      }>;
      method: string; // JSON string
      extradata: string; // JSON string
      mac: string;
    };
  };
}

// Checkout Service
export class CheckoutService {
  static async checkout(
    request: CheckoutRequest,
    options?: {
      token?: string;
      shopId?: number;
    }
  ): Promise<CheckoutResponse> {
    let userToken = options?.token;
    if (!userToken) {
      userToken = localStorage.getItem('token') || localStorage.getItem('token-seller') || '';
    }

    if (!userToken) {
      throw new Error('User is not authenticated');
    }

    let shopId = options?.shopId;

    // Nếu không có shopId từ options, ưu tiên lấy từ VITE_KEY_ID (API_CONFIG.KEY_ID)
    // Nếu không có, lấy từ localStorage Shop-Id
    // Vì Shop-Id là shop_id của app, không phải shop_id của user
    if (!shopId) {
      // Ưu tiên dùng API_CONFIG.KEY_ID (từ VITE_KEY_ID)
      shopId = parseInt(API_CONFIG.KEY_ID, 10);
      
      // Nếu API_CONFIG.KEY_ID không hợp lệ, thử lấy từ localStorage Shop-Id
      if (!shopId || shopId <= 0) {
        const storedShopId = localStorage.getItem('Shop-Id');
        if (storedShopId) {
          shopId = parseInt(storedShopId, 10);
        }
      }
    }

    if (!shopId || shopId <= 0) {
      throw new Error('Shop-Id không hợp lệ');
    }

    try {
      const endpoint = buildEndpoint('checkout');

      const requestBody = {
        products: request.products,
        address_id: request.address_id,
        name: request.name,
        phone: request.phone,
        email: request.email,
        address: request.address,
        province_id: request.province_id,
        district_id: request.district_id,
        subtotal: request.subtotal,
        coupon_code: request.coupon_code || '',
        discount: request.discount,
        points_used: request.points_used ?? 0, // Điểm tích lũy đã sử dụng
        shipping_fee: request.shipping_fee,
        ship_support: request.ship_support || 0, // Hỗ trợ phí ship
        ship_support_type: request.ship_support_type, // Loại hỗ trợ
        ship_support_products: request.ship_support_products || [], // Danh sách sản phẩm được hỗ trợ
        total: request.total,
        payment_method: request.payment_method || 'cod',
        note: request.note || '', // Đảm bảo luôn gửi note
        shipping_provider: request.shipping_provider || '',
        tracking_code: request.tracking_code || null,
        ninja_response: request.ninja_response || null,
      };


      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
          'Shop-Id': shopId.toString(),
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Invalid JSON response. Status: ${response.status}. Response: ${responseText.substring(0, 200)}`);
      }

      if (!response.ok) {
        const errorMessage = data.message || data.error || `HTTP ${response.status}`;
        throw new Error(errorMessage);
      }

      return data as CheckoutResponse;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Checkout với Zalo Checkout SDK
   * Tạo đơn hàng trước, sau đó gọi Checkout SDK để thanh toán
   */
  static async checkoutWithSDK(
    request: CheckoutRequest,
    options?: {
      token?: string;
      shopId?: number;
      appId?: string;
      paymentMethod?: 'COD' | 'BANK';
    }
  ): Promise<CheckoutResponse> {
    // Khai báo checkoutResponse ở ngoài try-catch để có thể return trong catch
    let checkoutResponse: CheckoutResponse | null = null;
    
    try {
      // Bước 1: Tạo đơn hàng trước (giống như checkout thông thường)
      checkoutResponse = await this.checkout(request, {
        token: options?.token,
        shopId: options?.shopId,
      });

      if (!checkoutResponse.success || !checkoutResponse.data?.orders?.length) {
        throw new Error('Không thể tạo đơn hàng');
      }

      // Bước 2: Lấy dữ liệu Checkout SDK từ backend response
      // Backend đã tính MAC và chuẩn bị tất cả dữ liệu cần thiết
      const checkoutSdkData = checkoutResponse.data?.checkout_sdk;
      
      if (!checkoutSdkData || !checkoutSdkData.mac) {
        console.warn('⚠️ [CHECKOUT_SDK] Backend không trả về dữ liệu Checkout SDK hoặc MAC. Order đã được tạo nhưng không thể gọi SDK.');
        return checkoutResponse;
      }

      console.log('📞 [CHECKOUT_SDK] Received Checkout SDK data from backend:', {
        appId: checkoutSdkData.appId,
        orderId: checkoutSdkData.orderId,
        amount: checkoutSdkData.amount,
        hasMac: !!checkoutSdkData.mac,
        macPreview: checkoutSdkData.mac?.substring(0, 20) + '...'
      });

      // Bước 4: Gọi Zalo Checkout SDK với dữ liệu từ backend
      // Theo tài liệu Zalo, cần gọi API createOrder từ zmp-sdk
      try {
        // Import zmp-sdk APIs
        const { createOrder } = await import('zmp-sdk/apis');
        
        // Tạo orderData theo đúng format của Zalo SDK
        // Lưu ý: method và extradata đã là JSON string từ backend
        const orderData = {
          amount: checkoutSdkData.amount,
          desc: checkoutSdkData.desc,
          item: checkoutSdkData.item, // Array format
          method: checkoutSdkData.method, // JSON string từ backend
          extradata: checkoutSdkData.extradata, // JSON string từ backend
          mac: checkoutSdkData.mac // MAC được tính từ backend
        };
        
        console.log('📞 [CHECKOUT_SDK] Creating order with Zalo Checkout SDK', {
          ...orderData,
          mac: orderData.mac.substring(0, 20) + '...' // Chỉ log preview của MAC
        });
        
        const sdkResult = await createOrder(orderData);
        console.log('✅ [CHECKOUT_SDK] Zalo Checkout SDK response:', sdkResult);

        // Log thông tin checkout để Zalo review team có thể kiểm tra
        console.log('📦 [CHECKOUT_SDK] Order created with Checkout SDK integration:', {
          appId: checkoutSdkData.appId,
          orderId: checkoutSdkData.orderId,
          amount: checkoutSdkData.amount,
          method: checkoutSdkData.method,
          sdkResult,
        });
        
        // Kiểm tra kết quả từ SDK
        if (sdkResult && (sdkResult as any).resultCode === 1) {
          console.log('✅ [CHECKOUT_SDK] Payment successful. Order ID:', checkoutSdkData.orderId);
        } else {
          console.warn('⚠️ [CHECKOUT_SDK] Payment not completed or pending. Result:', sdkResult);
        }
        
        console.log('✅ [CHECKOUT_SDK] Checkout flow completed. Waiting for webhook callback.');
      } catch (sdkError: any) {
        console.error('❌ [CHECKOUT_SDK] Failed to call Checkout SDK', sdkError);
        
        // Log chi tiết lỗi để debug
        console.error('SDK Error details:', {
          message: sdkError?.message,
          code: sdkError?.code,
          data: sdkError?.data,
        });

        // Đơn hàng đã được tạo, chỉ log lỗi SDK nhưng không fail toàn bộ flow
        // Zalo review team sẽ kiểm tra log này
        console.warn('⚠️ Order created successfully but Checkout SDK call failed. Order will be processed via webhook.');
      }

      // Bước 7: Trả về response với thông tin đơn hàng
      // Dù SDK có lỗi, đơn hàng đã được tạo nên vẫn trả về success
      return checkoutResponse;
    } catch (error: any) {
      // Nếu đơn hàng đã được tạo thành công, vẫn trả về response dù có lỗi với SDK
      if (checkoutResponse && checkoutResponse.success) {
        console.warn('⚠️ Order created but encountered error:', error);
        return checkoutResponse;
      }
      
      // Nếu đơn hàng chưa được tạo, throw error
      throw error;
    }
  }
}

