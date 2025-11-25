// Environment configuration
// Logic: Trong dev (localhost), luôn dùng /api để đi qua Vite proxy (tránh CORS)
// Trong production, PHẢI dùng full URL (không có proxy)
const isDevelopment =
  import.meta.env.DEV ||
  (typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.includes("localhost")));

// Helper function to get KEY_ID from VITE_KEY_ID (env) or Shop-Id (localStorage)
function getKeyId(): string {
  // Ưu tiên lấy từ VITE_KEY_ID trong env
  if (import.meta.env.VITE_KEY_ID) {
    return import.meta.env.VITE_KEY_ID;
  }

  // Nếu không có trong env và có window (browser), lấy từ localStorage
  if (typeof window !== "undefined") {
    const storedShopId = localStorage.getItem("Shop-Id");
    if (storedShopId) {
      return storedShopId;
    }
  }

  // Fallback về giá trị mặc định
  return "23933";
}

export const API_CONFIG = {
  // Trong dev mode, luôn dùng /api để đi qua Vite proxy (không bị CORS)
  // Trong production, PHẢI dùng full URL (mặc định https://api.socdo.vn nếu không có env var)
  BASE_URL: isDevelopment
    ? "/api" // Dev mode: luôn dùng proxy
    : import.meta.env.VITE_API_BASE_URL || "https://api.socdo.vn", // Production: full URL
  KEY_ID: getKeyId(),
  SHOP_USERNAME: import.meta.env.VITE_SHOP_USERNAME || "0966279109",
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
