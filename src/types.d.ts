export interface UserInfo {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  address: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  detail?: string;
  sizes?: Size[];
  colors?: Color[];
  phanloai_id?: number | null; // ID phân loại sản phẩm (variant ID) - deprecated, dùng variant_id
  variant_id?: number | null; // ID biến thể sản phẩm (variant ID)
  variants?: ProductVariant[]; // Danh sách variants của sản phẩm
  stock?: number; // Số lượng tồn kho của sản phẩm (nếu không có variant)
  warehouse_name?: string; // Tên tỉnh/kho của sản phẩm
  rating?: {
    total_reviews: number;
    average_rating: number;
  };
  sales_count?: number; // Số lượng đã bán
  flash_sale?: boolean; // Sản phẩm có đang trong flash sale không
  promotion_label?: string; // Nhãn khuyến mãi
}

export interface ProductVariantAttribute {
  attribute_id: number;
  attribute_name: string;
  value_id: number;
  value_name: string;
}

export interface ProductVariant {
  id: number; // variant_id
  product_id: number;
  stock: number;
  current_price: number;
  original_price: number;
  color?: string;
  size?: string;
  color_name?: string;
  size_name?: string;
  attributes?: ProductVariantAttribute[];
}

export interface Category {
  id: number;
  name: string;
  image?: string; // đường dẫn tương đối
  image_url?: string; // đường dẫn tuyệt đối (ưu tiên dùng)
  slug?: string; // slug của danh mục, ví dụ "y-te-suc-khoe"
  parent_id?: number;
  children_count?: number;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface HeartItem {
  product: Product;
  quantity: number;
}

export type Cart = CartItem[];
export type Heart = HeartItem[];

export interface Location {
  lat: number;
  lng: number;
}

export interface ShippingAddress {
  alias: string;
  address: string;
  name: string;
  phone: string;
}

export interface Station {
  id: number;
  name: string;
  image: string;
  address: string;
  location: Location;
}

export type Delivery =
  | ({
      type: "shipping";
    } & ShippingAddress)
  | {
      type: "pickup";
      stationId: number;
    };

export type OrderStatus = "pending" | "shipping" | "completed";
export type PaymentStatus = "pending" | "success" | "failed";

export interface Order {
  id: number; // id đơn hàng
  orderCode: string; // order_code
  shopId: number; // shop_id
  userId: number; // user_id
  customerName: string; // customer_name
  email?: string; // email khách
  phone: string; // số điện thoại
  address: string; // địa chỉ khách
  provinceId: number; // province_id
  districtId: number; // district_id
  products: Record<
    string,
    {
      id: string;
      tieu_de: string;
      ma_sanpham: string;
      soluong: number;
      color: string;
      size: string;
      gia_moi: string;
      minh_hoa: string;
      link: string;
      thanhtien: string;
    }
  >;
  items: CartItem[]; // map từ products
  subtotal: number;
  couponCode?: string;
  discount: number;
  shippingFee: number;
  total: number;
  status: number;
  statusText: string; // status_text
  paymentMethod: string; // payment_method
  note: string;
  createdAt: number; // timestamp nguyên bản
  created_at_readable: string; // created_at_readable
  trackingCode: string;
  shippingProvider: string;
  warehouseId: number;
  delivery?: Delivery; // nếu muốn gộp thông tin vận chuyển
}
