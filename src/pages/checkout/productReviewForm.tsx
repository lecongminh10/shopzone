import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "zmp-ui";
import { Star } from "lucide-react";
import { ProductReviewService } from "@/api/service/productReview.sevicer";
import { OrderService } from "@/api/service/order.sevice";
import { Order } from "@/types";
import toast from "react-hot-toast";

interface ProductReview {
  productId: string;
  rating: number;
  comment: string;
  images: string[];
}

interface ProductReviewFormProps {
  order?: Order | null;
  onReviewSubmitted?: (productId: string) => void; // Callback khi đánh giá thành công
}

export default function ProductReviewForm({ order: orderProp, onReviewSubmitted }: ProductReviewFormProps = {} as ProductReviewFormProps) {
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(orderProp || (state as Order) || null);
  const [reviews, setReviews] = useState<Record<string, ProductReview>>({});
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [reviewedProducts, setReviewedProducts] = useState<Record<string, boolean>>({});

  // Function để refresh order từ API
  const refreshOrder = async () => {
    if (!id) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const orderDetail = await OrderService.getOrderDetail(token, id);
      if (orderDetail) {
        setOrder(orderDetail);
        localStorage.setItem("selectedOrder", JSON.stringify(orderDetail));
      }
    } catch (error) {
      console.error("Error refreshing order:", error);
    }
  };

  // Update order khi orderProp thay đổi
  useEffect(() => {
    if (orderProp) {
      setOrder(orderProp);
    }
  }, [orderProp]);

  useEffect(() => {
    const currentOrder = order || orderProp || (() => {
      const savedOrder = localStorage.getItem("selectedOrder");
      return savedOrder ? JSON.parse(savedOrder) : null;
    })();

    if (currentOrder) {
      // Lấy danh sách sản phẩm đã được đánh giá từ order
      // reviewed_products là object với key là productKey và value là review object hoặc false
      // Chỉ set true khi giá trị là object (đã đánh giá), false thì không set (hoặc set false)
      const reviewedProductsData = (currentOrder as any).reviewed_products || (currentOrder as any).reviewedProducts || {};
      const reviewedMap: Record<string, boolean> = {};
      
      console.log("🔍 [ProductReviewForm] Current Order:", currentOrder);
      console.log("🔍 [ProductReviewForm] Reviewed Products Data:", reviewedProductsData);
      
      // Chuyển đổi: chỉ set true khi giá trị là object (đã đánh giá)
      // Nếu giá trị là false thì không set (sản phẩm chưa đánh giá)
      Object.keys(reviewedProductsData).forEach((productKey) => {
        const reviewValue = reviewedProductsData[productKey];
        // Chỉ set true nếu là object (đã đánh giá), không set nếu là false
        if (reviewValue && typeof reviewValue === 'object' && reviewValue !== null) {
          reviewedMap[productKey] = true;
        }
        // Nếu là false, không set vào map (mặc định là false/undefined = chưa đánh giá)
      });
      
      console.log("🔍 [ProductReviewForm] Reviewed Map:", reviewedMap);
      setReviewedProducts(reviewedMap);
    }
  }, [order]);

  if (!order) {
    return (
      <div className="p-4 text-center text-gray-500">
        Không tìm thấy thông tin đơn hàng.
      </div>
    );
  }

  // --- CHỈNH Ở ĐÂY: tạo danh sách sản phẩm có id là key thực tế ---
  let productList: any[] = [];
  if (order?.products && typeof order.products === "object") {
    productList = Object.entries(order.products).map(([key, value]) => ({
      ...value,
      id: key, // 👈 Giữ lại key làm ID sản phẩm
    }));
  }

  const handleReviewChange = (
    productId: string,
    field: keyof ProductReview,
    value: any
  ) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        productId,
        [field]: value,
      },
    }));
  };

  const handleSubmitReview = async (productId: string) => {
    const review = reviews[productId];
    if (!review || !review.rating) {
      toast.error("Vui lòng chọn số sao đánh giá!");
      return;
    }

    const product = productList.find((p) => p.id === productId);
    if (!product) {
      toast.error("Không tìm thấy ID sản phẩm.");
      return;
    }

    // Parse product_id từ format "81638__6352" (product_id__variant_id)
    let parsedProductId: number;
    let variantId: number | undefined;
    
    if (typeof productId === 'string' && productId.includes('__')) {
      const parts = productId.split('__');
      parsedProductId = parseInt(parts[0], 10);
      variantId = parts[1] ? parseInt(parts[1], 10) : undefined;
    } else if (typeof productId === 'string' && productId.includes('_')) {
      // Fallback cho format cũ: "81638_6352"
      const parts = productId.split('_');
      parsedProductId = parseInt(parts[0], 10);
      variantId = parts[1] ? parseInt(parts[1], 10) : undefined;
    } else {
      parsedProductId = parseInt(productId, 10);
    }

    if (isNaN(parsedProductId) || parsedProductId <= 0) {
      toast.error("ID sản phẩm không hợp lệ.");
      return;
    }

    // Kiểm tra lại xem sản phẩm đã được đánh giá chưa
    if (reviewedProducts[productId]) {
      toast.error("Sản phẩm này đã được đánh giá. Mỗi sản phẩm chỉ có thể đánh giá một lần!");
      return;
    }

    try {
      // Hiển thị loading toast
      const loadingToast = toast.loading("Đang gửi đánh giá...");
      
      await ProductReviewService.submitReview({
        product_id: parsedProductId,
        order_id: order.id,
        rating: review.rating,
        content: review.comment || "",
        images: review.images || [],
        shop_id: order.shopId,
        variant_id: variantId,
      });
      
      // Đóng loading toast
      toast.dismiss(loadingToast);
      
      // Đánh dấu sản phẩm đã được đánh giá ngay lập tức
      setReviewedProducts((prev) => ({
        ...prev,
        [productId]: true,
      }));
      
      // Xóa form review
      setExpandedReview(null);
      setReviews((prev) => {
        const newReviews = { ...prev };
        delete newReviews[productId];
        return newReviews;
      });
      
      // Refresh order từ API để lấy reviewed_products mới nhất
      await refreshOrder();
      
      // Hiển thị toast thành công
      toast.success("Đánh giá của bạn đã được gửi thành công!", {
        duration: 3000,
        icon: "✅",
      });
      
      // Gọi callback để parent component (detail.tsx) có thể refresh và scroll
      if (onReviewSubmitted) {
        onReviewSubmitted(productId);
      }
    } catch (err: any) {
      console.error("Error submitting review:", err);
      
      // Hiển thị thông báo lỗi từ backend nếu có
      const errorMessage = err?.message || "Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!";
      toast.error(errorMessage, {
        duration: 4000,
      });
    }
  };

  const handleImageUpload = (
    productId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const imageUrls: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          imageUrls.push(event.target.result as string);
          if (imageUrls.length === files.length) {
            handleReviewChange(productId, "images", [
              ...(reviews[productId]?.images || []),
              ...imageUrls,
            ]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (productId: string, imageIndex: number) => {
    const currentImages = reviews[productId]?.images || [];
    handleReviewChange(productId, "images", [
      ...currentImages.slice(0, imageIndex),
      ...currentImages.slice(imageIndex + 1),
    ]);
  };

  const StarRating = ({
    rating,
    onRatingChange,
    productId,
  }: {
    rating: number;
    onRatingChange: (rating: number) => void;
    productId: string;
  }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRatingChange(star)}
          type="button"
          className="focus:outline-none"
        >
          <Star
            size={24}
            className={`transition-colors ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        </button>
      ))}
    </div>
  );

  // Lọc danh sách sản phẩm chưa được đánh giá
  const unreviewedProducts = productList.filter((product) => {
    const productId = product.id;
    const isReviewed = reviewedProducts[productId] || false;
    return !isReviewed;
  });

  // Debug log
  console.log("🔍 [ProductReviewForm] Product List:", productList.map((p: any) => p.id));
  console.log("🔍 [ProductReviewForm] Reviewed Products Keys:", Object.keys(reviewedProducts));
  console.log("🔍 [ProductReviewForm] Unreviewed Products:", unreviewedProducts.map((p: any) => p.id));
  console.log("🔍 [ProductReviewForm] Unreviewed Count:", unreviewedProducts.length);

  // Nếu tất cả sản phẩm đã được đánh giá, không hiển thị form
  if (unreviewedProducts.length === 0) {
    console.log("✅ [ProductReviewForm] Tất cả sản phẩm đã được đánh giá, ẩn form");
    return null; // Không hiển thị gì nếu tất cả đã đánh giá (đã có section hiển thị reviews ở trên)
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <h2 className="text-sm font-medium text-gray-900 mb-4">
          Đánh giá sản phẩm
        </h2>
        <div className="space-y-4">
          {unreviewedProducts.map((product) => {
            const productId = product.id;
            const isReviewed = reviewedProducts[productId] || false;
            const existingReview = reviews[productId] || {};
            const review = {
              productId,
              rating: existingReview.rating || 0,
              comment: existingReview.comment || "",
              images: Array.isArray(existingReview.images)
                ? existingReview.images
                : [],
            };
            const isExpanded = expandedReview === productId;

            return (
              <div
                key={productId}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded border border-gray-200">
                    <img
                      src={
                        product.minh_hoa?.startsWith("http")
                          ? product.minh_hoa
                          : `https://socdo.vn${product.minh_hoa}`
                      }
                      alt={product.tieu_de}
                      className="w-full h-full object-cover"
                    />
                  </div>
                    <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 line-clamp-2 mb-2">
                      {product.tieu_de}
                    </div>
                    {!isExpanded && (
                      <div className="flex items-center gap-2">
                        {isReviewed ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                              ✓ Đã đánh giá
                            </span>
                          </div>
                        ) : review.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={`${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">
                              {review.rating}/5
                            </span>
                            <button
                              onClick={() => setExpandedReview(productId)}
                              className="text-xs text-primary hover:underline ml-2"
                            >
                              Hoàn tất đánh giá
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setExpandedReview(productId)}
                            className="text-xs text-primary hover:underline"
                          >
                            Đánh giá sản phẩm này
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {isExpanded && !isReviewed && (
                  <div className="space-y-3 pt-3 border-t border-gray-100">
                    <div>
                      <label className="text-xs text-gray-700 mb-2 block">
                        Chọn số sao đánh giá
                      </label>
                      <StarRating
                        rating={review.rating}
                        onRatingChange={(rating) =>
                          handleReviewChange(productId, "rating", rating)
                        }
                        productId={productId}
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-700 mb-2 block">
                        Viết đánh giá của bạn
                      </label>
                      <textarea
                        value={review.comment}
                        onChange={(e) =>
                          handleReviewChange(
                            productId,
                            "comment",
                            e.target.value
                          )
                        }
                        placeholder="Chia sẻ cảm nhận của bạn về sản phẩm này..."
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-700 mb-2 block">
                        Thêm hình ảnh (tùy chọn)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {review.images.map((image, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="relative w-20 h-20 rounded border border-gray-200 overflow-hidden"
                          >
                            <img
                              src={image}
                              alt={`Review ${imgIdx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() =>
                                handleRemoveImage(productId, imgIdx)
                              }
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        {review.images.length < 5 && (
                          <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                            <Icon
                              icon="zi-camera"
                              className="w-6 h-6 text-gray-400"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) => handleImageUpload(productId, e)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => handleSubmitReview(productId)}
                        disabled={isReviewed}
                        className={`flex-1 py-2 text-white text-sm font-medium rounded-lg transition-colors ${
                          isReviewed
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-primary hover:bg-primary/90"
                        }`}
                      >
                        {isReviewed ? "Đã đánh giá" : "Gửi đánh giá"}
                      </button>
                      <button
                        onClick={() => {
                          setExpandedReview(null);
                          setReviews((prev) => {
                            const newReviews = { ...prev };
                            delete newReviews[productId];
                            return newReviews;
                          });
                        }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                )}
                
                {isReviewed && !isExpanded && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="text-xs text-green-600 bg-green-50 px-3 py-2 rounded">
                      ✓ Bạn đã đánh giá sản phẩm này trong đơn hàng này
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
