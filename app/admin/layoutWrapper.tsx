"use client";

import type React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import AdminSidebar from "@/components/Admin/sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin/login");

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/admin/login");
      return;
    }

    // ✅ Auto-logout if session is expired
    const expiresAt = new Date(session.expires).getTime();
    const currentTime = Date.now();

    if (currentTime >= expiresAt) {
      signOut({ callbackUrl: "/admin/login" });
    }
  }, [session, status, router]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {!isAdminPage && <AdminSidebar />}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
    </div>
  );
}
