import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface Subcategory {
	id: number;
	name: string;
	imageUrl?: string;
}

interface Product {
	id: number;
	name: string;
	images: string[];
	price: number;
	soldqty: string;
	priceDisc: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getSubcategories(categoryId: string): Promise<Subcategory[]> {
	const res = await fetch(
		`${baseUrl}/api/protected/subcat?categoryId=${categoryId}`,
		{
			cache: "no-store",
		}
	);
	if (!res.ok) throw new Error("Failed to fetch subcategories");
	return res.json();
}

async function getProductsByCategoryId(categoryId: string): Promise<Product[]> {
	const res = await fetch(
		`${baseUrl}/api/protected/products?categoryId=${categoryId}`,
		{
			cache: "no-store",
		}
	);
	if (!res.ok) throw new Error("Failed to fetch products by category");
	return res.json();
}

export default async function CategoryPage({
	params,
}: {
	params: { categoryId: string };
}) {
	const subcategories = await getSubcategories(params.categoryId);

	if (subcategories.length > 0) {
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
					Pilih Subkategori
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{subcategories.map((sub) => (
						<Link href={`/subcategories/${sub.id}`} key={sub.id}>
							<div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
								<div className="relative aspect-square">
									<Image
										src={sub.imageUrl || "/placeholder.svg"}
										alt={sub.name}
										fill
										className="object-cover"
									/>
								</div>
								<div className="p-4 text-center">
									<h2 className="text-lg font-semibold text-rose-700">
										{sub.name}
									</h2>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		);
	}

	const products = await getProductsByCategoryId(params.categoryId);

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
				Produk Berdasarkan Kategori
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
