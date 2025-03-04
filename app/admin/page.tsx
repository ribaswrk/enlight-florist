"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(true); // Ganti dengan state management yang sebenarnya

	// Contoh pengecekan autentikasi (ganti dengan implementasi yang sebenarnya)
	useEffect(() => {
		// Cek apakah user sudah login
		const checkAuth = () => {
			// Implementasi pengecekan autentikasi yang sebenarnya
			const isLoggedIn = true; // Contoh saja, ganti dengan logika autentikasi yang sebenarnya

			if (!isLoggedIn) {
				router.push("/admin/login");
			}
		};

		checkAuth();
	}, [router]);

	if (!isAuthenticated) {
		return null; // Atau tampilkan loading state
	}

	return (
		<div className="p-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Admin Dashboard</h1>
				<p className="text-gray-600">
					Selamat datang di panel admin Enlight Florist
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<DashboardCard
					title="Produk"
					count="120"
					link="/admin/products"
					description="Kelola produk bunga"
				/>
				<DashboardCard
					title="Pesanan"
					count="25"
					link="/admin/orders"
					description="Lihat pesanan masuk"
				/>
				<DashboardCard
					title="Pelanggan"
					count="350"
					link="/admin/customers"
					description="Data pelanggan"
				/>
			</div>
		</div>
	);
}

function DashboardCard({
	title,
	count,
	link,
	description,
}: {
	title: string;
	count: string;
	link: string;
	description: string;
}) {
	const router = useRouter();

	return (
		<div
			className="p-6 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
			onClick={() => router.push(link)}
		>
			<h2 className="text-xl font-semibold">{title}</h2>
			<p className="text-3xl font-bold my-2">{count}</p>
			<p className="text-gray-600">{description}</p>
		</div>
	);
}
