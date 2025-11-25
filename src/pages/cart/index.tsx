import CartList from "./cart-list";
import { EmptyCart } from "@/components/empty";
import HorizontalDivider from "@/components/horizontal-divider";
import Pay from "./pay";
import { useCart } from "@/hooks";

import Product from "../home/product";

export default function CartPage() {
  const { cart } = useCart();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        <CartList />
        <Product />
      </div>
      <HorizontalDivider />
      <Pay />
    </div>
  );
}
