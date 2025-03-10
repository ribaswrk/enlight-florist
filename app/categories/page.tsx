"use client";

import CategoryCard from "../components/Category/CategoryCard";

export interface Category {
  id: number;
  imageUrl: string;
  categoryName: string;
  slug: string;
}

// Simulasi data produk
const categories = [
  {
    id: 1,
    imageUrl: "/placeholder.svg?height=300&width=400",
    categoryName: "Bouquet Bunga",
    slug: "bouquetbunga",
  },
  {
    id: 2,
    imageUrl: "",
    categoryName: "Bouquet Uang",
    slug: "bouquetuang",
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg?height=300&width=400",
    categoryName: "Papan Bunga",
    slug: "papanbunga",
  },
  {
    id: 4,
    imageUrl: "/placeholder.svg?height=300&width=400",
    categoryName: "Standing Flower",
    slug: "standingflower",
  },
  {
    id: 5,
    imageUrl: "/placeholder.svg?height=300&width=400",
    categoryName: "Balon",
    slug: "balon",
  },
  {
    id: 6,
    imageUrl: "/placeholder.svg?height=300&width=400",
    categoryName: "Box Bunga",
    slug: "boxbunga",
  },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            imageUrl={cat.imageUrl}
            categoryName={cat.categoryName}
            slug={cat.slug}
          />
        ))}
      </div>
    </div>
  );
}
