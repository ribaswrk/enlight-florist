"use client"; // ✅ Now it's a Client Component

import LayoutWrapper from "./layoutWrapper";
import { SessionProvider } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <LayoutWrapper>{children}</LayoutWrapper>
    </SessionProvider>
  );
}
