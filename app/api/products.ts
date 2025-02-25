import type { NextApiRequest, NextApiResponse } from "next";

// This is a mock database. In a real application, you would fetch this data from a real database.
const products = {
	bouquetbunga: [
		{
			id: "e1",
			name: "Smartphone",
			description: "Latest model",
			price: 699.99,
			image: "/placeholder.svg?height=300&width=400",
		},
		{
			id: "e2",
			name: "Laptop",
			description: "Powerful and lightweight",
			price: 1299.99,
			image: "/placeholder.svg?height=300&width=400",
		},
		{
			id: "e3",
			name: "Headphones",
			description: "Noise-cancelling",
			price: 199.99,
			image: "/placeholder.svg?height=300&width=400",
		},
	],
	bouquetuang: [
		{
			id: "c1",
			name: "T-Shirt",
			description: "Cotton comfort",
			price: 19.99,
			image: "/placeholder.svg?height=300&width=400",
		},
		{
			id: "c2",
			name: "Jeans",
			description: "Classic denim",
			price: 49.99,
			image: "/placeholder.svg?height=300&width=400",
		},
		{
			id: "c3",
			name: "Sneakers",
			description: "Sporty and stylish",
			price: 79.99,
			image: "/placeholder.svg?height=300&width=400",
		},
	],
	papanbunga: [
		{
			id: "h1",
			name: "Plant Pot",
			description: "Ceramic design",
			price: 24.99,
			image: "/placeholder.svg?height=300&width=400",
		},
		{
			id: "h2",
			name: "Table Lamp",
			description: "Modern lighting",
			price: 39.99,
			image: "/placeholder.svg?height=300&width=400",
		},
		{
			id: "h3",
			name: "Throw Pillow",
			description: "Soft and decorative",
			price: 14.99,
			image: "/placeholder.svg?height=300&width=400",
		},
	],
	standingflower: [
		{
			id: "s1",
			name: "Yoga Mat",
			description: "Non-slip surface",
			price: 29.99,
			image: "/placeholder.svg?height=300&width=400",
		},
		{
			id: "s2",
			name: "Dumbbells",
			description: "Set of two",
			price: 34.99,
			image: "/placeholder.svg?height=300&width=400",
		},
		{
			id: "s3",
			name: "Running Shoes",
			description: "Lightweight and durable",
			price: 89.99,
			image: "/placeholder.svg?height=300&width=400",
		},
	],
	balon: [
		{
			id: "s1",
			name: "Yoga Mat",
			description: "Non-slip surface",
			price: 29.99,
			image: "/placeholder.svg?height=300&width=400",
		},
		{
			id: "s2",
			name: "Dumbbells",
			description: "Set of two",
			price: 34.99,
			image: "/placeholder.svg?height=300&width=400",
		},
		{
			id: "s3",
			name: "Running Shoes",
			description: "Lightweight and durable",
			price: 89.99,
			image: "/placeholder.svg?height=300&width=400",
		},
	],
	boxbunga: [
		{
			id: "s1",
			name: "Yoga Mat",
			description: "Non-slip surface",
			price: 29.99,
			image: "/placeholder.svg?height=300&width=400",
		},
		{
			id: "s2",
			name: "Dumbbells",
			description: "Set of two",
			price: 34.99,
			image: "/placeholder.svg?height=300&width=400",
		},
		{
			id: "s3",
			name: "Running Shoes",
			description: "Lightweight and durable",
			price: 89.99,
			image: "/placeholder.svg?height=300&width=400",
		},
	],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { category } = req.query;

	if (typeof category !== "string" || !(category in products)) {
		return res.status(400).json({ error: "Invalid category" });
	}

	res.status(200).json(products[category as keyof typeof products]);
}
