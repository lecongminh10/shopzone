import Layout from "@/components/layout";
import CartPage from "@/pages/cart";
import CategoryDetailPage from "@/pages/catalog/category-detail";
import CategoryListPage from "@/pages/catalog/category-list";
import ProductDetailPage from "@/pages/catalog/product-detail";
import ReviewsPage from "@/pages/catalog/reviews";
import HomePage from "@/pages/home";
import ProfilePage from "@/pages/profile";
import SearchPage from "@/pages/search";
import { createBrowserRouter } from "react-router-dom";
import { getBasePath } from "@/utils/zma";
import OrdersPage from "./pages/orders";
import ShippingAddressPage from "./pages/cart/shipping-address";
import StationsPage from "./pages/cart/stations";
import OrderDetailPage from "./pages/orders/detail";
import ProfileEditorPage from "./pages/profile/editor";
import CheckoutPage from "./pages/checkout/index";
import VouchersPage from "./pages/vouchers";
import FreeshipPage from "./pages/promotion/freeship";
import SalePage from "./pages/promotion/sale";
import VoucherPromotionPage from "./pages/promotion/voucher";
import MinigamePage from "./pages/minigame";
import HeartPage from "./pages/heart";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          handle: {
            logo: true,
            search: true,
          },
        },
        {
          path: "/categories",
          element: <CategoryListPage />,
          handle: {
            title: "Danh mục",
            noBack: true,
            logo: true,
            search: true,
          },
        },
        {
          path: "/heart",
          element: <HeartPage />,
          handle: {
            title: "Sản phẩm yêu thích",
            noFloatingCart: true,
            back: "/",
          },
        },
        {
          path: "/orders/:status?",
          element: <OrdersPage />,
          handle: {
            title: "Đơn hàng",
            logo: true,
            search: true,
            noFloatingCart: true,
          },
        },
        {
          path: "/order/:id",
          element: <OrderDetailPage />,
          handle: {
            title: "Thông tin đơn hàng",
            noFloatingCart: true,
            back: "/orders",
          },
        },
        {
          path: "/cart",
          element: <CartPage />,
          handle: {
            title: "Giỏ hàng",
            back: "/",
            noFloatingCart: true,
          },
        },
        {
          path: "/shipping-address",
          element: <ShippingAddressPage />,
          handle: {
            title: "Địa chỉ nhận hàng",
            noFooter: false,
            noFloatingCart: true,
            back: true,
          },
        },
        {
          path: "/stations",
          element: <StationsPage />,
          handle: {
            title: "Điểm nhận hàng",
            noFooter: true,
          },
        },
        {
          path: "/profile",
          element: <ProfilePage />,
          handle: {
            logo: true,
            noFloatingCart: true,
          },
        },
        {
          path: "/profile/edit",
          element: <ProfileEditorPage />,
          handle: {
            title: "Thông tin tài khoản",
            noFooter: true,
            noFloatingCart: true,
          },
        },
        {
          path: "/category/:id",
          element: <CategoryDetailPage />,
          handle: {
            search: true,
            logo: true,
          },
        },

        {
          path: "/product/:id",
          element: <ProductDetailPage />,
          handle: {
            scrollRestoration: 0, // when user selects another product in related products, scroll to the top of the page
            noFloatingCart: true,
            noFooter: true,
            logo: true,
            search: true,
          },
        },
        {
          path: "/product/:id/reviews",
          element: <ReviewsPage />,
          handle: {
            title: "Đánh giá",
            noFloatingCart: true,
          },
        },
        {
          path: "/search",
          element: <SearchPage />,
          handle: {
            search: true,
            title: "Tìm kiếm",
            noFooter: true,
          },
        },
        {
          path: "/checkout",
          element: <CheckoutPage />,
          handle: {
            title: "Thanh Toán",
            back: "/cart",
            noFloatingCart: true,
          },
        },
        {
          path: "/vouchers",
          element: <VouchersPage />,
          handle: {
            title: "Voucher",
            logo: true,
            noFloatingCart: true,
          },
        },
        {
          path: "/freeship",
          element: <FreeshipPage />,
          handle: {
            title: "Miễn phí ship",
            back: true,
            noFloatingCart: true,
          },
        },
        {
          path: "/notification",
          element: <FreeshipPage />,
          handle: {
            title: "Miễn phí ship",
            back: true,
            noFloatingCart: true,
          },
        },
        {
          path: "/flash-sale",
          element: <SalePage />,
          handle: {
            title: "Flash Sale",
            back: true,
            noFloatingCart: true,
          },
        },
        {
          path: "/promotion/voucher",
          element: <VoucherPromotionPage />,
          handle: {
            title: "Voucher",
            back: true,
            noFloatingCart: true,
          },
        },
        {
          path: "/lucky-wheel",
          element: <MinigamePage />,
          handle: {
            title: "Vòng quay may mắn",
            noFooter: false,
            noFloatingCart: true,
            back: true,
          },
        },
      ],
    },
  ],
  {
    basename: getBasePath(),
    // future: {
    //   v7_startTransition: true,
    // },
  }
);

export default router;
