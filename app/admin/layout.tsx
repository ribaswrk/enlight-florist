import type React from "react";
import type { Metadata } from "next";
import AdminSidebar from "@/components/Admin/sidebar";
import LayoutWrapper from "./layoutWrapper";

export const metadata: Metadata = {
	title: "Admin - Enlight Florist",
	description: "Admin panel for Enlight Florist",
};

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <LayoutWrapper>{children}</LayoutWrapper>;
}
