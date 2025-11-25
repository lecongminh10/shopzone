import { ApiResponse, Category } from "../types";
import {
  getSellerToken,
  getShopIdFromToken,
  getSellerHeaders,
} from "../utils/token.util";
import { buildEndpointWithQuery } from "../utils/endpoint.util";

export class CategoryService {
  static async getCategories(): Promise<Category[]> {
    try {
      // Get seller token (auto-fetch if not available)
      const sellerToken = await getSellerToken();
      if (!sellerToken) {
        console.warn("[CATEGORY_SERVICE] ⚠️ No seller token available");
        return [];
      }

      // Get shop_id from token
      const shopId = await getShopIdFromToken(sellerToken);

      const sellerHeaders = await getSellerHeaders();
      const params = new URLSearchParams({
        shop_id: shopId.toString(),
      });
      const endpoint = buildEndpointWithQuery(
        "list-category-shop",
        params.toString()
      );

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          ...sellerHeaders,
          "Shop-ID": shopId.toString(),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const responseText = await response.text();
      if (!responseText || responseText.trim() === "") {
        throw new Error("Empty response from server");
      }

      // Remove BOM if present
      const cleanText = responseText.trim().replace(/^\uFEFF/, "");
      const data = JSON.parse(cleanText);

      // Handle different response structures
      let categories: Category[] = [];

      if (data && typeof data === "object") {
        // Check if response has success property and data
        if ("success" in data && data.success) {
          const responseData = (data as any).data;

          // Check if data.categories exists (nested structure)
          if (
            responseData &&
            typeof responseData === "object" &&
            "categories" in responseData &&
            Array.isArray(responseData.categories)
          ) {
            categories = responseData.categories;
          }
          // Check if data itself is an array
          else if (Array.isArray(responseData)) {
            categories = responseData;
          }
        }
        // Check if response.data is an array (direct structure)
        else if (Array.isArray(data.data)) {
          categories = data.data;
        }
        // Check if response has categories property (alternative structure)
        else if (
          "categories" in data &&
          Array.isArray((data as any).categories)
        ) {
          categories = (data as any).categories;
        }
        // Check if response itself is an array (fallback)
        else if (Array.isArray(data)) {
          categories = data;
        }
      }

      return categories;
    } catch (error: any) {
      console.error("❌ [CATEGORY_SERVICE] Error fetching categories:", error);
      console.error("❌ [CATEGORY_SERVICE] Error details:", {
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
      });
      // Return empty array instead of throwing to prevent crash
      // Products can still work without categories (will use default category)
      return [];
    }
  }
}
