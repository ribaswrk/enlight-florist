"use client";
import Link from "next/link";
import type React from "react";

import { usePathname } from "next/navigation";

export default function AdminNavbar() {
	const pathname = usePathname();

	return (
		<nav className="bg-gray-800 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<Link href="/admin" className="font-bold text-xl">
								Enlight Admin
							</Link>
						</div>
						<div className="hidden md:block">
							<div className="ml-10 flex items-baseline space-x-4">
								<NavLink href="/admin" active={pathname === "/admin"}>
									Dashboard
								</NavLink>
								<NavLink
									href="/admin/products"
									active={pathname.startsWith("/admin/products")}
								>
									Produk
								</NavLink>
								<NavLink
									href="/admin/orders"
									active={pathname.startsWith("/admin/orders")}
								>
									Pesanan
								</NavLink>
								<NavLink
									href="/admin/customers"
									active={pathname.startsWith("/admin/customers")}
								>
									Pelanggan
								</NavLink>
							</div>
						</div>
					</div>
					<div>
						<button
							className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
							onClick={() => {
								// Implementasi logout
								window.location.href = "/admin/login";
							}}
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}

function NavLink({
	href,
	active,
	children,
}: {
	href: string;
	active: boolean;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className={`px-3 py-2 rounded-md text-sm font-medium ${
				active
					? "bg-gray-900 text-white"
					: "text-gray-300 hover:bg-gray-700 hover:text-white"
			}`}
		>
			{children}
		</Link>
	);
}
