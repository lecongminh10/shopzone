import { Product } from "@/types";
import FlashSaleItem from "./flash-sale-item";
import { HTMLAttributes, useMemo } from "react";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export interface FlashSaleGridProps extends HTMLAttributes<HTMLDivElement> {
  products: Product[];
  replace?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

export default function FlashSaleGrid({
  products,
  replace,
  className,
  onLoadMore,
  hasMore,
  loading,
  ...props
}: FlashSaleGridProps) {
  // Memoize products để tránh re-render không cần thiết
  const memoizedProducts = useMemo(() => products, [products]);

  return (
    <div className={`px-4 pt-2 pb-4 bg-pink-50 ${className}`} {...props}>
      <Swiper
        slidesPerView={2}
        spaceBetween={12}
        grabCursor
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={memoizedProducts.length > 2}
      >
        {memoizedProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <FlashSaleItem
              product={product}
              replace={replace}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
