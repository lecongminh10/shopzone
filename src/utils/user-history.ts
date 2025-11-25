import { Product } from "@/types";

// Types
export interface SearchHistoryItem {
  keyword: string;
  timestamp: number;
}

export interface ViewedProduct {
  productId: number;
  timestamp: number;
  categoryId?: number;
  categoryName?: string;
}

export interface ViewedCategory {
  categoryId: number;
  categoryName: string;
  timestamp: number;
}

// Storage keys
const SEARCH_HISTORY_KEY = "user_search_history";
const VIEWED_PRODUCTS_KEY = "user_viewed_products";
const VIEWED_CATEGORIES_KEY = "user_viewed_categories";

// Max items to keep
const MAX_SEARCH_HISTORY = 50;
const MAX_VIEWED_PRODUCTS = 100;
const MAX_VIEWED_CATEGORIES = 30;

// ========== Search History ==========

/**
 * Lưu từ khóa tìm kiếm vào lịch sử
 */
export function saveSearchHistory(keyword: string): void {
  if (!keyword || keyword.trim().length === 0) return;
  
  if (typeof window === "undefined") return;
  
  try {
    const history = getSearchHistory();
    const trimmedKeyword = keyword.trim().toLowerCase();
    
    // Loại bỏ từ khóa trùng lặp (giữ lại bản mới nhất)
    const filtered = history.filter(item => item.keyword !== trimmedKeyword);
    
    // Thêm từ khóa mới vào đầu
    const newHistory: SearchHistoryItem[] = [
      { keyword: trimmedKeyword, timestamp: Date.now() },
      ...filtered
    ].slice(0, MAX_SEARCH_HISTORY);
    
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.warn("[USER_HISTORY] Error saving search history:", error);
  }
}

/**
 * Lấy lịch sử tìm kiếm
 */
export function getSearchHistory(): SearchHistoryItem[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!stored) return [];
    
    const history = JSON.parse(stored) as SearchHistoryItem[];
    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.warn("[USER_HISTORY] Error reading search history:", error);
    return [];
  }
}

/**
 * Xóa lịch sử tìm kiếm
 */
export function clearSearchHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SEARCH_HISTORY_KEY);
}

// ========== Viewed Products ==========

/**
 * Lưu sản phẩm đã xem
 */
export function saveViewedProduct(product: Product): void {
  if (!product || !product.id) return;
  
  if (typeof window === "undefined") return;
  
  try {
    const viewed = getViewedProducts();
    
    // Loại bỏ sản phẩm trùng lặp (giữ lại bản mới nhất)
    const filtered = viewed.filter(item => item.productId !== product.id);
    
    // Thêm sản phẩm mới vào đầu
    const newViewed: ViewedProduct[] = [
      {
        productId: product.id,
        timestamp: Date.now(),
        categoryId: product.category?.id,
        categoryName: product.category?.name,
      },
      ...filtered
    ].slice(0, MAX_VIEWED_PRODUCTS);
    
    localStorage.setItem(VIEWED_PRODUCTS_KEY, JSON.stringify(newViewed));
  } catch (error) {
    console.warn("[USER_HISTORY] Error saving viewed product:", error);
  }
}

/**
 * Lấy danh sách sản phẩm đã xem
 */
export function getViewedProducts(): ViewedProduct[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(VIEWED_PRODUCTS_KEY);
    if (!stored) return [];
    
    const viewed = JSON.parse(stored) as ViewedProduct[];
    return Array.isArray(viewed) ? viewed : [];
  } catch (error) {
    console.warn("[USER_HISTORY] Error reading viewed products:", error);
    return [];
  }
}

/**
 * Lấy danh sách ID sản phẩm đã xem (để filter)
 */
export function getViewedProductIds(): number[] {
  return getViewedProducts().map(item => item.productId);
}

// ========== Viewed Categories ==========

/**
 * Lưu danh mục đã xem
 */
export function saveViewedCategory(categoryId: number, categoryName: string): void {
  if (!categoryId || !categoryName) return;
  
  if (typeof window === "undefined") return;
  
  try {
    const viewed = getViewedCategories();
    
    // Loại bỏ danh mục trùng lặp (giữ lại bản mới nhất)
    const filtered = viewed.filter(item => item.categoryId !== categoryId);
    
    // Thêm danh mục mới vào đầu
    const newViewed: ViewedCategory[] = [
      {
        categoryId,
        categoryName,
        timestamp: Date.now(),
      },
      ...filtered
    ].slice(0, MAX_VIEWED_CATEGORIES);
    
    localStorage.setItem(VIEWED_CATEGORIES_KEY, JSON.stringify(newViewed));
  } catch (error) {
    console.warn("[USER_HISTORY] Error saving viewed category:", error);
  }
}

/**
 * Lấy danh sách danh mục đã xem
 */
export function getViewedCategories(): ViewedCategory[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(VIEWED_CATEGORIES_KEY);
    if (!stored) return [];
    
    const viewed = JSON.parse(stored) as ViewedCategory[];
    return Array.isArray(viewed) ? viewed : [];
  } catch (error) {
    console.warn("[USER_HISTORY] Error reading viewed categories:", error);
    return [];
  }
}

/**
 * Lấy danh sách ID danh mục đã xem (để filter)
 */
export function getViewedCategoryIds(): number[] {
  return getViewedCategories().map(item => item.categoryId);
}

// ========== Product Scoring ==========

/**
 * Tính điểm ưu tiên cho sản phẩm dựa trên lịch sử người dùng
 * Điểm cao hơn = ưu tiên hiển thị trước
 */
export function calculateProductScore(product: Product): number {
  let score = 0;
  const now = Date.now();
  
  // 1. Điểm từ sản phẩm đã xem gần đây (0-100 điểm)
  const viewedProducts = getViewedProducts();
  const viewedProduct = viewedProducts.find(vp => vp.productId === product.id);
  if (viewedProduct) {
    const hoursAgo = (now - viewedProduct.timestamp) / (1000 * 60 * 60);
    // Sản phẩm xem trong 1 giờ qua: 100 điểm
    // Sản phẩm xem trong 24 giờ qua: 50 điểm
    // Sản phẩm xem trong 7 ngày qua: 20 điểm
    // Sản phẩm xem trong 30 ngày qua: 10 điểm
    if (hoursAgo < 1) score += 100;
    else if (hoursAgo < 24) score += 50;
    else if (hoursAgo < 168) score += 20; // 7 days
    else if (hoursAgo < 720) score += 10; // 30 days
  }
  
  // 2. Điểm từ danh mục đã xem (0-50 điểm)
  const viewedCategories = getViewedCategories();
  if (product.category?.id) {
    const viewedCategory = viewedCategories.find(
      vc => vc.categoryId === product.category?.id
    );
    if (viewedCategory) {
      const hoursAgo = (now - viewedCategory.timestamp) / (1000 * 60 * 60);
      // Danh mục xem trong 1 giờ qua: 50 điểm
      // Danh mục xem trong 24 giờ qua: 30 điểm
      // Danh mục xem trong 7 ngày qua: 15 điểm
      if (hoursAgo < 1) score += 50;
      else if (hoursAgo < 24) score += 30;
      else if (hoursAgo < 168) score += 15;
    }
  }
  
  // 3. Điểm từ từ khóa tìm kiếm (0-30 điểm mỗi từ khóa khớp)
  const searchHistory = getSearchHistory();
  const productNameLower = product.name.toLowerCase();
  const productDetailLower = (product.detail || "").toLowerCase();
  
  // Lấy 10 từ khóa tìm kiếm gần đây nhất
  const recentSearches = searchHistory.slice(0, 10);
  for (const search of recentSearches) {
    const keyword = search.keyword.toLowerCase();
    const hoursAgo = (now - search.timestamp) / (1000 * 60 * 60);
    
    // Kiểm tra từ khóa có trong tên hoặc chi tiết sản phẩm không
    if (productNameLower.includes(keyword) || productDetailLower.includes(keyword)) {
      // Từ khóa tìm trong 1 giờ qua: 30 điểm
      // Từ khóa tìm trong 24 giờ qua: 20 điểm
      // Từ khóa tìm trong 7 ngày qua: 10 điểm
      if (hoursAgo < 1) score += 30;
      else if (hoursAgo < 24) score += 20;
      else if (hoursAgo < 168) score += 10;
    }
  }
  
  // 4. Điểm từ sản phẩm cùng danh mục đã xem (0-20 điểm)
  if (product.category?.id) {
    const viewedInSameCategory = viewedProducts.filter(
      vp => vp.categoryId === product.category?.id && vp.productId !== product.id
    );
    if (viewedInSameCategory.length > 0) {
      // Có sản phẩm khác cùng danh mục đã xem: +20 điểm
      score += 20;
    }
  }
  
  return score;
}

/**
 * Sort sản phẩm theo điểm ưu tiên (cao -> thấp)
 * Nếu điểm bằng nhau, giữ nguyên thứ tự ban đầu
 */
export function sortProductsByScore(products: Product[]): Product[] {
  // Tính điểm cho mỗi sản phẩm
  const productsWithScores = products.map(product => ({
    product,
    score: calculateProductScore(product),
  }));
  
  // Sort theo điểm (cao -> thấp)
  productsWithScores.sort((a, b) => b.score - a.score);
  
  // Trả về danh sách sản phẩm đã sort
  return productsWithScores.map(item => item.product);
}

