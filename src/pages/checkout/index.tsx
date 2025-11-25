import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import FlashSaleItem from "./flashSaleItem";
import ShippingAddressCard from "./shippingAddressCard";
import ShippingInfoCard from "./shippingInfoCard";
import VoucherCard from "./voucher";
import BankTransferModal from "./BankTransferModal";
import { useAtomValue, useAtom } from "jotai";
import { cartTotalState, cartState, selectedCartItemIdsState, loadableUserInfoState } from "@/state";
import {
  voucherDiscountState,
  selectedVoucherState,
  shippingFeeState,
  shippingInfoState,
  shippingSupportState,
} from "@/state";
import { formatPrice } from "@/utils/format";
import { Voucher, VoucherService } from "@/api/service/voucher.service";
import {
  CheckoutService,
  CheckoutRequest,
} from "@/api/service/checkout.service";
import { AddressService, LocationService } from "@/api/service/address.service";
import { useAuth } from "@/components/simple-auth-provider";
import { AuthService } from "@/api";
import { API_CONFIG } from "@/api/types";

export default function CheckoutPage() {
  const totalAmount = useAtomValue(cartTotalState);
  const [voucherDiscount, setVoucherDiscount] = useAtom(voucherDiscountState);
  const [selectedVoucherFromState, setSelectedVoucherFromState] = useAtom(selectedVoucherState);
  const shippingFee = useAtomValue(shippingFeeState);
  const shippingInfo = useAtomValue(shippingInfoState);
  const shippingSupport = useAtomValue(shippingSupportState);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [cart, setCart] = useAtom(cartState);
  const [selectedIds, setSelectedIds] = useAtom(selectedCartItemIdsState);
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank_transfer">(
    "cod"
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [bankTransferInfo, setBankTransferInfo] = useState<{
    orderCode?: string;
    orderId?: number;
    amount?: number;
    accountNumber?: number;
    bankName?: string;
    bankFullName?: string;
    recipient?: string;
    qrCode?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const userInfo = useAtomValue(loadableUserInfoState);
  const [usePoints, setUsePoints] = useState(false);
  const lastUserIdRef = useRef<number | null>(null);

  // Tính số tiền hỗ trợ phí ship
  const shippingSupportAmount = useMemo(() => {
    if (!shippingSupport || shippingSupport.totalSupport <= 0) {
      return 0;
    }

    if (shippingSupport.supportType === "vnd") {
      // Hỗ trợ cố định (VND)
      return shippingSupport.totalSupport;
    } else if (shippingSupport.supportType === "percent" && shippingFee > 0) {
      // Hỗ trợ theo % của phí ship
      return Math.round((shippingFee * shippingSupport.totalSupport) / 100);
    }

    return 0;
  }, [shippingSupport, shippingFee]);

  // State để lưu điểm tích lũy từ API
  const [pointsFromAPI, setPointsFromAPI] = useState<number>(0);
  const [hasFetchedPoints, setHasFetchedPoints] = useState(false);

  // Fetch điểm tích lũy từ API khi userInfo có data (chỉ fetch 1 lần)
  useEffect(() => {
    const fetchPoints = async () => {
      // Chỉ fetch nếu chưa fetch và userInfo có data
      if (hasFetchedPoints || userInfo.state !== "hasData" || !userInfo.data) {
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        // Đánh dấu đã fetch để tránh fetch lại
        setHasFetchedPoints(true);

        // Gọi API get-profile để lấy đầy đủ thông tin user (bao gồm điểm)
        const response = await AuthService.getUserProfile(token);
        
        if (response.success && response.data) {
          const data = response.data as any;
          
          // Kiểm tra tất cả các field có thể chứa điểm
          let points = 0;
          
          if (data.total_points !== undefined && data.total_points !== null) {
            points = Number(data.total_points) || 0;
          } else if (data.total_point_transactions !== undefined && data.total_point_transactions !== null) {
            points = Number(data.total_point_transactions) || 0;
          } else if (data.user_money2 !== undefined && data.user_money2 !== null) {
            points = Number(data.user_money2) || 0;
          } else if (data.balance2 !== undefined && data.balance2 !== null) {
            points = Number(data.balance2) || 0;
          }
          
          // Lưu vào state
          setPointsFromAPI(points);
        }
      } catch (error) {
        setHasFetchedPoints(false); // Cho phép retry nếu có lỗi
      }
    };

    fetchPoints();
  }, [userInfo, hasFetchedPoints]);

  // Reset hasFetchedPoints khi user_id thay đổi
  useEffect(() => {
    if (userInfo.state === "hasData" && userInfo.data) {
      const currentUserId = (userInfo.data as any)?.user_id || (userInfo.data as any)?.id;
      
      // Nếu user_id thay đổi, reset để fetch lại
      if (lastUserIdRef.current !== null && lastUserIdRef.current !== currentUserId) {
        setHasFetchedPoints(false);
        setPointsFromAPI(0);
      }
      lastUserIdRef.current = currentUserId;
    }
  }, [userInfo]);

  // Lấy số điểm tích lũy của user
  const availablePoints = useMemo(() => {
    // Ưu tiên dùng pointsFromAPI (từ API call riêng)
    if (pointsFromAPI > 0) {
      return pointsFromAPI;
    }

    // Fallback: kiểm tra từ userInfo state
    if (userInfo.state === "hasData" && userInfo.data) {
      const data = userInfo.data as any;
      
      // Kiểm tra tất cả các field có thể chứa điểm (theo thứ tự ưu tiên)
      let points = 0;
      
      if (data.total_points !== undefined && data.total_points !== null) {
        points = Number(data.total_points) || 0;
      } else if (data.total_point_transactions !== undefined && data.total_point_transactions !== null) {
        points = Number(data.total_point_transactions) || 0;
      } else if (data.user_money2 !== undefined && data.user_money2 !== null) {
        points = Number(data.user_money2) || 0;
      } else if (data.balance2 !== undefined && data.balance2 !== null) {
        points = Number(data.balance2) || 0;
      }
      
      return points;
    }
    
    return 0;
  }, [userInfo, pointsFromAPI]);

  // Tính số tiền giảm từ điểm (1 điểm = 1 VND)
  const pointsDiscount = useMemo(() => {
    if (!usePoints || availablePoints <= 0) {
      return 0;
    }
    // Tính tổng tiền trước điểm: Tổng tiền hàng - Voucher - Hỗ trợ phí ship + Phí ship
    const amountBeforePoints = totalAmount - voucherDiscount - shippingSupportAmount + shippingFee;
    // Số điểm có thể dùng tối đa = min(availablePoints, amountBeforePoints)
    const maxUsablePoints = Math.min(availablePoints, Math.max(0, amountBeforePoints));
    return maxUsablePoints;
  }, [usePoints, availablePoints, totalAmount, voucherDiscount, shippingSupportAmount, shippingFee]);

  // Tính tổng thanh toán: Tổng tiền hàng - Voucher - Hỗ trợ phí ship - Điểm + Phí ship
  const finalAmount = Math.max(
    0,
    totalAmount - voucherDiscount - shippingSupportAmount - pointsDiscount + shippingFee
  );

  // Kiểm tra authentication và redirect nếu chưa đăng nhập
  useEffect(() => {
    // Đợi auth loading xong
    if (authLoading) {
      return;
    }

    // Nếu chưa đăng nhập, redirect đến profile với returnUrl
    if (!isAuthenticated) {
      navigate("/profile?returnUrl=/checkout");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Helper function để tạo itemKey từ cart item
  const getCartItemKey = (item: (typeof cart)[0]) => {
    const variantId =
      item.product.variant_id ?? item.product.phanloai_id ?? null;
    return variantId ? `${item.product.id}-${variantId}` : `${item.product.id}`;
  };

  // Lấy selected items từ cart
  const selectedItems = useMemo(() => {
    return cart.filter((item) => selectedIds.includes(getCartItemKey(item)));
  }, [cart, selectedIds]);

  // Áp dụng voucher từ promotion page khi vào checkout
  useEffect(() => {
    if (selectedVoucherFromState && totalAmount > 0) {
      // Nếu voucher scope = "sanpham", chỉ tính discount với các sản phẩm phù hợp
      let amountForDiscount = totalAmount;
      
      if (selectedVoucherFromState.scope === "sanpham" && selectedVoucherFromState.product_ids) {
        const productIds = selectedVoucherFromState.product_ids
          .split(",")
          .map(id => parseInt(id.trim()))
          .filter(id => !isNaN(id));
        
        if (productIds.length > 0) {
          // Tính tổng tiền chỉ với các sản phẩm phù hợp
          const matchingItems = selectedItems.filter(item => 
            productIds.includes(item.product.id)
          );
          amountForDiscount = matchingItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
        }
      }
      
      // Tính lại discount với amountForDiscount
      const calculatedDiscount = VoucherService.calculateDiscount(selectedVoucherFromState, amountForDiscount);
      
      // Áp dụng voucher
      setSelectedVoucher(selectedVoucherFromState);
      setVoucherDiscount(calculatedDiscount);
      
      // Xóa voucher từ state sau khi đã áp dụng
      setSelectedVoucherFromState(null);
    } else {
      // Nếu không có voucher từ state, reset về mặc định
      setVoucherDiscount(0);
      setSelectedVoucher(null);
    }
    setUsePoints(false);
  }, [location.pathname, selectedVoucherFromState, totalAmount, selectedItems, setVoucherDiscount, setSelectedVoucherFromState]);

  // Reset voucher và points khi rời khỏi trang checkout
  useEffect(() => {
    return () => {
      // Cleanup: reset khi unmount (rời khỏi trang)
      setVoucherDiscount(0);
      setSelectedVoucher(null);
      setUsePoints(false);
    };
  }, [setVoucherDiscount]);

  // Lấy shopId từ VITE_KEY_ID hoặc Shop-Id trong localStorage
  // Ưu tiên: VITE_KEY_ID > Shop-Id (localStorage) > default undefined
  const getShopId = (): number | undefined => {
    // Ưu tiên lấy từ VITE_KEY_ID (API_CONFIG.KEY_ID)
    const shopIdFromEnv = parseInt(API_CONFIG.KEY_ID, 10);
    if (shopIdFromEnv && shopIdFromEnv > 0) {
      return shopIdFromEnv;
    }

    // Nếu không có trong env, lấy từ localStorage Shop-Id
    const storedShopId = localStorage.getItem("Shop-Id");
    if (storedShopId) {
      const shopId = parseInt(storedShopId, 10);
      if (shopId > 0) {
        return shopId;
      }
    }

    return undefined;
  };

  const handleSelectVoucher = (voucher: Voucher | null, discount: number) => {
    setSelectedVoucher(voucher);
    setVoucherDiscount(discount);
  };

  const handleCheckout = async () => {
    // Validate dữ liệu
    if (selectedItems.length === 0) {
      toast.error("Vui lòng chọn sản phẩm để thanh toán");
      return;
    }

    if (finalAmount < 0) {
      toast.error("Tổng tiền thanh toán không hợp lệ");
      return;
    }

    try {
      setLoading(true);

      // Lấy địa chỉ mặc định
      let defaultAddress = null;
      try {
        const addressesResponse = await AddressService.getAddresses();
        defaultAddress =
          addressesResponse.data?.find((addr) => addr.is_default) ||
          addressesResponse.data?.[0];
      } catch (error) {
        console.error("Error fetching address:", error);
      }

      if (!defaultAddress) {
        toast.error("Vui lòng thêm địa chỉ nhận hàng trước khi thanh toán");
        setLoading(false);
        return;
      }

      // Lấy user_id từ localStorage
      let user_id = 0;
      try {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const user = JSON.parse(userStr);
          user_id = parseInt(user.user_id || user.id || "0", 10);
        }
      } catch (e) {
        console.error("Error parsing user:", e);
      }

      if (user_id <= 0) {
        toast.error("Vui lòng đăng nhập để thanh toán");
        setLoading(false);
        return;
      }

      // Tìm province_id và district_id từ tên
      let province_id = 0;
      let district_id = 0;

      // Tìm province_id và district_id từ tên (nếu có)
      if (defaultAddress.province) {
        try {
          const locationsResponse = await LocationService.getLocations({
            type: "province",
            keyword: defaultAddress.province,
          });
          if (
            locationsResponse.success &&
            locationsResponse.data?.items &&
            locationsResponse.data.items.length > 0
          ) {
            province_id = locationsResponse.data.items[0].id;
          }
        } catch (e) {
          console.error("Error fetching province:", e);
          // Không throw error, chỉ log - có thể backend sẽ tự tìm
        }
      }

      if (defaultAddress.district && province_id > 0) {
        try {
          const locationsResponse = await LocationService.getLocations({
            type: "district",
            tinh: province_id,
            keyword: defaultAddress.district,
          });
          if (
            locationsResponse.success &&
            locationsResponse.data?.items &&
            locationsResponse.data.items.length > 0
          ) {
            district_id = locationsResponse.data.items[0].id;
          }
        } catch (e) {
          console.error("Error fetching district:", e);
          // Không throw error, chỉ log - có thể backend sẽ tự tìm
        }
      }

      // Chuẩn bị products array
      const products = selectedItems.map((item) => ({
        id: item.product.id, // sanpham_shop.id
        phanloai_id: (item.product as any).phanloai_id || null,
        quantity: item.quantity || 1,
        name: item.product.name, // Tên sản phẩm (dùng cho Zalo SDK)
        price: item.product.price, // Giá sản phẩm (dùng cho Zalo SDK)
      }));

      // Chuẩn bị shipping_provider từ shippingInfo
      // Format đúng: SUPERAI-{carrier_id}-{carrier_name} (ví dụ: SUPERAI-6-BEST Express)
      let shipping_provider = "";
      if (shippingInfo) {
        if (
          shippingInfo.provider === "SUPERAI" ||
          shippingInfo.provider?.startsWith("SUPERAI")
        ) {
          // Ưu tiên dùng provider_code nếu có (đã format đúng từ backend)
          if (
            shippingInfo.provider_code &&
            shippingInfo.provider_code.includes("-")
          ) {
            shipping_provider = shippingInfo.provider_code;
          } else {
            // Format lại: SUPERAI-{carrier_id}-{carrier_name}
            const carrierId = shippingInfo.carrier_id ?? "";
            const carrierName = shippingInfo.carrier_name || "SUPERAI";
            shipping_provider = `SUPERAI-${carrierId}-${carrierName}`;
          }
        } else {
          // Với GHTK hoặc provider khác
          shipping_provider =
            shippingInfo.carrier_name || shippingInfo.provider || "";
        }
      }

      // Tạo checkout request
      const checkoutRequest: CheckoutRequest = {
        products,
        address_id: defaultAddress.id,
        name: defaultAddress.name,
        phone: defaultAddress.phone,
        email: defaultAddress.email || "",
        address: defaultAddress.address || defaultAddress.full_address,
        province_id: province_id > 0 ? province_id : undefined,
        district_id: district_id > 0 ? district_id : undefined,
        subtotal: totalAmount,
        coupon_code: selectedVoucher?.code || "",
        discount: voucherDiscount,
        points_used: usePoints ? (pointsDiscount || 0) : 0,
        shipping_fee: shippingFee,
        ship_support: shippingSupportAmount, // Gửi số tiền hỗ trợ phí ship
        ship_support_type: shippingSupport?.shippingType, // Loại hỗ trợ: all_products hoặc individual_products
        ship_support_products:
          shippingSupport?.products?.map((p) => p.productId) || [], // Danh sách product_id được hỗ trợ
        total: finalAmount,
        payment_method:
          paymentMethod === "bank_transfer" ? "bank_transfer" : "cod",
        note: note.trim() || "", // Đảm bảo luôn gửi note (có thể là empty string)
        shipping_provider: shipping_provider || undefined,
        tracking_code: null,
        ninja_response: null,
      };

      // Debug: Kiểm tra note và points_used trước khi gửi
      console.log("📝 [CHECKOUT] Note value:", note);
      console.log("📝 [CHECKOUT] Note trimmed:", note.trim());
      console.log("💰 [CHECKOUT] Points info:", {
        usePoints,
        availablePoints,
        pointsDiscount,
        points_used: checkoutRequest.points_used
      });
      console.log("📝 [CHECKOUT] Full checkout request:", checkoutRequest);

      // Gọi Checkout SDK để thanh toán (bắt buộc theo yêu cầu của Zalo)
      const sdkPaymentMethod =
        paymentMethod === "bank_transfer" ? "BANK" : "COD";
      const response = await CheckoutService.checkoutWithSDK(checkoutRequest, {
        shopId: getShopId(),
        paymentMethod: sdkPaymentMethod,
      });

      if (response.success && response.data) {
        // Xóa voucher state sau khi checkout thành công
        setSelectedVoucherFromState(null);
        setVoucherDiscount(0);
        setSelectedVoucher(null);
        
        // Cập nhật lại điểm tích lũy sau khi checkout thành công
        // (có thể đã trừ điểm đã dùng hoặc cộng điểm thưởng mới)
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const profileResponse = await AuthService.getUserProfile(token);
            if (profileResponse.success && profileResponse.data) {
              const data = profileResponse.data as any;
              let newPoints = 0;
              
              if (data.total_points !== undefined && data.total_points !== null) {
                newPoints = Number(data.total_points) || 0;
              } else if (data.total_point_transactions !== undefined && data.total_point_transactions !== null) {
                newPoints = Number(data.total_point_transactions) || 0;
              } else if (data.user_money2 !== undefined && data.user_money2 !== null) {
                newPoints = Number(data.user_money2) || 0;
              } else if (data.balance2 !== undefined && data.balance2 !== null) {
                newPoints = Number(data.balance2) || 0;
              }
              
              // Cập nhật state
              setPointsFromAPI(newPoints);
            }
          }
        } catch (error) {
          console.error("Error updating points after checkout:", error);
          // Không block checkout nếu lỗi cập nhật điểm
        }
        
        // Xóa các sản phẩm đã thanh toán khỏi cart
        if (selectedItems.length > 0) {
          const purchasedProductIds = selectedItems.map(
            (item) => item.product.id
          );

          // Xóa các sản phẩm đã mua khỏi cart
          const updatedCart = cart.filter(
            (item) => !purchasedProductIds.includes(item.product.id)
          );
          setCart(updatedCart);

          // Xóa các ID đã chọn khỏi selectedIds
          const updatedSelectedIds = selectedIds.filter(
            (id) => !purchasedProductIds.includes(id)
          );
          setSelectedIds(updatedSelectedIds);
        }

        // Checkout SDK đã xử lý thanh toán, chỉ cần hiển thị thông báo và redirect
        const firstOrderId = response.data.orders?.[0]?.id;
        const orderCode = response.data.orders?.[0]?.order_code;

        toast.success(
          `Đặt hàng thành công! ${
            response.data.total_orders > 1
              ? `Đã tạo ${response.data.total_orders} đơn hàng`
              : "Đơn hàng đã được tạo"
          }`
        );

        // Nếu là chuyển khoản, có thể hiển thị thông tin ngân hàng (tùy chọn)
        if (paymentMethod === "bank_transfer") {
          try {
            const sellerTokenResponse = await AuthService.getSellerToken();
            const bankAccount =
              sellerTokenResponse.data.bank_accounts?.find(
                (acc) => acc.is_default === 1
              ) || sellerTokenResponse.data.bank_accounts?.[0];

            if (bankAccount) {
              const bankCode = bankAccount.bank?.code;
              const accountNumber = bankAccount.account_number;
              const amount = finalAmount;
              const qrCodeUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(
                orderCode || ""
              )}`;

              setBankTransferInfo({
                orderCode,
                orderId: firstOrderId,
                amount,
                accountNumber,
                bankName: bankAccount.bank?.code,
                bankFullName: bankAccount.bank?.name,
                recipient: bankAccount.account_holder,
                qrCode: qrCodeUrl,
              });

              setShowBankTransferModal(true);
            } else {
              // Nếu không có thông tin ngân hàng, vẫn redirect
              setTimeout(() => {
                if (firstOrderId) {
                  navigate(`/order/${firstOrderId}`);
                } else {
                  navigate("/orders/pending");
                }
              }, 1500);
            }
          } catch (error) {
            console.error("Error fetching bank info:", error);
            // Vẫn redirect dù có lỗi
            setTimeout(() => {
              if (firstOrderId) {
                navigate(`/order/${firstOrderId}`);
              } else {
                navigate("/orders/pending");
              }
            }, 1500);
          }
        } else {
          // COD - chuyển đến trang chi tiết đơn hàng
          setTimeout(() => {
            if (firstOrderId) {
              navigate(`/order/${firstOrderId}`);
            } else {
              navigate("/orders/pending");
            }
          }, 1500);
        }
      } else {
        toast.error(response.message || "Đặt hàng thất bại");
      }
    } catch (error: any) {
      console.error("❌ Error during checkout:", error);
      toast.error(error?.message || "Đặt hàng thất bại. Vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  // Hiển thị loading nếu đang kiểm tra auth hoặc chưa đăng nhập
  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-4">
      <div className="px-4 space-y-3 mt-3">
        <ShippingAddressCard />
        <FlashSaleItem />
        <VoucherCard
          title="Voucher Shop"
          value={voucherDiscount}
          orderAmount={totalAmount}
          onSelect={handleSelectVoucher}
          selectedVoucher={selectedVoucher}
          shopId={getShopId()}
        />
        <ShippingInfoCard />
        <div className="bg-white rounded-lg px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Lời nhắn:</label>
            <input
              type="text"
              placeholder="Lưu ý cho Người bán..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1 text-sm text-gray-400 bg-gray-50 px-3 py-2 rounded border-0 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Phương thức thanh toán</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {paymentMethod === "bank_transfer"
                ? "Chuyển khoản nhanh 24/7"
                : "Thanh toán khi nhận hàng"}
            </span>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="text-blue-600 text-sm font-medium"
            >
              THAY ĐỔI
            </button>
          </div>
        </div>

        {/* Payment Method Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  Chọn phương thức thanh toán
                </h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
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
                </button>
              </div>
              <div className="p-4 space-y-3">
                <button
                  onClick={() => {
                    setPaymentMethod("cod");
                    setShowPaymentModal(false);
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    paymentMethod === "cod"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Thanh toán khi nhận hàng
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Thanh toán bằng tiền mặt khi nhận hàng
                      </div>
                    </div>
                    {paymentMethod === "cod" && (
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => {
                    setPaymentMethod("bank_transfer");
                    setShowPaymentModal(false);
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    paymentMethod === "bank_transfer"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Chuyển khoản nhanh 24/7
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Chuyển khoản ngân hàng, thanh toán nhanh chóng
                      </div>
                    </div>
                    {paymentMethod === "bank_transfer" && (
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bank Transfer Payment Modal */}
        <BankTransferModal
          isOpen={showBankTransferModal}
          onClose={() => setShowBankTransferModal(false)}
          bankTransferInfo={bankTransferInfo}
        />

        <div className="bg-white rounded-lg px-4 py-4 shadow-sm">
          <div className="space-y-3">
            {/* Tổng tiền hàng */}
            <div className="flex justify-between text-sm">
              <span>Tổng tiền hàng</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            {/* Voucher */}
            <div className="flex justify-between text-sm">
              <span>Voucher</span>
              <span className="text-red-600">
                {voucherDiscount > 0
                  ? `-${voucherDiscount.toLocaleString("vi-VN")} ₫`
                  : "0 ₫"}
              </span>
            </div>
            {/* Phí vận chuyển */}
            <div className="flex justify-between text-sm">
              <span>Phí vận chuyển</span>
              <span className={shippingFee > 0 ? "text-red-600" : ""}>
                {formatPrice(shippingFee)}
              </span>
            </div>
            {/* Điểm tích lũy - chỉ hiển thị khi có điểm > 0 */}
            {availablePoints > 0 && (
              <div className="flex items-center justify-between rounded">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Điểm tích lũy</span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Số điểm thực tế */}
                  <span className="text-sm font-medium text-gray-700">
                    {availablePoints.toLocaleString("vi-VN")} điểm
                  </span>
                  {/* Công tắc toggle */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={usePoints}
                      onChange={(e) => setUsePoints(e.target.checked)}
                    />
                    <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 transition-all duration-200 peer-checked:bg-green-400"></div>
                    <div className={`absolute w-5 h-5 left-0.5 top-0.5 bg-white border border-gray-300 rounded-full shadow transition-all duration-200 ${usePoints ? 'translate-x-4' : ''}`}></div>
                  </label>
                </div>
              </div>
            )}
            {/* Hiển thị số tiền giảm từ điểm */}
            {usePoints && pointsDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span>Tích điểm đã dùng</span>
                <span className="text-red-600">
                  -{formatPrice(pointsDiscount)} ({pointsDiscount.toLocaleString("vi-VN")} điểm)
                </span>
              </div>
            )}
            {/* Hiển thị hỗ trợ phí ship ngay dưới Phí vận chuyển */}
            {shippingSupport && shippingSupport.totalSupport > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Hỗ trợ vận chuyển</span>
                <span className="text-green-600">
                  {shippingSupport.supportType === "vnd"
                    ? `${shippingSupport.totalSupport.toLocaleString(
                        "vi-VN"
                      )} ₫`
                    : shippingSupport.supportType === "percent" &&
                      shippingFee > 0
                    ? `${Math.round(
                        (shippingFee * shippingSupport.totalSupport) / 100
                      ).toLocaleString("vi-VN")} ₫`
                    : ""}
                </span>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-green-600">
                Tổng thanh toán
              </span>
              <span className="text-base font-bold text-green-600">
                {formatPrice(finalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions & Action Button Section */}
        <div className="bg-white rounded-lg px-4 py-4 shadow-sm">
          <p className="text-xs text-gray-600 mb-3">
            Nhấn "Đặt hàng" để hoàn tất đơn hàng.
          </p>
          <button
            onClick={handleCheckout}
            disabled={loading || selectedItems.length === 0}
            className={`w-full font-bold py-3 rounded-lg text-base transition-colors ${
              loading || selectedItems.length === 0
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {loading ? "Đang xử lý..." : "Đặt hàng"}
          </button>
        </div>
      </div>
    </div>
  );
}
