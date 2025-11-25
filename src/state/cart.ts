import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { CartItem, HeartItem, Cart, Heart } from "@/types";

// Giỏ hàng
export const cartState = atomWithStorage<Cart>("cart", []);

// Yêu thích
export const heartState = atomWithStorage<Heart>("heart", []);

// Selected IDs để tính tổng (có thể mở rộng)
export const selectedCartItemIdsState = atomWithStorage<string[]>(
  "selectedCartItemIds",
  []
);
export const selectedHeartItemIdsState = atomWithStorage<string[]>(
  "selectedHeartItemIds",
  []
);

// Tổng tiền giỏ hàng
export const cartTotalState = atom((get) => {
  const cart = get(cartState);
  const selectedIds = get(selectedCartItemIdsState);
  const getKey = (item: CartItem) =>
    item.product.variant_id
      ? `${item.product.id}-${item.product.variant_id}`
      : `${item.product.id}`;
  return cart
    .filter((item) => selectedIds.includes(getKey(item)))
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
});

// Tổng tiền yêu thích (ví dụ nếu muốn tính)
export const heartTotalState = atom((get) => {
  const heart = get(heartState);
  const selectedIds = get(selectedHeartItemIdsState);
  const getKey = (item: HeartItem) =>
    item.product.variant_id
      ? `${item.product.id}-${item.product.variant_id}`
      : `${item.product.id}`;
  return heart
    .filter((item) => selectedIds.includes(getKey(item)))
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
});
