import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
	imageUrl: string;
	categoryName: string;
	slug: string;
	hasSubcategories: boolean;
}

export default function CategoryCard({
	imageUrl,
	categoryName,
	slug,
	hasSubcategories,
}: CategoryCardProps) {
	const href = !hasSubcategories
		? `/subcategories/${slug}`
		: `/categories/${slug}`;
	return (
		<div
			key={slug}
			className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
		>
			<div className="relative aspect-square">
				<Image
					src={imageUrl || "/placeholder.svg?height=300&width=300"}
					alt={categoryName}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
					className="object-cover transition-transform duration-300 hover:scale-105"
				/>
			</div>
			<div className="p-4 space-y-3 text-center">
				<h2 className="text-lg font-poppins font-semibold text-rose-700">
					{categoryName}
				</h2>
				<Link
					href={href}
					className="inline-block px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-full font-poppins transition-colors"
				>
					{hasSubcategories ? "Lihat Tipe" : "Lihat Produk"}
				</Link>
			</div>
		</div>
	);
}
