import HorizontalDivider from "@/components/horizontal-divider";
import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import { productState } from "@/state";
import { formatPrice } from "@/utils/format";
import ShareButton from "./share-buttont";
import RelatedProducts from "./related-products";
import { useAddToCart } from "@/hooks";
import { Button, Icon } from "zmp-ui";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { cartState } from "@/state";
import { heartState } from "@/state/cart";
import Section from "@/components/section";
import { ProductService, ApiProduct } from "@/api/service/product.service";
import { useState, useEffect, useRef } from "react";
import { Product } from "@/types";
import { CartIcon } from "@/components/vectors";
import Badge from "@/components/badge";
import TransitionLink from "@/components/transition-link";
import { Heart } from "lucide-react";
import { openChat } from "zmp-sdk/apis";
import { getConfig } from "@/utils/template";
import { saveViewedProduct } from "@/utils/user-history";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [productDetail, setProductDetail] = useState<ApiProduct | null>(null);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [action, setAction] = useState<"add" | "buy">("add");
  const [flashSaleTimeLeft, setFlashSaleTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showHighlights, setShowHighlights] = useState(true);
  const [showSpecs, setShowSpecs] = useState(true);
  const [showDescription, setShowDescription] = useState(true);

  // Get basic product from state first
  const basicProduct = useAtomValue(productState(Number(id)));
  const isFetchingRef = useRef(false);
  const lastFetchedIdRef = useRef<number | null>(null);

  const navigate = useNavigate();

  // Convert relative image URLs to full URLs and remove inline font-size styles
  const processContentImages = (htmlContent: string): string => {
    if (!htmlContent) return htmlContent;
    let processed = htmlContent;
    // Replace src="/uploads with src="https://socdo.vn/uploads
    processed = processed.replace(
      /src="(\/uploads\/)/g,
      'src="https://socdo.vn$1'
    );
    // Remove font-size: 16px !important and line-height: 22px !important from inline styles in p tags
    processed = processed.replace(
      /(<p[^>]*style="[^"]*?)font-size:\s*16px\s*!important;?\s*/gi,
      "$1"
    );
    processed = processed.replace(
      /(<p[^>]*style="[^"]*?)line-height:\s*22px\s*!important;?\s*/gi,
      "$1"
    );
    // Clean up double semicolons and trailing semicolons
    processed = processed.replace(/;;+/g, ";");
    processed = processed.replace(/;\s*"/g, '"');
    return processed;
  };

  // Reset lastFetchedId khi id thay đổi để có thể fetch lại
  useEffect(() => {
    if (id) {
      const productId = Number(id);
      if (productId !== lastFetchedIdRef.current) {
        lastFetchedIdRef.current = null;
        isFetchingRef.current = false;
      }
    }
  }, [id]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!id) return;

      const productId = Number(id);

      // Tránh fetch lại nếu đang fetch hoặc đã fetch cùng product_id
      if (isFetchingRef.current || lastFetchedIdRef.current === productId) {
        return;
      }

      // Đánh dấu đang fetch và product_id đang fetch
      isFetchingRef.current = true;
      lastFetchedIdRef.current = productId;
      setLoading(true);

      try {
        // Try to get detailed product from API
        const response = await ProductService.getProductDetail({
          product_id: productId,
          include_variants: 1,
        });

        if (response.success && response.data) {
          // Save full product detail
          setProductDetail(response.data);

          // Initialize flash sale countdown if available
          if (response.data.flash_sale && response.data.time_remaining) {
            const totalSeconds = response.data.time_remaining;
            setFlashSaleTimeLeft({
              hours: Math.floor(totalSeconds / 3600),
              minutes: Math.floor((totalSeconds % 3600) / 60),
              seconds: totalSeconds % 60,
            });
          }

          // Map API product to app product format
          const currentBasicProduct = basicProduct; // Capture tại thời điểm fetch
          const productData: Product = {
            id: response.data.id,
            name: response.data.title,
            price: response.data.current_price,
            originalPrice: response.data.original_price,
            image: response.data.image_url,
            category: currentBasicProduct?.category || {
              id: 1,
              name: "",
              image: "",
            },
            detail: response.data.brand || "",
          };
          setProduct(productData);
          
          // Lưu sản phẩm đã xem vào lịch sử
          saveViewedProduct(productData);

          // Set up images list with main product image as first thumbnail
          const mainImage = response.data.image_url;
          const additionalImages = response.data.images_list || [];

          // Combine main image with additional images, removing duplicates
          const allImages = [mainImage];
          additionalImages.forEach((img) => {
            if (img !== mainImage && !allImages.includes(img)) {
              allImages.push(img);
            }
          });

          setImagesList(allImages);
          setSelectedImage(allImages[0]);
          setCurrentImageIndex(0);
        } else {
          // Fallback to basic product from state
          const currentBasicProduct = basicProduct; // Capture tại thời điểm fetch
          if (currentBasicProduct) {
            setProduct(currentBasicProduct);
            setImagesList([currentBasicProduct.image]);
            setSelectedImage(currentBasicProduct.image);
            setCurrentImageIndex(0);
            // Lưu sản phẩm đã xem vào lịch sử
            saveViewedProduct(currentBasicProduct);
          }
        }
      } catch (error) {
        console.error("Error fetching product detail:", error);
        // Fallback to basic product from state
        const currentBasicProduct = basicProduct; // Capture tại thời điểm fetch
        if (currentBasicProduct) {
          setProduct(currentBasicProduct);
          setImagesList([currentBasicProduct.image]);
          setSelectedImage(currentBasicProduct.image);
          // Lưu sản phẩm đã xem vào lịch sử
          saveViewedProduct(currentBasicProduct);
        }
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchProductDetail();
    // Chỉ phụ thuộc vào id, không phụ thuộc vào basicProduct để tránh re-fetch không cần thiết
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Use placeholder product if data is still loading
  const displayProduct = product ||
    basicProduct || {
      id: 0,
      name: "",
      price: 0,
      image: "",
      category: { id: 1, name: "", image: "" },
    };

  // Use cart state directly to add products with phanloai_id
  const [cart, setCart] = useAtom(cartState);
  const setHeart = useSetAtom(heartState);

  // Favorite state
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window === "undefined") return false;
    const store = JSON.parse(localStorage.getItem("favoriteStore") || "{}");
    return !!store[displayProduct.id];
  });

  // Sync favorite state when product changes
  useEffect(() => {
    if (typeof window !== "undefined" && displayProduct.id) {
      const store = JSON.parse(localStorage.getItem("favoriteStore") || "{}");
      setIsFavorite(!!store[displayProduct.id]);
    }
  }, [displayProduct.id]);

  // Handle favorite toggle
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsFavorite((prev) => {
      const newState = !prev;

      const store = JSON.parse(localStorage.getItem("favoriteStore") || "{}");

      if (newState) {
        store[displayProduct.id] = displayProduct;
        toast.success("Đã thêm vào yêu thích");
      } else {
        delete store[displayProduct.id];
        toast.success("Đã xóa khỏi yêu thích");
      }

      localStorage.setItem("favoriteStore", JSON.stringify(store));

      return newState;
    });

    setHeart((prev) => {
      if (prev.some((item) => item.product.id === displayProduct.id)) {
        return prev.filter((item) => item.product.id !== displayProduct.id);
      } else {
        return [...prev, { product: displayProduct, quantity: 1 }];
      }
    });
  };

  // Use displayProduct for the default hook (for compatibility)
  const { addToCart } = useAddToCart(displayProduct);

  // Handle add to cart button click
  const handleAddToCart = (actionType: "add" | "buy" = "add") => {
    // Always show variant selection modal for consistency
    setAction(actionType);
    setShowVariantModal(true);

    // Set first variant as default if has variants, otherwise set null
    if (
      productDetail &&
      productDetail.variants &&
      productDetail.variants.length > 0
    ) {
      if (!selectedVariant) {
        setSelectedVariant(productDetail.variants[0]);
      }
    } else {
      // No variants, set selectedVariant to null
      setSelectedVariant(null);
    }
  };

  // Handle confirm add to cart from modal
  const handleConfirmAddToCart = () => {
    // If no variants, add product without variant_id
    if (!productDetail?.variants || productDetail.variants.length === 0) {
      if (product) {
        const productWithoutVariant: Product = {
          ...product,
          variant_id: null,
          phanloai_id: null,
        };
        addToCart(quantity, {
          toast: action === "add",
          product: productWithoutVariant,
        });
      }
      setShowVariantModal(false);
      setQuantity(1);
      if (action === "buy") {
        navigate("/cart", {
          viewTransition: true,
        });
      }
      return;
    }

    // Add selected variant to cart with variant_id
    if (product && selectedVariant) {
      // Tạo product với variant_id và variants từ selected variant
      const productWithVariant: Product = {
        ...product,
        price: selectedVariant.current_price || product.price,
        originalPrice: selectedVariant.original_price || product.originalPrice,
        variant_id: selectedVariant.id, // Lưu variant.id vào variant_id
        phanloai_id: selectedVariant.id, // Giữ phanloai_id để backward compatible
        variants:
          productDetail?.variants?.map((v: any) => ({
            id: v.id,
            product_id: v.product_id,
            stock: v.stock,
            current_price: v.current_price,
            original_price: v.original_price,
            color: v.color,
            size: v.size,
            color_name: v.color_name,
            size_name: v.size_name,
            attributes: v.attributes?.map((attr: any) => ({
              attribute_id: attr.attribute_id,
              attribute_name: attr.attribute_name,
              value_id: attr.value_id,
              value_name: attr.value_name,
            })),
          })) || [],
        stock: productDetail?.stock || product.stock,
      };

      addToCart(quantity, {
        toast: action === "add",
        product: productWithVariant,
      });
    }

    setShowVariantModal(false);
    setQuantity(1);

    if (action === "buy") {
      navigate("/cart", {
        viewTransition: true,
      });
    }
  };

  // Get attribute name from variants (color attribute)
  const getColorAttributeName = () => {
    if (!productDetail?.variants || productDetail.variants.length === 0)
      return "Màu sắc";

    // Try to get attribute name from first variant that has attributes
    const firstVariantWithAttrs = productDetail.variants.find(
      (v) => v.attributes && v.attributes.length > 0
    );

    if (firstVariantWithAttrs?.attributes) {
      // Usually color attribute has attribute_id: 1, but we'll find by checking color_name match
      const colorAttr = firstVariantWithAttrs.attributes.find(
        (attr) => attr.value_name === firstVariantWithAttrs.color_name
      );
      if (colorAttr) return colorAttr.attribute_name;
    }

    return "Màu sắc"; // Fallback
  };

  // Get attribute name from variants (size/phanloai attribute)
  const getSizeAttributeName = () => {
    if (!productDetail?.variants || productDetail.variants.length === 0)
      return "Phân loại";

    // Try to get attribute name from first variant that has attributes
    const firstVariantWithAttrs = productDetail.variants.find(
      (v) => v.attributes && v.attributes.length > 0
    );

    if (firstVariantWithAttrs?.attributes) {
      // Usually size attribute has attribute_id: 5, but we'll find by checking size_name match
      const sizeAttr = firstVariantWithAttrs.attributes.find(
        (attr) => attr.value_name === firstVariantWithAttrs.size_name
      );
      if (sizeAttr) return sizeAttr.attribute_name;
    }

    return "Phân loại"; // Fallback
  };

  // Check if product has only one attribute type to display
  // Based on actual attributes from variants
  const hasOnlyOneAttribute = () => {
    if (!productDetail?.variants || productDetail.variants.length === 0)
      return true;

    const firstVariant = productDetail.variants[0];
    if (!firstVariant?.attributes || firstVariant.attributes.length === 0) {
      // Fallback to old logic if no attributes
      const allHaveSizeZero = productDetail.variants.every(
        (v) => v.size === "0" && v.size_name === "+"
      );
      if (allHaveSizeZero) return true;

      const uniqueColors = new Set(
        productDetail.variants.map((v) => v.color_name).filter(Boolean)
      );
      if (uniqueColors.size === 1) return true;

      return false;
    }

    // Count unique attribute types
    const attributeTypes = new Set(
      productDetail.variants.reduce<number[]>((acc, v) => {
        const ids = v.attributes?.map((attr) => attr.attribute_id) || [];
        return [...acc, ...ids];
      }, [])
    );

    // If only one attribute type, show only that
    return attributeTypes.size === 1;
  };

  // Get available colors
  const getAvailableColors = () => {
    if (!productDetail?.variants) return [];
    const colors = [
      ...new Set(
        productDetail.variants.map((v) => v.color_name).filter(Boolean)
      ),
    ];
    return colors;
  };

  // Get available sizes/variants for selected color
  const getAvailableSizes = (color?: string) => {
    if (!productDetail?.variants) return [];
    const sizes = color
      ? productDetail.variants.filter((v) => v.color_name === color)
      : productDetail.variants;
    return sizes;
  };

  // Get attribute values for a specific attribute type
  const getAttributeValues = (attributeId: number) => {
    if (!productDetail?.variants) return [];
    const values = new Set<string>();
    productDetail.variants.forEach((v) => {
      const attr = v.attributes?.find((a) => a.attribute_id === attributeId);
      if (attr) {
        values.add(attr.value_name);
      }
    });
    return Array.from(values);
  };

  // Get variants by attribute value
  const getVariantsByAttributeValue = (
    attributeId: number,
    valueName: string
  ) => {
    if (!productDetail?.variants) return [];
    return productDetail.variants.filter((v) => {
      return v.attributes?.some(
        (a) => a.attribute_id === attributeId && a.value_name === valueName
      );
    });
  };

  // Get all attribute types from variants
  const getAttributeTypes = () => {
    if (!productDetail?.variants || productDetail.variants.length === 0)
      return [];
    const firstVariant = productDetail.variants[0];
    if (!firstVariant?.attributes) return [];

    // Return unique attributes with their IDs and names
    const attributeMap = new Map<number, { id: number; name: string }>();
    productDetail.variants.forEach((v) => {
      v.attributes?.forEach((attr) => {
        if (!attributeMap.has(attr.attribute_id)) {
          attributeMap.set(attr.attribute_id, {
            id: attr.attribute_id,
            name: attr.attribute_name,
          });
        }
      });
    });

    return Array.from(attributeMap.values());
  };

  // Countdown timer for flash sale
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (productDetail?.flash_sale && productDetail.time_remaining) {
      interval = setInterval(() => {
        setFlashSaleTimeLeft((prev) => {
          let { hours, minutes, seconds } = prev;

          if (seconds > 0) {
            seconds--;
          } else if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          }

          if (hours === 0 && minutes === 0 && seconds === 0 && interval) {
            clearInterval(interval);
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [productDetail]);

  // Auto-play slider với infinite loop - chạy liên tục từ 1->5 rồi quay về 1
  useEffect(() => {
    if (imagesList.length <= 1) return;

    const autoPlayInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        // Tự động quay về 0 khi đến cuối (tạo infinite loop)
        const nextIndex =
          prevIndex === imagesList.length - 1 ? 0 : prevIndex + 1;
        setSelectedImage(imagesList[nextIndex]);
        return nextIndex;
      });
    }, 3000); // Chuyển hình mỗi 3 giây

    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [imagesList]);

  // Format time with leading zero
  const formatTime = (num: number) => num.toString().padStart(2, "0");

  // Swipe handlers for image slider
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && imagesList.length > 0) {
      // Swipe left - next image
      const nextIndex = (currentImageIndex + 1) % imagesList.length;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(imagesList[nextIndex]);
    }

    if (isRightSwipe && imagesList.length > 0) {
      // Swipe right - previous image
      const prevIndex =
        currentImageIndex === 0 ? imagesList.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(imagesList[prevIndex]);
    }
  };

  // Update currentImageIndex when selectedImage changes from thumbnail click
  useEffect(() => {
    if (selectedImage && imagesList.length > 0) {
      const index = imagesList.indexOf(selectedImage);
      if (index !== -1) {
        setCurrentImageIndex(index);
      }
    }
  }, [selectedImage, imagesList]);

  // Get image for modal (variant image or product default image)
  const getModalImage = () => {
    if (selectedVariant) {
      // If variant has image_url, use it
      if (selectedVariant.image_url) {
        return selectedVariant.image_url;
      } else if (selectedVariant.image) {
        // If variant has image (relative path), convert to full URL
        return selectedVariant.image.startsWith("http")
          ? selectedVariant.image
          : "https://socdo.vn" + selectedVariant.image;
      }
    }
    // Fallback to product default image
    return displayProduct.image;
  };

  if (!product && loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-subtitle">Đang tải...</div>
      </div>
    );
  }

  if (!displayProduct || !displayProduct.id) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-subtitle">Không tìm thấy sản phẩm</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header với nút back, search và cart */}
      <div
        className="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-sm border-b border-gray-200"
        style={{ paddingTop: "var(--safe-top, 30px)" }}
      >
        <div
          className="flex items-center justify-between"
          style={{ paddingRight: "90px", paddingTop: "5px" }}
        >
          {/* Nút back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white transition-colors"
            aria-label="Quay lại"
          >
            <Icon icon="zi-arrow-left" className="text-black" />
          </button>

          {/* Nút search và cart */}
          <div className="flex items-center">
            {/* Nút search */}
            <button
              onClick={() => navigate("/search")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white transition-colors"
              aria-label="Tìm kiếm"
            >
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Nút cart */}
            <TransitionLink
              to="/cart"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white transition-colors relative"
              aria-label="Giỏ hàng"
            >
              <Badge value={cart.length} style={{ boxShadow: "none" }}>
                <CartIcon mono />
              </Badge>
            </TransitionLink>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-16">
        <div className="w-full p-4 pb-2 space-y-4 bg-section">
          {/* Main product image with swipe và infinite loop */}
          <div
            className="w-full mb-4 relative overflow-hidden rounded-lg"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {imagesList.length > 0 ? (
                imagesList.map((img, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <img
                      src={img}
                      alt={`${displayProduct.name} ${index + 1}`}
                      className="w-full aspect-square object-cover"
                      style={{
                        viewTransitionName:
                          index === 0
                            ? `product-image-${displayProduct.id}`
                            : undefined,
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className="w-full flex-shrink-0">
                  <img
                    key={displayProduct.id}
                    src={displayProduct.image}
                    alt={displayProduct.name}
                    className="w-full aspect-square object-cover"
                    style={{
                      viewTransitionName: `product-image-${displayProduct.id}`,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Image indicators */}
            {imagesList.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {imagesList.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail gallery */}
          {imagesList.length > 1 && (
            <div className="w-full overflow-x-auto pb-2">
              <div className="flex gap-2">
                {imagesList.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(img);
                      setCurrentImageIndex(index);
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === img
                        ? "border-primary"
                        : "border-transparent hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${displayProduct.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <div className="text-sm mt-1">{displayProduct.name}</div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-bold text-primary pr-2">
                  {formatPrice(displayProduct.price)}
                </div>
                {displayProduct.originalPrice && (
                  <div className="text-2xs flex items-center space-x-2">
                    <span className="text-subtitle line-through">
                      {formatPrice(displayProduct.originalPrice)}
                    </span>
                    <span className="text-danger">
                      -
                      {100 -
                        Math.round(
                          (displayProduct.price * 100) /
                            displayProduct.originalPrice
                        )}
                      %
                    </span>
                  </div>
                )}
              </div>
              {/* Icon yêu thích */}
              <button
                onClick={handleFavorite}
                className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                  isFavorite ? "bg-red-500" : "bg-gray-200"
                }`}
                aria-label={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? "text-white fill-white" : "text-gray-600"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Flash Sale Banner - Only show for flash sale products */}
          {productDetail?.flash_sale && (
            <div className="w-full p-3 rounded-lg border-2 border-orange-400 bg-orange-50 shadow-sm">
              <div className="flex items-center justify-between">
                {/* Left: Flash Sale label and timer */}
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-orange-600">⚡</span>
                  <span className="text-orange-600 font-bold text-sm">
                    FLASH SALE :
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {formatTime(flashSaleTimeLeft.hours)}
                    </span>
                    <span className="text-orange-600">:</span>
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {formatTime(flashSaleTimeLeft.minutes)}
                    </span>
                    <span className="text-orange-600">:</span>
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {formatTime(flashSaleTimeLeft.seconds)}
                    </span>
                  </div>
                </div>

                {/* Right: Running out badge (if applicable) */}
                {productDetail.products_count !== undefined &&
                  productDetail.products_count < 5 && (
                    <div className=" text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                      <span>🔥</span>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Only show ShareButton if it's a flash sale */}
          {productDetail?.flash_sale && (
            <ShareButton product={displayProduct} />
          )}
        </div>
        {/* Product Information Sections */}
        {productDetail && (
          <>
            {/* Đánh giá sản phẩm */}
            {(productDetail.comments && productDetail.comments.length > 0) ||
            productDetail.average_rating ? (
              <>
                <div className="bg-background h-2 w-full"></div>
                <div className="px-4 bg-white">
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-gray-900">
                        Đánh giá sản phẩm
                      </span>
                      {productDetail.average_rating && (
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-5 h-5 text-yellow-400 fill-yellow-400"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <span className="text-sm font-semibold text-gray-900">
                            {productDetail.average_rating.toFixed(1)}
                          </span>
                          {productDetail.total_reviews && (
                            <span className="text-xs text-gray-500">
                              ({productDetail.total_reviews})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      className="flex items-center gap-1 text-black text-xs"
                      onClick={() => {
                        navigate(`/product/${id}/reviews`);
                      }}
                    >
                      Tất cả
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Reviews list */}
                  {productDetail.comments &&
                    productDetail.comments.length > 0 && (
                      <div className="space-y-4 pb-4">
                        {productDetail.comments.map(
                          (comment: any, index: number) => (
                            <div
                              key={index}
                              className="border-b border-gray-100 pb-4 last:border-0"
                            >
                              {/* Reviewer info */}
                              <div className="flex items-start gap-3 mb-2">
                                {/* Avatar */}
                                {comment.user_avatar ? (
                                  <img
                                    src={comment.user_avatar}
                                    alt={comment.user_name || "Người dùng"}
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    onError={(e) => {
                                      // Fallback to default icon if image fails to load
                                      const target =
                                        e.target as HTMLImageElement;
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
                                  {/* Name and verified badge */}
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-900">
                                      {comment.user_name || "Người dùng"}
                                    </span>
                                    {comment.is_verified_purchase && (
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
                                  {/* Variant info */}
                                  {(comment.variant_color_name ||
                                    comment.variant_size_name) && (
                                    <div className="text-[10px] text-gray-500 mb-2">
                                      {comment.variant_color_name && (
                                        <span>
                                          {comment.color_attribute_name ||
                                            "Màu"}
                                          : {comment.variant_color_name}
                                        </span>
                                      )}
                                      {comment.variant_color_name &&
                                        comment.variant_size_name && (
                                          <span> - </span>
                                        )}
                                      {comment.variant_size_name && (
                                        <span>
                                          {comment.size_attribute_name ||
                                            "Loại"}
                                          : {comment.variant_size_name}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                  {/* Rating stars and date */}
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-0.5">
                                      {[...Array(5)].map((_, i) => (
                                        <svg
                                          key={i}
                                          className={`w-3 h-3 ${
                                            i < (comment.rating || 5)
                                              ? "text-yellow-400 fill-yellow-400"
                                              : "text-gray-300"
                                          }`}
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                      ))}
                                    </div>
                                    {comment.created_at && (
                                      <span className="text-[10px] text-gray-500">
                                        {new Date(
                                          comment.created_at
                                        ).toLocaleDateString("vi-VN")}
                                      </span>
                                    )}
                                  </div>
                                  {/* Review content */}
                                  <p className="text-xs text-gray-700 mb-2">
                                    {comment.content}
                                  </p>
                                  {/* Review images */}
                                  {comment.images &&
                                    comment.images.length > 0 && (
                                      <div className="flex gap-2 mb-2">
                                        {comment.images.map(
                                          (img: string, imgIndex: number) => (
                                            <img
                                              key={imgIndex}
                                              src={img}
                                              alt={`Review ${index + 1} - ${
                                                imgIndex + 1
                                              }`}
                                              className="w-16 h-16 object-cover rounded"
                                            />
                                          )
                                        )}
                                      </div>
                                    )}
                                  {/* Feedback buttons */}
                                  <div className="flex items-center gap-1.5 mt-2 overflow-x-auto">
                                    {comment.shop_rating && (
                                      <span className="px-1.5 py-0.5 text-[10px] border border-green-500 text-green-600 rounded-full whitespace-nowrap flex-shrink-0">
                                        Shop: {comment.shop_rating} ⭐
                                      </span>
                                    )}
                                    {comment.matches_description && (
                                      <span className="px-1.5 py-0.5 text-[10px] border border-green-500 text-green-600 rounded-full whitespace-nowrap flex-shrink-0">
                                        Đúng mô tả
                                      </span>
                                    )}
                                    {comment.is_satisfied && (
                                      <span className="px-1.5 py-0.5 text-[10px] border border-green-500 text-green-600 rounded-full whitespace-nowrap flex-shrink-0">
                                        Hài lòng
                                      </span>
                                    )}
                                    {comment.will_buy_again === "yes" && (
                                      <span className="px-1.5 py-0.5 text-[10px] border border-green-500 text-green-600 rounded-full whitespace-nowrap flex-shrink-0">
                                        Sẽ quay lại
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                </div>
              </>
            ) : null}

            {/* Đặc điểm nổi bật (Highlights) */}
            {productDetail.highlight && (
              <>
                <div className="bg-white h-2 w-full"></div>
                <div className="px-4 bg-white">
                  <button
                    className="w-full flex items-center justify-between py-3"
                    onClick={() => setShowHighlights((v) => !v)}
                  >
                    <span className="text-[13px] font-bold text-gray-900">
                      Đặc điểm nổi bật
                    </span>
                    <span
                      className={`transition-transform text-gray-500 ${
                        showHighlights ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                </div>
                {showHighlights && (
                  <div className="px-4 pb-4 bg-white">
                    <style>{`
                      .highlight-content,
                      .highlight-content * {
                        font-size: 13px !important;
                      }
                      .highlight-content p {
                        margin-bottom: 0.5rem !important;
                        margin-top: 0 !important;
                      }
                      .highlight-content p:first-child {
                        margin-top: 0 !important;
                      }
                      .highlight-content p:last-child {
                        margin-bottom: 0 !important;
                      }
                    `}</style>
                    <div
                      className="highlight-content text-[13px] leading-relaxed text-gray-700 text-left space-y-2 mx-[20px]"
                      dangerouslySetInnerHTML={{
                        __html: productDetail.highlight,
                      }}
                    />
                  </div>
                )}
              </>
            )}

            {/* Thông số sản phẩm (Specifications) */}
            {productDetail.information && (
              <>
                <div className="bg-white h-2 w-full"></div>
                <div className="px-4 bg-white">
                  <button
                    className="w-full flex items-center justify-between py-3"
                    onClick={() => setShowSpecs((v) => !v)}
                  >
                    <span className="text-[13px] font-bold text-gray-900">
                      Thông số sản phẩm
                    </span>
                    <span
                      className={`transition-transform text-gray-500 ${
                        showSpecs ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                </div>
                {showSpecs && (
                  <div className="px-4 pb-4 bg-white">
                    <style>{`
                      .specs-content,
                      .specs-content * {
                        font-size: 13px !important;
                      }
                    `}</style>
                    <div className="specs-content grid grid-cols-1 gap-3 mx-[20px]">
                      {productDetail.information
                        .split("|")
                        .map((item, index) => {
                          const [key, value] = item.split("&&");
                          if (!key || !value) return null;
                          return (
                            <div
                              key={index}
                              className="flex items-start border-b border-gray-100 pb-1 last:border-0 text-left"
                            >
                              <span className="text-[13px] font-medium text-gray-900 min-w-[100px]">
                                {key}:
                              </span>
                              <span className="text-[13px] text-gray-700 flex-1 ml-1.5 text-left">
                                {value}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Mô tả chi tiết (Full Description) */}
            {productDetail.content && (
              <>
                <div className="bg-white h-2 w-full"></div>
                <div className="px-4 bg-white">
                  <button
                    className="w-full flex items-center justify-between py-3"
                    onClick={() => setShowDescription((v) => !v)}
                  >
                    <span className="text-[13px] font-bold text-gray-900">
                      Mô tả chi tiết
                    </span>
                    <span
                      className={`transition-transform text-gray-500 ${
                        showDescription ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                </div>
                {showDescription && (
                  <div className="px-4 pb-4 bg-white pt-0">
                    <style>{`
                      .content-product,
                      .content-product * {
                        font-size: 13px !important;
                      }
                      .content-product p,
                      .content-product p[style] {
                        line-height: 1.5 !important;
                        margin-top: 0 !important;
                        margin-bottom: 0.5rem !important;
                      }
                      .content-product p:first-child {
                        margin-top: 0 !important;
                      }
                      .content-product p:last-child {
                        margin-bottom: 0 !important;
                      }
                    `}</style>
                    <div
                      className="content-product text-[13px] leading-relaxed text-gray-700 prose max-w-none text-left mx-[20px]
                        [&>p]:leading-relaxed [&>p]:text-left
                        [&>img]:w-full [&>img]:h-auto [&>img]:rounded-lg [&>img]:my-6
                        [&>strong]:font-semibold [&>strong]:text-gray-900"
                      dangerouslySetInnerHTML={{
                        __html: processContentImages(productDetail.content),
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
        <div className="bg-background h-2 w-full"></div>
        <Section title="Sản phẩm khác">
          <RelatedProducts currentProductId={displayProduct.id} />
        </Section>
      </div>

      <HorizontalDivider />
      <div className="flex-none flex items-stretch h-14 bg-white border-t border-gray-200">
        {/* Chat ngay - Zalo */}
        <button
          onClick={async () => {
            try {
              const oaId = getConfig(
                (config) => config.template.oaIDtoOpenChat
              );
              const productName = displayProduct.name;
              const productPrice = formatPrice(
                selectedVariant?.current_price || displayProduct.price
              );
              const productUrl = window.location.href;

              // Tạo message về sản phẩm
              const message = `Xin chào! Tôi quan tâm đến sản phẩm:\n\n${productName}\nGiá: ${productPrice}\n\n${productUrl}`;

              if (oaId) {
                await openChat({
                  type: "oa",
                  id: oaId,
                  message: message,
                });
              }
            } catch (error) {
              console.error("Error opening chat:", error);
              // Fallback: mở link Zalo nếu openChat thất bại
              const zaloOaId =
                import.meta.env.VITE_ZALO_OA_ID ||
                import.meta.env.VITE_SHOP_USERNAME;
              if (zaloOaId) {
                const productName = displayProduct.name;
                const productPrice = formatPrice(
                  selectedVariant?.current_price || displayProduct.price
                );
                const productUrl = window.location.href;
                const message = `Xin chào! Tôi quan tâm đến sản phẩm:\n\n${productName}\nGiá: ${productPrice}\n\n${productUrl}`;
                const encodedMessage = encodeURIComponent(message);
                window.open(
                  `https://zalo.me/${zaloOaId}?message=${encodedMessage}`,
                  "_blank"
                );
              }
            }
          }}
          className="flex-1 flex flex-col items-center justify-center bg-green-400 text-white active:bg-green-500 transition-colors"
          style={{
            textShadow: "none",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          <div className="w-6 h-6 mb-0.5 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white rounded flex items-center justify-center">
              <span
                className="text-[8px] font-bold"
                style={{ textShadow: "none" }}
              >
                Zalo
              </span>
            </div>
          </div>
          <span
            className="text-[10px] font-medium"
            style={{ textShadow: "none" }}
          >
            Chat ngay
          </span>
        </button>

        {/* Divider */}
        <div className="w-px bg-white"></div>

        {/* Thêm giỏ hàng */}
        <button
          onClick={() => handleAddToCart("add")}
          className="flex-1 flex flex-col items-center justify-center bg-green-400 text-white active:bg-green-500 transition-colors"
          style={{
            textShadow: "none",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          <svg
            className="w-6 h-6 mb-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span
            className="text-[10px] font-medium"
            style={{ textShadow: "none" }}
          >
            Thêm giỏ hàng
          </span>
        </button>

        {/* Divider */}
        <div className="w-px bg-white"></div>

        {/* Mua ngay */}
        <button
          onClick={() => handleAddToCart("buy")}
          className="flex-1 flex flex-col items-center justify-center bg-green-600 text-white active:bg-green-700 transition-colors"
          style={{
            textShadow: "none",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          <span
            className="text-[11px] font-semibold mb-0.5"
            style={{ textShadow: "none" }}
          >
            Mua ngay
          </span>
          <span
            className="text-[10px] font-medium"
            style={{ textShadow: "none" }}
          >
            {formatPrice(
              selectedVariant?.current_price || displayProduct.price
            )}
          </span>
        </button>
      </div>

      {/* Variant Selection Modal */}
      {showVariantModal && productDetail && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl overflow-hidden animate-slide-up">
            {/* Modal Header */}
            <div className="relative p-4 border-b">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img
                    src={getModalImage()}
                    alt={displayProduct.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-gray-900 mb-1 line-clamp-2">
                      {displayProduct.name}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-[13px] font-bold text-primary">
                        {formatPrice(
                          selectedVariant?.current_price || displayProduct.price
                        )}
                      </div>
                      {selectedVariant?.original_price && (
                        <div className="text-[13px] text-subtitle line-through">
                          {formatPrice(selectedVariant.original_price)}
                        </div>
                      )}
                    </div>
                    {selectedVariant?.stock !== undefined && (
                      <div className="text-[13px] text-subtitle">
                        Kho hàng: {selectedVariant.stock}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowVariantModal(false)}
                  className="w-8 h-8 flex items-center justify-center text-subtitle hover:text-primary -mt-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Variant Selection */}
              {productDetail.variants && productDetail.variants.length > 0
                ? (() => {
                    const attributeTypes = getAttributeTypes();
                    const hasOnlyOneAttr = hasOnlyOneAttribute();

                    // If only one attribute type, show all variants
                    if (hasOnlyOneAttr && attributeTypes.length > 0) {
                      const attrType = attributeTypes[0];
                      const values = getAttributeValues(attrType.id);

                      return (
                        <div>
                          <label className="text-[13px] font-medium block mb-2">
                            {attrType.name}:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {values.map((valueName, idx) => {
                              const variants = getVariantsByAttributeValue(
                                attrType.id,
                                valueName
                              );
                              const variant = variants[0];
                              if (!variant) return null;

                              return (
                                <button
                                  key={variant.id || idx}
                                  className={`px-3 py-1 rounded border-2 text-[13px] ${
                                    selectedVariant?.id === variant.id
                                      ? "border-danger bg-danger/5"
                                      : "border-gray-300"
                                  }`}
                                  onClick={() => setSelectedVariant(variant)}
                                >
                                  {valueName}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    // If multiple attribute types, show them separately
                    if (attributeTypes.length > 1) {
                      // Find color attribute (usually attribute_id: 1)
                      const colorAttr = attributeTypes.find(
                        (attr) =>
                          attr.id === 1 ||
                          productDetail.variants?.[0]?.attributes?.some(
                            (a) =>
                              a.attribute_id === attr.id &&
                              a.value_name ===
                                productDetail.variants[0].color_name
                          )
                      );

                      // Find size/other attribute
                      const sizeAttr = attributeTypes.find(
                        (attr) => attr.id !== colorAttr?.id
                      );

                      const [selectedColorAttr, selectedSizeAttr] =
                        selectedVariant?.attributes
                          ? [
                              selectedVariant.attributes.find(
                                (a) => a.attribute_id === colorAttr?.id
                              ),
                              selectedVariant.attributes.find(
                                (a) => a.attribute_id === sizeAttr?.id
                              ),
                            ]
                          : [null, null];

                      return (
                        <>
                          {colorAttr && (
                            <div>
                              <label className="text-[13px] font-medium block mb-2">
                                {colorAttr.name}:
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {getAttributeValues(colorAttr.id).map(
                                  (valueName, idx) => (
                                    <button
                                      key={idx}
                                      className={`px-3 py-1 rounded border-2 text-[13px] ${
                                        selectedColorAttr?.value_name ===
                                        valueName
                                          ? "border-danger bg-danger/5"
                                          : "border-gray-300"
                                      }`}
                                      onClick={() => {
                                        // Find variant with this color
                                        const newVariant =
                                          productDetail.variants?.find((v) => {
                                            const colorAttrValue =
                                              v.attributes?.find(
                                                (a) =>
                                                  a.attribute_id ===
                                                    colorAttr.id &&
                                                  a.value_name === valueName
                                              );
                                            return colorAttrValue !== undefined;
                                          });
                                        if (newVariant)
                                          setSelectedVariant(newVariant);
                                      }}
                                    >
                                      {valueName}
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                          {sizeAttr && (
                            <div>
                              <label className="text-[13px] font-medium block mb-2">
                                {sizeAttr.name}:
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {(() => {
                                  // Filter variants by selected color
                                  const filteredVariants =
                                    selectedColorAttr && colorAttr
                                      ? productDetail.variants.filter((v) => {
                                          const colorAttrValue =
                                            v.attributes?.find(
                                              (a) =>
                                                a.attribute_id ===
                                                  colorAttr.id &&
                                                a.value_name ===
                                                  selectedColorAttr.value_name
                                            );
                                          return colorAttrValue !== undefined;
                                        })
                                      : productDetail.variants;

                                  // Get unique size values from filtered variants
                                  const sizeValues = new Set<string>();
                                  filteredVariants.forEach((v) => {
                                    const sizeAttrValue = v.attributes?.find(
                                      (a) => a.attribute_id === sizeAttr.id
                                    );
                                    if (sizeAttrValue) {
                                      sizeValues.add(sizeAttrValue.value_name);
                                    }
                                  });

                                  return Array.from(sizeValues).map(
                                    (valueName, idx) => {
                                      // Find variant with this size and selected color
                                      const variant = filteredVariants.find(
                                        (v) => {
                                          const sizeAttrValue =
                                            v.attributes?.find(
                                              (a) =>
                                                a.attribute_id ===
                                                  sizeAttr.id &&
                                                a.value_name === valueName
                                            );
                                          return sizeAttrValue !== undefined;
                                        }
                                      );

                                      if (!variant) return null;

                                      return (
                                        <button
                                          key={variant.id || idx}
                                          className={`px-3 py-1 rounded border-2 text-[13px] ${
                                            selectedVariant?.id === variant.id
                                              ? "border-danger bg-danger/5"
                                              : "border-gray-300"
                                          }`}
                                          onClick={() =>
                                            setSelectedVariant(variant)
                                          }
                                        >
                                          {valueName}
                                        </button>
                                      );
                                    }
                                  );
                                })()}
                              </div>
                            </div>
                          )}
                        </>
                      );
                    }

                    // Fallback to old logic if no attributes
                    return hasOnlyOneAttribute() ? (
                      <div>
                        <label className="text-[13px] font-medium block mb-2">
                          {(() => {
                            const firstVariant = productDetail.variants[0];
                            if (
                              firstVariant?.size === "0" &&
                              firstVariant?.size_name === "+"
                            ) {
                              return getColorAttributeName() + ":";
                            }
                            return getSizeAttributeName() + ":";
                          })()}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {productDetail.variants.map((variant, idx) => {
                            if (
                              variant.size === "0" &&
                              variant.size_name === "+"
                            ) {
                              return (
                                <button
                                  key={variant.id || idx}
                                  className={`px-3 py-1 rounded border-2 text-[13px] ${
                                    selectedVariant?.id === variant.id
                                      ? "border-danger bg-danger/5"
                                      : "border-gray-300"
                                  }`}
                                  onClick={() => setSelectedVariant(variant)}
                                >
                                  {variant.color_name || variant.size}
                                </button>
                              );
                            }
                            return (
                              <button
                                key={variant.id || idx}
                                className={`px-3 py-1 rounded border-2 text-[13px] ${
                                  selectedVariant?.id === variant.id
                                    ? "border-danger bg-danger/5"
                                    : "border-gray-300"
                                }`}
                                onClick={() => setSelectedVariant(variant)}
                              >
                                {variant.size_name || variant.size}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <>
                        {getAvailableColors().length > 0 && (
                          <div>
                            <label className="text-[13px] font-medium block mb-2">
                              {getColorAttributeName() + ":"}
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {getAvailableColors().map((color, idx) => (
                                <button
                                  key={idx}
                                  className={`px-3 py-1 rounded border-2 text-[13px] ${
                                    selectedVariant?.color_name === color
                                      ? "border-danger bg-danger/5"
                                      : "border-gray-300"
                                  }`}
                                  onClick={() => {
                                    const newVariant =
                                      productDetail.variants?.find(
                                        (v) => v.color_name === color
                                      );
                                    if (newVariant)
                                      setSelectedVariant(newVariant);
                                  }}
                                >
                                  {color}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        <div>
                          <label className="text-[13px] font-medium block mb-2">
                            {getSizeAttributeName() + ":"}
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {getAvailableSizes(selectedVariant?.color_name).map(
                              (variant, idx) => (
                                <button
                                  key={variant.id || idx}
                                  className={`px-3 py-1 rounded border-2 text-[13px] ${
                                    selectedVariant?.id === variant.id
                                      ? "border-danger bg-danger/5"
                                      : "border-gray-300"
                                  }`}
                                  onClick={() => setSelectedVariant(variant)}
                                >
                                  {variant.size_name || variant.size}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })()
                : // No variants - just show quantity selector (empty)
                  null}

              {/* Quantity */}
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-medium">Số lượng</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded border-2 flex items-center justify-center text-[13px]"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-[13px]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      const maxQty = selectedVariant?.stock || 99;
                      setQuantity(Math.min(maxQty, quantity + 1));
                    }}
                    className="w-8 h-8 rounded border-2 flex items-center justify-center text-[13px]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t space-y-2">
              <Button
                fullWidth
                onClick={handleConfirmAddToCart}
                className="bg-danger text-white text-[13px]"
              >
                {action === "buy" ? "Mua ngay" : "Thêm vào giỏ hàng"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
