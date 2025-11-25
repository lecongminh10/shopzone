import { atom } from "jotai";
import { unwrap } from "jotai/utils";
import { Category } from "@/types";
import { CategoryService } from "@/api/service/category.service";

export const categoriesState = atom(async () => {
  try {
    const categories = await CategoryService.getCategories();
    return categories;
  } catch (error) {
    return [];
  }
});

export const categoriesStateUnwrapped = unwrap(
  categoriesState,
  (prev) => prev ?? []
);

// Cache cho categories để tránh gọi lại nhiều lần
let cachedCategories: Category[] | null = null;

export async function getCategories(): Promise<Category[]> {
  // Return cached categories if available
  if (cachedCategories) {
    return cachedCategories;
  }

  try {
    return cachedCategories || [];
  } catch (error: any) {
    console.error("❌ [CATEGORIES] Error fetching categories:", error);
    console.error("❌ [CATEGORIES] Error details:", {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });
    // Return empty array instead of throwing - this prevents crash
    // Products can still work without categories (will use default category)
    return [];
  }
}
