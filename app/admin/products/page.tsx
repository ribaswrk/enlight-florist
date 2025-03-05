"use client";
import { useState } from "react";
import Link from "next/link";
import { PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

// Tipe data untuk produk
type Product = {
	id: number;
	name: string;
	price: number;
	stock: number;
	category: string;
};

export default function ProductsManagement() {
	// Data produk contoh (ganti dengan data sebenarnya dari API/database)
	const [products, setProducts] = useState<Product[]>([
		{
			id: 1,
			name: "Buket Mawar Merah",
			price: 250000,
			stock: 15,
			category: "Buket",
		},
		{
			id: 2,
			name: "Rangkaian Lily Putih",
			price: 350000,
			stock: 8,
			category: "Rangkaian",
		},
		{
			id: 3,
			name: "Bunga Meja Anggrek",
			price: 200000,
			stock: 12,
			category: "Dekorasi",
		},
		{
			id: 4,
			name: "Buket Wisuda",
			price: 275000,
			stock: 20,
			category: "Buket",
		},
		{
			id: 5,
			name: "Bunga Duka Cita",
			price: 500000,
			stock: 5,
			category: "Rangkaian",
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");

	// Filter produk berdasarkan pencarian
	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.category.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Fungsi untuk menghapus produk
	const deleteProduct = (id: number) => {
		if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
			setProducts(products.filter((product) => product.id !== id));
		}
	};

	// Fungsi untuk memformat harga dengan konsisten
	const formatPrice = (price: number) => {
		// Gunakan format yang konsisten dengan titik sebagai pemisah ribuan
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Manajemen Produk</h1>
				<Link
					href="/admin/products/add"
					className="p-1.5 inline-flex items-center justify-center"
				>
					<PlusCircleIcon className="h-10 w-10" />
					<span className="sr-only">Tambah Produk</span>
				</Link>
			</div>

			<div className="mb-6">
				<input
					type="text"
					placeholder="Cari produk..."
					className="w-full px-4 py-2 border border-gray-300 rounded-md"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-200">
					<thead>
						<tr className="bg-gray-100">
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								ID
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Nama Produk
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Harga
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Stok
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Kategori
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Aksi
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{filteredProducts.map((product) => (
							<tr key={product.id} className="hover:bg-gray-50">
								<td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
								<td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
								<td className="px-6 py-4 whitespace-nowrap">
									Rp {formatPrice(product.price)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{product.category}
								</td>
								<td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
									<Link
										href={`/admin/categories/edit/${product.id}`}
										className="p-1.5 inline-flex items-center justify-center"
									>
										<PencilIcon className="h-4 w-4" />
										<span className="sr-only">Edit</span>
									</Link>
									<button
										onClick={() => deleteProduct(product.id)}
										className="p-1.5 inline-flex items-center justify-center"
									>
										<TrashIcon className="h-4 w-4" />
										<span className="sr-only">Delete</span>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
