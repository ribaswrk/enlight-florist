"use client";

import type React from "react";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

// Define types
interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
}

const CategoryPage: React.FC = () => {
	const router = useRouter();
	const { slug } = router.query;
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (slug) {
			fetchProducts();
		}
	}, [slug]);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			// Replace this with your actual API endpoint
			const response = await fetch(`/api/products?category=${slug}`);
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div className="text-center py-10">Loading...</div>;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8 text-center capitalize">
				{slug} Products
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<div
						key={product.id}
						className="border rounded-lg overflow-hidden shadow-md"
					>
						<div className="aspect-w-16 aspect-h-9 relative">
							<Image
								src={product.image || "/placeholder.svg"}
								alt={product.name}
								layout="fill"
								objectFit="cover"
							/>
						</div>
						<div className="p-4">
							<h2 className="text-lg font-semibold mb-2">{product.name}</h2>
							<p className="text-sm text-gray-600 mb-2">
								{product.description}
							</p>
							<p className="text-lg font-bold">${product.price.toFixed(2)}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoryPage;
