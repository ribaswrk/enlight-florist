"use client";

import { useEffect, useState } from "react";
import CategoryCard from "../components/Category/CategoryCard";

export interface Category {
	id: number;
	categoryName: string;
	slug: string;
}

export interface CategoryRes {
	categoryId: number;
	name: string;
}

export default function CategoriesPage() {
	const [categories, setCategories] = useState<Category[]>([]);
	const fetchCategory = async () => {
		try {
			const res = await fetch("/api/category", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (!res.ok) throw new Error("Failed to fetch category");

			const data = await res.json();
			const transformedCategories = data.map((category: CategoryRes) => ({
				id: category.categoryId,
				categoryName: category.name,
				slug: category.categoryId,
			}));
			console.log(transformedCategories);

			setCategories(transformedCategories); // ✅ Store actual data, not a promise
			console.log(categories);
		} catch (error) {
			console.error("Error fetching category:", error);
		}
	};

	useEffect(() => {
		fetchCategory();
	}, []);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{categories.map((cat) => (
					<CategoryCard
						key={cat.id}
						imageUrl={""}
						categoryName={cat.categoryName}
						slug={cat.slug}
					/>
				))}
			</div>
		</div>
	);
}
