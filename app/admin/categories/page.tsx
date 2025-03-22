"use client";
import { useEffect, useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

// Tipe data untuk kategori
type Category = {
  categoryId: number;
  name: string;
};

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const { data: session } = useSession();

  // Filter kategori berdasarkan pencarian
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const saveCategory = async () => {
    if (!categoryName.trim()) return;
    setLoading(true);
    try {
      const token = session?.accessToken;
      if (!token) throw new Error("No token available");
      const method = editingCategory ? "PUT" : "POST";
      const body = editingCategory
        ? JSON.stringify({ id: editingCategory.categoryId, name: categoryName })
        : JSON.stringify({ name: categoryName });
      const res = await fetch("/api/category", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      if (!res.ok) throw new Error("Failed to save category");
      setCategoryName("");
      setShowDialog(false);
      setEditingCategory(null);
      fetchCategory();
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus kategori
  const deleteCategory = async () => {
    if (!selectedCategoryId) return;
    try {
      const res = await fetch("/api/category", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedCategoryId }),
      });

      if (!res.ok) throw new Error("Failed to delete category");

      const data = await res.json();
      console.log("Category deleted:", data);

      // Refresh the category list after deletion
      fetchCategory();
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setShowConfirmDialog(false);
      setSelectedCategoryId(0);
    }
  };

  const openDialog = (category?: Category) => {
    setEditingCategory(category || null);
    setCategoryName(category?.name || "");
    setShowDialog(true);
  };

  const confirmDelete = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setShowConfirmDialog(true);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Kategori</h1>
        <button
          onClick={() => openDialog()}
          className="p-1.5 inline-flex items-center"
        >
          <PlusCircleIcon className="h-10 w-10" />
          <span className="sr-only">Tambah Kategori</span>
        </button>
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
      {/* Tabel daftar kategori */}
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
                  <button onClick={() => openDialog(category)}>
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => confirmDelete(category.categoryId)}
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
      {/* Delete Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Hapus Kategori</h2>
            <p>Apakah Anda yakin ingin menghapus kategori ini?</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={deleteCategory}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              {editingCategory ? "Edit" : "Tambah"} Kategori
            </h2>
            <input
              type="text"
              placeholder="Nama kategori"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={saveCategory}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
