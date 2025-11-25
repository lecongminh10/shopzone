import { API_CONFIG } from "../types";
import { getSellerToken } from "../utils/token.util";
import { AuthService } from "./auth.service";
import { buildEndpointWithQuery } from "../utils/endpoint.util";

// Product types from API
export interface ApiProduct {
  id: number;
  sp_id: number;
  shop_id: number;
  title: string;
  image: string;
  link: string;
  link_aff: string;
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
  weight_ship: number;
  warehouse_id: number;
  image_url: string;
  images_list: string[];
  variants: ApiProductVariant[];
  variants_count: number;
  flash_sale: boolean;
  promotion_label: string;
  time_remaining?: number;
  products_count?: number;
  highlight?: string;
  information?: string;
  content?: string;
  warehouse_name?: string;
  rating?: {
    total_reviews: number;
    average_rating: number;
  };
  sales_count?: number;
}

export interface ApiProductVariantAttribute {
  attribute_id: number;
  attribute_name: string;
  value_id: number;
  value_name: string;
}

export interface ApiProductVariant {
  id: number;
  product_id: number;
  sku: string;
  color: string;
  size: string;
  size_name: string;
  color_name: string;
  weight: number;
  original_price: number;
  current_price: number;
  drop_price: number;
  ctv_price: number;
  socdo_price: number;
  drop_min: number;
  stock: number;
  weight_ship: number;
  date_post: number;
  image: string;
  image_url: string;
  flash_sale?: boolean;
  flash_sale_price?: number;
  attributes?: ApiProductVariantAttribute[];
}

export interface ProductListResponse {
  success: boolean;
  message: string;
  data: {
    products: ApiProduct[];
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
      active: number;
      category_shop: string;
      include_variants: number;
      search: string;
      page: number;
      limit: number;
      shop_id: number;
    };
  };
}

export interface ProductDetailResponse {
  success: boolean;
  message: string;
  data: ApiProduct;
}

export interface Review {
  id: number;
  content: string;
  rating: number;
  created_at: string;
  user_id: number;
  user_name: string;
  user_avatar?: string;
  variant_id?: number;
  variant_color_name?: string;
  variant_size_name?: string;
  color_attribute_name?: string;
  size_attribute_name?: string;
  is_verified_purchase: number;
  shop_rating?: number;
  matches_description?: number;
  is_satisfied?: number;
  will_buy_again?: number;
  images?: string[];
}

export interface ReviewsResponse {
  success: boolean;
  message: string;
  data: {
    comments: Review[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    rating_counts: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
}

// Product Service
export class ProductService {
  // Get products list
  static async getProducts(options?: {
    shop_id?: number;
    status?: number;
    category?: string;
    category_shop?: string;
    page?: number;
    limit?: number;
    include_variants?: number;
    search?: string;
    active?: number;
  }): Promise<ProductListResponse> {
    const {
      shop_id = parseInt(API_CONFIG.KEY_ID),
      status = 1,
      active = 0,
      category_shop = "",
      page = 1,
      limit = 20,
      include_variants = 1,
      search = "",
    } = options || {};

    // Use shop_id from config or parameter
    const decodedShopId = shop_id || parseInt(API_CONFIG.KEY_ID);

    const params = new URLSearchParams({
      shop_id: decodedShopId.toString(),
      status: status.toString(),
      active: active.toString(),
      include_variants: include_variants.toString(),
      page: page.toString(),
      limit: limit.toString(),
    });

    if (category_shop) {
      params.append("category_shop", category_shop);
    }
    if (search) {
      params.append("search", search);
    }

    try {
      const endpoint = buildEndpointWithQuery(
        "list-product-shop",
        params.toString()
      );

      // Get seller token (auto-fetch if not available in localStorage)
      const sellerToken = await getSellerToken();

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Token-Seller": sellerToken,
        },
      });

      // Check content-type before parsing JSON
      const contentType = response.headers.get("content-type");
      let data: any;

      // Always read as text first to handle parsing errors better
      const responseText = await response.text();

      if (contentType && contentType.includes("application/json")) {
        try {
          // Try to parse JSON
          if (!responseText || responseText.trim() === "") {
            throw new Error("Empty response from server");
          }

          // Remove BOM if present
          const cleanText = responseText.trim().replace(/^\uFEFF/, "");
          data = JSON.parse(cleanText);
        } catch (parseError: any) {
          console.error("❌ [PRODUCT_SERVICE] JSON parse error:", parseError);
          console.error("❌ [PRODUCT_SERVICE] Parse error details:", {
            message: parseError.message,
            name: parseError.name,
            stack: parseError.stack,
          });
          console.error(
            "❌ [PRODUCT_SERVICE] Response text (first 500 chars):",
            responseText.substring(0, 500)
          );
          console.error(
            "❌ [PRODUCT_SERVICE] Response text (last 200 chars):",
            responseText.substring(Math.max(0, responseText.length - 200))
          );
          throw new Error(
            `Failed to parse JSON response: ${parseError.message}. Response may be corrupted or invalid.`
          );
        }
      } else {
        // Handle non-JSON responses (e.g., HTML error pages from nginx)
        console.error("❌ [PRODUCT_SERVICE] Non-JSON response from:", endpoint);
        console.error(
          "❌ [PRODUCT_SERVICE] Response status:",
          response.status,
          response.statusText
        );
        // Convert Headers to plain object (compatible with older ES targets)
        const headersObj: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          headersObj[key] = value;
        });
        console.error("❌ [PRODUCT_SERVICE] Response headers:", headersObj);
        console.error(
          "❌ [PRODUCT_SERVICE] Response body (first 200 chars):",
          responseText.substring(0, 200)
        );

        if (response.status === 403) {
          throw new Error(
            `HTTP 403 Forbidden từ server nginx. Endpoint: ${endpoint}. Vui lòng kiểm tra cấu hình CORS trên nginx server (xem file NGINX_CORS_FIX.md).`
          );
        }

        if (!response.ok) {
          throw new Error(
            responseText.length > 100 ? `HTTP ${response.status}` : responseText
          );
        }
        throw new Error("Server returned non-JSON response");
      }

      if (!response.ok) {
        const errorMessage = data?.message || `HTTP ${response.status}`;

        // Provide helpful error message for 403
        if (response.status === 403) {
          throw new Error(
            `HTTP 403 Forbidden từ server nginx. Endpoint: ${endpoint}. Vui lòng kiểm tra cấu hình CORS trên nginx server (xem file NGINX_CORS_FIX.md).`
          );
        }

        throw new Error(errorMessage);
      }

      // Validate response structure before returning
      if (!data || typeof data !== "object") {
        console.error("❌ [PRODUCT_SERVICE] Invalid data structure:", data);
        throw new Error("Invalid response data structure from server");
      }

      return data as ProductListResponse;
    } catch (error: any) {
      console.error("❌ [PRODUCT_SERVICE] Error fetching products:", error);
      console.error("❌ [PRODUCT_SERVICE] Error details:", {
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
      });
      throw error;
    }
  }

  // Get product detail by ID
  static async getProductDetail(options: {
    product_id: number;
    shop_id?: number;
    include_variants?: number;
  }): Promise<ProductDetailResponse> {
    const { product_id, shop_id, include_variants = 1 } = options;

    if (!product_id || product_id <= 0) {
      throw new Error("Product ID is required");
    }

    // Use shop_id from config or parameter
    const decodedShopId = shop_id || parseInt(API_CONFIG.KEY_ID);

    const params = new URLSearchParams({
      product_id: product_id.toString(),
      shop_id: decodedShopId.toString(),
      include_variants: include_variants.toString(),
    });

    try {
      const endpoint = buildEndpointWithQuery(
        "get-detail-product",
        params.toString()
      );

      // Get seller token (auto-fetch if not available in localStorage)
      const sellerToken = await getSellerToken();

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Token-Seller": sellerToken,
        },
      });

      // Check content-type before parsing JSON
      const contentType = response.headers.get("content-type");
      let data: any;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Handle non-JSON responses (e.g., HTML error pages from nginx)
        const text = await response.text();
        console.error(
          "❌ [PRODUCT_SERVICE] Non-JSON response:",
          text.substring(0, 200)
        );

        if (response.status === 403) {
          throw new Error(
            "HTTP 403 Forbidden - Có thể là lỗi CORS hoặc server không cho phép truy cập. Vui lòng kiểm tra cấu hình CORS trên server."
          );
        }

        if (!response.ok) {
          throw new Error(text.length > 100 ? `HTTP ${response.status}` : text);
        }
        throw new Error("Server returned non-JSON response");
      }

      if (!response.ok) {
        const errorMessage = data?.message || `HTTP ${response.status}`;

        // Provide helpful error message for 403
        if (response.status === 403) {
          throw new Error(
            "HTTP 403 Forbidden - Có thể là lỗi CORS hoặc server không cho phép truy cập. Vui lòng kiểm tra cấu hình CORS trên server."
          );
        }

        throw new Error(errorMessage);
      }

      return data as ProductDetailResponse;
    } catch (error) {
      console.error(
        "❌ [PRODUCT_SERVICE] Error fetching product detail:",
        error
      );
      throw error;
    }
  }

  // Get product reviews
  static async getReviews(options: {
    product_id: number;
    shop_id?: number;
    rating?: number | null;
    has_photo?: boolean;
    is_satisfied?: boolean;
    matches_description?: boolean;
    sort_by?: "newest" | "oldest";
    page?: number;
    limit?: number;
  }): Promise<ReviewsResponse> {
    const {
      product_id,
      shop_id,
      rating,
      has_photo = false,
      is_satisfied = false,
      matches_description = false,
      sort_by = "newest",
      page = 1,
      limit = 20,
    } = options;

    if (!product_id || product_id <= 0) {
      throw new Error("Product ID is required");
    }

    // Use shop_id from config or parameter
    const decodedShopId = shop_id || parseInt(API_CONFIG.KEY_ID);

    const params = new URLSearchParams({
      product_id: product_id.toString(),
      shop_id: decodedShopId.toString(),
    });

    if (rating !== null && rating !== undefined) {
      params.append("rating", rating.toString());
    }
    if (has_photo) {
      params.append("has_photo", "1");
    }
    if (is_satisfied) {
      params.append("is_satisfied", "1");
    }
    if (matches_description) {
      params.append("matches_description", "1");
    }
    params.append("sort_by", sort_by);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    try {
      const endpoint = buildEndpointWithQuery(
        "get-reviews",
        params.toString()
      );

      // Get seller token (auto-fetch if not available in localStorage)
      const sellerToken = await getSellerToken();

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Token-Seller": sellerToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      let data: any;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Expected JSON but got ${contentType}: ${text}`);
      }

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch reviews");
      }

      return data as ReviewsResponse;
    } catch (error: any) {
      console.error("❌ [PRODUCT_SERVICE] Error fetching reviews:", {
        error: error?.message,
        stack: error?.stack,
      });
      throw error;
    }
  }
}
