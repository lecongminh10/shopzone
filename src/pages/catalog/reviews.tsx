import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductService } from "@/api/service/product.service";
import { ChevronLeft, Camera, Smile, Check } from "lucide-react";

interface Comment {
  id: number;
  user_name: string;
  user_avatar?: string;
  rating: number;
  content: string;
  created_at: string;
  is_verified_purchase: number;
  variant_color_name?: string;
  variant_size_name?: string;
  color_attribute_name?: string;
  size_attribute_name?: string;
  shop_rating?: number;
  matches_description?: number;
  is_satisfied?: number;
  will_buy_again?: number;
  images?: string[];
}

export default function ReviewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [filterHasPhoto, setFilterHasPhoto] = useState(false);
  const [filterSatisfied, setFilterSatisfied] = useState(false);
  const [filterMatchesDescription, setFilterMatchesDescription] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Rating counts
  const [ratingCounts, setRatingCounts] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const response = await ProductService.getReviews({
          product_id: Number(id),
          rating: selectedRating,
          has_photo: filterHasPhoto,
          is_satisfied: filterSatisfied,
          matches_description: filterMatchesDescription,
          sort_by: sortBy,
          page: 1,
          limit: 100, // Get all reviews for now
        });

        if (response.success && response.data) {
          setComments(response.data.comments);
          setTotalReviews(response.data.total);
          setRatingCounts(response.data.rating_counts);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id, selectedRating, filterHasPhoto, filterSatisfied, filterMatchesDescription, sortBy]);

  // Comments are already filtered by API, so use them directly
  const filteredComments = comments;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const getTotalFiltered = () => {
    if (selectedRating === null && !filterHasPhoto && !filterSatisfied && !filterMatchesDescription) {
      return totalReviews;
    }
    return filteredComments.length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3" style={{ paddingTop: '30px' }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-8 h-8"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Đánh giá {getTotalFiltered()}
            </h1>
          </div>
        </div>
      </div>

      {/* Rating Filters */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedRating(null)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium ${
              selectedRating === null
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Tất cả {totalReviews}
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium ${
                selectedRating === rating
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {rating} ⭐ {ratingCounts[rating as keyof typeof ratingCounts]}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Filters */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setFilterHasPhoto(!filterHasPhoto)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
              filterHasPhoto
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <Camera className="w-4 h-4" />
            Có ảnh
          </button>
          <button
            onClick={() => setFilterSatisfied(!filterSatisfied)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
              filterSatisfied
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <Smile className="w-4 h-4" />
            Hài lòng
          </button>
          <button
            onClick={() => setFilterMatchesDescription(!filterMatchesDescription)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
              filterMatchesDescription
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <Check className="w-4 h-4" />
            Đúng mô tả
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="pb-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Đang tải...</div>
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Không có đánh giá nào</div>
          </div>
        ) : (
          <div className="space-y-4 px-4 pt-4">
            {filteredComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-lg p-4 border border-gray-100"
              >
                {/* User Info */}
                <div className="flex items-start gap-3 mb-2">
                  {/* Avatar */}
                  {comment.user_avatar ? (
                    <img
                      src={comment.user_avatar}
                      alt={comment.user_name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                              </svg>
                            </div>
                          `;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {comment.user_name || "Người dùng"}
                      </span>
                      {comment.is_verified_purchase === 1 && (
                        <span className="bg-white border border-blue-500 text-blue-500 text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <circle
                              cx="8"
                              cy="8"
                              r="7"
                              fill="#3b82f6"
                              stroke="#3b82f6"
                            />
                            <path
                              d="M5 8L7 10L11 6"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                          Đã mua
                        </span>
                      )}
                    </div>
                    {/* Variant Info */}
                    {(comment.variant_color_name || comment.variant_size_name) && (
                      <div className="text-[10px] text-gray-500 mb-1">
                        Phân loại:{" "}
                        {comment.variant_color_name &&
                          `${comment.color_attribute_name || "Màu"}: ${comment.variant_color_name}`}
                        {comment.variant_color_name && comment.variant_size_name && " - "}
                        {comment.variant_size_name &&
                          `${comment.size_attribute_name || "Loại"}: ${comment.variant_size_name}`}
                      </div>
                    )}
                    {/* Rating and Date */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${
                              i < comment.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                {comment.content && (
                  <div className="text-sm text-gray-700 mb-3 leading-relaxed">
                    {comment.content}
                  </div>
                )}

                {/* Review Images */}
                {comment.images && comment.images.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {comment.images.map((img: string, imgIndex: number) => (
                      <img
                        key={imgIndex}
                        src={img}
                        alt={`Review ${comment.id} - ${imgIndex + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5 mt-2 overflow-x-auto">
                  {comment.shop_rating && (
                    <span className="px-1.5 py-0.5 text-[10px] border border-green-500 text-green-600 rounded-full whitespace-nowrap flex-shrink-0">
                      Shop: {comment.shop_rating} ⭐
                    </span>
                  )}
                  {comment.matches_description === 1 && (
                    <span className="px-1.5 py-0.5 text-[10px] border border-green-500 text-green-600 rounded-full whitespace-nowrap flex-shrink-0">
                      Đúng mô tả
                    </span>
                  )}
                  {comment.is_satisfied === 1 && (
                    <span className="px-1.5 py-0.5 text-[10px] border border-green-500 text-green-600 rounded-full whitespace-nowrap flex-shrink-0">
                      Hài lòng
                    </span>
                  )}
                  {comment.will_buy_again === 1 && (
                    <span className="px-1.5 py-0.5 text-[10px] border border-green-500 text-green-600 rounded-full whitespace-nowrap flex-shrink-0">
                      Sẽ quay lại
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

