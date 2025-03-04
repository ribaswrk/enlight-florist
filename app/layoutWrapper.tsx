"use client";

import type React from "react";

import { usePathname } from "next/navigation";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isAdminPage = pathname?.startsWith("/admin");

	return (
		<>
			{!isAdminPage && <Header />}
			<main>{children}</main>
			{!isAdminPage && <Footer />}
		</>
	);
}
