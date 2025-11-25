// src/api/service/popup.service.ts

import { buildEndpoint } from "../utils/endpoint.util";

export interface PopupBanner {
  id: number;
  title: string;
  image_url: string;
  target_url?: string;
  start_at?: string;
  end_at?: string;
  is_active?: boolean;
}

export interface PopupBannerResponse {
  success: boolean;
  message: string;
  shop_id?: number;
  data: PopupBanner[];
  total?: number;
}

export class PopupService {
  static async getPopupBanner(): Promise<PopupBanner[] | null> {
    try {
      const sellerToken = localStorage.getItem("sellerToken");
      const shopId = localStorage.getItem("Shop-Id");

      const endpoint = buildEndpoint("get-popup-banner");

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Token-Seller": sellerToken || "",
          "Shop-Id": shopId || "",
        },
      });

      if (!response.ok) throw new Error("Lỗi API");

      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }

      return null;
    } catch {
      return null;
    }
  }
}
