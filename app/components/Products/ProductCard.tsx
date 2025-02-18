import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/productdetail`} passHref>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer w-full">
        <div className="h-48">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 h-32">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {product.name}
          </h3>
          <p className="text-green-600 font-bold">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
