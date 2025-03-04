import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./layoutWrapper";

export const metadata: Metadata = {
	title: "Enlight Florist",
	description: "Your best choice for your beloved",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<LayoutWrapper>{children}</LayoutWrapper>
			</body>
		</html>
	);
}
