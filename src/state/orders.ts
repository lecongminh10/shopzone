import { atom } from "jotai";
import { atomFamily, atomWithRefresh, atomWithStorage } from "jotai/utils";
import { requestWithFallback } from "@/utils/request";
import CONFIG from "@/config";
import { Delivery, Order, OrderStatus, ShippingAddress } from "@/types";
import { productsState } from "./products";
import { flashSaleProductsState } from "./flash-sale";
import { OrderService } from "@/api/service/order.sevice";

export const productsByCategoryState = atomFamily((id: String) =>
  atom(async (get) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const products = await get(productsState);
    const flashSaleProducts = await get(flashSaleProductsState);

    // Merge cả hai danh sách để filter by category
    const allProducts = [...products, ...flashSaleProducts];

    return allProducts.filter((product) => String(product.category.id) === id);
  })
);

export const shippingAddressState = atomWithStorage<
  ShippingAddress | undefined
>(CONFIG.STORAGE_KEYS.SHIPPING_ADDRESS, undefined);

export const ordersState = atomFamily((_status: string) =>
  atom(async () => {
    try {
      // 🔹 Lấy token từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("⚠️ [ORDERS_ATOM] Không có token");
        return [];
      }

      // 🔹 Lấy toàn bộ đơn hàng bằng token
      const allOrders: Order[] = await OrderService.getOrders(token);

      return allOrders;
    } catch (error) {
      console.error("❌ [ORDERS_ATOM] Lỗi khi lấy đơn hàng:", error);
      return [];
    }
  })
);

export const deliveryModeState = atomWithStorage<Delivery["type"]>(
  CONFIG.STORAGE_KEYS.DELIVERY,
  "shipping"
);

// Voucher discount state (số tiền giảm từ voucher)
export const voucherDiscountState = atomWithStorage<number>(
  "voucherDiscount",
  0
);

// Selected voucher state (voucher đã chọn từ promotion page)
export const selectedVoucherState = atomWithStorage<any | null>(
  "selectedVoucher",
  null
);

// Shipping fee state (phí vận chuyển)
export const shippingFeeState = atomWithStorage<number>("shippingFee", 0);

// Shipping info state (thông tin vận chuyển)
export interface ShippingInfo {
  fee: number;
  carrier_name: string;
  provider: string;
  provider_code?: string; // Format: SUPERAI-{carrier_id}-{carrier_name}
  carrier_id?: number;
  eta_text?: string;
}

export const shippingInfoState = atomWithStorage<ShippingInfo | null>(
  "shippingInfo",
  null
);

// Default address ID state - để trigger tính lại phí ship khi địa chỉ mặc định thay đổi
export const defaultAddressIdState = atom<number | null>(null);

// Shipping support state (hỗ trợ phí ship)
export interface ShippingSupport {
  totalSupport: number; // Tổng hỗ trợ (VND hoặc %)
  supportType: 'vnd' | 'percent'; // Loại hỗ trợ
  supportLabel: string; // Label hiển thị
  supportDetails: string; // Chi tiết hỗ trợ
  shippingType?: 'all_products' | 'individual_products'; // Loại cấu hình hỗ trợ
  products: Array<{
    productId: number;
    support: number;
    supportType: string;
    label: string;
  }>;
}

export const shippingSupportState = atomWithStorage<ShippingSupport | null>(
  "shippingSupport",
  null
);