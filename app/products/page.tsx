"use client";

import { useState } from "react";
import ProductCard from "../components/Products/ProductCard";
import Filter from "../components/Products/Filter";

export interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	category: string;
}

// Simulasi data produk
const products: Product[] = [
	{
		id: 1,
		name: "Red Rose Bouquet",
		price: 999.99,
		image: "/placeholder.svg?height=200&width=300",
		category: "Bouquet",
	},
	{
		id: 2,
		name: "Flower Board",
		price: 499.99,
		image: "/placeholder.svg?height=200&width=300",
		category: "Board",
	},
	{
		id: 3,
		name: "Golden Rose Bouquet",
		price: 99.99,
		image: "/placeholder.svg?height=200&width=300",
		category: "Bouquet",
	},
	{
		id: 4,
		name: "Money Bouquet",
		price: 19.99,
		image: "/placeholder.svg?height=200&width=300",
		category: "Bouquet",
	},
	{
		id: 5,
		name: "Cookies Bouquet",
		price: 49.99,
		image: "/placeholder.svg?height=200&width=300",
		category: "Bouquet",
	},
	{
		id: 6,
		name: "Flower Board",
		price: 79.99,
		image: "/placeholder.svg?height=200&width=300",
		category: "Board",
	},
];

export default function ProductsPage() {
	const [filteredProducts, setFilteredProducts] = useState(products);
	const categories = Array.from(
		new Set(products.map((product) => product.category))
	);

	const handleFilterChange = (category: string) => {
		if (category === "All") {
			setFilteredProducts(products);
		} else {
			setFilteredProducts(
				products.filter((product) => product.category === category)
			);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
			<Filter categories={categories} onFilterChange={handleFilterChange} />
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{filteredProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
