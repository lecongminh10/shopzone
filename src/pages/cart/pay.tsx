import { cartState, selectedCartItemIdsState } from "@/state";
import { cartTotalState } from "@/state";
import { formatPrice } from "@/utils/format";
import { useAtomValue, useAtom } from "jotai";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "zmp-ui";

export default function Pay() {
  const totalAmount = useAtomValue(cartTotalState);
  const cart = useAtomValue(cartState);
  const [selectedIds] = useAtom(selectedCartItemIdsState);

  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);

  // Helper function để tạo itemKey từ cart item
  const getCartItemKey = (item: typeof cart[0]) => {
    const variantId = item.product.variant_id ?? item.product.phanloai_id ?? null;
    return variantId ? `${item.product.id}-${variantId}` : `${item.product.id}`;
  };

  // Lấy danh sách sản phẩm đã chọn
  const selectedProducts = useMemo(() => {
    return cart.filter((item) => selectedIds.includes(getCartItemKey(item)));
  }, [cart, selectedIds]);

  // Helper function để lấy tên thuộc tính động từ attributes
  const getAttributeName = (
    variant: { attributes?: Array<{ attribute_name: string; value_name: string }> } | undefined,
    valueName: string | undefined
  ): string | null => {
    if (!variant?.attributes || !valueName) return null;
    
    const attr = variant.attributes.find(
      (a) => a.value_name === valueName
    );
    return attr ? attr.attribute_name : null;
  };

  // Helper function để lấy thông tin variant
  const getVariantInfo = (item: typeof cart[0]) => {
    if (!item.product.variant_id || !item.product.variants) {
      return null;
    }

    const selectedVariant = item.product.variants.find(
      (v) => v.id === item.product.variant_id
    );

    if (!selectedVariant) {
      return null;
    }

    // Lấy tên thuộc tính động từ attributes nếu có
    const colorAttributeName = getAttributeName(
      selectedVariant,
      selectedVariant.color_name
    ) || "Màu";
    
    const sizeAttributeName = getAttributeName(
      selectedVariant,
      selectedVariant.size_name
    ) || "Loại";

    // Kiểm tra nếu sản phẩm chỉ có một thuộc tính (size: "0" và size_name: "+")
    const hasOnlyOneAttribute =
      selectedVariant.size === "0" && selectedVariant.size_name === "+";

    if (hasOnlyOneAttribute) {
      // Chỉ hiển thị một thuộc tính (Phân loại)
      if (selectedVariant.color_name) {
        const attrName = getAttributeName(selectedVariant, selectedVariant.color_name) || "Phân loại";
        return `${attrName}: ${selectedVariant.color_name}`;
      }
    } else {
      // Hiển thị cả hai thuộc tính với tên động
      const variantInfo: string[] = [];
      if (selectedVariant.color_name) {
        variantInfo.push(`${colorAttributeName}: ${selectedVariant.color_name}`);
      }
      if (selectedVariant.size_name && selectedVariant.size_name !== "+") {
        variantInfo.push(`${sizeAttributeName}: ${selectedVariant.size_name}`);
      }
      if (variantInfo.length > 0) {
        return variantInfo.join(" • ");
      }
    }

    return null;
  };

  const handlePay = () => {
    localStorage.setItem("checkoutCart", JSON.stringify(selectedProducts));
    navigate("/checkout");
  };

  return (
    <div className="flex-none bg-section">
      <div className="flex items-center py-3 px-4 space-x-2">
        <div className="space-y-1 flex-1">
          <div className="text-xs text-subtitle">Tổng thanh toán</div>
          <div className="text-sm font-medium text-primary">
            {formatPrice(totalAmount)}
          </div>
        </div>
        <Button onClick={handlePay} disabled={paying || selectedIds.length === 0}>
          Thanh toán
        </Button>
      </div>
    </div>
  );
}
