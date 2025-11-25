export interface ProductStats {
  rating: number; // ví dụ 4.5
  sold: number; // ví dụ 1200
  review: number;
}

// Hàm tạo rating random từ 3.5 → 5.0 (làm tròn 1 chữ số)
export function randomRating(): number {
  const rating = 3.5 + Math.random() * 1.5;
  return Math.round(rating * 10) / 10;
}

// Hàm tạo số lượng đã bán random từ 0 → 10,000+
export function randomSold(): number {
  return Math.floor(Math.random() * 10);
}

// Hàm tạo stats hoàn chỉnh
export function generateProductStats(): ProductStats {
  return {
    rating: randomRating(),
    sold: randomSold(),
    review: randomSold(),
  };
}
