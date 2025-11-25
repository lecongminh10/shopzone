import { atom } from "jotai";
import { atomWithRefresh } from "jotai/utils";
import { Category, Product } from "@/types";
import {
  FlashSaleService,
  FlashSaleProduct,
} from "@/api/service/flash-sale.service";
import { getCategories } from "./categories";
import { normalizeImageUrl } from "@/api/utils/image.util";

// Cache để tránh fetch lại liên tục
let cachedProducts: Product[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60000; // 60 giây

// Helper function to map FlashSaleProduct to Product format
function mapFlashSaleProductToProduct(
  flashSaleProduct: FlashSaleProduct,
  categories: Category[]
): Product {
  // Find or create default category
  let category = categories.find((c) => c.id === 1);
  if (!category) {
    category = {
      id: 1,
      name: flashSaleProduct.category_shop || "Flash Sale",
      image: "",
    };
  }

  // Normalize image URL
  const rawImageUrl = flashSaleProduct.image_url || flashSaleProduct.image;
  const normalizedImageUrl = normalizeImageUrl(rawImageUrl);

  // Log for debugging
  if (rawImageUrl && !rawImageUrl.startsWith("http")) {
    console.log(
      `[MAP_FLASH_SALE] Normalized image URL for product ${flashSaleProduct.id}:`,
      {
        raw: rawImageUrl,
        normalized: normalizedImageUrl,
      }
    );
  }

  return {
    id: flashSaleProduct.id,
    name: flashSaleProduct.title,
    price: flashSaleProduct.current_price,
    originalPrice: flashSaleProduct.original_price,
    image: normalizedImageUrl,
    category: category,
    detail: flashSaleProduct.brand || "",
    warehouse_name: (flashSaleProduct as any).warehouse_name,
    rating: (flashSaleProduct as any).rating,
    sales_count: (flashSaleProduct as any).sales_count,
  };
}

// Get flash sale products from API
async function fetchFlashSaleProducts(forceRefresh = false): Promise<Product[]> {
  try {
    // Kiểm tra cache trước
    const now = Date.now();
    if (
      !forceRefresh &&
      cachedProducts !== null &&
      now - cacheTimestamp < CACHE_DURATION
    ) {
      return cachedProducts;
    }

    // Check if seller token exists
    const sellerToken = localStorage.getItem("sellerToken");
    if (!sellerToken) {
      return [];
    }

    // Fetch from Flash Sale API
    const response = await FlashSaleService.getFlashSales({
      status: 1,
      loai: "flash_sale",
      page: 1,
      limit: 100,
      include_products: 1,
    });

    if (
      response &&
      response.success &&
      response.data &&
      response.data.flashsales
    ) {
      if (!Array.isArray(response.data.flashsales)) {
        console.error(
          "❌ [STATE] Flashsales is not an array:",
          typeof response.data.flashsales
        );
        return [];
      }

      if (response.data.flashsales.length === 0) {
        console.log("[STATE] ℹ️ No flash sales found");
        return [];
      }

      // Get the first active flash sale
      const activeFlashSale = response.data.flashsales.find(
        (fs: any) => fs.is_active
      );

      if (!activeFlashSale) {
        console.log("[STATE] ℹ️ No active flash sale found");
        return [];
      }

      if (
        !activeFlashSale.products ||
        !Array.isArray(activeFlashSale.products) ||
        activeFlashSale.products.length === 0
      ) {
        console.log("[STATE] ℹ️ Flash sale has no products");
        return [];
      }

      try {
        const categories = await getCategories();

        const products = activeFlashSale.products.map(
          (flashSaleProduct: any) => {
            try {
              return mapFlashSaleProductToProduct(flashSaleProduct, categories);
            } catch (productError: any) {
              console.error(
                `❌ [STATE] Error mapping flash sale product ${flashSaleProduct?.id}:`,
                productError
              );
              console.error(`❌ [STATE] Product data:`, flashSaleProduct);
              // Return a fallback product to prevent crash
              return {
                id: flashSaleProduct?.id || 0,
                name: flashSaleProduct?.title || "Unknown Product",
                price: flashSaleProduct?.current_price || 0,
                originalPrice: flashSaleProduct?.original_price || 0,
                image: normalizeImageUrl(
                  flashSaleProduct?.image_url || flashSaleProduct?.image
                ),
                category: categories.find((c) => c.id === 1) || {
                  id: 1,
                  name: "Flash Sale",
                  image: "",
                },
                detail: flashSaleProduct?.brand || "",
              };
            }
          }
        );

        // Cache kết quả
        cachedProducts = products;
        cacheTimestamp = Date.now();
        return products;
      } catch (mapError: any) {
        console.error(
          "❌ [STATE] Error mapping flash sale products:",
          mapError
        );
        console.error("❌ [STATE] Map error details:", {
          message: mapError?.message,
          name: mapError?.name,
          stack: mapError?.stack,
        });
        return [];
      }
    } else {
      console.warn("⚠️ [STATE] Invalid flash sale response structure:", {
        hasResponse: !!response,
        success: response?.success,
        hasData: !!response?.data,
        hasFlashsales: !!(response?.data && response.data.flashsales),
      });
    }
  } catch (error: any) {
    console.error(
      "❌ [STATE] Error fetching flash sale products from API:",
      error
    );
    console.error("❌ [STATE] Error details:", {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });
    // Return cached data nếu có, nếu không thì return empty array
    return cachedProducts || [];
  }

  return [];
}

// Flash sale products state
export const flashSaleProductsState = atom(async () => {
  return await fetchFlashSaleProducts();
});
