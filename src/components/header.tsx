import { useAtomValue } from "jotai";
import { useLocation, useNavigate } from "react-router-dom";
import { productsState, loadableUserInfoState, keywordState } from "@/state"; // ✅ đổi sang state chứa products
import { useMemo, useState, useRef, useEffect } from "react";
import { useRouteHandle } from "@/hooks";
import { getConfig } from "@/utils/template";
import headerIllus from "@/static/header-illus.svg";
import SearchBar from "./search-bar";
import TransitionLink from "./transition-link";
import { Icon } from "zmp-ui";
import { DefaultUserAvatar } from "./vectors";
import SearchDropdown from "./SearchDropdown";
import NotificationModal from "./notification";
import { AuthService } from "@/api";
import logoImg from "@/img/logo-1753775228.png";

export default function Header() {
  const products = useAtomValue(productsState);
  const keyword = useAtomValue(keywordState);
  const navigate = useNavigate();
  const location = useLocation();
  const [handle, match] = useRouteHandle();
  const userInfo = useAtomValue(loadableUserInfoState);

  // Format avatar URL - thêm domain nếu là đường dẫn tương đối
  const formatAvatarUrl = (avatar?: string): string => {
    if (!avatar) return "";
    // Nếu đã có http/https thì giữ nguyên
    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar;
    }
    // Nếu là đường dẫn tương đối (bắt đầu bằng /) thì thêm domain
    if (avatar.startsWith("/")) {
      return `https://socdo.vn${avatar}`;
    }
    // Nếu không có / ở đầu, thêm cả / và domain
    return `https://socdo.vn/${avatar}`;
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const response = await AuthService.getSellerToken();
      const { shop_setting } = response.data;

      const giaoDien = shop_setting.find((item) => item.name === "giaodien");
      if (!giaoDien) return;

      const config = JSON.parse(giaoDien.value);
      setTheme(config); // <-- Lưu theme vào state
    };

    fetchToken();
  }, []);

  const [theme, setTheme] = useState<any>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const title = useMemo(() => {
    if (handle) {
      if (typeof handle.title === "function") {
        return handle.title({ params: match.params });
      } else {
        return handle.title;
      }
    }
    return "";
  }, [handle, match]);

  const showBack =
    handle?.back || (location.key !== "default" && !handle?.noBack);

  const handleBackClick = () => {
    if (typeof handle?.back === "string") navigate(handle.back);
    else navigate(-1);
  };

  const filteredProducts = keyword
    ? products.filter((p) =>
        p.name.toLowerCase().includes(keyword.toLowerCase())
      )
    : products;

  // Ẩn header khi vào profile page
  const isProfilePage =
    location.pathname === "/profile" ||
    location.pathname.startsWith("/profile/");

  // Ẩn header khi vào shipping-address hoặc vouchers (vì các trang này có header riêng)
  const isShippingAddressPage = location.pathname === "/shipping-address";
  const isVouchersPage = location.pathname === "/vouchers";
  const isMinigamePage = location.pathname === "/minigame";
  const isSpinPage = location.pathname === "/lucky-wheel";
  const isProductDetailPage = location.pathname.startsWith("/product/");

  // Ẩn icon thông báo ở các trang flash-sale, freeship, promotion/voucher, order detail, cart, checkout
  const hideNotificationIcon =
    location.pathname === "/flash-sale" ||
    location.pathname === "/freeship" ||
    location.pathname === "/heart" ||
    location.pathname === "/promotion/voucher" ||
    location.pathname === "/cart" ||
    location.pathname === "/checkout" ||
    location.pathname.startsWith("/order/");

  // Hiển thị avatar ở trang home, orders, cart và category
  const isOrdersPage =
    location.pathname === "/orders" || location.pathname.startsWith("/orders/");
  const isHomePage = location.pathname === "/";
  const isCartPage = location.pathname === "/cart";
  const isCategoryPage = location.pathname.startsWith("/category/");
  const showAvatar = isOrdersPage || isHomePage || isCartPage || isCategoryPage;

  // Lấy thông tin avatar từ userInfo - PHẢI GỌI TRƯỚC EARLY RETURN
  const avatarUrl = useMemo(() => {
    if (userInfo.state === "hasData" && userInfo.data) {
      const avatar = userInfo.data.avatar || (userInfo.data as any).avatar_url;
      return formatAvatarUrl(avatar);
    }
    return "";
  }, [userInfo]);

  // Early return PHẢI SAU TẤT CẢ HOOKS
  if (
    isProfilePage ||
    isShippingAddressPage ||
    isVouchersPage ||
    isMinigamePage ||
    isSpinPage ||
    isProductDetailPage
  ) {
    return null;
  }

  return (
    <>
      {showDropdown && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[900]"
          style={{ top: "var(--header-height, 130px)" }}
          onClick={() => {
            setShowDropdown(false);
            searchInputRef.current?.blur();
          }}
        />
      )}

      <div
        className="bg-primary"
        style={{
          backgroundColor: theme?.header,
        }}
      >
        <div
          className="relative z-[1000] w-full flex flex-col px-4 text-black pt-st bg-no-repeat bg-right-top"
          style={{
            // backgroundColor: theme?.header,
            // backgroundColor: `#008000a7`,
            borderTopWidth: "0.1px",
            borderTopColor: "#00000000",
            borderTopStyle: "solid",
            borderBottomWidth: "0.1px",
            borderBottomColor: "#0000001a",
            borderBottomStyle: "solid",
          }}
        >
          {handle?.logo && (
            <div className="w-full min-h-12 flex py-2 px-2">
              {/* Left: Logo + Shop name */}
              <div className="flex items-center flex-1 min-w-0">
                <img
                  src={logoImg}
                  className="flex-none  rounded-full"
                  alt="Logo"
                />
                <TransitionLink to="/" className="ml-2">
                  <h1 className="text-lg font-bold truncate text-white">
                    {getConfig((c) => c.template.shopName)}
                  </h1>
                </TransitionLink>
              </div>

              {/* Right: Notification button */}
              {!hideNotificationIcon && (
                <div className="flex-shrink-0 ml-40 flex-1">
                  <button
                    onClick={() => setShowNotificationModal(true)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-black hover:bg-white/20 transition-colors"
                    aria-label="Thông báo"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
          {!handle?.logo && (
            <div className="w-full min-h-12 flex items-center justify-between py-2">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                {showBack && (
                  <div
                    className="py-1 px-2 cursor-pointer flex-shrink-0 text-black"
                    onClick={handleBackClick}
                  >
                    <Icon icon="zi-arrow-left" />
                  </div>
                )}
                <div className="flex-1 flex justify-center">
                  <div className="text-xl font-medium truncate text-black text-center mr-10">
                    {title}
                  </div>
                </div>
              </div>
              {!hideNotificationIcon && (
                <div className="flex items-center gap-3 flex-shrink-0 ml-auto mr-2">
                  <button
                    onClick={() => setShowNotificationModal(true)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-black hover:bg-white/20 transition-colors"
                    aria-label="Thông báo"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
          {handle?.search && (
            <div className="relative w-full py-2 flex space-x-2">
              <div className="flex-1 relative" ref={dropdownRef}>
                <SearchBar
                  ref={searchInputRef}
                  onFocus={() => setShowDropdown(true)}
                  onClick={() => setShowDropdown(true)} // 🔹 bật dropdown khi click vào input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const query = searchInputRef.current?.value?.trim();
                      setShowDropdown(false);
                      if (query) {
                        navigate(`/search?query=${encodeURIComponent(query)}`);
                      }
                    }
                  }}
                />

                {showDropdown && (
                  <SearchDropdown
                    products={filteredProducts} // ✅ chỉ show sản phẩm khớp với keyword
                    onClose={() => {
                      setShowDropdown(false);
                      searchInputRef.current?.blur();
                    }}
                    limit={10}
                    keyWord={keyword}
                  />
                )}
              </div>
              {/* Avatar bên cạnh search bar ở trang home và orders */}
              {showAvatar && (
                <div className="flex-shrink-0">
                  <TransitionLink to="/profile">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-200">
                        <DefaultUserAvatar className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </TransitionLink>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        open={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
      />
    </>
  );
}
