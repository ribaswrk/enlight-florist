import Image from "next/image";

export interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	category: string;
}

export default function ProductCard({ product }: { product: Product }) {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
			<Image
				src={product.image || "/placeholder.svg"}
				alt={product.name}
				width={300}
				height={200}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<h3 className="text-lg font-semibold text-gray-800 mb-2">
					{product.name}
				</h3>
				<p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
			</div>
		</div>
	);
}
