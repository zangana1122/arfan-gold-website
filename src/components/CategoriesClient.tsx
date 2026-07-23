"use client";

import { useState } from "react";
import Categories from "@/components/Categories";
import ProductsSection from "@/components/ProductsSection";
import type { Product } from "@/db/schema";

export default function CategoriesClient({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  return (
    <>
      <Categories
        activeCategory={selectedCategory}
        onSelect={(c) => {
          setSelectedCategory(c);
          setTimeout(() => {
            const el = document.getElementById("products");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }}
      />
      <ProductsSection
        initialProducts={initialProducts}
        controlledCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </>
  );
}
