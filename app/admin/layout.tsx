import type { Metadata } from "next";
import AdminLayout from "./adminLayout";

export const metadata: Metadata = {
  title: "Admin - Enlight Florist",
  description: "Admin panel for Enlight Florist",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
