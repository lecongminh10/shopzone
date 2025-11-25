// CartList.tsx
import { useAtom, useAtomValue } from "jotai";
import { cartState, selectedCartItemIdsState } from "@/state";
import CartItem from "./cart-item";
import Section from "@/components/section";
import HorizontalDivider from "@/components/horizontal-divider";
import { Checkbox, Icon } from "zmp-ui";
import ApplyVoucher from "./apply-voucher";
import { getConfig } from "@/utils/template";

export default function CartList() {
  const [cart, setCart] = useAtom(cartState);
  const [selectedIds, setSelectedIds] = useAtom(selectedCartItemIdsState);

  // Tạo unique key cho mỗi cart item (kết hợp product.id và variant_id)
  const getCartItemKey = (item: (typeof cart)[0]) => {
    const variantId =
      item.product.variant_id ?? item.product.phanloai_id ?? null;
    return variantId ? `${item.product.id}-${variantId}` : `${item.product.id}`;
  };

  // Lấy tên shop từ config
  const shopName = getConfig((c) => c.template.shopName) || "Shop";

  // Kiểm tra tất cả items trong shop có được chọn không
  const shopItemsKeys = cart.map((item) => getCartItemKey(item));
  const shopAllSelected =
    cart.length > 0 && shopItemsKeys.every((key) => selectedIds.includes(key));

  const toggleSelectShop = () => {
    if (shopAllSelected) {
      // Bỏ chọn tất cả items trong shop
      setSelectedIds(selectedIds.filter((id) => !shopItemsKeys.includes(id)));
    } else {
      // Chọn tất cả items trong shop
      const newSelectedIds = [...selectedIds];
      shopItemsKeys.forEach((key) => {
        if (!newSelectedIds.includes(key)) {
          newSelectedIds.push(key);
        }
      });
      setSelectedIds(newSelectedIds);
    }
  };

  return (
    <Section
      title={<div className="text-xl font-bold"></div>}
      className="flex-1 overflow-y-auto rounded-lg"
    >
      <div className="w-full bg-white rounded-lg">
        {/* Shop Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-2 flex-1">
            <Checkbox
              value="shop"
              checked={shopAllSelected}
              onChange={toggleSelectShop}
              style={{ transform: "scale(0.8)" }}
            />
            <span className="text-sm font-medium">{shopName}</span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="w-full">
          {cart.map((item) => (
            <CartItem key={getCartItemKey(item)} {...item} />
          ))}
        </div>

        {/* Discount Code Section */}
        <div className="border-t border-gray-200">
          <ApplyVoucher />
        </div>
      </div>
      <HorizontalDivider />
    </Section>
  );
}
