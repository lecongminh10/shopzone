import FlashSaleGrid from "@/components/flash-sale-grid";
import { useAtomValue, useSetAtom } from "jotai";
import { loadable } from "jotai/utils";
import { flashSaleProductsState, productPageState } from "@/state";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {
  FlashSaleService,
  FlashSale as FlashSaleType,
} from "@/api/service/flash-sale.service";
import dhIcon from "@/img/dh.png";
import saleIcon from "@/img/sale.png";
import freeshipIcon from "@/img/freeshipping.png";
import voucherIcon from "@/img/voucher.png";
import Icon1 from "@/img/icon1.jpg";
import Icon2 from "@/img/icon2.jpg";
import Icon3 from "@/img/icon3.jpg";

const FlashSaleIcon = () => (
  <img
    src={saleIcon}
    alt="Flash Sale"
    className="w-[35px] h-[35px] object-contain"
  />
);

const FreeshipIcon = () => (
  <img
    src={freeshipIcon}
    alt="Free Shipping"
    className="w-[35px] h-[35px] object-contain"
  />
);

const VoucherIcon = () => (
  <img
    src={voucherIcon}
    alt="Voucher"
    className="w-[35px] h-[35px] object-contain"
  />
);
const Icon11 = () => (
  <img src={Icon1} alt="icon1" className="w-[15px] h-[15px] object-contain" />
);
const Icon21 = () => (
  <img src={Icon2} alt="icon2" className="w-[15px] h-[15px] object-contain" />
);
const Icon31 = () => (
  <img src={Icon3} alt="icon3" className="w-[15px] h-[15px] object-contain" />
);

const OrdersIcon = () => (
  <img src={dhIcon} alt="Orders" className="w-[35px] h-[35px] object-contain" />
);

// Countdown timer hook
function useCountdown(timeRemaining?: number) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!timeRemaining) return;

    const totalSeconds = Math.max(0, Math.floor(timeRemaining));
    setTimeLeft({
      days: Math.floor(totalSeconds / 86400), // 1 ngày = 86400s
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    });

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else clearInterval(interval);

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return {
    days: timeLeft.days,
    hours: formatTime(timeLeft.hours),
    minutes: formatTime(timeLeft.minutes),
    seconds: formatTime(timeLeft.seconds),
  };
}

export default function FlashSale() {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const page = useAtomValue(productPageState);
  const navigate = useNavigate();
  const [flashSales, setFlashSales] = useState<FlashSaleType[]>([]);

  // Load flash sales for countdown
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await FlashSaleService.getFlashSales();
        if (mounted && res?.success && Array.isArray(res.data?.flashsales)) {
          setFlashSales(res.data.flashsales);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Load flash sale products
  const loadableFlashSaleProducts = useAtomValue(
    loadable(flashSaleProductsState)
  );

  // Get actual data from loadable
  const allProducts =
    loadableFlashSaleProducts.state === "hasData"
      ? loadableFlashSaleProducts.data
      : [];

  const [expanded, setExpanded] = useState(false);

  const displayedProducts = allProducts;
  const hasMore = allProducts.length > 4;

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      // Small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 300));
    } finally {
      setIsLoadingMore(false);
    }
  };

  const initialLoading = loadableFlashSaleProducts.state === "loading";

  const activeFlashSale = flashSales.find((fs) => fs.is_active);

  // ✅ Gọi countdown sau khi flashSales đã có dữ liệu thật
  const globalCountdown = useCountdown(
    activeFlashSale ? activeFlashSale.time_remaining : undefined
  );

  return (
    <div>
      <div className="bg-white px-4 py-2 flex justify-center items-center gap-7 text-[10px]">
        <div className="flex items-center gap-1">
          <Icon11 />
          <span>Trả hàng 15 ngày</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon21 />
          <span>Chính hãng 100%</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon31 />
          <span>Giao miễn phí</span>
        </div>
      </div>

      <div className="bg-white px-4 py-3">
        <div className="grid grid-cols-4 gap-2">
          {/* Flash Sale */}
          <div>
            <button
              className="flex flex-col items-center gap-1 p-3 bg-white rounded-full shadow hover:bg-gray-100 transition ml-[10px]"
              onClick={() => navigate("/flash-sale")}
            >
              <FlashSaleIcon />
            </button>
            <span className="text-xs text-gray-900 font-medium flex flex-col items-center mt-1">
              Flash Sale
            </span>
          </div>

          <div>
            <button
              className="flex flex-col items-center gap-1 p-3 bg-white rounded-full shadow hover:bg-gray-100 transition ml-[10px]"
              onClick={() => navigate("/freeship")}
            >
              <FreeshipIcon />
            </button>
            <span className="text-xs text-gray-900 font-medium flex flex-col items-center  mt-1">
              FreeShip
            </span>
          </div>

          <div>
            <button
              className="flex flex-col items-center gap-1 p-3 bg-white rounded-full shadow hover:bg-gray-100 transition ml-[10px]"
              onClick={() => navigate("/promotion/voucher")}
            >
              <VoucherIcon />
            </button>
            <span className="text-xs text-gray-900 font-medium flex flex-col items-center  mt-1">
              Voucher
            </span>
          </div>

          <div>
            <button
              className="flex flex-col items-center gap-1 p-3 bg-white rounded-full shadow hover:bg-gray-100 transition ml-[10px]"
              onClick={() => navigate("/orders")}
            >
              <OrdersIcon />
            </button>
            <span className="text-xs text-gray-900 font-medium flex flex-col items-center  mt-1">
              Đơn hàng
            </span>
          </div>
          {/* Orders */}
        </div>
      </div>

      <div className="bg-pink-50 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#ec4899"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 1L3 14h7l-1 9 10-13h-7l1-9z" />
            </svg>
            <h2 className="text-lg font-bold">
              <span className="text-pink-500">FLASH</span>{" "}
              <span className="text-orange-500">SALE</span>
            </h2>
          </div>

          {/* Right: Global countdown timer */}
          {activeFlashSale && (
            <div className="flex items-center gap-2 bg-white text-red-600 px-3 py-1.5 rounded-lg">
              <span className="text-sm font-semibold">
                {globalCountdown.days > 0 && `${globalCountdown.days} ngày `}
                {globalCountdown.hours}:{globalCountdown.minutes}:
                {globalCountdown.seconds}
              </span>
            </div>
          )}
        </div>
        {/* Promotional message */}
      </div>
      {initialLoading && displayedProducts.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <div className="text-sm text-subtitle">Đang tải flash sale...</div>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <div className="text-sm text-subtitle">
            Hiện không có flash sale nào
          </div>
        </div>
      ) : (
        <>
          <FlashSaleGrid
            products={displayedProducts}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            loading={isLoadingMore}
          />
        </>
      )}
    </div>
  );
}
