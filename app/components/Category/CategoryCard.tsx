import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
	imageUrl: string;
	categoryName: string;
	slug: string;
}

export default function CategoryCard({ imageUrl, categoryName, slug }: CategoryCardProps) {
	return (
		<Link href={`/categories/${slug}`} className="block">
			<div className="border rounded-lg overflow-hidden shadow-md">
				<div className="relative aspect-[4/3]">
					<Image
						src={imageUrl || "/placeholder.svg?height=300&width=400"}
						alt={categoryName}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover"
					/>
				</div>
				<div className="p-4">
					<h3 className="text-lg font-semibold">{categoryName}</h3>
				</div>
			</div>
		</Link>
	);
}
