import React, { useMemo } from "react";
import { useAtomValue } from "jotai";
import { cartState, selectedCartItemIdsState } from "@/state";
import { formatPrice } from "@/utils/format";

export default function FlashSaleItem() {
  const cart = useAtomValue(cartState);
  const selectedIds = useAtomValue(selectedCartItemIdsState);

  // Helper function để tạo itemKey từ cart item
  const getCartItemKey = (item: typeof cart[0]) => {
    const variantId = item.product.variant_id ?? item.product.phanloai_id ?? null;
    return variantId ? `${item.product.id}-${variantId}` : `${item.product.id}`;
  };

  // Memoize selectedItems để tránh tính toán lại không cần thiết
  const selectedItems = useMemo(() => {
    return cart.filter((item) => selectedIds.includes(getCartItemKey(item)));
  }, [cart, selectedIds]);

  if (selectedItems.length === 0) {
    return <p className="p-4 text-gray-500">Chưa có sản phẩm nào được chọn</p>;
  }

  return (
    <div className="space-y-2">
      {selectedItems.map((item) => (
        <div
          key={item.product.id}
          className="bg-white rounded-lg px-4 py-3 shadow-sm flex gap-3"
        >
          {/* Product Image */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 border-2 border-green-500 rounded-lg overflow-hidden">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium line-clamp-2 mb-2">
              {item.product.name}
            </h4>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">
                  {formatPrice(item.product.price)}
                </span>
                <span className="text-sm text-gray-600">×{item.quantity}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
