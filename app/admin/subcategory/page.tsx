"use client";
import { useEffect, useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";

// Tipe data untuk kategori
type Subcategory = {
  id: number;
  name: string;
  catid: number;
  catname: string;
  homeView: number;
  imageSubCatUrl: string;
};

type Category = {
  id: number;
  name: string;
};

export default function SubCategoriesManagement() {
  const [subcategory, setSubcategory] = useState<Subcategory[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [editingSubcategory, setEditingSubcategory] =
    useState<Subcategory | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [subcatHomeView, setSubcatHomeView] = useState<number>(0);
  const [subcategoryImage, setSubcategoryImage] = useState<File | null>(null);

  const { data: session } = useSession();

  // Filter kategori berdasarkan pencarian
  const filteredSubcategories = subcategory.filter((subcat) =>
    subcat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchSubcategory = async () => {
    try {
      const res = await fetch("/api/protected/subcat", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch sub category");

      const data = await res.json();
      setSubcategory(data); // ✅ Store actual data, not a promise
    } catch (error) {
      console.error("Error fetching sub category:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const res = await fetch("/api/protected/category", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch category");

      const data = await res.json();
      setCategoryList(data); // ✅ Store actual data, not a promise
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const saveCategory = async () => {
    if (!subcategoryName.trim()) {
      alert("Nama Sub Kategori wajib diisi!");
      return;
    }

    if (!selectedCategoryId) {
      alert("Silakan pilih kategori!");
      return;
    }

    setLoading(true);
    try {
      const token = session?.accessToken;
      if (!token) throw new Error("No token available");

      const method = editingSubcategory ? "PUT" : "POST";
      const formData = new FormData();

      formData.append("name", subcategoryName);
      formData.append("homeView", String(subcatHomeView));
      formData.append("subcategoryId", String(selectedSubcategoryId));
      formData.append("categoryId", String(selectedCategoryId));
      formData.append("updateBy", session?.user?.name || "Admin");
      formData.append("createdBy", session?.user?.name || "Admin");

      if (subcategoryImage) {
        formData.append("file", subcategoryImage);
      }

      if (editingSubcategory) {
        formData.append("id", String(editingSubcategory.id));
      }

      const res = await fetch("/api/protected/subcat", {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to save sub category");

      // Reset form state
      setSubcategoryName("");
      setSelectedCategoryId(0);
      setSelectedSubcategoryId(0);
      setSubcategoryImage(null);
      setShowDialog(false);
      setSubcatHomeView(0);
      fetchSubcategory();
    } catch (error) {
      console.error("Error saving sub category:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus kategori
  const deleteSubcategory = async () => {
    if (!selectedSubcategoryId) return;
    try {
      const res = await fetch("/api/protected/subcat", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedSubcategoryId }),
      });

      if (!res.ok) throw new Error("Failed to delete sub category");

      // Refresh the category list after deletion
      fetchCategory();
    } catch (error) {
      console.error("Error deleting sub category:", error);
    } finally {
      setShowConfirmDialog(false);
      setSelectedSubcategoryId(0);
    }
  };

  const openDialog = (subcategory?: Subcategory) => {
    setEditingSubcategory(subcategory || null);
    setSubcategoryName(subcategory?.name || "");
    setSubcatHomeView(subcategory?.homeView || 0);
    setSelectedCategoryId(subcategory?.catid || 0);
    setSelectedSubcategoryId(subcategory?.id || 0);
    setShowDialog(true);
  };

  const confirmDelete = (categoryId: number) => {
    setSelectedSubcategoryId(categoryId);
    setShowConfirmDialog(true);
  };

  useEffect(() => {
    fetchCategory();
    fetchSubcategory();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Sub Kategori</h1>
        <button
          onClick={() => openDialog()}
          className="p-1.5 inline-flex items-center"
        >
          <PlusCircleIcon className="h-10 w-10" />
          <span className="sr-only">Tambah Sub Kategori</span>
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari Subkategori..."
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
                Gambar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Sub Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tampilkan di Home
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSubcategories.map((subcat) => (
              <tr key={subcat.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{subcat.id}</td>
                <td className="px-6 py-4">
                  {subcat.imageSubCatUrl && (
                    <Image
                      src={subcat.imageSubCatUrl}
                      alt={subcat.name}
                      width={150} // ✅ Set a default width
                      height={100} // ✅ Set a default height
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{subcat.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {subcat.catname}
                </td>
                <td className="px-6 py-4">
                  {subcat.homeView ? "Ya" : "Tidak"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                  <button onClick={() => openDialog(subcat)}>
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => confirmDelete(subcat.id)}
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
            <h2 className="text-lg font-bold mb-4">Hapus Sub Kategori</h2>
            <p>Apakah Anda yakin ingin menghapus Sub Kategori ini?</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={deleteSubcategory}
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
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
            {/* Tombol silang untuk menutup dialog */}
            <button
              onClick={() => setShowDialog(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <h2 className="text-lg font-bold mb-4">
              {editingSubcategory ? "Edit" : "Tambah"} Sub Kategori
            </h2>
            <input
              type="text"
              placeholder="Nama Sub kategori"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
            />
            {/* Kategori */}
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={selectedCategoryId || 0}
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
            >
              <option value="">Pilih Kategori</option>
              {categoryList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {/* home view */}
            <label className="flex items-center space-x-2 mb-4">
              <span>Home View</span>
              <input
                type="checkbox"
                className="w-5 h-5 border-gray-300 rounded"
                checked={subcatHomeView === 1} // Jika `productHomeView` adalah "1", maka dicentang
                onChange={(e) => setSubcatHomeView(e.target.checked ? 1 : 0)} // Toggle antara 1 dan 0
              />
            </label>
            <input
              type="file"
              className="w-full mb-4"
              onChange={(e) => setSubcategoryImage(e.target.files?.[0] || null)}
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
