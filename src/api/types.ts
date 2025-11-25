// Environment configuration
// Logic: Trong dev (localhost), luôn dùng /api để đi qua Vite proxy (tránh CORS)
// Trong production, PHẢI dùng full URL (không có proxy)
const isDevelopment =
  import.meta.env.DEV ||
  (typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.includes("localhost")));

// Helper function to get KEY_ID with priority: URL params > VITE_KEY_ID (env) > Shop-Id (localStorage) > default
function getKeyId(): string {
  // Priority 1: URL params (highest priority)
  if (typeof window !== "undefined") {
    try {
      // Parse URL params directly to avoid circular dependency
      const urlParams = new URLSearchParams(window.location.search);
      const urlShopId = urlParams.get("shop_id");
      if (urlShopId) {
        return urlShopId;
      }
    } catch (error) {
      // Ignore if parsing fails
    }
  }

  // Priority 2: VITE_KEY_ID from env
  if (import.meta.env.VITE_KEY_ID) {
    return import.meta.env.VITE_KEY_ID;
  }

  // Priority 3: Shop-Id from localStorage
  if (typeof window !== "undefined") {
    const storedShopId = localStorage.getItem("Shop-Id");
    if (storedShopId) {
      return storedShopId;
    }
  }

  // Priority 4: Fallback to default
  return "23933";
}

// Helper function to get SHOP_USERNAME with priority: URL params > VITE_SHOP_USERNAME (env) > default
function getShopUsername(): string {
  // Priority 1: URL params (highest priority)
  if (typeof window !== "undefined") {
    try {
      // Parse URL params directly to avoid circular dependency
      const urlParams = new URLSearchParams(window.location.search);
      const urlUsername = urlParams.get("username");
      if (urlUsername) {
        return urlUsername;
      }
    } catch (error) {
      // Ignore if parsing fails
    }
  }

  // Priority 2: VITE_SHOP_USERNAME from env
  if (import.meta.env.VITE_SHOP_USERNAME) {
    return import.meta.env.VITE_SHOP_USERNAME;
  }

  // Priority 3: Fallback to default
  return "0966279109";
}

// Note: API_CONFIG is evaluated once at module load time.
// For dynamic values that change based on URL params, use getShopId() and getShopIdAsNumber() from token.util.ts
// or getShopIdFromParams() and getUsernameFromParams() from launch-params.ts
export const API_CONFIG = {
  // Trong dev mode, luôn dùng /api để đi qua Vite proxy (không bị CORS)
  // Trong production, PHẢI dùng full URL (mặc định https://api.socdo.vn nếu không có env var)
  BASE_URL: isDevelopment
    ? "/api" // Dev mode: luôn dùng proxy
    : import.meta.env.VITE_API_BASE_URL || "https://api.socdo.vn", // Production: full URL
  get KEY_ID() {
    return getKeyId();
  },
  get SHOP_USERNAME() {
    return getShopUsername();
  },
  TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 10000, // 10 seconds
};

// Zalo OAuth configuration
export const ZALO_CONFIG = {
  APP_ID: import.meta.env.VITE_ZALO_APP_ID || "",
  APP_SECRET: import.meta.env.VITE_ZALO_APP_SECRET || "",
  TOKEN_URL:
    import.meta.env.VITE_ZALO_TOKEN_URL ||
    "https://oauth.zalo.me/v4/oa/access_token",
  PROFILE_URL:
    import.meta.env.VITE_ZALO_PROFILE_URL || "https://graph.zalo.me/v2.0/me",
};

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
}

export interface SellerTokenResponse {
  message: string;
  status: string;
  data: {
    seller_token: string;
    shop: number;
    shop_setting: ShopSetting[];
    bank_accounts: BankAccount[];
  };
}

export interface Category {
  id: number;
  name: string;
  image?: string;
  image_url?: string;
}

export interface ShopSetting {
  id: number;
  tieu_de: string;
  name: string;
  value: string;
  loai: string;
  giao_dien: string;
  description: string;
}
export interface BankAccount {
  id: number;
  account_name: string;
  id_number: number;
  bank_id: number;
  branch_id: number;
  account_number: number;
  account_holder: string;
  is_default: number;
  created_at: number;
  updated_at: number;
  bank: Bank;
}
export interface Bank {
  code?: string;
  name?: string;
  logo?: string;
}

export interface UserInfo {
  user_id: number;
  username: string;
  name: string;
  avatar: string;
  mobile: string;
  email: string;
  gioi_tinh?: string; // Legacy field
  gender?: string; // New field from API
  birthday?: string; // DD/MM/YYYY format
  ngaysinh?: string; // Legacy field from database
  address?: string; // New field from API
  dia_chi?: string; // Legacy field from database
  shop: number;
  user_money: number;
  user_money2: number;
  created: number;
  logined?: number;
  created_at?: number; // Alternative field name
  last_login?: number; // Alternative field name
  zalo_user_id?: string;
  doitac?: string;
  seller_id?: number;
  shop_id?: number;
  avatar_url?: string; // Full URL for avatar
  balance?: number; // Alternative for user_money
  balance2?: number;
  total_points?: number; // Alternative for user_money2
}

export interface LoginRequest {
  zalo_user_id: string;
  name: string;
  avatar?: string;
  gender?: string;
}

export interface RegisterRequest {
  zalo_user_id: string;
  name: string;
  avatar?: string;
  gender?: string;
  email?: string;
  mobile?: string;
}

export interface SellerTokenRequest {
  username: string;
  key: string;
}
