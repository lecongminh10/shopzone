import { categoriesState } from "@/state";
import { motion, AnimatePresence } from "framer-motion";
import { useAtomValue } from "jotai";
import { ArrowLeft, MoreVertical, X } from "lucide-react";
import { useState, useMemo } from "react";
import TransitionLink from "./transition-link";
import { Category } from "@/types";
import iconShop from "@/img/icon_shop.png";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CategoryModal({ open, onClose }: CategoryModalProps) {
  const categories = useAtomValue(categoriesState);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [expanded, setExpanded] = useState(false);
  // Get main categories (parent categories or top-level categories)
  const mainCategories = useMemo(() => {
    // Filter categories that don't have a parent or are top-level
    return categories.filter((cat) => !(cat as Category).parent_id);
  }, [categories]);

  // Get sub-categories of selected category
  const subCategories = useMemo(() => {
    if (!selectedCategoryId) {
      // If no category selected, show first main category's sub-categories
      const firstMainCategory = mainCategories[0];
      if (firstMainCategory) {
        return categories.filter(
          (cat) => (cat as Category).parent_id === firstMainCategory.id
        );
      }
      return [];
    }
    return categories.filter(
      (cat) => (cat as Category).parent_id === selectedCategoryId
    );
  }, [categories, selectedCategoryId, mainCategories]);

  // Set first category as selected by default
  const currentSelectedId = selectedCategoryId ?? mainCategories[0]?.id ?? null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0  backdrop-blur-sm  z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-[2000] shadow-lg flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ maxHeight: "96vh" }}
          >
            {/* Header */}

            <div className="relative flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="Quay lại"
              >
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-lg font-bold text-center absolute left-1/2 -translate-x-1/2">
                Danh mục sản phẩm
              </h2>
            </div>

            {/* Content: 2 columns layout */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Column: Main Categories */}
              <div className="w-24 bg-gray-50 border-r overflow-y-auto flex-shrink-0">
                {mainCategories.map((category) => {
                  const isSelected = currentSelectedId === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategoryId(category.id)}
                      className={`w-full p-3 flex flex-col items-center gap-2 border-l-4 transition-all ${
                        isSelected
                          ? "bg-green-50 border-green-500"
                          : "bg-transparent border-transparent"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden ${
                          isSelected ? "bg-green-100" : "bg-white"
                        }`}
                      >
                        <img
                          src={category.image_url || category.image || ""}
                          className="w-full h-full object-cover"
                          alt={category.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                      <span
                        className={`text-xs text-center leading-tight ${
                          isSelected
                            ? "text-green-600 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {category.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Sub-categories Grid */}
              <div className="flex-1 overflow-y-auto bg-white">
                {/* Filter bar */}
                {currentSelectedId && (
                  <div className="p-3 border-b flex items-center gap-2 w-[300px]">
                    <span
                      className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded max-w-[160px] truncate inline-block align-middle"
                      title={
                        mainCategories.find((c) => c.id === currentSelectedId)
                          ?.name || "Danh mục"
                      }
                    >
                      {mainCategories.find((c) => c.id === currentSelectedId)
                        ?.name || "Danh mục"}
                    </span>
                  </div>
                )}

                {/* Sub-categories Grid */}
                <div className="p-4 grid grid-cols-3 gap-4">
                  {subCategories.length > 0 ? (
                    subCategories.map((subCategory) => (
                      <TransitionLink
                        key={subCategory.id}
                        to={`/category/${subCategory.id}`}
                        onClick={onClose}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img
                            src={
                              subCategory.image_url || subCategory.image || ""
                            }
                            className="object-cover w-12 h-12"
                            alt={subCategory.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                        <span
                          className="text-center text-gray-900 line-clamp-2"
                          style={{ fontSize: "13px" }}
                        >
                          {subCategory.name}
                        </span>
                      </TransitionLink>
                    ))
                  ) : (
                    <div className="col-span-3 flex flex-col items-center justify-center py-8 px-4">
                      <img
                        src={iconShop}
                        alt="Không có danh mục"
                        className="w-24 h-24 object-contain opacity-80 mb-4"
                      />
                      <p className="text-sm text-gray-500 text-center">
                        Chưa có danh mục nào
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
