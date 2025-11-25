import { buildEndpoint } from "../utils/endpoint.util";
import { ApiResponse, API_CONFIG } from "../types";

// Product Review Request Interface
export interface ProductReviewRequest {
  product_id: string | number;
  order_id: number;
  rating: number;
  content: string;
  images?: string[];
  shop_id?: string | number;
  variant_id?: number; // Phân loại sản phẩm (phanloai_id)
}

// Product Review Response Interface
export interface ProductReviewComment {
  id: number;
  product_id: number;
  order_id: number;
  rating: number;
  content: string;
  images?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface ProductReviewResponse extends ApiResponse {
  data: {
    comment: ProductReviewComment;
  };
}

// Product Review Service
export class ProductReviewService {
  static async submitReview(
    request: ProductReviewRequest
  ): Promise<ProductReviewResponse> {
    try {
      // Build endpoint với /mini-app/v1 prefix
      const endpoint = buildEndpoint("product-reviews");
      
      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User token not found");

      // Lấy shop_id từ user object hoặc API_CONFIG
      let shop_id: number | null = null;
      
      // Thử lấy từ user object trong localStorage
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          shop_id = parseInt(user.shop_id || user.shop || "0", 10);
        } catch (e) {
          console.error("Error parsing user for shop_id:", e);
        }
      }
      
      // Nếu không có từ user, dùng API_CONFIG.KEY_ID
      if (!shop_id || shop_id <= 0) {
        shop_id = parseInt(API_CONFIG.KEY_ID, 10);
      }

      const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Shop-Id": shop_id.toString(),
      };

      const requestBody: any = {
        product_id: request.product_id,
        order_id: request.order_id,
        shop_id: shop_id,
        rating: request.rating,
        content: request.content || "",
        images: request.images || [],
      };
      
      // Thêm variant_id nếu có
      if (request.variant_id !== undefined && request.variant_id > 0) {
        requestBody.variant_id = request.variant_id;
      }

      console.log(
        "📤 Submitting review:",
        requestBody,
        "with headers:",
        headers,
        "to endpoint:",
        endpoint
      );

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();
      if (!responseText || responseText.trim() === "") {
        throw new Error("Empty response from server");
      }

      // Remove BOM if present
      const cleanText = responseText.trim().replace(/^\uFEFF/, "");
      const data: any = JSON.parse(cleanText);

      if (!response.ok) {
        // Parse error message from response
        const errorMessage = data?.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      console.log("✅ Review submitted successfully:", data);

      return data as ProductReviewResponse;
    } catch (error: any) {
      console.error("❌ Error submitting review:", error);
      throw error;
    }
  }
}
