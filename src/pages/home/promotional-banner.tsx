import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { openChat } from "zmp-sdk/apis";
import { getConfig } from "@/utils/template";
import mau3Icon from "@/img/Mau3_10.png";

// Headphone Icon Component (outline style)
const HeadphoneIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 3C7.03 3 3 7.03 3 12V19C3 20.1 3.9 21 5 21H9V12H5C5 8.13 8.13 5 12 5S19 8.13 19 12H15V21H19C20.1 21 21 20.1 21 19V12C21 7.03 16.97 3 12 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default function PromotionalBanner() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [canShowText, setCanShowText] = useState(false);
  const [canShowContactText, setCanShowContactText] = useState(false);

  // Kiểm tra xem đã qua 30 phút chưa
  useEffect(() => {
    const storageKey = "promotional_banner_first_view";
    const firstViewTime = localStorage.getItem(storageKey);
    
    if (!firstViewTime) {
      // Lần đầu tiên, lưu thời gian hiện tại
      localStorage.setItem(storageKey, Date.now().toString());
      setCanShowText(false);
    } else {
      // Kiểm tra xem đã qua 30 phút chưa
      const firstView = parseInt(firstViewTime, 10);
      const now = Date.now();
      const minutes30 = 30 * 60 * 1000; // 30 phút tính bằng milliseconds
      
      if (now - firstView >= minutes30) {
        setCanShowText(true);
      } else {
        setCanShowText(false);
        // Set timeout để cập nhật sau khi đủ 30 phút
        const remainingTime = minutes30 - (now - firstView);
        setTimeout(() => {
          setCanShowText(true);
        }, remainingTime);
      }
    }
  }, []);

  // Kiểm tra cho contact banner
  useEffect(() => {
    const storageKey = "contact_banner_first_view";
    const firstViewTime = localStorage.getItem(storageKey);
    
    if (!firstViewTime) {
      localStorage.setItem(storageKey, Date.now().toString());
      setCanShowContactText(false);
    } else {
      const firstView = parseInt(firstViewTime, 10);
      const now = Date.now();
      const minutes30 = 30 * 60 * 1000;
      
      if (now - firstView >= minutes30) {
        setCanShowContactText(true);
      } else {
        setCanShowContactText(false);
        const remainingTime = minutes30 - (now - firstView);
        setTimeout(() => {
          setCanShowContactText(true);
        }, remainingTime);
      }
    }
  }, []);

  if (!isVisible) return null;

  const handleClick = () => {
    // Chuyển tới trang bạn muốn
    navigate("/lucky-wheel");
  };

  const handleContactClick = async () => {
    // Mở Zalo chat với OA bằng Zalo Mini App SDK
    try {
      const oaId = getConfig((config) => config.template.oaIDtoOpenChat);
      console.log(oaId);
      
      if (oaId) {
        await openChat({
          type: "oa",
          id: oaId,
          message: "Xin chào nhà bán nha 🤗🤗🤗", // (tùy chọn) nội dung sẽ tự fill vào ô chat
        });
      }
    } catch (error) {
      console.error("Error opening chat:", error);
      // Fallback: mở link Zalo nếu openChat thất bại
      const zaloOaId = import.meta.env.VITE_ZALO_OA_ID || import.meta.env.VITE_SHOP_USERNAME;
      if (zaloOaId) {
        const message = encodeURIComponent("Xin chào nhà bán hàng");
        window.open(`https://zalo.me/${zaloOaId}?message=${message}`, "_blank");
      }
    }
  };

  return (
    <>
      {/* Banner Liên hệ với Shop - Lên trên */}
      <div className="fixed bottom-36 right-4 z-50">
        <div
          className="
            group relative flex items-center bg-white border-2 border-teal-500 rounded-full shadow-xl cursor-pointer
            opacity-90 hover:opacity-100 transition-opacity duration-500
            hover:scale-105 
          "
          onClick={handleContactClick}
        >
          <div className="flex-shrink-0 w-8 h-8 m-1 rounded-full overflow-hidden bg-teal-500 flex items-center justify-center">
            <HeadphoneIcon className="w-5 h-5 text-white" />
          </div>

          <div
            className={`
             max-w-0 overflow-hidden whitespace-nowrap
              text-sm font-semibold text-gray-800
              transition-all duration-500 ease-in-out
              ${canShowContactText ? "group-hover:max-w-xs" : ""}
            `}
          >
            Liên hệ với Shop
          </div>
        </div>
      </div>

      {/* Banner Vòng quay may mắn - Xuống dưới */}
      <div className="fixed bottom-24 right-4 z-50">
        <div
          className="
            group relative flex items-center bg-white border-2 border-green-500 rounded-full shadow-xl cursor-pointer
            opacity-90 hover:opacity-100 transition-opacity duration-500
            hover:scale-105 
          "
          onClick={handleClick}
        >
          <div className="flex-shrink-0 w-8 h-8 m-1 rounded-full overflow-hidden bg-green-500 flex items-center justify-center">
            <img src={mau3Icon} alt="Vòng quay" className="w-8 h-8" />
          </div>

          <div
            className={`
             max-w-0 overflow-hidden whitespace-nowrap
              text-sm font-semibold text-gray-800
              transition-all duration-500 ease-in-out
              ${canShowText ? "group-hover:max-w-xs" : ""}
            `}
          >
            Vòng quay may mắn
          </div>
        </div>
      </div>
    </>
  );
}
