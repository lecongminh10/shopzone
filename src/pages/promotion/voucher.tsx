import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VoucherService, Voucher } from "@/api/service/voucher.service";
import { useAtom, useAtomValue } from "jotai";
import { 
  selectedVoucherState, 
  voucherDiscountState, 
  cartTotalState,
  cartState,
  selectedCartItemIdsState
} from "@/state";
import toast from "react-hot-toast";

export default function VoucherPage() {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"shop" | "san">("shop");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useAtom(selectedVoucherState);
  const [voucherDiscount, setVoucherDiscount] = useAtom(voucherDiscountState);
  const totalAmount = useAtomValue(cartTotalState);
  const cart = useAtomValue(cartState);
  const [selectedIds, setSelectedIds] = useAtom(selectedCartItemIdsState);

  useEffect(() => {
    fetchVouchers();
  }, [activeTab]);

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const response = await VoucherService.getVouchers({
        limit: 100,
      });

      if (response.success && response.data) {
        setVouchers(response.data);
        // Extract unique shop IDs for categories
        const shopIds = new Set<string>();
        response.data.forEach((voucher: Voucher) => {
          if (voucher.shop) {
            shopIds.add(`Shop ${voucher.shop}`);
          }
        });
        setCategories(Array.from(shopIds));
      }
    } catch (error) {
      console.error("❌ Error fetching vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter vouchers by category
  const filteredVouchers =
    selectedCategory === "all"
      ? vouchers
      : vouchers.filter((v) => `Shop ${v.shop}` === selectedCategory);

  // Filter by tab (shop vs san)
  const displayVouchers = filteredVouchers.filter((v) => {
    // This is a simplified filter - adjust based on your voucher structure
    return true; // Show all for now
  });

  const getDaysRemaining = (expiredTimestamp?: number) => {
    if (!expiredTimestamp) return 0;
    const now = Date.now();
    const expired = expiredTimestamp * 1000; // Convert to milliseconds
    const diff = expired - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
  };

  // Helper function để tạo itemKey từ cart item
  const getCartItemKey = (item: (typeof cart)[0]) => {
    const variantId =
      item.product.variant_id ?? item.product.phanloai_id ?? null;
    return variantId ? `${item.product.id}-${variantId}` : `${item.product.id}`;
  };

  const handleUseVoucher = (voucher: Voucher) => {
    try {
      // Kiểm tra scope của voucher
      const scope = voucher.scope || "all"; // "all" hoặc "sanpham"
      
      if (scope === "all") {
        // Voucher áp dụng cho tất cả sản phẩm
        // Kiểm tra xem có sản phẩm trong giỏ hàng không
        if (cart.length === 0) {
          toast.error("Bạn chưa có sản phẩm nào trong giỏ hàng");
          navigate("/flash-sale");
          return;
        }

        // Kiểm tra điều kiện đơn tối thiểu
        const minAmount = voucher.min_price || voucher.condition_amount || 0;
        if (totalAmount < minAmount) {
          toast.error(
            `Voucher này yêu cầu đơn hàng tối thiểu ${minAmount.toLocaleString("vi-VN")}₫`
          );
          return;
        }

        // Kiểm tra điều kiện đơn tối đa (nếu có)
        if (voucher.max_price && totalAmount > voucher.max_price) {
          toast.error(
            `Voucher này chỉ áp dụng cho đơn hàng tối đa ${voucher.max_price.toLocaleString("vi-VN")}₫`
          );
          return;
        }

        // Tính discount
        const calculatedDiscount = VoucherService.calculateDiscount(voucher, totalAmount);

        // Lưu voucher và discount vào state
        setSelectedVoucher(voucher);
        setVoucherDiscount(calculatedDiscount);

        // Redirect đến trang checkout
        navigate("/checkout");
        toast.success(`Đã chọn voucher ${voucher.code}`);
      } else if (scope === "sanpham") {
        // Voucher áp dụng cho sản phẩm cụ thể
        const productIds = voucher.product_ids 
          ? voucher.product_ids.split(",").map(id => parseInt(id.trim())).filter(id => !isNaN(id))
          : [];

        if (productIds.length === 0) {
          toast.error("Voucher này không có sản phẩm áp dụng");
          return;
        }

        // Kiểm tra xem trong giỏ hàng có sản phẩm phù hợp không
        const matchingCartItems = cart.filter(item => 
          productIds.includes(item.product.id)
        );

        if (matchingCartItems.length > 0) {
          // Có sản phẩm phù hợp trong giỏ hàng
          // Chọn tất cả sản phẩm phù hợp
          const newSelectedIds = [...selectedIds];
          matchingCartItems.forEach(item => {
            const itemKey = getCartItemKey(item);
            if (!newSelectedIds.includes(itemKey)) {
              newSelectedIds.push(itemKey);
            }
          });
          setSelectedIds(newSelectedIds);

          // Tính tổng tiền của các sản phẩm đã chọn để kiểm tra điều kiện
          const selectedItemsTotal = matchingCartItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );

          // Kiểm tra điều kiện đơn tối thiểu
          const minAmount = voucher.min_price || voucher.condition_amount || 0;
          if (selectedItemsTotal < minAmount) {
            toast.error(
              `Voucher này yêu cầu đơn hàng tối thiểu ${minAmount.toLocaleString("vi-VN")}₫`
            );
            // Bỏ chọn các sản phẩm vừa thêm vào (chỉ bỏ những sản phẩm matching)
            const matchingItemKeys = matchingCartItems.map(item => getCartItemKey(item));
            const updatedSelectedIds = selectedIds.filter(id => !matchingItemKeys.includes(id));
            setSelectedIds(updatedSelectedIds);
            return;
          }

          // Kiểm tra điều kiện đơn tối đa (nếu có)
          if (voucher.max_price && selectedItemsTotal > voucher.max_price) {
            toast.error(
              `Voucher này chỉ áp dụng cho đơn hàng tối đa ${voucher.max_price.toLocaleString("vi-VN")}₫`
            );
            // Bỏ chọn các sản phẩm vừa thêm vào (chỉ bỏ những sản phẩm matching)
            const matchingItemKeys = matchingCartItems.map(item => getCartItemKey(item));
            const updatedSelectedIds = selectedIds.filter(id => !matchingItemKeys.includes(id));
            setSelectedIds(updatedSelectedIds);
            return;
          }

          // Lưu voucher vào state (không tính discount ở đây, để checkout page tự tính với totalAmount mới)
          setSelectedVoucher(voucher);
          setVoucherDiscount(0); // Sẽ được tính lại trong checkout page

          // Redirect đến trang checkout
          navigate("/checkout");
          toast.success(`Đã chọn voucher ${voucher.code} và chọn sản phẩm phù hợp`);
        } else {
          // Không có sản phẩm phù hợp trong giỏ hàng
          // Redirect đến trang chi tiết sản phẩm đầu tiên
          const firstProductId = productIds[0];
          navigate(`/product/${firstProductId}`);
          toast("Chuyển đến trang sản phẩm để thêm vào giỏ hàng");
        }
      }
    } catch (error: any) {
      console.error("Error using voucher:", error);
      toast.error(error?.message || "Không thể sử dụng voucher này");
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-background">
      {/* Header */}

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200"></div>

      {/* Category Filter */}

      {/* Banner */}
      {activeTab === "shop" && (
        <div className="bg-blue-500 text-white px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-bold">Voucher từ các shop</div>
              <div className="text-sm opacity-90">
                {displayVouchers.length} voucher có sẵn
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Voucher List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            <span className="ml-3 text-gray-600">Đang tải...</span>
          </div>
        ) : displayVouchers.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2 text-4xl">🎫</div>
            <p className="text-gray-600 mb-2">Không có voucher nào</p>
            <p className="text-sm text-gray-500">
              Hiện tại không có voucher nào khả dụng
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayVouchers.map((voucher) => {
              const daysRemaining = getDaysRemaining(voucher.expired);
              const isExpired = daysRemaining === 0;

              return (
                <div
                  key={voucher.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                >
                  <div className="flex">
                    {/* Left: Discount Badge */}
                    <div className="flex-shrink-0 w-20 bg-gradient-to-br from-amber-400 to-amber-500 flex flex-col items-center justify-center p-3 text-white">
                      <div className="text-xs font-medium mb-1">GIẢM</div>
                      <div className="text-xl font-bold">
                        {voucher.type === "tru" ? (
                          <span className="text-sm">
                            {voucher.discount.toLocaleString("vi-VN")}₫
                          </span>
                        ) : (
                          `${voucher.discount}%`
                        )}
                      </div>
                    </div>

                    {/* Right: Voucher Details */}
                    <div className="flex-1 p-4">
                      <div className="mb-2">
                        <h3 className="font-bold text-gray-900 mb-1">
                          {voucher.code}
                        </h3>
                        {voucher.description && (
                          <p className="text-xs text-gray-600 line-clamp-1">
                            {voucher.description}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1 mb-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path
                              fillRule="evenodd"
                              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            Đơn tối thiểu{" "}
                            {voucher.min_price
                              ? voucher.min_price.toLocaleString("vi-VN")
                              : voucher.condition_amount.toLocaleString(
                                  "vi-VN"
                                )}
                            ₫
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span
                            className={
                              isExpired ? "text-red-500 font-medium" : ""
                            }
                          >
                            Còn {daysRemaining} ngày
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>
                            {voucher.current_uses || 0}/
                            {voucher.max_global_uses || 0} đã dùng
                          </span>
                        </div>
                      </div>

                      <button
                        className="w-full py-2 px-4 border-2 border-red-500 text-red-500 rounded-lg font-medium text-sm hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                          handleUseVoucher(voucher);
                        }}
                        disabled={isExpired}
                      >
                        Sử dụng
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
