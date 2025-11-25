// ShippingInfoCard.tsx
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useAtomValue, useAtom } from "jotai";
import { 
  shippingAddressState, 
  deliveryModeState, 
  shippingFeeState,
  shippingInfoState,
  defaultAddressIdState,
  shippingSupportState
} from "@/state";
import { cartState, selectedCartItemIdsState } from "@/state";
import { FeeShipService } from "@/api/service/fee-ship.service";
import { AddressService } from "@/api/service/address.service";

export default function ShippingInfoCard() {
  const address = useAtomValue(shippingAddressState);
  const deliveryMode = useAtomValue(deliveryModeState);
  const cart = useAtomValue(cartState);
  const selectedIds = useAtomValue(selectedCartItemIdsState);
  const [shippingFee, setShippingFee] = useAtom(shippingFeeState);
  const [shippingInfo, setShippingInfo] = useAtom(shippingInfoState);
  const defaultAddressId = useAtomValue(defaultAddressIdState); // Track default address ID để trigger tính lại phí ship
  const [loading, setLoading] = useState(false);
  const fetchingRef = useRef(false);
  const lastRequestRef = useRef<string>('');
  const addressErrorLoggedRef = useRef(false); // Để chỉ log lỗi address một lần
  
  // State cho hỗ trợ phí ship (tính riêng biệt) - dùng atom để share với checkout page
  const [shippingSupport, setShippingSupport] = useAtom(shippingSupportState);
  const [loadingSupport, setLoadingSupport] = useState(false);
  const fetchingSupportRef = useRef(false);

  // Helper function để tạo itemKey từ cart item
  const getCartItemKey = (item: typeof cart[0]) => {
    const variantId = item.product.variant_id ?? item.product.phanloai_id ?? null;
    return variantId ? `${item.product.id}-${variantId}` : `${item.product.id}`;
  };

  // Lấy selected items từ cart - dùng useMemo để tránh dependency thay đổi
  const selectedItems = useMemo(() => {
    return cart.filter((item) => selectedIds.includes(getCartItemKey(item)));
  }, [cart, selectedIds]);

  // Tạo key duy nhất cho request để tránh gọi lại không cần thiết
  const requestKey = useMemo(() => {
    const itemsKey = selectedItems.map(item => `${item.product.id}-${item.quantity}`).join(',');
    return `${itemsKey}-${deliveryMode}-${selectedItems.length}`;
  }, [selectedItems, deliveryMode]);

  // Lấy user_id và shop_id từ localStorage
  const getUserInfo = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return {
          user_id: parseInt(user.user_id || user.id || '0', 10),
          shop_id: parseInt(user.shop_id || user.shop || '0', 10),
        };
      }
    } catch (e) {
      console.error('Error parsing user:', e);
    }
    return { user_id: 0, shop_id: 0 };
  };

  // Lấy địa chỉ mặc định và tính phí ship
  useEffect(() => {
    const fetchShippingFee = async () => {
      // Tạo requestKey bao gồm cả defaultAddressId để tính lại phí ship khi địa chỉ thay đổi
      const fullRequestKey = `${requestKey}-${defaultAddressId || 'no-address'}`;
      
      // Tránh gọi API nhiều lần với cùng một request
      if (fetchingRef.current || lastRequestRef.current === fullRequestKey) {
        return;
      }

      if (selectedItems.length === 0 || deliveryMode !== 'shipping') {
        setShippingFee(0);
        setShippingInfo(null);
        lastRequestRef.current = fullRequestKey;
        return;
      }

      const { user_id, shop_id } = getUserInfo();
      if (!user_id) {
        // Chỉ log warning một lần, không gọi liên tục
        if (lastRequestRef.current !== 'no-user-id') {
          console.warn('⚠️ Chưa có user_id - đợi user login');
          lastRequestRef.current = 'no-user-id';
        }
        setShippingFee(0);
        setShippingInfo(null);
        return;
      }

      if (!shop_id || shop_id <= 0) {
        // Chỉ log warning một lần
        if (lastRequestRef.current !== 'no-shop-id') {
          console.warn('⚠️ Chưa có shop_id - user chưa được gán shop');
          lastRequestRef.current = 'no-shop-id';
        }
        setShippingFee(0);
        setShippingInfo(null);
        return;
      }

      try {
        fetchingRef.current = true;
        lastRequestRef.current = fullRequestKey;
        setLoading(true);
        
        // Lấy địa chỉ mặc định của user
        let defaultAddress = null;
        let receiverProvince = '';
        let receiverDistrict = '';
        let receiverWard = '';
        
        try {
          const addressesResponse = await AddressService.getAddresses();
          defaultAddress = addressesResponse.data?.find(addr => addr.is_default) || addressesResponse.data?.[0];
          
          if (defaultAddress) {
            // Lấy trực tiếp từ fields province, district, ward
            receiverProvince = defaultAddress.province || '';
            receiverDistrict = defaultAddress.district || '';
            receiverWard = defaultAddress.ward || '';
            
            // Nếu không có province/district trong fields, thử parse từ full_address
            if (!receiverProvince && defaultAddress.full_address) {
              const addressParts = defaultAddress.full_address.split(',').map(s => s.trim());
              if (addressParts.length >= 2) {
                receiverProvince = addressParts[addressParts.length - 1] || '';
                receiverDistrict = addressParts[addressParts.length - 2] || '';
                if (addressParts.length >= 3) {
                  receiverWard = addressParts[addressParts.length - 3] || '';
                }
              }
            }
          }
          // Reset error flag khi thành công
          addressErrorLoggedRef.current = false;
          localStorage.removeItem('address_error_logged');
        } catch (addressError: any) {
          // Chỉ log lỗi một lần cho toàn bộ session (dùng localStorage để share giữa components)
          const wasLogged = localStorage.getItem('address_error_logged');
          if (!wasLogged && !addressErrorLoggedRef.current) {
            // Không log - vì shippingAddressCard đã log rồi
            addressErrorLoggedRef.current = true;
            localStorage.setItem('address_error_logged', 'true');
          }
          // Không block - tiếp tục gọi API fee-ship (API sẽ tự lấy địa chỉ từ DB)
        }

        // Chuẩn bị products array từ cart items
        const products = selectedItems.map(item => ({
          id: item.product.id, // sanpham_shop.id
          phanloai_id: (item.product as any).phanloai_id || null, // Nếu có phân loại
          quantity: item.quantity || 1,
        }));

        // Chuẩn bị request data với địa chỉ người nhận
        const requestData: any = {
          user_id,
          products,
        };
        
        // Thêm địa chỉ người nhận nếu có
        if (receiverProvince && receiverDistrict) {
          requestData.receiver_province = receiverProvince;
          requestData.receiver_district = receiverDistrict;
          if (receiverWard) {
            requestData.receiver_ward = receiverWard;
          }
        }

        // Gọi API tính phí ship
        const token = localStorage.getItem('token');
        const response = await FeeShipService.getShippingFee(
          requestData,
          {
            token: token || undefined,
            // Không truyền shopId, để method tự động dùng API_CONFIG.KEY_ID (từ VITE_KEY_ID)
          }
        );

        if (response.success && response.data) {
          const totalFee = response.data.total_fee || 0;
          const bestShipping = response.data.best_shipping_overall || response.data.best_simple;
          
          // Lấy carrier_name từ best_shipping_overall (nếu có) hoặc từ provider
          // Nếu provider là SUPERAI thì dùng carrier_name, nếu không thì dùng provider
          let carrierName = '';
          if (bestShipping.provider === 'SUPERAI' || bestShipping.provider?.startsWith('SUPERAI')) {
            carrierName = bestShipping.carrier_name || 'SUPERAI';
          } else {
            carrierName = bestShipping.carrier_name || bestShipping.provider || '';
          }
          
          setShippingFee(totalFee);
          setShippingInfo({
            fee: totalFee,
            carrier_name: carrierName,
            provider: bestShipping.provider || '',
            provider_code: bestShipping.provider_code || '', // Format: SUPERAI-{carrier_id}-{carrier_name}
            carrier_id: bestShipping.carrier_id || 0,
            eta_text: bestShipping.eta_text || '',
          });
          
          // Lưu địa chỉ người nhận từ response
          if (response.data.receiver_address) {
            setReceiverAddress({
              province: response.data.receiver_address.province || '',
              district: response.data.receiver_address.district || '',
              ward: response.data.receiver_address.ward || '',
            });
          }
        } else {
          console.error('❌ Failed to get shipping fee:', response.message);
          setShippingFee(0);
          setShippingInfo(null);
        }
      } catch (error: any) {
        console.error('❌ Error fetching shipping fee:', error);
        setShippingFee(0);
        setShippingInfo(null);
      } finally {
        setLoading(false);
        fetchingRef.current = false;
      }
    };

    fetchShippingFee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey, deliveryMode, defaultAddressId]); // Thêm defaultAddressId vào dependency để trigger tính lại phí ship khi địa chỉ mặc định thay đổi

  // Hàm tính hỗ trợ phí ship (độc lập với tính phí ship)
  const calculateShippingSupport = async () => {
    // Tránh gọi API nhiều lần
    if (fetchingSupportRef.current || selectedItems.length === 0) {
      return;
    }

    const { user_id, shop_id } = getUserInfo();
    if (!user_id || !shop_id || shop_id <= 0) {
      setShippingSupport(null);
      return;
    }

    try {
      fetchingSupportRef.current = true;
      setLoadingSupport(true);

      const token = localStorage.getItem('token');
      const productSupports: Array<{
        productId: number;
        support: number;
        supportType: string;
        label: string;
      }> = [];

      // Kiểm tra xem có cấu hình "all_products" (freeship toàn bộ đơn hàng) không
      // Nếu có, chỉ cần gọi 1 lần cho sản phẩm đầu tiên
      let allProductsConfig: any = null;
      let hasAllProductsConfig = false;

      // Thử gọi API cho sản phẩm đầu tiên để kiểm tra cấu hình all_products
      if (selectedItems.length > 0) {
        try {
          const firstItem = selectedItems[0];
          const response = await FeeShipService.getShippingSupport(firstItem.product.id, {
            token: token || undefined,
            // Không truyền shopId, để method tự động dùng API_CONFIG.KEY_ID (từ VITE_KEY_ID)
          });

          if (response.success && response.data?.product?.shipping_info) {
            const shippingInfo = response.data.product.shipping_info;
            
            // Kiểm tra xem có cấu hình all_products không
            if (shippingInfo.shipping_type === 'all_products' && shippingInfo.has_free_shipping) {
              hasAllProductsConfig = true;
              allProductsConfig = shippingInfo;
              // Đánh dấu shipping_type để gửi lên backend
              allProductsConfig.shipping_type = 'all_products';
              
              // Xử lý cấu hình all_products
              const mode = shippingInfo.free_ship_mode || 0;
              const discount = shippingInfo.free_ship_discount_value || 0;
              const discountType = shippingInfo.free_ship_type || 'fixed';
              const minOrder = shippingInfo.min_order_value || 0;

              // Mode 1: Freeship 100%
              if (mode === 1) {
                productSupports.push({
                  productId: firstItem.product.id,
                  support: 100, // 100% freeship
                  supportType: 'percent',
                  label: shippingInfo.free_ship_label || 'Freeship 100%',
                });
              }
              // Mode 0 hoặc 2: Giảm cố định hoặc %
              else if (discount > 0) {
                productSupports.push({
                  productId: firstItem.product.id,
                  support: discount,
                  supportType: discountType === 'percent' ? 'percent' : 'vnd',
                  label: shippingInfo.free_ship_label || shippingInfo.free_ship_details || '',
                });
              }
            } else {
              // Không có all_products, kiểm tra individual_products cho sản phẩm này
              const shipSupport = shippingInfo.ship_support || 0;
              const shipSupportType = shippingInfo.ship_support_type || 'vnd';

              if (shipSupport > 0) {
                productSupports.push({
                  productId: firstItem.product.id,
                  support: shipSupport,
                  supportType: shipSupportType,
                  label: shippingInfo.free_ship_label || shippingInfo.free_ship_details || '',
                });
              }
            }
          }
        } catch (error) {
          console.warn(`⚠️ Không thể lấy hỗ trợ ship cho sản phẩm đầu tiên:`, error);
        }
      }

      // Nếu không có cấu hình all_products, kiểm tra từng sản phẩm riêng lẻ
      if (!hasAllProductsConfig && selectedItems.length > 1) {
        // Bỏ qua sản phẩm đầu tiên vì đã kiểm tra rồi
        for (let i = 1; i < selectedItems.length; i++) {
          const item = selectedItems[i];
          try {
            const response = await FeeShipService.getShippingSupport(item.product.id, {
              token: token || undefined,
              // Không truyền shopId, để method tự động dùng API_CONFIG.KEY_ID (từ VITE_KEY_ID)
            });

            if (response.success && response.data?.product?.shipping_info) {
              const shippingInfo = response.data.product.shipping_info;
              const shipSupport = shippingInfo.ship_support || 0;
              const shipSupportType = shippingInfo.ship_support_type || 'vnd';

              if (shipSupport > 0) {
                productSupports.push({
                  productId: item.product.id,
                  support: shipSupport,
                  supportType: shipSupportType,
                  label: shippingInfo.free_ship_label || shippingInfo.free_ship_details || '',
                });
              }
            }
          } catch (error) {
            // Bỏ qua lỗi cho từng sản phẩm, tiếp tục với sản phẩm khác
            console.warn(`⚠️ Không thể lấy hỗ trợ ship cho sản phẩm ${item.product.id}:`, error);
          }
        }
      }

      // Tính tổng hỗ trợ phí ship
      let totalSupport = 0;
      let supportType: 'vnd' | 'percent' = 'vnd';
      let supportLabel = '';
      let supportDetails = '';

      if (productSupports.length > 0) {
        // Nếu có cấu hình all_products, dùng thông tin từ config
        if (hasAllProductsConfig && allProductsConfig) {
          const mode = allProductsConfig.free_ship_mode || 0;
          const discount = allProductsConfig.free_ship_discount_value || 0;
          const discountType = allProductsConfig.free_ship_type || 'fixed';
          const minOrder = allProductsConfig.min_order_value || 0;

          if (mode === 1) {
            // Freeship 100%
            supportType = 'percent';
            totalSupport = 100;
            supportLabel = allProductsConfig.free_ship_label || 'Freeship 100%';
            supportDetails = allProductsConfig.free_ship_details || 'Miễn phí ship 100%';
          } else if (discount > 0) {
            supportType = discountType === 'percent' ? 'percent' : 'vnd';
            totalSupport = discount;
            supportLabel = allProductsConfig.free_ship_label || '';
            supportDetails = allProductsConfig.free_ship_details || '';
          }
        } else {
          // Xử lý individual_products: kiểm tra xem có sản phẩm nào hỗ trợ theo % không
          const hasPercentSupport = productSupports.some(p => p.supportType === 'percent');
          
          if (hasPercentSupport) {
            // Nếu có hỗ trợ theo %, tính % trên tổng phí ship hiện tại
            // Lấy % cao nhất (vì thường chỉ có 1 loại hỗ trợ)
            const maxPercent = Math.max(
              ...productSupports
                .filter(p => p.supportType === 'percent')
                .map(p => p.support)
            );
            supportType = 'percent';
            totalSupport = maxPercent; // Lưu % để tính sau
            supportLabel = `Hỗ trợ ${maxPercent}% phí ship`;
            supportDetails = `Giảm ${maxPercent}% phí vận chuyển`;
          } else {
            // Tất cả đều hỗ trợ VND, cộng tổng
            totalSupport = productSupports.reduce((sum, p) => sum + p.support, 0);
            supportType = 'vnd';
            supportLabel = `Hỗ trợ ${totalSupport.toLocaleString()}₫ phí ship`;
            supportDetails = `Giảm ${totalSupport.toLocaleString()}₫ phí vận chuyển`;
          }
        }
      }

      setShippingSupport({
        totalSupport,
        supportType,
        supportLabel,
        supportDetails,
        shippingType: hasAllProductsConfig ? 'all_products' : 'individual_products', // Loại cấu hình hỗ trợ
        products: productSupports,
      });
    } catch (error: any) {
      console.error('❌ Error calculating shipping support:', error);
      setShippingSupport(null);
    } finally {
      setLoadingSupport(false);
      fetchingSupportRef.current = false;
    }
  };

  // Tính hỗ trợ phí ship khi selectedItems thay đổi (độc lập với tính phí ship)
  useEffect(() => {
    calculateShippingSupport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems.length, requestKey]); // Chỉ trigger khi sản phẩm thay đổi

  // Lấy địa chỉ từ receiver_address trong response hoặc từ address state
  const [receiverAddress, setReceiverAddress] = useState<{province?: string, district?: string, ward?: string} | null>(null);

  // Hiển thị địa chỉ: ưu tiên từ response, sau đó từ address state
  const displayAddress = receiverAddress 
    ? (() => {
        const parts = [];
        if (receiverAddress.ward) parts.push(receiverAddress.ward);
        if (receiverAddress.district) parts.push(receiverAddress.district);
        if (receiverAddress.province) parts.push(receiverAddress.province);
        return parts.length > 0 ? parts.join(', ') : '';
      })()
    : (address
        ? (() => {
            const parts = [];
            if (address.street) parts.push(address.street);
            if (address.ward) parts.push(address.ward);
            if (address.district) parts.push(address.district);
            if (address.city) parts.push(address.city);
            return parts.length > 0 ? parts.join(', ') : '';
          })()
        : "Chưa có địa chỉ");

  const shippingUnit = shippingInfo?.carrier_name || 
    (deliveryMode === "shipping" ? "Đang tính..." : "Nhận tại cửa hàng");
  
  const etaText = shippingInfo?.eta_text || "Đang tính thời gian...";

  return (
    <div className="bg-white rounded-lg px-4 py-3 shadow-sm">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <svg
            className="w-6 h-6 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
          </svg>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {shippingUnit && shippingUnit !== "Đang tính..." && shippingUnit !== "Nhận tại cửa hàng"
                ? shippingUnit
                : displayAddress || "Chưa có địa chỉ"}
            </span>
            <span className="text-sm font-medium">
              {loading ? "..." : `${shippingFee.toLocaleString()} ₫`}
            </span>
          </div>
          {etaText && (
            <p className="text-xs text-gray-500">
              {etaText}
            </p>
          )}
          {shippingFee > 0 && (
            <p className="text-xs text-blue-600">
              Phí vận chuyển: {shippingFee.toLocaleString()} ₫
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
