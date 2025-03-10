"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

// Tipe data untuk kategori
type Category = {
  categoryId: number;
  name: string;
};

export default function CategoriesManagement() {
  // Data kategori contoh (ganti dengan data sebenarnya dari API/database)
  const [categories, setCategories] = useState<Category[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter kategori berdasarkan pencarian
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk menghapus kategori
  const deleteProduct = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      setCategories(
        categories.filter((category) => category.categoryId !== id)
      );
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("/api/category", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch category");

        const data = await res.json();
        setCategories(data); // ✅ Store actual data, not a promise
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Kategori</h1>
        <Link
          href="/admin/categories/add"
          className="p-1.5 inline-flex items-center justify-center"
        >
          <PlusCircleIcon className="h-10 w-10" />
          <span className="sr-only">Tambah Kategori</span>
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari kategori..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCategories.map((category) => (
              <tr key={category.categoryId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {category.categoryId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                  <Link
                    href={`/admin/categories/edit/${category.categoryId}`}
                    className="p-1.5inline-flex items-center justify-center"
                  >
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                  <button
                    onClick={() => deleteProduct(category.categoryId)}
                    className="p-1.5 inline-flex items-center justify-center"
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
