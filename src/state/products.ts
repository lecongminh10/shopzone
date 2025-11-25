import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";
import { Category, Product } from "@/types";
import { ProductService, ApiProduct } from "@/api/service/product.service";
import { getCategories } from "./categories";
import { flashSaleProductsState } from "./flash-sale";
import { normalizeImageUrl } from "@/api/utils/image.util";
import { getSellerToken } from "@/api/utils/token.util";
import { sortProductsByScore } from "@/utils/user-history";

// Helper function to map API product to app product format
function mapApiProductToProduct(
  apiProduct: ApiProduct,
  categories: Category[]
): Product {
  // Find or create default category
  let category = categories.find((c) => c.id === 1); // Default category id
  if (!category) {
    category = {
      id: 1,
      name: apiProduct.category_shop || "Chưa phân loại",
      image: "",
    };
  }

  // Normalize image URL
  const rawImageUrl = apiProduct.image_url || apiProduct.image;
  const normalizedImageUrl = normalizeImageUrl(rawImageUrl);

  // Log for debugging
  if (rawImageUrl && !rawImageUrl.startsWith("http")) {
    console.log(
      `[MAP_PRODUCT] Normalized image URL for product ${apiProduct.id}:`,
      {
        raw: rawImageUrl,
        normalized: normalizedImageUrl,
      }
    );
  }

  return {
    id: apiProduct.id,
    name: apiProduct.title,
    price: apiProduct.current_price,
    originalPrice: apiProduct.original_price,
    image: normalizedImageUrl,
    category: category,
    detail: apiProduct.brand || "",
    warehouse_name: apiProduct.warehouse_name,
    rating: apiProduct.rating,
    sales_count: apiProduct.sales_count,
    flash_sale: apiProduct.flash_sale,
    promotion_label: apiProduct.promotion_label,
  };
}

// Get products from API với pagination
async function fetchProducts(page: number = 1, limit: number = 20): Promise<{
  products: Product[];
  hasMore: boolean;
  totalRecords: number;
}> {
  try {
    // Đợi seller token được fetch (nếu chưa có sẽ tự động fetch)
    try {
      await getSellerToken(); // Đợi token được fetch xong
    } catch (tokenError: any) {
      console.warn(
        "[STATE] ⚠️ Không thể lấy seller token, bỏ qua products:",
        tokenError.message
      );
      return { products: [], hasMore: false, totalRecords: 0 };
    }

    // Fetch from API với pagination
    const response = await ProductService.getProducts({
      status: 1,
      active: 0,
      page: page,
      limit: limit,
      include_variants: 1,
    });

    if (
      response &&
      response.success &&
      response.data &&
      response.data.products
    ) {
      const categories = await getCategories();

      if (!Array.isArray(response.data.products)) {
        console.error(
          "❌ [STATE] Products is not an array:",
          typeof response.data.products
        );
        return { products: [], hasMore: false, totalRecords: 0 };
      }

      try {
        const mappedProducts = response.data.products.map((apiProduct: any) => {
          try {
            return mapApiProductToProduct(apiProduct, categories);
          } catch (productError: any) {
            console.error(
              `❌ [STATE] Error mapping product ${apiProduct?.id}:`,
              productError
            );
            console.error(`❌ [STATE] Product data:`, apiProduct);
            // Return a fallback product to prevent crash
            return {
              id: apiProduct?.id || 0,
              name: apiProduct?.title || "Unknown Product",
              price: apiProduct?.current_price || 0,
              originalPrice: apiProduct?.original_price || 0,
              image: normalizeImageUrl(
                apiProduct?.image_url || apiProduct?.image
              ),
              category: categories.find((c) => c.id === 1) || {
                id: 1,
                name: "Chưa phân loại",
                image: "",
              },
              detail: apiProduct?.brand || "",
            };
          }
        });

        const pagination = response.data?.pagination;
        const hasMore = pagination?.has_next || false;
        const totalRecords = pagination?.total_records || mappedProducts.length;

        return {
          products: mappedProducts,
          hasMore: hasMore,
          totalRecords: totalRecords,
        };
      } catch (mapError: any) {
        console.error("❌ [STATE] Error mapping products:", mapError);
        console.error("❌ [STATE] Map error details:", {
          message: mapError?.message,
          name: mapError?.name,
          stack: mapError?.stack,
        });
        return { products: [], hasMore: false, totalRecords: 0 };
      }
    } else {
      console.warn("⚠️ [STATE] Invalid response structure:", {
        hasResponse: !!response,
        success: response?.success,
        hasData: !!response?.data,
        hasProducts: !!(response?.data && response.data.products),
      });
      return { products: [], hasMore: false, totalRecords: 0 };
    }
  } catch (error: any) {
    console.error("❌ [STATE] Error fetching products from API:", error);
    console.error("❌ [STATE] Error details:", {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });
    return { products: [], hasMore: false, totalRecords: 0 };
  }
}

// State để lưu tất cả products đã load (accumulated)
export const accumulatedProductsState = atom<Product[]>([]);

// State để lưu current page
export const productPageState = atom<number>(1);

// State để lưu hasMore từ API
export const hasMoreProductsState = atom<boolean>(true);

// State để lưu loading state
export const isLoadingProductsState = atom<boolean>(false);

// Action để fetch products lần đầu
export const fetchInitialProductsAction = atom(null, async (get, set) => {
  const accumulated = get(accumulatedProductsState);
  // Nếu đã có accumulated products, không fetch lại
  if (accumulated.length > 0) {
    return accumulated;
  }

  set(isLoadingProductsState, true);
  try {
    const result = await fetchProducts(1, 20);
    // Sort sản phẩm theo điểm ưu tiên dựa trên lịch sử người dùng
    const sortedProducts = sortProductsByScore(result.products);
    set(accumulatedProductsState, sortedProducts);
    set(hasMoreProductsState, result.hasMore);
    set(productPageState, 1);
    return sortedProducts;
  } finally {
    set(isLoadingProductsState, false);
  }
});

// Base products state - fetch lần đầu với page 1, limit 20
export const productsState = atom(async () => {
  const result = await fetchProducts(1, 20);
  return result.products;
});

// Recommended products state - chỉ lấy từ products thông thường
// Sản phẩm được sort theo điểm ưu tiên dựa trên lịch sử người dùng
export const recommendedProductsState = atom(async (get) => {
  const accumulated = get(accumulatedProductsState);
  // Nếu đã có accumulated products, dùng nó (đã được sort)
  if (accumulated.length > 0) {
    return accumulated;
  }
  // Nếu chưa có, fetch lần đầu và sort
  const products = await get(productsState);
  return sortProductsByScore(products);
});

// Paginated products state - trả về accumulated products
export const paginatedProductsState = atom(async (get) => {
  const accumulated = get(accumulatedProductsState);
  // Nếu đã có accumulated products, dùng nó
  if (accumulated.length > 0) {
    return accumulated;
  }
  // Nếu chưa có, fetch lần đầu
  const products = await get(productsState);
  return products;
});

// Action để load more products
export const loadMoreProductsAction = atom(null, async (get, set) => {
  const currentPage = get(productPageState);
  const hasMore = get(hasMoreProductsState);
  const isLoading = get(isLoadingProductsState);
  const accumulated = get(accumulatedProductsState);

  // Nếu đang loading hoặc không còn sản phẩm, không làm gì
  if (isLoading || !hasMore) return;

  // Set loading state
  set(isLoadingProductsState, true);

  try {
    // Fetch page tiếp theo
    const nextPage = currentPage + 1;
    const result = await fetchProducts(nextPage, 20);

    // Append products mới vào accumulated và sort lại toàn bộ
    const allProducts = [...accumulated, ...result.products];
    const sortedProducts = sortProductsByScore(allProducts);
    set(accumulatedProductsState, sortedProducts);
    
    // Update page và hasMore
    set(productPageState, nextPage);
    set(hasMoreProductsState, result.hasMore);
  } catch (error) {
    console.error("❌ [STATE] Error loading more products:", error);
  } finally {
    set(isLoadingProductsState, false);
  }
});

// Action để reset products (khi cần refresh)
export const resetProductsAction = atom(null, async (get, set) => {
  set(accumulatedProductsState, []);
  set(productPageState, 1);
  set(hasMoreProductsState, true);
  // Trigger fetch lại bằng cách get productsState
  await get(productsState);
});

export const productState = atomFamily((id: number) =>
  atom(async (get) => {
    // Tìm trong products thông thường trước
    const products = await get(productsState);
    let product = products.find((product) => product.id === id);

    // Nếu không tìm thấy, tìm trong flash sale products
    if (!product) {
      const flashSaleProducts = await get(flashSaleProductsState);
      product = flashSaleProducts.find((product) => product.id === id);
    }

    return product;
  })
);

export const productsById = atomFamily((categoryId: string) =>
  atom(async () => {
    const response = await ProductService.getProducts({
      status: 1,
      active: 0,
      limit: 100,
      include_variants: 1,
    });

    const categories: Category[] = await getCategories();

    const mapped = response.data.products.map((apiProduct: ApiProduct) =>
      mapApiProductToProduct(apiProduct, categories)
    );

    // 🔍 lọc theo category.name có chứa id
    return mapped.filter((p) => {
      const names = p.category?.name?.split(",") || [];
      return names.includes(categoryId);
    });
  })
);
