import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartIcon } from "@/components/vectors";
import { Icon } from "zmp-ui";
import {
  GetListPlayGameService,
  MinigameService,
  PlayMiniGameService,
  Prize,
  SpinMiniGameService,
  PlayItem,
  HistoryItem,
  ListHistoryMiniGameService,
} from "@/api/service/minigame.sevice";
import iconShop from "@/img/icon_shop.png";

// Map coupons_detail từ API thành Prize
const mapCouponsToPrizes = (
  coupons: any[],
  tyLeTrung?: { [key: string]: string }
): Prize[] => {
  const prizeList: Prize[] = coupons.map((coupon) => ({
    id: coupon.id,
    label: coupon.code,
    type: "voucher",
    discount: coupon.discount, // lấy đúng trường từ API
  }));

  // Thêm "Suýt trúng" nếu có ty_le_trung["0"]
  if (tyLeTrung && tyLeTrung["0"]) {
    prizeList.push({
      id: 0,
      label: "Suýt trúng",
      type: "miss",
    });
  }

  return prizeList;
};
export default function MinigamePage() {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinsRemaining, setSpinsRemaining] = useState(10);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [showResult, setShowResult] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentWinner, setRecentWinner] = useState<{
    name: string;
    prize: string;
  } | null>(null);
  const [message, setMessage] = useState<string>("");
  const [miniGameId, setMiniGameId] = useState<number | null>(null);
  const [popup, setPopup] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "warning" | "info";
  }>({
    show: false,
    message: "",
    type: "info",
  });
  const [playList, setPlayList] = useState<HistoryItem[]>([]);
  const [loadingPlayList, setLoadingPlayList] = useState(false);
  const [showPlayList, setShowPlayList] = useState(false);
  const [hasReceivedPlay, setHasReceivedPlay] = useState(false);
  const [isOutOfPlays, setIsOutOfPlays] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  // Hàm kiểm tra xem đã quá 24 giờ từ lần nhấn cuối chưa
  const check24HoursPassed = (): boolean => {
    if (!miniGameId) return false;
    const storageKey = `minigame_receive_play_${miniGameId}`;
    const lastClickTime = localStorage.getItem(storageKey);
    
    if (!lastClickTime) return true; // Chưa có lần nhấn nào
    
    const lastClick = parseInt(lastClickTime, 10);
    const now = Date.now();
    const hours24 = 24 * 60 * 60 * 1000; // 24 giờ tính bằng milliseconds
    
    return (now - lastClick) >= hours24;
  };

  // Hàm lưu thời gian nhấn vào localStorage
  const saveReceivePlayTime = () => {
    if (!miniGameId) return;
    const storageKey = `minigame_receive_play_${miniGameId}`;
    localStorage.setItem(storageKey, Date.now().toString());
  };

  // Hàm hiển thị popup
  const showPopup = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "info"
  ) => {
    setPopup({ show: true, message, type });
    // Tự động đóng sau 3 giây
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "info" });
    }, 3000);
  };

  // Fetch minigame data từ API
  useEffect(() => {
    const fetchMinigameData = async () => {
      let retries = 5;
      while (retries > 0 && !localStorage.getItem("sellerToken")) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        retries--;
      }

      try {
        setLoading(true);
        const response = await MinigameService.getMinigame();

        if (response.success && response.data) {
          setMiniGameId(response.data.id);
          setIsExpired(false);

          if (
            response.data.coupons_detail &&
            response.data.coupons_detail.length > 0
          ) {
            setPrizes(
              mapCouponsToPrizes(
                response.data.coupons_detail,
                (response.data as any).ty_le_trung
              )
            );
          }
          if (response.data.spins_remaining !== undefined)
            setSpinsRemaining(response.data.spins_remaining);
          if (response.data.recent_winner)
            setRecentWinner(response.data.recent_winner);
          if (response.data.message) setMessage(response.data.message);
        } else {
          // API trả về success: false
          setIsExpired(true);
        }
      } catch (error: any) {
        console.error(
          "❌ [MINIGAME] Error fetching minigame data:",
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMinigameData();
  }, []);

  // Hàm fetch danh sách lượt chơi từ lịch sử
  const fetchPlayList = async () => {
    if (!miniGameId) return;

    try {
      setLoadingPlayList(true);
      const response = await ListHistoryMiniGameService.get(miniGameId);
      if (response.success && response.data?.history) {
        setPlayList(response.data.history);
      }
      
      // Kiểm tra xem có lượt chơi chưa sử dụng hôm nay không
      try {
        const playResponse = await GetListPlayGameService.get(miniGameId);
        if (playResponse.success && playResponse.data?.plays) {
          const today = new Date();
          const hasUnusedToday = playResponse.data.plays.some((play) => {
            if (play.used) return false;
            const playDate = new Date(play.play_date || play.created_at);
            return (
              playDate.getDate() === today.getDate() &&
              playDate.getMonth() === today.getMonth() &&
              playDate.getFullYear() === today.getFullYear()
            );
          });
          setHasReceivedPlay(hasUnusedToday);
        }
      } catch (error) {
        // Ignore error khi check play list
        console.warn("Could not check play list:", error);
      }
    } catch (error: any) {
      console.error(
        "❌ [MINIGAME] Error fetching play list:",
        error.message
      );
    } finally {
      setLoadingPlayList(false);
    }
  };

  // Fetch danh sách lượt chơi
  useEffect(() => {
    if (miniGameId) {
      fetchPlayList();
      // Kiểm tra 24 giờ từ localStorage khi component mount
      const has24HoursPassed = check24HoursPassed();
      if (!has24HoursPassed) {
        setIsOutOfPlays(true);
        setHasReceivedPlay(true);
      } else {
        setIsOutOfPlays(false);
        setHasReceivedPlay(false);
      }
    }
  }, [miniGameId]);

  const handleSpin = async () => {
    if (isSpinning || spinsRemaining <= 0 || !miniGameId) return;

    setIsSpinning(true);
    setShowResult(false);

    const result = await PlayMiniGameService.play(miniGameId);
    setIsSpinning(false);

    if (result.success && result.data?.prize) {
      setWonPrize(result.data.prize);
      setSpinsRemaining(result.data.spins_remaining ?? spinsRemaining - 1);
      setShowResult(true);
    } else {
      showPopup(result.message || "Quay thất bại", "error");
    }
  };

  // Hàm nhận lượt chơi miễn phí - gọi API play-mini-game
  const handleReceivePlay = async () => {
    if (!miniGameId) {
      showPopup("Không tìm thấy mini game!", "error");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showPopup("Vui lòng đăng nhập để nhận lượt chơi!", "error");
        return;
      }

      const response = await PlayMiniGameService.play(miniGameId);
      
      if (response.success) {
        // Xóa timestamp trong localStorage khi nhận thành công
        if (miniGameId) {
          const storageKey = `minigame_receive_play_${miniGameId}`;
          localStorage.removeItem(storageKey);
        }
        
        // Kiểm tra nếu có play_id và used: false thì đã nhận lượt chơi
        if (response.data?.play_id && response.data.used === false) {
          setHasReceivedPlay(true);
          setIsOutOfPlays(false);
          showPopup(response.message || "Nhận lượt chơi thành công!", "success");
        } else if (response.data?.spins_remaining !== undefined) {
          setSpinsRemaining(response.data.spins_remaining);
          setIsOutOfPlays(false);
          showPopup("Nhận lượt chơi thành công!", "success");
        } else {
          setIsOutOfPlays(false);
          showPopup(response.message || "Nhận lượt chơi thành công!", "success");
        }
        // Refresh danh sách lượt chơi
        fetchPlayList();
      } else {
        // Kiểm tra nếu hết lượt chơi (400 Bad Request hoặc remaining = 0)
        if (response.remaining === 0 || (response.total_used !== undefined && response.max_plays_per_day !== undefined && response.total_used >= response.max_plays_per_day)) {
          // Lưu thời gian nhấn vào localStorage
          saveReceivePlayTime();
          setIsOutOfPlays(true);
          setHasReceivedPlay(true);
        }
        showPopup(response.message || "Nhận lượt chơi thất bại!", "error");
      }
    } catch (error: any) {
      console.error("❌ [RECEIVE_PLAY] Error:", error);
      
      // Lưu thời gian nhấn vào localStorage khi có lỗi
      saveReceivePlayTime();
      setIsOutOfPlays(true);
      setHasReceivedPlay(true);
      
      showPopup("Có lỗi xảy ra khi nhận lượt chơi!", "error");
    }
  };

  const spinWheel = async () => {
    if (isSpinning || spinsRemaining <= 0 || prizes.length === 0 || !miniGameId)
      return;

    setIsSpinning(true);
    setShowResult(false);
    setWonPrize(null);

    try {
      // ============================================================
      // 1. LẤY playId TỪ API
      // ============================================================
      const playRes = await GetListPlayGameService.get(miniGameId);

      if (!playRes.success || !playRes.data?.plays?.length) {
        showPopup("Không tìm thấy lượt quay!", "error");
        setIsSpinning(false);
        return;
      }

      const unusedPlay = playRes.data.plays.find((p) => !p.used);
      if (!unusedPlay) {
        showPopup("Bạn đã dùng hết lượt quay!", "warning");
        setIsSpinning(false);
        return;
      }

      const playId = unusedPlay.id;

      // ============================================================
      // 2. QUAY FE NGAY – RANDOM PRIZE
      // ============================================================
      const fakeRotation = rotation + 360 * 5 + Math.random() * 360;
      setRotation(fakeRotation);

      const randomIndex = Math.floor(Math.random() * prizes.length);
      const localPrize = prizes[randomIndex];

      const segmentAngle = 360 / prizes.length;
      const prizeAngle = randomIndex * segmentAngle;
      const targetAngle = 360 - prizeAngle - segmentAngle / 2;

      // Điều chỉnh bánh xe đúng vị trí FE
      setTimeout(() => {
        const correctedRotation = fakeRotation + targetAngle;
        setRotation(correctedRotation);
      }, 100);

      // ============================================================
      // 3. SONG SONG → GỌI API TRẢ KẾT QUẢ REAL PRIZE
      // ============================================================
      const apiPromise = SpinMiniGameService.spin(playId);

      // ============================================================
      // 4. SAU 4 GIÂY → DỪNG QUAY VÀ HIỆN FE RESULT
      // ============================================================
      setTimeout(() => {
        setIsSpinning(false);
        setWonPrize(localPrize);
        setShowResult(true);
        setSpinsRemaining((prev) => prev - 1);
        // Refresh danh sách lượt chơi sau khi quay xong
        fetchPlayList();
      }, 4000);

      apiPromise.then((result) => {
        if (!result.success || !result.data) {
          console.warn("API quay thất bại:", result.message);
          showPopup(result.message || "API quay thất bại", "error");
          return;
        }

        const apiPrize = result.data.prize;

        if (!apiPrize) {
          console.warn("API không trả về prize");
          return;
        }

        console.log("🎁 FE prize:", localPrize);
        console.log("🎁 API prize:", apiPrize);

        // Kiểm tra lệch
        if (apiPrize.id !== localPrize.id) {
          console.warn("⚠️ Prize FE ≠ Prize API. Ghi đè theo API...");
          setWonPrize(apiPrize); // override theo API
        }
      });
    } catch (err: any) {
      console.error("❌ [SPIN_WHEEL] Error:", err);
      showPopup(
        "Có lỗi xảy ra khi quay: " + (err.message || "Lỗi không xác định"),
        "error"
      );
      setIsSpinning(false);
    }
  };

  const formatDiscount = (discount?: number, type?: string) => {
    if (!discount) return "";
    return type === "phantram"
      ? `${discount}%`
      : `${discount.toLocaleString("vi-VN")}₫`;
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
      <div className="w-full min-h-screen bg-gradient-to-b from-yellow-50 via-yellow-100 to-green-500 relative overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
          aria-label="Quay lại"
        >
          <Icon icon="zi-arrow-left" size={24} />
        </button>
      </div>

      {/* Light rays effect */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
        }}
      ></div>

      {/* Sparkling dots */}
      <div className="absolute top-10 right-20 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
      <div
        className="absolute top-16 right-32 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"
        style={{ animationDelay: "0.3s" }}
      ></div>
      <div
        className="absolute top-20 right-24 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
        style={{ animationDelay: "0.7s" }}
      ></div>

      <div className="px-4 py-6 relative z-10">
        {/* Logo ECO điểm bán */}

        {/* Main Title with 3D effect */}
        <div className="mb-6 relative">
          {/* Spinning Arrow Icon - Left side */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 -translate-x-1 z-20">
            <div className="relative w-12 h-12">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="absolute inset-0 animate-spin"
                style={{
                  animationDuration: "3s",
                  filter: "drop-shadow(0 2px 6px rgba(255,255,255,0.6))",
                }}
              >
                {/* Curved arrow path - circular */}
                <path
                  d="M 24 4 A 20 20 0 1 1 18 14"
                  stroke="white"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Arrow head */}
                <path
                  d="M 16 12 L 18 15 L 20 12"
                  stroke="white"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Golden Coins scattered around */}
          <div className="absolute -top-2 left-1/4 w-8 h-8">
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-yellow-800 font-bold text-xs">₫</span>
            </div>
          </div>
          <div className="absolute top-4 right-1/4 w-6 h-6">
            <div
              className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-bounce"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="text-yellow-800 font-bold text-xs">₫</span>
            </div>
          </div>
          <div className="absolute -bottom-2 right-1/3 w-7 h-7">
            <div
              className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-bounce"
              style={{ animationDelay: "0.6s" }}
            >
              <span className="text-yellow-800 font-bold text-xs">₫</span>
            </div>
          </div>
          <div className="absolute top-8 left-1/3 w-6 h-6">
            <div
              className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-bounce"
              style={{ animationDelay: "0.9s" }}
            >
              <span className="text-yellow-800 font-bold text-xs">₫</span>
            </div>
          </div>

          <div className="text-center relative z-10">
            {/* Curved Text using SVG */}
            <svg
              width="100%"
              height="150"
              viewBox="0 0 400 200"
              className="overflow-visible"
              style={{ maxWidth: "500px", margin: "0 auto" }}
            >
              <defs>
                {/* Orange glow filter - extended shadow */}
                <filter
                  id="orangeGlow"
                  x="-150%"
                  y="-150%"
                  width="400%"
                  height="400%"
                >
                  {/* Large blur for extended shadow */}
                  <feGaussianBlur
                    in="SourceAlpha"
                    stdDeviation="8"
                    result="blur1"
                  />
                  <feOffset dx="0" dy="12" in="blur1" result="offset1" />
                  <feFlood
                    floodColor="#FF8C00"
                    floodOpacity="0.6"
                    result="orange1"
                  />
                  <feComposite
                    in="orange1"
                    in2="offset1"
                    operator="in"
                    result="glow1"
                  />

                  {/* Medium blur layer */}
                  <feGaussianBlur
                    in="SourceAlpha"
                    stdDeviation="5"
                    result="blur2"
                  />
                  <feOffset dx="0" dy="10" in="blur2" result="offset2" />
                  <feFlood
                    floodColor="#FF8C00"
                    floodOpacity="0.8"
                    result="orange2"
                  />
                  <feComposite
                    in="orange2"
                    in2="offset2"
                    operator="in"
                    result="glow2"
                  />

                  {/* Small blur layer for sharp edge */}
                  <feGaussianBlur
                    in="SourceAlpha"
                    stdDeviation="2"
                    result="blur3"
                  />
                  <feOffset dx="0" dy="8" in="blur3" result="offset3" />
                  <feFlood
                    floodColor="#FF8C00"
                    floodOpacity="1"
                    result="orange3"
                  />
                  <feComposite
                    in="orange3"
                    in2="offset3"
                    operator="in"
                    result="glow3"
                  />

                  <feMerge>
                    <feMergeNode in="glow1" />
                    <feMergeNode in="glow2" />
                    <feMergeNode in="glow3" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Path for VÒNG QUAY - curved upward */}
              <path
                id="curve1"
                d="M 50 70 Q 200 30 350 70"
                fill="none"
                stroke="none"
              />

              {/* VÒNG QUAY - Orange extended shadow layers */}
              <text
                fontSize="42"
                fontWeight="900"
                fontFamily="Arial, sans-serif"
                letterSpacing="4px"
                fill="#FF8C00"
                opacity="0.5"
                filter="url(#orangeGlow)"
              >
                <textPath href="#curve1" startOffset="50%">
                  <tspan textAnchor="middle">VÒNG QUAY</tspan>
                </textPath>
              </text>

              {/* VÒNG QUAY - Additional extended orange shadow */}
              <text
                fontSize="42"
                fontWeight="900"
                fontFamily="Arial, sans-serif"
                letterSpacing="4px"
                fill="#FF8C00"
                opacity="0.3"
                style={{
                  filter: "blur(12px)",
                  transform: "translateY(12px)",
                }}
              >
                <textPath href="#curve1" startOffset="50%">
                  <tspan textAnchor="middle">VÒNG QUAY</tspan>
                </textPath>
              </text>

              {/* VÒNG QUAY - Medium orange shadow */}
              <text
                fontSize="42"
                fontWeight="900"
                fontFamily="Arial, sans-serif"
                letterSpacing="4px"
                fill="#FF8C00"
                opacity="0.5"
                style={{
                  filter: "blur(6px)",
                  transform: "translateY(8px)",
                }}
              >
                <textPath href="#curve1" startOffset="50%">
                  <tspan textAnchor="middle">VÒNG QUAY</tspan>
                </textPath>
              </text>

              {/* VÒNG QUAY - Orange stroke (outline) */}
              <text
                fontSize="42"
                fontWeight="900"
                fontFamily="Arial, sans-serif"
                letterSpacing="4px"
                fill="none"
                stroke="#FF8C00"
                strokeWidth="3.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{
                  paintOrder: "stroke fill",
                }}
              >
                <textPath href="#curve1" startOffset="50%">
                  <tspan textAnchor="middle">VÒNG QUAY</tspan>
                </textPath>
              </text>

              {/* VÒNG QUAY - White fill (on top) */}
              <text
                fontSize="42"
                fontWeight="900"
                fontFamily="Arial, sans-serif"
                letterSpacing="4px"
                fill="#FFFFFF"
                style={{
                  paintOrder: "stroke fill",
                }}
              >
                <textPath href="#curve1" startOffset="50%">
                  <tspan textAnchor="middle">VÒNG QUAY</tspan>
                </textPath>
              </text>

              {/* Path for MAY MẮN - Lower curved line, larger */}
              <path
                id="curve2"
                d="M 30 150 Q 200 110 370 150"
                fill="none"
                stroke="none"
              />

              {/* MAY MẮN - Orange extended shadow layers */}
              <text
                fontSize="56"
                fontWeight="900"
                fontFamily="Arial, sans-serif"
                letterSpacing="4px"
                fill="#FF8C00"
                opacity="0.5"
                filter="url(#orangeGlow)"
              >
                <textPath href="#curve2" startOffset="50%">
                  <tspan textAnchor="middle">MAY MẮN</tspan>
                </textPath>
              </text>

              {/* MAY MẮN - Additional extended orange shadow */}
              <text
                fontSize="56"
                fontWeight="900"
                fontFamily="Arial, sans-serif"
                letterSpacing="4px"
                fill="#FF8C00"
                opacity="0.3"
                style={{
                  filter: "blur(15px)",
                  transform: "translateY(15px)",
                }}
              >
                <textPath href="#curve2" startOffset="50%">
                  <tspan textAnchor="middle">MAY MẮN</tspan>
                </textPath>
              </text>

              {/* MAY MẮN - Medium orange shadow */}
              <text
                fontSize="56"
                fontWeight="900"
                fontFamily="Arial, sans-serif"
                letterSpacing="4px"
                fill="#FF8C00"
                opacity="0.5"
                style={{
                  filter: "blur(8px)",
                  transform: "translateY(10px)",
                }}
              >
                <textPath href="#curve2" startOffset="50%">
                  <tspan textAnchor="middle">MAY MẮN</tspan>
                </textPath>
              </text>

              {/* MAY MẮN - Orange stroke (outline) */}
              <text
                fontSize="56"
                fontWeight="900"
                fontFamily="Arial, sans-serif"
                letterSpacing="4px"
                fill="none"
                stroke="#FF8C00"
                strokeWidth="4"
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{
                  paintOrder: "stroke fill",
                }}
              >
                <textPath href="#curve2" startOffset="50%">
                  <tspan textAnchor="middle">MAY MẮN</tspan>
                </textPath>
              </text>

              {/* MAY MẮN - White fill (on top) */}
              <text
                fontSize="56"
                fontWeight="900"
                fontFamily="Arial, sans-serif"
                letterSpacing="4px"
                fill="#FFFFFF"
                style={{
                  paintOrder: "stroke fill",
                }}
              >
                <textPath href="#curve2" startOffset="50%">
                  <tspan textAnchor="middle">MAY MẮN</tspan>
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        {/* Spinning Wheel */}
        {loading ? (
          <div className="flex justify-center mb-6">
            <div className="w-80 h-80 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        ) : isExpired ? (
          <div className="flex flex-col items-center justify-center mb-6 py-12">
            <img
              src={iconShop}
              alt="Mini Game hết hạn"
              className="w-24 h-24 object-contain opacity-80 mb-4"
            />
            <p className="text-gray-700 text-center text-lg font-semibold">
              Ui là trời ! Mini Game đã hết thời hạn!
            </p>
          </div>
        ) : (
          <div className="flex justify-center mb-6 relative">
            {/* Floating coins */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-yellow-800 shadow-lg animate-bounce">
              %
            </div>
            <div
              className="absolute top-20 -left-4 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-xl font-bold text-yellow-800 shadow-lg animate-bounce"
              style={{ animationDelay: "0.3s" }}
            >
              %
            </div>
            <div
              className="absolute -bottom-4 right-8 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-xl font-bold text-yellow-800 shadow-lg animate-bounce"
              style={{ animationDelay: "0.7s" }}
            >
              %
            </div>

            {/* Floating money bills */}
            <div className="absolute -top-8 left-1/4 w-16 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold shadow-lg animate-pulse">
              $
            </div>
            <div
              className="absolute -bottom-1 right-3/4 w-16 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold shadow-lg animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              $
            </div>

            <div
              className="relative"
              style={{ width: "320px", height: "320px" }}
            >
              <div
                ref={wheelRef}
                className="w-full h-full"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning
                    ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                    : "none",
                  willChange: "transform",
                }}
              >
                <svg
                  width="320"
                  height="320"
                  viewBox="0 0 320 320"
                  className="absolute inset-0"
                >
                  {/* Golden rim */}
                  <circle
                    cx="160"
                    cy="160"
                    r="152"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="18"
                  />
                  {/* Golden studs */}
                  {Array.from({ length: 20 }).map((_, i) => {
                    const angle = (i * 360) / 20 - 90;
                    const rad = (angle * Math.PI) / 180;
                    const x = 160 + 152 * Math.cos(rad);
                    const y = 160 + 152 * Math.sin(rad);
                    return (
                      <circle key={i} cx={x} cy={y} r="3" fill="#FFD700" />
                    );
                  })}
                  
                  {/* Decorative white dots on the golden rim - centered on the rim */}
                  {Array.from({ length: 40 }).map((_, i) => {
                    const angle = (i * 360) / 40 - 90;
                    const rad = (angle * Math.PI) / 180;
                    // Golden rim has radius 152 with strokeWidth 18, adjust by 1px to center on the rim
                    const x = 160 + 157 * Math.cos(rad);
                    const y = 160 + 157 * Math.sin(rad);
                    return (
                      <circle 
                        key={`white-dot-${i}`} 
                        cx={x} 
                        cy={y} 
                        r="2.5" 
                        fill="white" 
                        opacity="0.9"
                      />
                    );
                  })}

                  {prizes.map((prize, index) => {
                    const segmentAngle = 360 / prizes.length;
                    const centerX = 160;
                    const centerY = 160;
                    const radius = 110;
                    const angle = index * segmentAngle + segmentAngle / 2;
                    const rad = (angle - 90) * (Math.PI / 180);
                    const x = centerX + radius * Math.cos(rad);
                    const y = centerY + radius * Math.sin(rad);

                    const startAngle =
                      (index * segmentAngle - 90) * (Math.PI / 180);
                    const endAngle =
                      ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
                    const isEven = index % 2 === 0;
                    const pathRadius = 152;
                    const x1 = centerX + pathRadius * Math.cos(startAngle);
                    const y1 = centerY + pathRadius * Math.sin(startAngle);
                    const x2 = centerX + pathRadius * Math.cos(endAngle);
                    const y2 = centerY + pathRadius * Math.sin(endAngle);
                    const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${pathRadius} ${pathRadius} 0 0 1 ${x2} ${y2} Z`;

                    return (
                      <g key={prize.id}>
                        <path
                          d={pathData}
                          fill={isEven ? "#22c55e" : "#fef08a"}
                          stroke="#16a34a"
                          strokeWidth="2"
                        />
                        {/* Voucher with discount - only show discount, not code */}
                        {prize.type === "miss" ? (
                          <text
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="13"
                            fontWeight="600"
                            fill={isEven ? "#ffffff" : "#1f2937"}
                            transform={`rotate(${angle} ${x} ${y})`}
                          >
                            <tspan x={x} dy="0">😢 Suýt trúng</tspan>
                          </text>
                        ) : prize.discount ? (
                          <g transform={`rotate(${angle} ${x} ${y})`}>
                            {/* "Giảm" text - above discount amount */}
                            <g transform={`translate(${x}, ${y + 2})`}>
                              {/* Text shadow layers for depth */}
                              <text
                                x="0"
                                y="0"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="12"
                                fontWeight="800"
                                fill="rgba(0,0,0,0.3)"
                                opacity="0.5"
                              >
                                Giảm
                              </text>
                              {/* Main text with white outline */}
                              <text
                                x="0"
                                y="0"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="12"
                                fontWeight="800"
                                fill={isEven ? "#f97316" : "#fb923c"}
                                stroke="white"
                                strokeWidth="1"
                                paintOrder="stroke fill"
                              >
                                Giảm
                              </text>
                            </g>
                            
                            {/* Discount text - large, bold with outline and shadow */}
                            <g transform={`translate(${x}, ${y + 14})`}>
                              {/* Text shadow layers for depth */}
                              <text
                                x="0"
                                y="2"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="16"
                                fontWeight="900"
                                fill="rgba(0,0,0,0.4)"
                                opacity="0.6"
                              >
                                {formatDiscount(prize.discount, prize.type)}
                              </text>
                              <text
                                x="1"
                                y="3"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="16"
                                fontWeight="900"
                                fill="rgba(0,0,0,0.3)"
                                opacity="0.4"
                              >
                                {formatDiscount(prize.discount, prize.type)}
                              </text>
                              {/* Main text with white outline */}
                              <text
                                x="0"
                                y="2"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="16"
                                fontWeight="900"
                                fill={isEven ? "#f97316" : "#fb923c"}
                                stroke="white"
                                strokeWidth="1.5"
                                paintOrder="stroke fill"
                              >
                                {formatDiscount(prize.discount, prize.type)}
                              </text>
                            </g>
                            
                            {/* Money/Banknote Icons - overlapping design, centered below price */}
                            <g transform={`translate(${x - 11}, ${y + 26})`}>
                              {/* Second banknote (behind) */}
                              <g transform="rotate(-5 0 0)">
                                <rect
                                  x="0"
                                  y="2"
                                  width="22"
                                  height="16"
                                  rx="2"
                                  fill={isEven ? "#16a34a" : "#15803d"}
                                  stroke="white"
                                  strokeWidth="1.2"
                                  opacity="0.9"
                                />
                                <rect
                                  x="2.5"
                                  y="4.5"
                                  width="17"
                                  height="11"
                                  rx="1.2"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="0.6"
                                  opacity="0.6"
                                />
                              </g>
                              {/* First banknote (front) - curved/fluttering effect */}
                              <g transform="rotate(3 0 0)">
                                <rect
                                  x="0"
                                  y="0"
                                  width="22"
                                  height="16"
                                  rx="2"
                                  fill={isEven ? "#22c55e" : "#16a34a"}
                                  stroke="white"
                                  strokeWidth="1.5"
                                />
                                {/* Inner decorative lines */}
                                <line
                                  x1="2.5"
                                  y1="3.5"
                                  x2="19.5"
                                  y2="3.5"
                                  stroke="white"
                                  strokeWidth="0.5"
                                  opacity="0.5"
                                />
                                <line
                                  x1="2.5"
                                  y1="6.5"
                                  x2="19.5"
                                  y2="6.5"
                                  stroke="white"
                                  strokeWidth="0.5"
                                  opacity="0.5"
                                />
                                <line
                                  x1="2.5"
                                  y1="9.5"
                                  x2="19.5"
                                  y2="9.5"
                                  stroke="white"
                                  strokeWidth="0.5"
                                  opacity="0.5"
                                />
                                <line
                                  x1="2.5"
                                  y1="12.5"
                                  x2="19.5"
                                  y2="12.5"
                                  stroke="white"
                                  strokeWidth="0.5"
                                  opacity="0.5"
                                />
                                {/* Money symbol circle in center */}
                                <circle
                                  cx="11"
                                  cy="8"
                                  r="4.5"
                                  fill="white"
                                  stroke="white"
                                  strokeWidth="1"
                                />
                                {/* VND or money symbol */}
                                <text
                                  x="11"
                                  y="9.5"
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  fontSize="7"
                                  fontWeight="900"
                                  fill={isEven ? "#16a34a" : "#22c55e"}
                                >
                                  ₫
                                </text>
                              </g>
                            </g>
                          </g>
                        ) : (
                          <text
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="13"
                            fontWeight="600"
                            fill={isEven ? "#ffffff" : "#1f2937"}
                            transform={`rotate(${angle} ${x} ${y})`}
                          >
                            <tspan x={x} dy="0">{prize.label}</tspan>
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Pointer - Voucher banner */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                {/* White border triangle (outer) */}
                <div className="absolute w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[32px] border-t-white"></div>
                {/* Yellow triangle (inner) */}
                <div className="relative w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-yellow-400"></div>
              </div>

              {/* Spin Button */}
              <button
                onClick={() => spinWheel()}
                disabled={isSpinning || spinsRemaining <= 0}
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-orange-500 text-white font-bold text-sm shadow-xl flex items-center justify-center ${
                  isSpinning || spinsRemaining <= 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-orange-600 active:scale-95"
                }`}
              >
                QUAY
              </button>
            </div>
          </div>
        )}
        {/* Recent Winner */}
        {recentWinner && (
          <div className="bg-gray-200 rounded-lg px-4 py-2 mb-4 mx-4">
            <p className="text-sm text-gray-800 flex items-center gap-2">
              <span className="text-yellow-500">⭐</span>
              <span>
                <span className="font-semibold">{recentWinner.name}</span> vừa
                trúng giải{" "}
                <span className="font-semibold">{recentWinner.prize}</span>
              </span>
            </p>
          </div>
        )}

        {/* HƯỚNG DẪN Section - Compact Design */}
        {!isExpired && (
        <div className="mb-4 px-4 relative">
          {/* Decorative leaves on sides - smaller */}
          <div className="absolute left-0 top-0 w-12 h-24 opacity-20 z-0">
            <div className="absolute left-1 top-2 w-8 h-8 bg-green-600 rounded-full blur-md"></div>
            <div className="absolute left-0 top-4 w-10 h-10 bg-green-500 rounded-full blur-lg"></div>
          </div>
          <div className="absolute right-0 top-0 w-12 h-24 opacity-20 z-0">
            <div className="absolute right-1 top-2 w-8 h-8 bg-green-600 rounded-full blur-md"></div>
            <div className="absolute right-0 top-4 w-10 h-10 bg-green-500 rounded-full blur-lg"></div>
          </div>

          {/* Main Card */}
          <div
            className="bg-gradient-to-b from-amber-50 to-white rounded-2xl overflow-visible relative z-10"
            style={{
              boxShadow:
                "0 4px 16px rgba(34, 139, 34, 0.12), 0 0 0 2px #66BB6A",
            }}
          >
            {/* Green Ribbon Banner - smaller */}
            <div className="relative -mt-1 mb-3" style={{ height: "40px" }}>
              {/* Left ribbon tail */}
              <div
                className="absolute left-8 top-1 bg-green-500 z-0"
                style={{
                  width: "40px",
                  height: "32px",
                  clipPath:
                    "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%, 15% 50%)",
                  transform: "translateX(-20px) translateY(4px)",
                  boxShadow: "inset -2px 0 4px rgba(0,0,0,0.2)",
                }}
              />

              {/* Right ribbon tail */}
              <div
                className="absolute right-8 top-1 bg-green-500 z-0"
                style={{
                  width: "40px",
                  height: "32px",
                  clipPath:
                    "polygon(15% 0, 100% 0, 85% 50%, 100% 100%, 15% 100%, 0 50%)",
                  transform: "translateX(20px) translateY(4px)",
                  boxShadow: "inset 2px 0 4px rgba(0,0,0,0.2)",
                }}
              />

              {/* Main ribbon banner */}
              <div
                className="relative mx-auto bg-gradient-to-b from-green-500 to-green-600 shadow-lg z-10 mt-1"
                style={{
                  width: "65%",
                  height: "32px",
                  padding: "0 12px",
                  borderRadius: "6px 6px 0 0",
                  clipPath:
                    "polygon(3% 0, 97% 0, 100% 20%, 98% 50%, 100% 80%, 100% 100%, 92% 95%, 84% 98%, 76% 99%, 68% 100%, 60% 100%, 52% 100%, 44% 100%, 36% 100%, 28% 99%, 20% 98%, 12% 95%, 4% 90%, 0 80%, 2% 50%, 0 20%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Shine effect */}
                <div
                  className="absolute inset-0 opacity-20 "
                  style={{
                    background: "linear-gradient(to right, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
                    clipPath:
                      "polygon(3% 0, 97% 0, 100% 20%, 98% 50%, 100% 80%, 100% 100%, 92% 95%, 84% 98%, 76% 99%, 68% 100%, 60% 100%, 52% 100%, 44% 100%, 36% 100%, 28% 99%, 20% 98%, 12% 95%, 4% 90%, 0 80%, 2% 50%, 0 20%)",
                  }}
                />

                <h2
                  className="text-white font-black text-sm text-center uppercase relative z-10"
                  style={{
                    textShadow:
                      "0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)",
                    letterSpacing: "1.5px",
                  }}
                >
                  HƯỚNG DẪN
                </h2>
              </div>
            </div>

            {/* Content Area */}
            <div className="px-4 pb-4 pt-1">
              {/* Subtitle */}
              <p className="text-center mb-4 font-medium leading-relaxed text-gray-700" style={{ fontSize: "10px" }}>
                Hoàn thành đủ các bước để tận hưởng ưu đãi khi mua hàng
              </p>

              {/* Step 1 */}
              <div className="flex items-start justify-between mb-3 gap-3">
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  {/* Gift Box Icon */}
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      {/* Box body */}
                      <rect
                        x="8"
                        y="14"
                        width="24"
                        height="20"
                        rx="2"
                        fill="#FFD700"
                        stroke="#FFA500"
                        strokeWidth="1.2"
                      />
                      {/* Vertical stripes */}
                      <line
                        x1="12"
                        y1="14"
                        x2="12"
                        y2="34"
                        stroke="#FFA500"
                        strokeWidth="0.8"
                        opacity="0.5"
                      />
                      <line
                        x1="16"
                        y1="14"
                        x2="16"
                        y2="34"
                        stroke="#FFA500"
                        strokeWidth="0.8"
                        opacity="0.5"
                      />
                      <line
                        x1="20"
                        y1="14"
                        x2="20"
                        y2="34"
                        stroke="#FFA500"
                        strokeWidth="0.8"
                        opacity="0.5"
                      />
                      <line
                        x1="24"
                        y1="14"
                        x2="24"
                        y2="34"
                        stroke="#FFA500"
                        strokeWidth="0.8"
                        opacity="0.5"
                      />
                      <line
                        x1="28"
                        y1="14"
                        x2="28"
                        y2="34"
                        stroke="#FFA500"
                        strokeWidth="0.8"
                        opacity="0.5"
                      />
                      {/* Top lid */}
                      <rect
                        x="8"
                        y="14"
                        width="24"
                        height="6"
                        fill="#FFA500"
                      />
                      {/* Green ribbon vertical */}
                      <rect
                        x="18"
                        y="8"
                        width="4"
                        height="26"
                        fill="#22c55e"
                        rx="1"
                      />
                      {/* Green ribbon horizontal */}
                      <rect
                        x="6"
                        y="18"
                        width="28"
                        height="3"
                        fill="#22c55e"
                        rx="1"
                      />
                      {/* Bow loops */}
                      <ellipse
                        cx="14"
                        cy="11"
                        rx="3.5"
                        ry="2"
                        fill="#16a34a"
                        transform="rotate(-30 14 11)"
                      />
                      <ellipse
                        cx="26"
                        cy="11"
                        rx="3.5"
                        ry="2"
                        fill="#16a34a"
                        transform="rotate(30 26 11)"
                      />
                      {/* Bow center */}
                      <circle cx="20" cy="11" r="3" fill="#15803d" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="font-bold text-gray-900 mb-1" style={{ fontSize: "12px" }}>
                      Bước 1
                    </p>
                    <p className="text-gray-700 leading-relaxed" style={{ fontSize: "10px" }}>
                      Nhận lượt chơi miễn phí.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReceivePlay}
                  disabled={isSpinning || !miniGameId || (!check24HoursPassed() && (hasReceivedPlay || isOutOfPlays))}
                  className={`${
                    (!check24HoursPassed() && (hasReceivedPlay || isOutOfPlays))
                      ? "bg-gray-400 hover:bg-gray-400 active:bg-gray-400"
                      : "bg-red-600 hover:bg-red-700 active:bg-red-800"
                  } text-white font-bold rounded-md flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm uppercase`}
                  style={{ minWidth: "60px", padding: "6px 10px", fontSize: "10px" }}
                >
                  {check24HoursPassed() ? "Nhận" : (isOutOfPlays ? "Đã hết lượt" : hasReceivedPlay ? "Đã nhận" : "Nhận")}
                </button>
              </div>

              {/* Step 2 */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  {/* Shopping Basket Icon */}
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      {/* Basket body */}
                      <path
                        d="M 6 14 L 7.5 32 L 32.5 32 L 34 14 Z"
                        fill="#D2B48C"
                        stroke="#8B7355"
                        strokeWidth="1.2"
                      />
                      {/* Wicker texture */}
                      <line
                        x1="9"
                        y1="18"
                        x2="31"
                        y2="18"
                        stroke="#8B7355"
                        strokeWidth="0.3"
                        opacity="0.6"
                      />
                      <line
                        x1="9"
                        y1="22"
                        x2="31"
                        y2="22"
                        stroke="#8B7355"
                        strokeWidth="0.3"
                        opacity="0.6"
                      />
                      <line
                        x1="9"
                        y1="26"
                        x2="31"
                        y2="26"
                        stroke="#8B7355"
                        strokeWidth="0.3"
                        opacity="0.6"
                      />
                      <line
                        x1="9"
                        y1="30"
                        x2="31"
                        y2="30"
                        stroke="#8B7355"
                        strokeWidth="0.3"
                        opacity="0.6"
                      />
                      {/* Top rim */}
                      <path
                        d="M 9 14 L 9 11.5 Q 9 9 11.5 9 L 28.5 9 Q 31 9 31 11.5 L 31 14"
                        fill="none"
                        stroke="#8B7355"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      {/* Handle */}
                      <path
                        d="M 13 9 Q 17 5 20 9"
                        fill="none"
                        stroke="#8B7355"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      {/* Lettuce */}
                      <ellipse
                        cx="14"
                        cy="20"
                        rx="3"
                        ry="2"
                        fill="#90EE90"
                        transform="rotate(-15 14 20)"
                      />
                      <path
                        d="M 12 19 Q 14 17 16 19"
                        stroke="#228B22"
                        strokeWidth="0.8"
                        fill="none"
                      />
                      <path
                        d="M 12 21 Q 14 19 16 21"
                        stroke="#228B22"
                        strokeWidth="0.8"
                        fill="none"
                      />
                      {/* Carrots */}
                      <ellipse
                        cx="19"
                        cy="23"
                        rx="1.5"
                        ry="3"
                        fill="#FF8C00"
                        transform="rotate(-20 19 23)"
                      />
                      <ellipse
                        cx="22"
                        cy="24.5"
                        rx="1.5"
                        ry="3"
                        fill="#FF8C00"
                        transform="rotate(15 22 24.5)"
                      />
                      {/* Milk carton */}
                      <rect
                        x="26"
                        y="21"
                        width="5"
                        height="7"
                        rx="0.8"
                        fill="#FFFFFF"
                        stroke="#CCCCCC"
                        strokeWidth="0.4"
                      />
                      <line
                        x1="27.5"
                        y1="22.5"
                        x2="29.5"
                        y2="22.5"
                        stroke="#CCCCCC"
                        strokeWidth="0.4"
                      />
                      {/* Watermelon slice */}
                      <path
                        d="M 12 26 Q 14 28 16 26 L 16 30 Q 14 32 12 30 Z"
                        fill="#FF6B6B"
                      />
                      <path
                        d="M 12 26 Q 14 28 16 26"
                        stroke="#DC143C"
                        strokeWidth="0.5"
                        fill="none"
                      />
                      <circle
                        cx="14"
                        cy="28"
                        r="1"
                        fill="#000000"
                        opacity="0.3"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="font-bold text-gray-900 mb-1" style={{ fontSize: "12px" }}>
                      Bước 2
                    </p>
                    <p className="text-gray-700 leading-relaxed" style={{ fontSize: "10px" }}>
                      Sữ dụng voucher để mua hàng.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/cart")}
                  className="bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-gray-700 font-bold rounded-lg flex-shrink-0 transition-all shadow-md"
                  style={{ minWidth: "60px", padding: "6px 10px", fontSize: "10px" }}
                >
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Danh sách lượt chơi Section - Compact Design */}
        {!isExpired && (
        <div className="mb-4 px-4 relative">
          {/* Decorative leaves on sides - smaller */}
          <div className="absolute left-0 top-0 w-12 h-24 opacity-20 z-0">
            <div className="absolute left-1 top-2 w-8 h-8 bg-green-600 rounded-full blur-md"></div>
            <div className="absolute left-0 top-4 w-10 h-10 bg-green-500 rounded-full blur-lg"></div>
          </div>
          <div className="absolute right-0 top-0 w-12 h-24 opacity-20 z-0">
            <div className="absolute right-1 top-2 w-8 h-8 bg-green-600 rounded-full blur-md"></div>
            <div className="absolute right-0 top-4 w-10 h-10 bg-green-500 rounded-full blur-lg"></div>
          </div>

          {/* Main Card */}
          <div
            className="bg-gradient-to-b from-amber-50 to-white rounded-2xl overflow-visible relative z-10"
            style={{
              boxShadow:
                "0 4px 16px rgba(34, 139, 34, 0.12), 0 0 0 2px #66BB6A",
            }}
          >
            {/* Green Ribbon Banner - smaller */}
            <div className="relative -mt-1 mb-3" style={{ height: "40px" }}>
              {/* Left ribbon tail */}
              <div
                className="absolute left-8 top-1 bg-green-500 z-0"
                style={{
                  width: "40px",
                  height: "32px",
                  clipPath:
                    "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%, 15% 50%)",
                  transform: "translateX(-20px) translateY(4px)",
                  boxShadow: "inset -2px 0 4px rgba(0,0,0,0.2)",
                }}
              />

              {/* Right ribbon tail */}
              <div
                className="absolute right-8 top-1 bg-green-500 z-0"
                style={{
                  width: "40px",
                  height: "32px",
                  clipPath:
                    "polygon(15% 0, 100% 0, 85% 50%, 100% 100%, 15% 100%, 0 50%)",
                  transform: "translateX(20px) translateY(4px)",
                  boxShadow: "inset 2px 0 4px rgba(0,0,0,0.2)",
                }}
              />

              {/* Main ribbon banner - Clickable */}
              <div
                onClick={() => setShowPlayList(!showPlayList)}
                className="relative mx-auto bg-gradient-to-b from-green-500 to-green-600 shadow-lg z-10 mt-1 cursor-pointer hover:from-green-600 hover:to-green-700 transition-all"
                style={{
                  width: "65%",
                  height: "32px",
                  padding: "0 12px",
                  borderRadius: "6px 6px 0 0",
                  clipPath:
                    "polygon(3% 0, 97% 0, 100% 20%, 98% 50%, 100% 80%, 100% 100%, 92% 95%, 84% 98%, 76% 99%, 68% 100%, 60% 100%, 52% 100%, 44% 100%, 36% 100%, 28% 99%, 20% 98%, 12% 95%, 4% 90%, 0 80%, 2% 50%, 0 20%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Shine effect */}
                <div
                  className="absolute inset-0 opacity-20 "
                  style={{
                    background: "linear-gradient(to right, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
                    clipPath:
                      "polygon(3% 0, 97% 0, 100% 20%, 98% 50%, 100% 80%, 100% 100%, 92% 95%, 84% 98%, 76% 99%, 68% 100%, 60% 100%, 52% 100%, 44% 100%, 36% 100%, 28% 99%, 20% 98%, 12% 95%, 4% 90%, 0 80%, 2% 50%, 0 20%)",
                  }}
                />

                <h3
                  className="text-white font-black text-sm text-center uppercase relative z-10"
                  style={{
                    textShadow:
                      "0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)",
                    letterSpacing: "1.5px",
                  }}
                >
                  Lịch sữ
                </h3>
              </div>
            </div>

            {/* Content Area */}
            <div className="px-4 pb-4 pt-1">
              {loadingPlayList ? (
                <div className="text-center py-6">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                  <p className="text-gray-500 text-sm mt-3 font-medium">Đang tải...</p>
                </div>
              ) : playList.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm font-medium">Chưa có lượt chơi nào</p>
                </div>
              ) : (
                <>
                  {/* Dropdown Content with Scroll */}
                  {showPlayList && (
                    <div
                      className="space-y-2.5 max-h-64 overflow-y-auto transition-all duration-300"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#22c55e #f0f0f0",
                      }}
                    >
                      {playList.map((play) => {
                        // Kiểm tra xem có phải hôm nay không
                        const playDate = new Date(play.played_at);
                        const today = new Date();
                        const isToday = 
                          playDate.getDate() === today.getDate() &&
                          playDate.getMonth() === today.getMonth() &&
                          playDate.getFullYear() === today.getFullYear();
                        
                        // Xác định trạng thái dựa trên result_type và coupon_id
                        const isUsed = play.coupon_id !== null && play.result_type !== "miss";
                        // Hiển thị tên voucher nếu có, nếu không thì hiển thị trạng thái
                        const resultText = play.result 
                          ? play.result 
                          : play.result_type === "miss" 
                          ? "Suýt trúng" 
                          : "Đã trúng";
                        
                        return (
                          <div
                            key={play.id}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 ${
                              isUsed || isToday
                                ? "bg-white border-gray-200"
                                : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300"
                            }`}
                            style={{
                              boxShadow: isUsed || isToday
                                ? "0 1px 3px rgba(0,0,0,0.1)"
                                : "0 2px 6px rgba(34, 197, 94, 0.15)",
                            }}
                          >
                            {/* Time - Bên trái */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <p className="text-gray-700 font-semibold" style={{ fontSize: "12px" }}>
                                <span className="text-gray-500 font-normal" style={{ fontSize: "10px" }}>
                                  {new Date(play.played_at).toLocaleTimeString("vi-VN", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>{" "}
                                {new Date(play.played_at).toLocaleDateString("vi-VN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}
                              </p>
                            </div>

                            {/* Trạng thái - Bên phải */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <div className="flex flex-col items-end gap-1">
                                <p
                                  className={`font-bold ${
                                    isToday || play.result_type === "miss" 
                                      ? "text-gray-600" 
                                      : "text-green-700"
                                  }`}
                                  style={{ fontSize: "12px" }}
                                >
                                  {resultText}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        )}

        {/* Result Modal */}
        {showResult && wonPrize && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full text-center">
              <div className="text-6xl mb-4">
                {wonPrize.type === "miss" ? "😢" : "🎉"}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {wonPrize.type === "miss"
                  ? "Suýt trúng!"
                  : "Bạn đã trúng voucher!"}
              </h2>
              <p className="text-lg mb-4">{wonPrize.label}</p>
              <button
                onClick={() => setShowResult(false)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* Popup Notification */}
        {popup.show && (
          <div
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999]"
            style={{
              animation: "slideDown 0.3s ease-out",
            }}
          >
            <div
              className={`px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 min-w-[280px] max-w-[90%] ${
                popup.type === "success"
                  ? "bg-green-500 text-white"
                  : popup.type === "error"
                  ? "bg-red-500 text-white"
                  : popup.type === "warning"
                  ? "bg-yellow-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              <div className="flex-shrink-0">
                {popup.type === "success" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                {popup.type === "error" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
                {popup.type === "warning" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                )}
                {popup.type === "info" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
              <p className="flex-1 text-sm font-medium">{popup.message}</p>
              <button
                onClick={() =>
                  setPopup({ show: false, message: "", type: "info" })
                }
                className="flex-shrink-0 text-white/80 hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

