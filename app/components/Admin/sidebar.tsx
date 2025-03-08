"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react"; // ✅ Import signOut from next-auth
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" }); // ✅ Clears session & redirects
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
        onClick={toggleMobileSidebar}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40 
          bg-white shadow-lg transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"} 
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/admin" className="flex items-center">
            {!isCollapsed ? (
              <span className="text-xl font-semibold">Enlight Admin</span>
            ) : (
              <span className="text-xl font-semibold">EA</span>
            )}
          </Link>
          <button
            onClick={toggleSidebar}
            className="hidden md:block p-1 rounded-md hover:bg-gray-100"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
        </div>

        {/* Sidebar content */}
        <div className="py-4">
          <nav className="space-y-1 px-2">
            <SidebarItem
              href="/admin"
              icon={<Home size={20} />}
              title="Dashboard"
              isActive={pathname === "/admin"}
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              href="/admin/products"
              icon={<Package size={20} />}
              title="Produk"
              isActive={pathname.startsWith("/admin/products")}
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              href="/admin/categories"
              icon={<ShoppingCart size={20} />}
              title="Kategori"
              isActive={pathname.startsWith("/admin/categories")}
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              href="/admin/events"
              icon={<Users size={20} />}
              title="Events"
              isActive={pathname.startsWith("/admin/events")}
              isCollapsed={isCollapsed}
            />
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 w-full border-t p-4">
          <button
            onClick={handleLogout} // ✅ Call the logout function
            className="
              flex items-center w-full px-4 py-2 text-gray-700 rounded-md 
              hover:bg-red-100 hover:text-red-700 transition-colors
            "
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({
  href,
  icon,
  title,
  isActive,
  isCollapsed,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  isCollapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
        ${
          isActive
            ? "bg-indigo-100 text-indigo-700"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        }
        ${isCollapsed ? "justify-center" : ""}
      `}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!isCollapsed && <span className="ml-3">{title}</span>}
    </Link>
  );
}
