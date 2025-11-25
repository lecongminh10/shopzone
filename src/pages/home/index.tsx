import { useEffect, useState, useRef } from "react";
import Banners from "./banners";
import Product from "./product";
import FlashSale from "./flash-sale";
import PromotionalBanner from "./promotional-banner";
import { PopupService, PopupBanner } from "@/api/service/popup.service";
import { ArrowUp } from "lucide-react";

const HomePage: React.FC = () => {
  const [popup, setPopup] = useState<PopupBanner | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hiển thị một lần mỗi khi mở app / tab mới
    const hasShownPopup = sessionStorage.getItem("popupShown");
    if (hasShownPopup) return;

    (async () => {
      const list = await PopupService.getPopupBanner();
      if (list && list.length > 0) {
        const randomIndex = Math.floor(Math.random() * list.length);
        const randomPopup = list[randomIndex];
        setPopup(randomPopup);
        setShowPopup(true);

        // Lưu để không hiện lại khi quay về home
        sessionStorage.setItem("popupShown", "true");
      }
    })();
  }, []);

  // Scroll to top button logic
  useEffect(() => {
    const handleScroll = () => {
      // Tìm element có scrollbar (thường là main content area)
      const scrollElement = document.querySelector('.overflow-y-auto') || window;
      const scrollTop = scrollElement === window 
        ? window.scrollY || document.documentElement.scrollTop
        : (scrollElement as HTMLElement).scrollTop;
      
      // Hiển thị button khi scroll > 300px
      setShowScrollTop(scrollTop > 300);
    };

    // Lắng nghe scroll event
    const scrollElement = document.querySelector('.overflow-y-auto') || window;
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    const scrollElement = document.querySelector('.overflow-y-auto') || window;
    if (scrollElement === window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      (scrollElement as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClose = () => setShowPopup(false);

  return (
    <div className="min-h-full relative">
      <Banners />
      <PromotionalBanner />
      <FlashSale />
      <Product />

      {showPopup && popup && (
        <div className="fixed inset-0 flex items-center justify-center z-[2100] bg-black/50">
          <div className="relative">
            <button
              onClick={handleClose}
              className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-black text-lg font-bold"
            >
              ✕
            </button>

            <img
              src={popup.image_url}
              alt={popup.title || "Popup Banner"}
              className="max-w-sm w-[255px] h-[385px] rounded shadow-lg object-contain"
            />
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed  right-4 z-[100] bg-primary text-primaryForeground rounded-full p-3 shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center"
          style={{ bottom: 190, right: 16, zIndex: 100 }} 
          aria-label="Cuộn lên đầu trang"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default HomePage;
