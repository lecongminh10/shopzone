import ProductGrid from "@/components/product-grid";
import { useAtomValue } from "jotai";
import { useMemo, useState, useCallback } from "react";
import { productsState } from "@/state";

export interface RelatedProductsProps {
  currentProductId: number;
}

const ITEMS_PER_PAGE = 10;

export default function RelatedProducts(props: RelatedProductsProps) {
  const products = useAtomValue(productsState);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  
  const otherProducts = useMemo(
    () => products.filter((product) => product.id !== props.currentProductId),
    [products, props.currentProductId]
  );

  // Chỉ hiển thị số lượng sản phẩm theo displayCount
  const displayedProducts = useMemo(
    () => otherProducts.slice(0, displayCount),
    [otherProducts, displayCount]
  );

  // Kiểm tra còn sản phẩm để tải thêm không
  const hasMore = displayCount < otherProducts.length;

  // Hàm tải thêm sản phẩm
  const handleLoadMore = useCallback(() => {
    setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, otherProducts.length));
  }, [otherProducts.length]);

  return (
    <ProductGrid 
      replace 
      products={displayedProducts}
      onLoadMore={handleLoadMore}
      hasMore={hasMore}
    />
  );
}
