import { useState } from "react";
import { CartIcon, CategoryIcon, HomeIcon, PackageIcon } from "./vectors";
import HorizontalDivider from "./horizontal-divider";
import { useAtomValue } from "jotai";
import { cartState } from "@/state";
import TransitionLink from "./transition-link";
import { useRouteHandle } from "@/hooks";
import Badge from "./badge";
import CategoryModal from "./categoryModal";
import OrdersModal from "./OrdersModal";
import { Heart, HeartIcon } from "lucide-react";
import { heartState } from "@/state/cart";

export default function Footer() {
  const [handle] = useRouteHandle();
  const cart = useAtomValue(cartState);
  const heart = useAtomValue(heartState);

  const [showCategories, setShowCategories] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const NAV_ITEMS = [
    {
      name: "Trang chủ",
      path: "/",
      icon: HomeIcon,
    },
    {
      name: "Danh mục",
      path: "#",
      icon: CategoryIcon,
      onClick: () => setShowCategories(true),
    },
    {
      name: "Đơn hàng",
      path: "#",
      icon: PackageIcon,
      onClick: () => setShowOrder(true),
    },
    {
      name: "Yêu thích",
      path: "/heart",
      icon: (props: any) => (
        <Badge value={heart.length}>
          <HeartIcon />
        </Badge>
      ),
    },
    {
      name: "Giỏ hàng",
      path: "/cart",
      icon: (props: any) => (
        <Badge value={cart.length}>
          <CartIcon {...props} />
        </Badge>
      ),
    },
  ];

  if (handle?.noFooter) return null;

  return (
    <>
      <HorizontalDivider />
      <div
        className="w-full px-4 pt-2 grid pb-sb"
        style={{
          gridTemplateColumns: `repeat(${NAV_ITEMS.length}, 1fr)`,
        }}
      >
        {NAV_ITEMS.map((item) => (
          <TransitionLink
            to={item.path}
            key={item.name}
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault();
                item.onClick();
              }
            }}
            className="flex flex-col items-center space-y-0.5 p-1 pb-0.5 cursor-pointer active:scale-105"
          >
            {({ isActive }) => {
              // kiểm tra nếu là "Danh mục" thì active = showCategories
              const active =
                item.name === "Danh mục"
                  ? showCategories
                  : item.name === "Đơn hàng"
                  ? showOrder
                  : isActive;
              return (
                <>
                  <div className="w-6 h-6 flex justify-center items-center">
                    <item.icon active={active} />
                  </div>
                  <div
                    className={`text-2xs ${
                      active ? "text-primary" : "text-gray-500"
                    }`}
                  >
                    {item.name}
                  </div>
                </>
              );
            }}
          </TransitionLink>
        ))}
      </div>

      {/* Modal riêng */}
      <CategoryModal
        open={showCategories}
        onClose={() => setShowCategories(false)}
      />
      <OrdersModal open={showOrder} onClose={() => setShowOrder(false)} />
    </>
  );
}
