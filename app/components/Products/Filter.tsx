"use client";

import { useState } from "react";

interface FilterProps {
	categories: string[];
	onFilterChange: (category: string) => void;
}

export default function Filter({ categories, onFilterChange }: FilterProps) {
	const [activeCategory, setActiveCategory] = useState("All");

	const handleCategoryChange = (category: string) => {
		setActiveCategory(category);
		onFilterChange(category);
	};

	return (
		<div className="mb-8">
			<h2 className="text-2xl font-bold mb-4">Filter by Category</h2>
			<div className="flex flex-wrap gap-2">
				{["All", ...categories].map((category) => (
					<button
						key={category}
						onClick={() => handleCategoryChange(category)}
						className={`px-4 py-2 rounded-full transition-colors duration-300 ${
							activeCategory === category
								? "bg-blue-600 text-white"
								: "bg-gray-200 text-gray-800 hover:bg-gray-300"
						}`}
					>
						{category}
					</button>
				))}
			</div>
		</div>
	);
}
