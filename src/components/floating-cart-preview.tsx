import { useAtom, useAtomValue } from "jotai";
import { cartState, selectedCartItemIdsState, cartTotalState } from "@/state";
import Badge from "./badge";
import { CartIcon } from "./vectors";
import { formatPrice } from "@/utils/format";
import TransitionLink from "./transition-link";
import { useRouteHandle } from "@/hooks";

function FloatingCartPreview() {
  const cart = useAtomValue(cartState);
  const totalAmount = useAtomValue(cartTotalState);
  const totalItems = cart.length;
  const [selectedIds, setSelectedIds] = useAtom(selectedCartItemIdsState);
  const [handle] = useRouteHandle();

  if (totalItems === 0 || handle?.noFloatingCart) {
    return null;
  }

  // Helper function để tạo itemKey từ cart item (giống như các file khác)
  const getCartItemKey = (item: typeof cart[0]) => {
    const variantId = item.product.variant_id ?? item.product.phanloai_id ?? null;
    return variantId ? `${item.product.id}-${variantId}` : `${item.product.id}`;
  };

  const handleClick = () => {
    setSelectedIds(cart.map((item) => getCartItemKey(item)));
  };

  return (
    <TransitionLink
      to="/cart"
      onClick={handleClick}
      className={`fixed left-4 right-4 z-[50] ${
        handle?.noFooter ? "bottom-6" : "bottom-16"
      } mb-sb flex items-center space-x-2 text-left bg-primary text-primaryForeground px-4 py-2 rounded-lg`}
    >
      <Badge value={cart.length} style={{ boxShadow: "none" }}>
        <CartIcon mono />
      </Badge>
      <span className="text-base font-medium flex-1">
        {formatPrice(totalAmount)}
      </span>
      <span className="text-sm">Đặt mua</span>
    </TransitionLink>
  );
}

export default FloatingCartPreview;
