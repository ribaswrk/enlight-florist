"use client";

import { useEffect, useState, useCallback } from "react";
import CategoryCard from "../components/Category/CategoryCard";

export interface Category {
  id: number;
  categoryName: string;
  slug: string;
  imageUrl: string;
}

export interface CategoryRes {
  id: number;
  name: string;
  imageCatUrl: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchCategory = useCallback(async () => {
    try {
      const res = await fetch("/api/protected/category", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch category");

      const data = await res.json();
      const transformedCategories = data.map((category: CategoryRes) => ({
        id: category.id,
        categoryName: category.name,
        imageUrl: category.imageCatUrl,
        slug: category.id,
      }));

      setCategories(transformedCategories);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.id}>
            <CategoryCard
              imageUrl={cat.imageUrl}
              categoryName={cat.categoryName}
              slug={cat.slug}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
