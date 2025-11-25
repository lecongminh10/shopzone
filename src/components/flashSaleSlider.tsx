import FlashSaleItem, { FlashSaleItemProps } from "./flash-sale-item";
import Slider from "react-slick";
interface FlashSaleSliderProps {
  products: FlashSaleItemProps["product"][];
  replace?: boolean;
}

export default function FlashSaleSlider({
  products,
  replace,
}: FlashSaleSliderProps) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // số sản phẩm hiển thị
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="py-4">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <FlashSaleItem product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
