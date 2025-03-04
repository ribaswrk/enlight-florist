import type React from "react";
import type { Metadata } from "next";
import "../globals.css";
import AdminSidebar from "@/components/Admin/sidebar";

export const metadata: Metadata = {
	title: "Admin - Enlight Florist",
	description: "Admin panel for Enlight Florist",
};

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<div className="flex h-screen bg-gray-100">
					<AdminSidebar />
					<main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
				</div>
			</body>
		</html>
	);
}
