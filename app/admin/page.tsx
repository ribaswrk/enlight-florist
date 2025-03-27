"use client";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
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
          count="120"
          link="/admin/products"
          description="Total Produk bunga"
        />
        <DashboardCard
          title="Category"
          count="7"
          link="/admin/categories"
          description="Total Kategory Produk"
        />
        <DashboardCard
          title="Event"
          count="3"
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
  count: string;
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
