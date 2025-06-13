"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    products: 0,
    categories: 0,
    events: 0,
  });

  const fetchCounts = async () => {
    try {
      const res = await fetch("/api/count");
      if (!res.ok) throw new Error("Failed to fetch counts");

      const data = await res.json();
      setCounts(data);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">
          Selamat datang di panel admin Enlight Florist
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <DashboardCard
          title="Produk"
          count={counts.products}
          link="/admin/products"
          description="Total Produk bunga"
        />
        <DashboardCard
          title="Category"
          count={counts.categories}
          link="/admin/categories"
          description="Total Kategori Produk"
        />
        <DashboardCard
          title="Category"
          count={counts.categories}
          link="/admin/subcategory"
          description="Total Kategori Produk"
        />
        <DashboardCard
          title="Event"
          count={counts.events}
          link="/admin/events"
          description="Total Event"
        />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  count,
  link,
  description,
}: {
  title: string;
  count: number;
  link: string;
  description: string;
}) {
  const router = useRouter();

  return (
    <div
      className="p-6 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => router.push(link)}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-3xl font-bold my-2">{count}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
