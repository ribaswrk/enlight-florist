"use client";

import type React from "react";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/Admin/sidebar";
import { SessionProvider } from "next-auth/react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin/login");

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-gray-100">
        {!isAdminPage && <AdminSidebar />}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </SessionProvider>
  );
}
