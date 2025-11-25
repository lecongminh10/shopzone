import ProductGrid from "@/components/product-grid";
import Section from "@/components/section";
import { useAtomValue, useSetAtom } from "jotai";
import { loadable } from "jotai/utils";
import {
  recommendedProductsState,
  paginatedProductsState,
  hasMoreProductsState,
  loadMoreProductsAction,
  fetchInitialProductsAction,
  accumulatedProductsState,
} from "@/state";
import { useState, useEffect } from "react";
import { Button } from "zmp-ui";
import { useLocation } from "react-router-dom";

export default function Product() {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const fetchInitial = useSetAtom(fetchInitialProductsAction);
  const accumulated = useAtomValue(accumulatedProductsState);
  // Load recommended products
  const loadableRecommendedProducts = useAtomValue(
    loadable(recommendedProductsState)
  );
  const loadablePaginatedProducts = useAtomValue(
    loadable(paginatedProductsState)
  );
  const loadableHasMore = useAtomValue(loadable(hasMoreProductsState));

  // Get actual data - ưu tiên accumulated products
  const products = accumulated.length > 0 
    ? accumulated 
    : (loadablePaginatedProducts.state === "hasData"
        ? loadablePaginatedProducts.data
        : []);

  const hasMore =
    loadableHasMore.state === "hasData" ? loadableHasMore.data : false;

  const loadMore = useSetAtom(loadMoreProductsAction);

  // Fetch products lần đầu khi component mount
  useEffect(() => {
    if (accumulated.length === 0) {
      fetchInitial().catch(console.error);
    }
  }, []);

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      await loadMore();
      // Small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 300));
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Loading state
  const initialLoading = accumulated.length === 0 && loadableRecommendedProducts.state === "loading";

  return (
    <Section
      title={
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            className="inline-block"
          >
            <path
              d="M12 2a1 1 0 0 1 .96.73l2.07 6.37h6.7c.97 0 1.37 1.24.59 1.81l-5.42 3.94 2.07 6.37c.29.88-.7 1.62-1.43 1.1L12 18.27l-5.42 3.05c-.73.52-1.71-.22-1.43-1.1l2.07-6.37-5.42-3.94c-.78-.57-.38-1.81.59-1.81h6.7L11.04 2.73A1 1 0 0 1 12 2z"
              fill="#f59e42"
            />
          </svg>
          <span>{isHome ? "Gợi ý hôm nay" : "Các sản phẩm khác"}</span>
        </span>
      }
    >
      {initialLoading && products.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <div className="text-sm text-subtitle">Đang tải sản phẩm...</div>
        </div>
      ) : products.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <div className="text-sm text-subtitle">
            Hiện không có sản phẩm nào
          </div>
        </div>
      ) : (
        <>
          <ProductGrid
            products={products}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            loading={isLoadingMore}
          />

          {/* Manual load more button as fallback */}
          {hasMore && !isLoadingMore && (
            <div className="px-4 pb-4 text-center">
              <Button size="small" variant="secondary" onClick={handleLoadMore}>
                Xem thêm sản phẩm
              </Button>
            </div>
          )}
        </>
      )}
    </Section>
  );
}
