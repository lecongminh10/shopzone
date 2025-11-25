import { Product } from "@/types";
import ProductItem from "./product-item";
import { HTMLAttributes, useEffect, useRef } from "react";

export interface ProductGridProps extends HTMLAttributes<HTMLDivElement> {
  products: Product[];
  replace?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

export default function ProductGrid({
  products,
  className,
  replace,
  onLoadMore,
  hasMore,
  loading,
  ...props
}: ProductGridProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Nếu element visible và có data, trigger load more
        if (entries[0].isIntersecting && hasMore && !loading && onLoadMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  return (
    <>
      <div
        className={"grid grid-cols-2 px-2 pt-2 pb-8 gap-2 ".concat(
          className ?? ""
        )}
        {...props}
      >
        {products.map((product) => (
          <ProductItem key={product.id} product={product} replace={replace} />
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="px-4 pb-4 flex justify-center">
          <div className="text-sm text-subtitle">Đang tải...</div>
        </div>
      )}

      {/* Intersection observer target */}
      {hasMore && !loading && <div ref={observerTarget} className="h-20" />}
    </>
  );
}
