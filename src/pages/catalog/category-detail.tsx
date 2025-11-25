import HorizontalDivider from "@/components/horizontal-divider";
import ProductGrid from "@/components/product-grid";
import { useAtomValue } from "jotai";
import CategorySlider from "@/components/category-slider";
import { Suspense, useEffect } from "react";
import { ProductGridSkeleton } from "../search";
import { EmptyCategory } from "@/components/empty";
import { useParams } from "react-router-dom";
import { productsById } from "@/state/products";
import { categoriesState } from "@/state/categories";
import { saveViewedCategory } from "@/utils/user-history";

function ProductList() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <EmptyCategory />;
  }
  const products = useAtomValue(productsById(id));

  if (!products.length) {
    return <EmptyCategory />;
  }
  return <ProductGrid products={products} className="pt-4" />;
}

export default function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const categories = useAtomValue(categoriesState);

  // Lưu danh mục đã xem vào lịch sử
  useEffect(() => {
    if (!id) return;
    
    // Tìm category theo id (có thể là string hoặc number)
    const categoryId = Number(id);
    const category = categories.find(
      (cat) => cat.id === categoryId || String(cat.id) === id
    );
    
    // Nếu không tìm thấy theo id, thử tìm theo name chứa id
    const foundCategory = category || categories.find((cat) => {
      const categoryNames = cat.name?.split(",") || [];
      return categoryNames.includes(id);
    });
    
    if (foundCategory) {
      saveViewedCategory(foundCategory.id, foundCategory.name);
    }
  }, [id, categories]);

  return (
    <div className="h-full flex flex-col bg-section">
      <CategorySlider />
      <HorizontalDivider />
      <div className="flex-1 overflow-y-auto">
        <Suspense fallback={<ProductGridSkeleton className="pt-4" />}>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
}
