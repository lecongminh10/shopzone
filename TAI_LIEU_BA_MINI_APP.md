# TÀI LIỆU BA - MINI APP THƯƠNG MẠI ĐIỆN TỬ

## MỤC LỤC
1. [Tổng quan hệ thống](#1-tổng-quan-hệ-thống)
2. [Cấu trúc Navigation](#2-cấu-trúc-navigation)
3. [Module Trang chủ](#3-module-trang-chủ)
4. [Module Sản phẩm](#4-module-sản-phẩm)
5. [Module Giỏ hàng](#5-module-giỏ-hàng)
6. [Module Thanh toán](#6-module-thanh-toán)
7. [Module Đơn hàng](#7-module-đơn-hàng)
8. [Module Tài khoản](#8-module-tài-khoản)
9. [Module Tìm kiếm](#9-module-tìm-kiếm)
10. [Module Khuyến mãi](#10-module-khuyến-mãi)
11. [Luồng hoạt động tổng thể](#11-luồng-hoạt-động-tổng-thể)

---

## 1. TỔNG QUAN HỆ THỐNG

### 1.1. Mô tả
Mini App thương mại điện tử được xây dựng trên nền tảng Zalo Mini App, cho phép người dùng:
- Xem và tìm kiếm sản phẩm
- Quản lý giỏ hàng
- Đặt hàng và thanh toán
- Theo dõi đơn hàng
- Quản lý thông tin cá nhân

### 1.2. Công nghệ sử dụng
- React + TypeScript
- Zalo Mini App SDK
- Jotai (State Management)
- React Router (Navigation)

---

## 2. CẤU TRÚC NAVIGATION

### 2.1. Header (Thanh điều hướng trên)
**Vị trí**: Luôn hiển thị ở đầu trang (trừ trang Profile, Shipping Address, Vouchers)

**Các thành phần**:
- **Logo & Tên shop** (khi có `handle.logo = true`)
  - **Chức năng**: Click vào logo/tên → Navigate về trang chủ (`/`)
  - **Luồng**: Click → `navigate("/")` → Hiển thị HomePage

- **Nút Thông báo** (Icon chuông)
  - **Chức năng**: Mở modal thông báo
  - **Luồng**: 
    1. Click nút thông báo
    2. Set `showNotificationModal = true`
    3. Hiển thị `NotificationModal` component
    4. Click outside hoặc nút đóng → `setShowNotificationModal(false)`

- **Avatar người dùng**
  - **Chức năng**: Navigate đến trang Profile
  - **Luồng**: Click avatar → `navigate("/profile")` → Hiển thị ProfilePage
  - **Hiển thị**: 
    - Nếu đã đăng nhập: Hiển thị avatar từ `userInfo.data.avatar`
    - Nếu chưa đăng nhập: Hiển thị avatar mặc định
    - Loading state: Hiển thị skeleton với animation pulse

- **Nút Back** (khi có `handle.back` hoặc `location.key !== "default"`)
  - **Chức năng**: Quay lại trang trước
  - **Luồng**: 
    - Nếu `handle.back` là string → `navigate(handle.back)`
    - Ngược lại → `navigate(-1)` (quay lại lịch sử)

- **Thanh tìm kiếm** (khi có `handle.search = true`)
  - **Chức năng**: Tìm kiếm sản phẩm
  - **Luồng**:
    1. Click vào input → Hiển thị `SearchDropdown` với danh sách sản phẩm gợi ý
    2. Gõ từ khóa → Filter sản phẩm theo `keyword` (case-insensitive)
    3. Click vào sản phẩm trong dropdown → Navigate đến `/product/:id`
    4. Nhấn Enter → Navigate đến `/search?query={keyword}`
    5. Click outside → Đóng dropdown

### 2.2. Footer (Thanh điều hướng dưới)
**Vị trí**: Luôn hiển thị ở cuối trang (trừ khi `handle.noFooter = true`)

**Các nút điều hướng**:

#### 2.2.1. Nút "Trang chủ"
- **Icon**: HomeIcon
- **Path**: `/`
- **Chức năng**: Navigate về trang chủ
- **Luồng**: Click → `navigate("/")` → Hiển thị HomePage
- **Active state**: Khi `location.pathname === "/"`

#### 2.2.2. Nút "Danh mục"
- **Icon**: CategoryIcon
- **Path**: `#` (không navigate)
- **Chức năng**: Mở modal danh mục
- **Luồng**:
  1. Click nút "Danh mục"
  2. Set `showCategories = true`
  3. Hiển thị `CategoryModal` với danh sách categories
  4. Click vào category → Navigate đến `/category/:id`
  5. Click outside hoặc nút đóng → `setShowCategories(false)`
- **Active state**: Khi `showCategories === true`

#### 2.2.3. Nút "Đơn hàng"
- **Icon**: PackageIcon
- **Path**: `#` (không navigate)
- **Chức năng**: Mở modal đơn hàng
- **Luồng**:
  1. Click nút "Đơn hàng"
  2. Set `showOrder = true`
  3. Hiển thị `OrdersModal` với các tab trạng thái đơn hàng
  4. Click vào đơn hàng → Navigate đến `/order/:id`
  5. Click outside hoặc nút đóng → `setShowOrder(false)`
- **Active state**: Khi `showOrder === true`

#### 2.2.4. Nút "Giỏ hàng"
- **Icon**: CartIcon với Badge hiển thị số lượng
- **Path**: `/cart`
- **Chức năng**: Navigate đến trang giỏ hàng
- **Luồng**: Click → `navigate("/cart")` → Hiển thị CartPage
- **Badge**: Hiển thị số lượng sản phẩm trong giỏ (`cart.length`)
- **Active state**: Khi `location.pathname === "/cart"`

### 2.3. Floating Cart Preview
**Vị trí**: Fixed ở cuối màn hình (trên Footer hoặc bottom nếu không có Footer)

**Hiển thị khi**: 
- `cart.length > 0` VÀ `handle.noFloatingCart !== true`

**Các thành phần**:
- Icon giỏ hàng với badge số lượng
- Tổng tiền giỏ hàng (`cartTotalState`)
- Text "Đặt mua"

**Luồng hoạt động**:
1. Click vào Floating Cart Preview
2. Set tất cả items trong cart là selected (`setSelectedIds(cart.map(getCartItemKey))`)
3. Navigate đến `/cart`
4. Trang Cart hiển thị với tất cả items đã được chọn

---

## 3. MODULE TRANG CHỦ

### 3.1. Route
- **Path**: `/`
- **Component**: `HomePage`
- **Header**: Có logo, có search bar

### 3.2. Cấu trúc trang

#### 3.2.1. Banners (Carousel)
**Component**: `Banners`

**Chức năng**: Hiển thị banner quảng cáo dạng carousel

**Luồng hoạt động**:
1. Component mount → Gọi API `BannerService.getBanners({ position: 'banner_doitac' })`
2. Đợi seller token có sẵn (retry 5 lần, mỗi lần 500ms)
3. Lấy danh sách banners từ API
4. Map `banners` thành array URL images
5. Hiển thị `Carousel` component với slides là các banner images
6. Nếu lỗi → Fallback về mock data

**Tương tác**:
- Swipe left/right để xem banner tiếp theo
- Auto-play carousel (nếu có config)

#### 3.2.2. Flash Sale Section
**Component**: `FlashSale`

**Cấu trúc**:

**A. Quick Action Buttons (4 nút)**
1. **Nút "FLASH SALE"**
   - **Icon**: sale.png
   - **Luồng**: Click → `navigate("/flash-sale")` → Hiển thị trang Flash Sale

2. **Nút "FREESHIP"**
   - **Icon**: freeshipping.png
   - **Luồng**: Click → `navigate("/freeship")` → Hiển thị trang Freeship

3. **Nút "VOUCHER"**
   - **Icon**: voucher.png
   - **Luồng**: Click → `navigate("/promotion/voucher")` → Hiển thị trang Voucher Promotion

4. **Nút "ĐƠN HÀNG"**
   - **Icon**: dh.png
   - **Luồng**: Click → `navigate("/orders")` → Hiển thị trang Đơn hàng

**B. Flash Sale Header**
- Hiển thị label "FLASH SALE" với icon tia chớp
- Hiển thị countdown timer (nếu có flash sale đang active)
  - Format: `HH:MM:SS`
  - Tự động giảm dần mỗi giây
  - Lấy từ `activeFlashSale.time_remaining`

**C. Flash Sale Products Grid**
- Hiển thị tối đa 4 sản phẩm mặc định
- Nút "Xem thêm" (nếu có > 4 sản phẩm)
  - **Luồng**: 
    1. Click "Xem thêm"
    2. Set `expanded = true`
    3. Hiển thị tất cả sản phẩm flash sale
    4. Icon mũi tên xoay 180 độ
    5. Click lại → Thu gọn về 4 sản phẩm

**D. Click vào sản phẩm Flash Sale**
- **Luồng**: Click sản phẩm → `navigate("/product/:id")` → Hiển thị ProductDetailPage

#### 3.2.3. Product Section (Gợi ý hôm nay)
**Component**: `Product`

**Chức năng**: Hiển thị danh sách sản phẩm gợi ý

**Luồng hoạt động**:
1. Load `paginatedProductsState` từ state
2. Hiển thị `ProductGrid` với danh sách sản phẩm
3. Nếu có `hasMore = true` → Hiển thị nút "Xem thêm sản phẩm"
4. Click "Xem thêm sản phẩm" → Gọi `loadMoreProductsAction` → Load thêm sản phẩm

**Click vào sản phẩm**:
- **Luồng**: Click sản phẩm → `navigate("/product/:id")` → Hiển thị ProductDetailPage

---

## 4. MODULE SẢN PHẨM

### 4.1. Trang Danh sách Sản phẩm theo Danh mục

#### 4.1.1. Route
- **Path**: `/category/:id`
- **Component**: `CategoryDetailPage`
- **Header**: Có logo, có search bar

#### 4.1.2. Cấu trúc trang

**A. Category Slider**
- **Component**: `CategorySlider`
- **Chức năng**: Hiển thị danh sách categories dạng slider ngang
- **Luồng**: Click category → `navigate("/category/:id")` → Reload trang với category mới

**B. Product Grid**
- **Component**: `ProductGrid`
- **Chức năng**: Hiển thị danh sách sản phẩm thuộc category
- **Luồng**: Click sản phẩm → `navigate("/product/:id")` → Hiển thị ProductDetailPage

### 4.2. Trang Chi tiết Sản phẩm

#### 4.2.1. Route
- **Path**: `/product/:id`
- **Component**: `ProductDetailPage`
- **Header**: Có logo, có search bar, không có floating cart

#### 4.2.2. Cấu trúc trang

**A. Product Images Section**

**Main Image**:
- Hiển thị ảnh chính của sản phẩm
- View transition name: `product-image-${productId}` (để animation khi navigate)

**Thumbnail Gallery** (nếu có > 1 ảnh):
- Hiển thị danh sách thumbnail ảnh dạng horizontal scroll
- **Luồng**: Click thumbnail → Set `selectedImage = thumbnail` → Cập nhật main image
- Thumbnail được chọn có border màu primary

**B. Product Info Section**

**Tên sản phẩm**: `product.name`

**Giá sản phẩm**:
- Giá hiện tại: `formatPrice(product.price)` (màu primary, font bold)
- Giá gốc (nếu có): `formatPrice(product.originalPrice)` (line-through, màu subtitle)
- % giảm giá: `100 - (price * 100 / originalPrice)%` (màu danger)

**Flash Sale Banner** (nếu sản phẩm đang trong flash sale):
- Hiển thị banner màu cam với:
  - Icon tia chớp
  - Text "FLASH SALE"
  - Countdown timer: `HH:MM:SS` (tự động giảm mỗi giây)
  - Badge "🔥" nếu số lượng < 5

**Share Button** (chỉ hiển thị với flash sale):
- **Component**: `ShareButton`
- **Chức năng**: Chia sẻ sản phẩm flash sale
- **Luồng**: Click → Mở Zalo share dialog

**C. Product Details Sections** (Collapsible)

**1. Đặc điểm nổi bật** (nếu có `productDetail.highlight`):
- **Luồng**:
  1. Mặc định: `showHighlights = true` (mở)
  2. Click header → Toggle `showHighlights`
  3. Icon mũi tên xoay 180 độ khi mở
  4. Hiển thị HTML content từ `productDetail.highlight`

**2. Thông số sản phẩm** (nếu có `productDetail.information`):
- **Luồng**: Tương tự "Đặc điểm nổi bật"
- **Format**: Parse string theo format `key&&value|key&&value`
- Hiển thị dạng grid 2 cột: Key (màu đậm) | Value

**3. Mô tả chi tiết** (nếu có `productDetail.content`):
- **Luồng**: Tương tự các section trên
- **Format**: HTML content
- Xử lý images: Convert relative URLs (`/uploads/...`) thành full URLs (`https://socdo.vn/uploads/...`)

**D. Related Products Section**
- **Component**: `RelatedProducts`
- **Chức năng**: Hiển thị sản phẩm liên quan (trừ sản phẩm hiện tại)
- **Luồng**: Click sản phẩm liên quan → `navigate("/product/:id")` → Scroll to top → Load product detail mới

**E. Action Buttons (Fixed ở cuối)**

**Nút "Thêm vào giỏ"**:
- **Variant**: tertiary
- **Luồng**:
  1. Click → `handleAddToCart("add")`
  2. Set `action = "add"`, `showVariantModal = true`
  3. Nếu có variants → Set `selectedVariant = variants[0]`
  4. Hiển thị Variant Selection Modal
  5. Chọn variant và số lượng → Click "Thêm vào giỏ hàng"
  6. Gọi `addToCart()` với `toast: true`
  7. Hiển thị toast "Đã thêm vào giỏ hàng"
  8. Đóng modal

**Nút "Mua ngay"**:
- **Variant**: primary (màu đỏ)
- **Luồng**:
  1. Click → `handleAddToCart("buy")`
  2. Set `action = "buy"`, `showVariantModal = true`
  3. Tương tự "Thêm vào giỏ"
  4. Sau khi thêm vào giỏ → `navigate("/cart")` với view transition

**F. Variant Selection Modal**

**Trigger**: Khi click "Thêm vào giỏ" hoặc "Mua ngay"

**Cấu trúc Modal**:

**Header**:
- Ảnh sản phẩm thumbnail (16x16)
- Giá sản phẩm (theo variant đã chọn)
- Giá gốc (nếu có)
- Số lượng tồn kho
- Nút đóng (X)

**Body**:

**1. Variant Selection** (nếu có variants):

**Trường hợp 1: Chỉ có 1 loại attribute** (ví dụ: chỉ có Size hoặc chỉ có Color):
- Hiển thị tất cả variants dạng buttons
- Click variant → Set `selectedVariant = variant`
- Variant được chọn có border màu danger và background danger/5

**Trường hợp 2: Có 2 loại attributes** (ví dụ: Color + Size):
- Hiển thị Color selection trước
- Click color → Filter variants theo color → Set `selectedVariant = firstVariantWithColor`
- Hiển thị Size selection (chỉ các size có màu đã chọn)
- Click size → Set `selectedVariant = variantWithColorAndSize`

**Trường hợp 3: Không có variants**:
- Không hiển thị variant selection

**2. Quantity Selector**:
- Nút giảm (-): `setQuantity(Math.max(1, quantity - 1))`
- Input hiển thị số lượng (readonly)
- Nút tăng (+): `setQuantity(Math.min(maxStock, quantity + 1))`
- Max quantity = `selectedVariant?.stock || 99`

**Footer**:
- Nút "Thêm vào giỏ hàng" hoặc "Mua ngay" (theo `action`)
- Click → `handleConfirmAddToCart()`
  - Nếu không có variant → Add product với `variant_id: null`
  - Nếu có variant → Add product với `variant_id: selectedVariant.id`
  - Nếu `action === "buy"` → Navigate đến `/cart`

---

## 5. MODULE GIỎ HÀNG

### 5.1. Route
- **Path**: `/cart`
- **Component**: `CartPage`
- **Header**: Có logo, có search bar, không có floating cart

### 5.2. Cấu trúc trang

#### 5.2.1. Empty State
**Điều kiện**: `cart.length === 0`

**Component**: `EmptyCart`
- Hiển thị icon giỏ hàng trống
- Text "Giỏ hàng của bạn đang trống"
- Nút "Tiếp tục mua sắm" → Navigate về `/`

#### 5.2.2. Cart List
**Component**: `CartList`

**Cấu trúc mỗi Cart Item**:

**A. Checkbox Selection**:
- **Luồng**:
  1. Click checkbox → Toggle selection
  2. Nếu checked → Add `itemKey` vào `selectedIds`
  3. Nếu unchecked → Remove `itemKey` khỏi `selectedIds`
  4. `itemKey = product.id + "-" + variant_id` (nếu có variant)

**B. Product Image**:
- Click image → Navigate đến `/product/:id`

**C. Product Info**:
- Tên sản phẩm
- Variant info (nếu có): Color, Size
- Giá: `formatPrice(product.price)`
- Giá gốc (nếu có): `formatPrice(product.originalPrice)` (line-through)

**D. Quantity Input**:
- **Component**: `QuantityInput`
- **Luồng**:
  1. Click nút giảm (-) → `setQuantity(Math.max(1, quantity - 1))` → Update cart state
  2. Click nút tăng (+) → `setQuantity(Math.min(maxStock, quantity + 1))` → Update cart state
  3. Thay đổi quantity → Update `cartState` với quantity mới

**E. Delete Button**:
- **Luồng**: Click → Remove item khỏi `cartState` → Remove `itemKey` khỏi `selectedIds`

#### 5.2.3. Cart Summary
**Component**: `CartSummary`

**Hiển thị**:
- Tổng tiền hàng: `formatPrice(cartTotalState)` (chỉ tính selected items)
- Phí vận chuyển: Sẽ tính ở trang checkout
- Tổng thanh toán: Tổng tiền hàng + Phí vận chuyển

#### 5.2.4. Pay Section (Fixed ở cuối)
**Component**: `Pay`

**Cấu trúc**:

**A. Selected Items Info**:
- Số lượng sản phẩm đã chọn: `selectedItems.length`
- Tổng tiền: `formatPrice(selectedItemsTotal)`

**B. Nút "Thanh toán"**:
- **Điều kiện enable**: `selectedItems.length > 0`
- **Luồng**:
  1. Click "Thanh toán"
  2. Validate: Nếu `selectedItems.length === 0` → Toast error
  3. Navigate đến `/checkout` với view transition

#### 5.2.5. Recommended Products
**Component**: `Product` (tương tự trang chủ)
- Hiển thị sản phẩm gợi ý ở cuối trang giỏ hàng

---

## 6. MODULE THANH TOÁN

### 6.1. Route
- **Path**: `/checkout`
- **Component**: `CheckoutPage`
- **Header**: Có logo, có search bar, không có floating cart

### 6.2. Authentication Check
**Luồng**:
1. Component mount → Check `isAuthenticated`
2. Nếu `authLoading === true` → Hiển thị loading spinner
3. Nếu `!isAuthenticated` → `navigate("/profile?returnUrl=/checkout")`
4. Sau khi đăng nhập → Redirect về `/checkout`

### 6.3. Cấu trúc trang

#### 6.3.1. Shipping Address Card
**Component**: `ShippingAddressCard`

**Chức năng**: Hiển thị và quản lý địa chỉ nhận hàng

**Luồng**:
1. Load địa chỉ mặc định từ API `AddressService.getAddresses()`
2. Hiển thị:
   - Tên người nhận
   - Số điện thoại
   - Địa chỉ đầy đủ
3. Click card → Navigate đến `/shipping-address`
4. Nếu chưa có địa chỉ → Hiển thị nút "Thêm địa chỉ" → Navigate đến `/shipping-address`

#### 6.3.2. Flash Sale Items Card
**Component**: `FlashSaleItem`

**Chức năng**: Hiển thị các sản phẩm flash sale trong giỏ hàng (nếu có)

**Luồng**: Hiển thị danh sách items có `flash_sale = true`

#### 6.3.3. Voucher Card
**Component**: `VoucherCard`

**Chức năng**: Chọn và áp dụng voucher

**Luồng**:
1. Click card → Mở `ModalVoucher`
2. Load danh sách vouchers từ API `VoucherService.getVouchers()`
3. Filter vouchers theo:
   - `orderAmount >= voucher.min_order`
   - `voucher.is_active === true`
   - `voucher.used_count < voucher.max_use`
4. Click voucher → Set `selectedVoucher` và `voucherDiscount`
5. Tính lại `finalAmount = totalAmount - voucherDiscount + shippingFee`

**Hiển thị**:
- Nếu chưa chọn: "Chọn voucher"
- Nếu đã chọn: Tên voucher và số tiền giảm

#### 6.3.4. Shipping Info Card
**Component**: `ShippingInfoCard`

**Chức năng**: Chọn phương thức vận chuyển và tính phí ship

**Luồng**:
1. Load danh sách đơn vị vận chuyển từ API
2. Chọn đơn vị vận chuyển → Gọi API tính phí ship
3. Cập nhật `shippingFeeState`
4. Hiển thị:
   - Tên đơn vị vận chuyển
   - Phí vận chuyển
   - Thời gian giao hàng dự kiến
   - Hỗ trợ phí ship (nếu có)

#### 6.3.5. Note Input
**Chức năng**: Nhập lời nhắn cho người bán

**Luồng**: 
- Input text → Update `note` state
- Gửi `note` trong checkout request

#### 6.3.6. Payment Method Selection
**Chức năng**: Chọn phương thức thanh toán

**Mặc định**: `paymentMethod = "cod"`

**Luồng**:
1. Hiển thị phương thức hiện tại
2. Click "THAY ĐỔI" → Mở Payment Method Modal

**Payment Method Modal**:

**A. Thanh toán khi nhận hàng (COD)**:
- **Luồng**: Click → Set `paymentMethod = "cod"` → Đóng modal

**B. Chuyển khoản nhanh 24/7**:
- **Luồng**: Click → Set `paymentMethod = "bank_transfer"` → Đóng modal

#### 6.3.7. Order Summary
**Hiển thị**:
- Tổng tiền hàng: `formatPrice(totalAmount)`
- Voucher: `-formatPrice(voucherDiscount)` (màu đỏ)
- Phí vận chuyển: `formatPrice(shippingFee)`
- Hỗ trợ vận chuyển (nếu có): `formatPrice(shippingSupportAmount)` (màu xanh)
- **Tổng thanh toán**: `formatPrice(finalAmount)` (màu xanh, font bold)

**Công thức**:
```
finalAmount = totalAmount - voucherDiscount - shippingSupportAmount + shippingFee
```

#### 6.3.8. Nút "Đặt hàng"
**Luồng chi tiết**:

1. **Validation**:
   - Kiểm tra `selectedItems.length > 0` → Nếu không → Toast error
   - Kiểm tra `finalAmount > 0` → Nếu không → Toast error

2. **Lấy địa chỉ mặc định**:
   - Gọi `AddressService.getAddresses()`
   - Tìm địa chỉ có `is_default = true` hoặc lấy địa chỉ đầu tiên
   - Nếu không có → Toast error "Vui lòng thêm địa chỉ nhận hàng"

3. **Lấy user_id**:
   - Parse từ `localStorage.getItem("user")`
   - Nếu không có → Toast error "Vui lòng đăng nhập"

4. **Tìm province_id và district_id**:
   - Gọi `LocationService.getLocations()` để tìm province_id từ tên tỉnh
   - Gọi `LocationService.getLocations()` để tìm district_id từ tên quận/huyện

5. **Chuẩn bị checkout request**:
   ```typescript
   {
     products: [{ id, phanloai_id, quantity }],
     address_id,
     name, phone, email, address,
     province_id, district_id,
     subtotal, coupon_code, discount, shipping_fee,
     ship_support, ship_support_type, ship_support_products,
     total, payment_method, note, shipping_provider
   }
   ```

6. **Gọi Checkout SDK**:
   - `CheckoutService.checkoutWithSDK(checkoutRequest, { shopId, paymentMethod })`
   - Đây là bắt buộc theo yêu cầu của Zalo

7. **Xử lý response**:
   - **Thành công**:
     - Xóa các sản phẩm đã thanh toán khỏi cart
     - Xóa selectedIds
     - Toast success
     - **Nếu payment_method = "bank_transfer"**:
       - Lấy thông tin tài khoản ngân hàng từ `AuthService.getSellerToken()`
       - Tạo QR code: `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${orderCode}`
       - Hiển thị `BankTransferModal` với thông tin chuyển khoản
     - **Nếu payment_method = "cod"**:
       - Navigate đến `/order/:id` sau 1.5s
   - **Thất bại**:
     - Toast error với message từ API

#### 6.3.9. Bank Transfer Modal
**Component**: `BankTransferModal`

**Hiển thị khi**: `showBankTransferModal === true` và `paymentMethod === "bank_transfer"`

**Nội dung**:
- Mã đơn hàng: `orderCode`
- Số tiền: `formatPrice(amount)`
- Số tài khoản: `accountNumber`
- Tên ngân hàng: `bankFullName`
- Chủ tài khoản: `recipient`
- QR Code: `qrCode` (image)

**Luồng**:
1. Hiển thị modal với thông tin chuyển khoản
2. User chuyển khoản theo thông tin
3. Click "Đã chuyển khoản" → Navigate đến `/order/:id`
4. Click "Đóng" → Đóng modal → Navigate đến `/order/:id`

---

## 7. MODULE ĐƠN HÀNG

### 7.1. Trang Danh sách Đơn hàng

#### 7.1.1. Route
- **Path**: `/orders/:status?`
- **Component**: `OrdersPage`
- **Header**: Có logo, có search bar, không có floating cart

#### 7.1.2. Cấu trúc trang

**A. Status Tabs**:
- **Tất cả** (status = "all")
- **Chờ xử lý** (status = "0")
- **Đã tiếp nhận** (status = "1")
- **Đang giao** (status = "2")
- **Đã nhận** (status = "5")
- **Đã hủy** (status = "3")

**Luồng**:
1. Click tab → Set `status` state
2. Load orders từ `ordersState(status)`
3. Tab active có border-bottom màu đỏ và text màu đỏ

**B. Order List**:
- **Component**: `OrderList`
- **Luồng**:
  1. Load orders từ API theo status
  2. Hiển thị danh sách `OrderItem`
  3. Click order → Navigate đến `/order/:id`

**C. Order Item**:
- **Component**: `OrderItem`
- **Hiển thị**:
  - Mã đơn hàng
  - Trạng thái đơn hàng (badge màu)
  - Danh sách sản phẩm (collapsible)
  - Tổng tiền
  - Ngày đặt hàng
  - Nút "Xem chi tiết" → Navigate đến `/order/:id`

### 7.2. Trang Chi tiết Đơn hàng

#### 7.2.1. Route
- **Path**: `/order/:id`
- **Component**: `OrderDetailPage`
- **Header**: Title "Thông tin đơn hàng", có nút back về `/orders`

#### 7.2.2. Cấu trúc trang

**A. Order Info**:
- **Component**: `OrderInfo`
- **Hiển thị**:
  - Mã đơn hàng
  - Trạng thái đơn hàng
  - Ngày đặt hàng
  - Phương thức thanh toán
  - Địa chỉ nhận hàng

**B. Order Items**:
- **Component**: `CollapsibleOrderItems`
- **Hiển thị**: Danh sách sản phẩm trong đơn hàng
- **Collapsible**: Có thể thu gọn/mở rộng

**C. Order Summary**:
- **Component**: `OrderSummary`
- **Hiển thị**:
  - Tổng tiền hàng
  - Voucher (nếu có)
  - Phí vận chuyển
  - Hỗ trợ vận chuyển (nếu có)
  - **Tổng thanh toán**

**D. Action Buttons** (theo trạng thái):

**Trạng thái "Chờ xử lý" (0)**:
- Nút "Hủy đơn hàng" → Gọi API hủy đơn → Update status → Refresh page

**Trạng thái "Đã nhận" (5)**:
- Nút "Đánh giá sản phẩm" → Mở `ProductReviewForm` modal
  - **Luồng**:
    1. Click "Đánh giá sản phẩm"
    2. Hiển thị modal với form đánh giá
    3. Chọn rating (1-5 sao)
    4. Nhập comment
    5. Upload ảnh (nếu có)
    6. Click "Gửi đánh giá" → Gọi API submit review → Toast success → Đóng modal

**Trạng thái "Đang giao" (2)**:
- Hiển thị tracking code (nếu có)
- Nút "Theo dõi đơn hàng" → Mở tracking page hoặc external link

---

## 8. MODULE TÀI KHOẢN

### 8.1. Route
- **Path**: `/profile`
- **Component**: `ProfilePage`
- **Header**: Không có header (tự render header riêng)

### 8.2. Authentication Flow

#### 8.2.1. Chưa đăng nhập
**Hiển thị**:
- Icon user mặc định
- Text "Chưa đăng nhập"
- Text "Vui lòng đăng nhập để xem thông tin cá nhân"
- Nút "Đăng nhập"

**Luồng**:
1. Click "Đăng nhập" → Mở `LoginModal`
2. Nhập số điện thoại → Gửi OTP
3. Nhập OTP → Xác thực → Đăng nhập thành công
4. Nếu có `returnUrl` → Navigate về `returnUrl`
5. Nếu không → Refresh page → Hiển thị profile đã đăng nhập

#### 8.2.2. Đã đăng nhập
**Hiển thị**: Thông tin user và các menu

### 8.3. Cấu trúc trang (Đã đăng nhập)

#### 8.3.1. Custom Header
- Nút Back → `navigate(-1)`
- Title: "Tài khoản của tôi"

#### 8.3.2. User Profile Section

**A. Avatar & Info**:
- Avatar (60x60, rounded)
- Nút đổi avatar (icon camera, màu đỏ, góc dưới bên phải)
  - **Luồng**:
    1. Click nút đổi avatar
    2. Mở file picker (chỉ accept: jpeg, png, webp, gif)
    3. Validate file size (max 5MB)
    4. Validate file type
    5. Gọi `AuthService.uploadAvatar(token, file)`
    6. Toast loading → Upload → Toast success
    7. Refresh user data → Cập nhật avatar

- Tên user: `user.name`
- Số dư: `formatPrice(user.user_money)` (format VN)

**B. Quick Action Buttons** (5 nút):
1. **"Chờ xác nhận"**:
   - Icon: PendingIcon (màu đỏ)
   - **Luồng**: Click → `navigate("/orders?status=0")`

2. **"Đã xác nhận"**:
   - Icon: PickupIcon (màu đỏ)
   - **Luồng**: Click → `navigate("/orders?status=1")`

3. **"Đang giao hàng"**:
   - Icon: DeliveryIcon (màu đỏ)
   - **Luồng**: Click → `navigate("/orders?status=2")`

4. **"Đã nhận"**:
   - Icon: DeliveredBoxIcon (màu đỏ)
   - **Luồng**: Click → `navigate("/orders?status=5")`

5. **"Đánh giá"**:
   - Icon: ReviewIcon (màu đỏ)
   - Badge số lượng đánh giá chưa làm (nếu có)
   - **Luồng**: Click → `navigate("/reviews")`

#### 8.3.3. Menu Sections

**A. Section "Tài khoản"**:

1. **"Thông tin cá nhân"**:
   - Icon: zi-user
   - **Luồng**: Click → `navigate("/profile/edit")` → Hiển thị ProfileEditorPage

2. **"Đơn hàng đã mua"**:
   - Icon: ReceiptIcon
   - **Luồng**: Click → `navigate("/orders?status=5")`

**B. Section "Cá nhân"**:

1. **"Sổ địa chỉ"**:
   - Icon: zi-location
   - **Luồng**: Click → `navigate("/shipping-address")` → Hiển thị ShippingAddressPage

2. **"Mã giảm giá"**:
   - Icon: TagIcon
   - **Luồng**: Click → `navigate("/vouchers")` → Hiển thị VouchersPage

3. **"Đã huỷ & Trả lại"**:
   - Icon: ArchiveIcon
   - **Luồng**: Click → `navigate("/orders/cancelled")`

**C. Section "Hỗ trợ"**:

1. **"Liên hệ shop"**:
   - Icon: zi-chat
   - **Luồng**: Click → Mở Zalo chat với shop (số điện thoại từ `VITE_SHOP_USERNAME`)

2. **"Báo lỗi cho chúng tôi"**:
   - Icon: BugIcon
   - **Luồng**: Click → `navigate("/report-bug")`

**D. Section rỗng**:

1. **"Đăng xuất"**:
   - Icon: LogoutIcon (màu đỏ)
   - **Luồng**: 
     1. Click → Gọi `logout()`
     2. Clear user data và token
     3. Navigate về `/`
     4. Toast "Đã đăng xuất"

### 8.4. Trang Chỉnh sửa Thông tin

#### 8.4.1. Route
- **Path**: `/profile/edit`
- **Component**: `ProfileEditorPage`
- **Header**: Title "Thông tin tài khoản", có nút back

#### 8.4.2. Cấu trúc trang
- Form chỉnh sửa:
  - Họ tên
  - Email
  - Số điện thoại (readonly)
  - Ngày sinh
  - Giới tính
- Nút "Lưu" → Gọi API update → Toast success → Navigate về `/profile`

---

## 9. MODULE TÌM KIẾM

### 9.1. Route
- **Path**: `/search?query={keyword}`
- **Component**: `SearchPage`
- **Header**: Title "Tìm kiếm", có search bar

### 9.2. Cấu trúc trang

#### 9.2.1. Có từ khóa tìm kiếm
**Component**: `SearchResult`

**Luồng**:
1. Lấy `keyword` từ URL query hoặc `keywordState`
2. Filter sản phẩm: `products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()))`
3. Hiển thị `ProductGrid` với kết quả tìm kiếm
4. Title: "Kết quả ({count})"

**Click sản phẩm**: Navigate đến `/product/:id`

#### 9.2.2. Không có từ khóa
**Component**: `RecommendedProducts`

**Hiển thị**: Section "Gợi ý sản phẩm" với danh sách sản phẩm gợi ý

---

## 10. MODULE KHUYẾN MÃI

### 10.1. Trang Flash Sale

#### 10.1.1. Route
- **Path**: `/flash-sale`
- **Component**: `SalePage`
- **Header**: Title "Flash Sale", có nút back

#### 10.1.2. Cấu trúc trang
- Hiển thị countdown timer global
- Danh sách tất cả sản phẩm flash sale
- Click sản phẩm → Navigate đến `/product/:id`

### 10.2. Trang Freeship

#### 10.2.1. Route
- **Path**: `/freeship`
- **Component**: `FreeshipPage`
- **Header**: Title "Miễn phí ship", có nút back

#### 10.2.2. Cấu trúc trang
- Danh sách sản phẩm được miễn phí ship
- Click sản phẩm → Navigate đến `/product/:id`

### 10.3. Trang Voucher Promotion

#### 10.3.1. Route
- **Path**: `/promotion/voucher`
- **Component**: `VoucherPromotionPage`
- **Header**: Title "Voucher", có nút back

#### 10.3.2. Cấu trúc trang
- Danh sách tất cả vouchers đang active
- Hiển thị:
  - Tên voucher
  - Mô tả
  - Điều kiện sử dụng
  - Giá trị giảm
  - Thời hạn
- Click voucher → Copy code hoặc navigate đến trang áp dụng

### 10.4. Trang Vouchers (Của tôi)

#### 10.4.1. Route
- **Path**: `/vouchers`
- **Component**: `VouchersPage`
- **Header**: Title "Voucher", có logo

#### 10.4.2. Cấu trúc trang
- Danh sách vouchers của user
- Tabs: "Có thể dùng" / "Đã dùng" / "Hết hạn"
- Click voucher → Hiển thị chi tiết hoặc copy code

---

## 11. LUỒNG HOẠT ĐỘNG TỔNG THỂ

### 11.1. Luồng Mua hàng hoàn chỉnh

1. **User vào trang chủ** (`/`)
   - Xem banners
   - Xem flash sale
   - Xem sản phẩm gợi ý

2. **Tìm kiếm sản phẩm**:
   - Gõ từ khóa vào search bar
   - Chọn sản phẩm từ dropdown hoặc nhấn Enter
   - Navigate đến `/search?query={keyword}`
   - Click sản phẩm → Navigate đến `/product/:id`

3. **Xem chi tiết sản phẩm** (`/product/:id`):
   - Xem ảnh, thông tin, mô tả
   - Chọn variant (nếu có)
   - Chọn số lượng
   - Click "Thêm vào giỏ" hoặc "Mua ngay"

4. **Giỏ hàng** (`/cart`):
   - Xem danh sách sản phẩm đã thêm
   - Chọn sản phẩm cần thanh toán
   - Điều chỉnh số lượng
   - Click "Thanh toán"

5. **Thanh toán** (`/checkout`):
   - Chọn địa chỉ nhận hàng
   - Chọn voucher (nếu có)
   - Chọn phương thức vận chuyển
   - Chọn phương thức thanh toán
   - Nhập lời nhắn (nếu có)
   - Xem tổng thanh toán
   - Click "Đặt hàng"

6. **Xác nhận đơn hàng**:
   - Nếu COD → Navigate đến `/order/:id`
   - Nếu chuyển khoản → Hiển thị BankTransferModal → Navigate đến `/order/:id`

7. **Theo dõi đơn hàng** (`/order/:id`):
   - Xem chi tiết đơn hàng
   - Theo dõi trạng thái
   - Đánh giá sản phẩm (khi đã nhận)

### 11.2. Luồng Quản lý Tài khoản

1. **Đăng nhập**:
   - Vào `/profile` → Click "Đăng nhập"
   - Nhập số điện thoại → Nhận OTP
   - Nhập OTP → Đăng nhập thành công

2. **Cập nhật thông tin**:
   - Vào `/profile/edit`
   - Chỉnh sửa thông tin
   - Click "Lưu" → Cập nhật thành công

3. **Quản lý địa chỉ**:
   - Vào `/shipping-address`
   - Xem danh sách địa chỉ
   - Thêm/sửa/xóa địa chỉ
   - Set địa chỉ mặc định

4. **Xem vouchers**:
   - Vào `/vouchers`
   - Xem vouchers có thể dùng
   - Copy code để sử dụng

### 11.3. Luồng Tìm kiếm và Lọc

1. **Tìm kiếm từ Header**:
   - Gõ từ khóa → Xem gợi ý
   - Chọn sản phẩm hoặc nhấn Enter
   - Xem kết quả tìm kiếm

2. **Lọc theo Danh mục**:
   - Click "Danh mục" ở Footer
   - Chọn category
   - Xem sản phẩm theo category

3. **Lọc theo Trạng thái Đơn hàng**:
   - Click "Đơn hàng" ở Footer
   - Chọn tab trạng thái
   - Xem đơn hàng theo trạng thái

---

## KẾT LUẬN

Tài liệu này mô tả chi tiết các tính năng, luồng hoạt động và đường đi của từng nút bấm trong Mini App. Mỗi module đều có các chức năng riêng biệt nhưng được tích hợp chặt chẽ với nhau để tạo trải nghiệm mua sắm hoàn chỉnh cho người dùng.

**Các điểm quan trọng**:
- Tất cả các navigation đều sử dụng React Router với view transition
- State management sử dụng Jotai để quản lý global state
- Authentication được kiểm tra ở các trang quan trọng (checkout, profile)
- API calls được xử lý thông qua các service classes
- Error handling và loading states được xử lý ở mọi nơi
- User experience được tối ưu với toast notifications, loading spinners, và empty states

