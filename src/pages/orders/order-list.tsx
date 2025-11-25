import { Order } from "@/types";
import { Atom, useAtomValue } from "jotai";
import { loadable } from "jotai/utils";
import OrderSummary from "./order-summary";
import { OrderSummarySkeleton } from "@/components/skeleton";
import iconShop from "@/img/icon_shop.png";
import { productsState } from "@/state";
import ProductItem from "@/components/product-item";
interface OrderListProps {
  ordersState: Atom<Promise<Order[]>>;
  filterStatus?: string;
  onBeforeNavigate?: () => void; // Callback để đóng modal trước khi navigate
}

function OrderList({
  ordersState,
  filterStatus = "all",
  onBeforeNavigate,
}: OrderListProps) {
  const orderList = useAtomValue(loadable(ordersState));
  const loadableProducts = useAtomValue(loadable(productsState));
  const allProducts =
    loadableProducts.state === "hasData" ? loadableProducts.data : [];

  if (orderList.state === "hasData" && orderList.data.length === 0) {
    return (
      <div className="h-full flex-1">
        {/* Empty state với icon */}
        <div className="flex flex-col items-center justify-center py-8 mb-4">
          <img
            src={iconShop}
            alt="Không có đơn hàng"
            className="w-24 h-24 object-contain opacity-80 mb-4"
          />
          <div className="text-inactive text-center text-2xs mb-6">
            Ui trời ! Bạn chưa có đơn hàng nào
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        {allProducts.length > 0 && (
          <div>
            <div className="flex items-center text-sm font-semibold mb-3">
              <span className="flex-grow border-t border-gray-300"></span>
              <span className="mx-2 text-xl">Sản phẩm dành cho bạn</span>
              <span className="flex-grow border-t border-gray-300"></span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {allProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const filteredOrders =
    orderList.state === "hasData"
      ? orderList.data.filter((order) =>
          filterStatus === "all"
            ? true
            : order.status.toString() === filterStatus
        )
      : [];

  return (
    <div className="space-y-2">
      {orderList.state !== "hasData" ? (
        <>
          <OrderSummarySkeleton />
          <OrderSummarySkeleton />
          <OrderSummarySkeleton />
        </>
      ) : filteredOrders.length === 0 ? (
        <div className="h-full flex-1">
          {/* Empty state với icon */}
          <div className="flex flex-col items-center justify-center py-8 mb-4">
            <img
              src={iconShop}
              alt="Cửa hàng"
              className="w-24 h-24 object-contain opacity-80 mb-4"
            />
            <div className="text-inactive text-center text-2xs mb-6">
              Ui trời ! Bạn chưa có đơn hàng nào!
            </div>
          </div>

          {/* Danh sách sản phẩm */}
          {allProducts.length > 0 && (
            <div>
              <div className="flex items-center text-sm font-semibold mb-3">
                <span className="flex-grow border-t border-gray-300"></span>
                <span className="mx-2 text-xl">Sản phẩm dành cho bạn</span>
                <span className="flex-grow border-t border-gray-300"></span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {allProducts.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        filteredOrders.map((order) => (
          <OrderSummary
            key={order.id}
            order={order}
            onBeforeNavigate={onBeforeNavigate}
          />
        ))
      )}
    </div>
  );
}

export default OrderList;
