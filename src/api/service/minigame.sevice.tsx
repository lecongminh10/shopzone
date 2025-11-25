import { buildEndpoint } from "../utils/endpoint.util";
import { getSellerHeaders } from "../utils/token.util";

// Prize types matching the component interface
export interface Prize {
  id: number;
  label: string;
  emoji?: string;
  type: "cash" | "product" | "voucher" | "miss";
  discount?: number; // thêm để hiển thị
}

export interface MinigameData {
  id: number;
  coupons_detail: any[];
  danh_sach_coupon?: number[];
  spins_remaining?: number;
  recent_winner?: { name: string; prize: string };
  message?: string;
}

// Minigame response interface
export interface MinigameResponse {
  success: boolean;
  message?: string;
  shop_id?: number;
  data: MinigameData;
}

export interface PlayMiniGameResponse {
  success: boolean;
  message?: string;
  remaining?: number;
  total_used?: number;
  max_plays_per_day?: number;
  data?: {
    prize?: {
      id: number;
      label: string;
      type: "cash" | "product" | "voucher" | "miss";
      discount?: number;
    };
    play_id?: number;
    user_id?: number;
    mini_game_id?: number;
    extra_play?: boolean;
    used?: boolean;
    play_date?: string;
    created_at?: string;
    spins_remaining?: number;
  };
}

export interface SpinMiniGameResponse {
  success: boolean;
  message?: string;
  data?: {
    prize: {
      id: number;
      label: string;
      type: "cash" | "product" | "voucher" | "miss";
      discount?: number;
    };
    spins_remaining?: number;
  };
}

export class MinigameService {
  static async getMinigame(): Promise<MinigameResponse> {
    try {
      const sellerToken = localStorage.getItem("sellerToken");
      const shopId = localStorage.getItem("Shop-Id");

      if (!sellerToken || !shopId) {
        console.error(
          "[MINIGAME_SERVICE] Chưa có sellerToken hoặc Shop-Id trong localStorage"
        );
        return {
          success: false,
          message: "Chưa có sellerToken hoặc Shop-Id",
          data: {
            id: 0,
            coupons_detail: [],
            spins_remaining: 0,
          },
        };
      }

      const endpoint = buildEndpoint(`get-mini-game?shop_id=${shopId}`);

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Shop-Id": shopId,
        "Token-Seller": sellerToken,
      };

      const response = await fetch(endpoint, {
        method: "GET",
        headers,
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

      return data as MinigameResponse;
    } catch (error: any) {
      console.error(
        "❌ [MINIGAME_SERVICE] Error fetching minigame data:",
        error.message
      );

      return {
        success: false,
        message: error.message || "Lỗi khi tải dữ liệu minigame",
        data: {
          id: 0,
          coupons_detail: [],
          spins_remaining: 0,
        },
      };
    }
  }
}

export class PlayMiniGameService {
  static async play(mini_game_id: number): Promise<PlayMiniGameResponse> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return {
          success: false,
          message: "Chưa có user token",
        };
      }
      const endpoint = buildEndpoint("play-mini-game");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mini_game_id }),
      });

      let data: PlayMiniGameResponse;
      try {
        data = await response.json();
      } catch (parseError) {
        // Nếu không parse được JSON, trả về error
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`,
        };
      }
      
      // Nếu response không ok (400, 500, etc), vẫn trả về data từ server
      // để có thể xử lý message và các trường như remaining, total_used
      if (!response.ok) {
        return data as PlayMiniGameResponse;
      }

      return data as PlayMiniGameResponse;
    } catch (error: any) {
      console.error("❌ [PLAY_MINIGAME] Error:", error.message);
      return {
        success: false,
        message: error.message || "Lỗi khi quay mini game",
      };
    }
  }
}

export class SpinMiniGameService {
  static async spin(play_id: number): Promise<SpinMiniGameResponse> {
    try {
      console.log("play_id", play_id);

      const token = localStorage.getItem("token");
      if (!token) {
        return {
          success: false,
          message: "Chưa có token",
        };
      }

      const endpoint = buildEndpoint("spin-mini-game");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ play_id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} — ${response.statusText}`);
      }

      const data = await response.json();
      return data as SpinMiniGameResponse;
    } catch (error: any) {
      console.error("❌ [SPIN_MINIGAME] Error:", error.message);
      return {
        success: false,
        message: error.message || "Lỗi khi quay mini game",
      };
    }
  }
}

export interface PlayItem {
  id: number;
  user_id: number;
  mini_game_id: number;
  extra_play: boolean;
  used: boolean;
  play_date: string;
  created_at: string;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}

export interface Filters {
  user_id: number;
  mini_game_id: number;
  used: boolean | null;
}

export interface GetListPlayGameData {
  plays: PlayItem[];
  pagination: Pagination;
  filters: Filters;
}

export interface GetListPlayGameResponse {
  success: boolean;
  message: string;
  data: GetListPlayGameData;
}

export class GetListPlayGameService {
  static async get(mini_game_id: number): Promise<GetListPlayGameResponse> {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return {
          success: false,
          message: "Chưa có user token",
          data: {
            plays: [],
            pagination: { total: 0, limit: 100, offset: 0, has_more: false },
            filters: { user_id: 0, mini_game_id, used: null },
          },
        };
      }

      const endpoint = `${buildEndpoint(
        "get-list-play-game"
      )}?mini_game_id=${mini_game_id}`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} — ${response.statusText}`);
      }

      const data = await response.json();
      return data as GetListPlayGameResponse;
    } catch (error: any) {
      console.error("❌ [GET_LIST_PLAY_GAME] Error:", error.message);

      return {
        success: false,
        message: error.message || "Lỗi khi lấy danh sách lượt chơi",
        data: {
          plays: [],
          pagination: { total: 0, limit: 100, offset: 0, has_more: false },
          filters: { user_id: 0, mini_game_id, used: null },
        },
      };
    }
  }
}

export interface HistoryItem {
  id: number;
  user_id: number;
  mini_game_id: number;
  coupon_id: number | null;
  result: string;
  result_type: string;
  play_id: number | null;
  played_at: string;
}

export interface ListHistoryMiniGameData {
  history: HistoryItem[];
  pagination: Pagination;
  filters: {
    user_id: number;
    mini_game_id: number;
  };
}

export interface ListHistoryMiniGameResponse {
  success: boolean;
  message: string;
  data: ListHistoryMiniGameData;
}

export class ListHistoryMiniGameService {
  static async get(
    mini_game_id: number,
    limit: number = 100,
    offset: number = 0
  ): Promise<ListHistoryMiniGameResponse> {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return {
          success: false,
          message: "Chưa có user token",
          data: {
            history: [],
            pagination: { total: 0, limit, offset, has_more: false },
            filters: { user_id: 0, mini_game_id },
          },
        };
      }

      const endpoint = `${buildEndpoint(
        "list-history-mini-game"
      )}?mini_game_id=${mini_game_id}&limit=${limit}&offset=${offset}`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} — ${response.statusText}`);
      }

      const data = await response.json();
      return data as ListHistoryMiniGameResponse;
    } catch (error: any) {
      console.error("❌ [LIST_HISTORY_MINI_GAME] Error:", error.message);

      return {
        success: false,
        message: error.message || "Lỗi khi lấy lịch sử chơi game",
        data: {
          history: [],
          pagination: { total: 0, limit, offset, has_more: false },
          filters: { user_id: 0, mini_game_id },
        },
      };
    }
  }
}



