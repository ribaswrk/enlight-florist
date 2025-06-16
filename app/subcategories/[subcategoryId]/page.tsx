import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface Product {
	id: number;
	name: string;
	images: string[];
	price: number;
	soldqty: string;
	priceDisc: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getProductsBySubcategoryId(id: string): Promise<Product[]> {
	const res = await fetch(
		`${baseUrl}/api/protected/products?subcategoryId=${id}`,
		{
			cache: "no-store",
		}
	);
	if (!res.ok) throw new Error("Failed to fetch products by subcategory");
	return res.json();
}

export default async function SubcategoryPage({
	params,
}: {
	params: { subcategoryId: string };
}) {
	const products = await getProductsBySubcategoryId(params.subcategoryId);

	return (
		<div className="container mx-auto px-4 py-8">
			<Link
				href="/categories"
				className="flex items-center mb-4 text-black-500 hover:underline"
			>
				<ArrowUturnLeftIcon className="h-8 w-8 mr-2" />
				Kembali
			</Link>
			<h1 className="text-3xl font-bold mb-8 text-center capitalize">
				Produk Berdasarkan Subkategori
			</h1>

			{products.length > 0 ? (
				<ProductGrid products={products} />
			) : (
				<div className="text-center text-gray-500">Produk belum tersedia.</div>
			)}
		</div>
	);
}

function ProductGrid({ products }: { products: Product[] }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{products.map((product) => (
				<Link href={`/productdetail/${product.id}`} key={product.id}>
					<div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
						<div className="relative aspect-square">
							<Image
								src={product.images[0] || "/placeholder.svg"}
								alt={product.name}
								fill
								className="object-cover"
							/>
						</div>
						<div className="p-4 space-y-2">
							<h2 className="text-lg font-semibold">{product.name}</h2>
							<div className="flex items-center gap-2">
								{product.priceDisc !== "0" && product.priceDisc !== "" ? (
									<>
										<span className="text-red-400 line-through text-sm">
											{formatRupiah(Number(product.price))}
										</span>
										<span className="text-red-500 font-bold">
											{formatRupiah(Number(product.priceDisc))}
										</span>
									</>
								) : (
									<span className="text-red-600 font-semibold">
										{formatRupiah(Number(product.price))}
									</span>
								)}
							</div>
							<p className="text-sm text-gray-500">{product.soldqty} terjual</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}

function formatRupiah(price: number) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(price);
}
