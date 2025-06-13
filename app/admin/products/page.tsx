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
import { MultiImageUpload } from "@/components/MultiImage/multi-image-upload";
import { formatRupiah } from "@/lib/formatrupiah";

// Tipe data untuk produk

type Product = {
  id: number;
  name: string;
  category: string;
  categoryId: number;
  subcategory: string;
  subcategoryId: number;
  price: number;
  priceDisc: number;
  homeView: number;
  stock: number;
  images?: string[];
  soldqty?: number;
};

type Category = {
  id: number;
  name: string;
};

type Subcategory = {
  id: number;
  name: string;
};

export default function ProductsManagement() {
  // Data produk contoh (ganti dengan data sebenarnya dari API/database)
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [productHomeView, setProductHomeView] = useState<number | string>("");
  const [productPrice, setProductPrice] = useState<number | string>("");
  const [productPriceDisc, setProductPriceDisc] = useState<number | string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    number | null
  >(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const { data: session } = useSession();
  const [, setProductImage] = useState<File | null>(null);
  const [productImageUrl, setProductImageUrl] = useState<string[]>([]);
  const [soldqty, setSoldQty] = useState<number>(0);

  // Filter produk berdasarkan pencarian
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateProductForm = () => {
    const requiredFields = [
      { field: productName.trim(), name: "Nama Produk" },
      { field: selectedCategoryId, name: "Kategori" },
      { field: selectedSubCategoryId, name: "Sub Kategori" },
      { field: productPrice, name: "Harga" },
    ];
    const missing = requiredFields.find((f) => !f.field);
    return missing?.name || null;
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/protected/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/protected/category", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubcategory = async (catid?: number) => {
    try {
      const res = await fetch(
        `/api/protected/subcat?categoryId=${encodeURIComponent(catid || 0)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch subcategories");

      const data = await res.json();
      setSubcategories(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const saveProduct = async () => {
    const missingField = validateProductForm();
    if (missingField) {
      alert(`Field "${missingField}" wajib diisi.`);
      return;
    }

    setLoading(true);
    try {
      const token = session?.accessToken;
      if (!token) throw new Error("No token available");

      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", String(productPrice));
      formData.append("promoPrice", String(productPriceDisc));
      formData.append("categoryId", String(selectedCategoryId));
      formData.append("subcategoryId", String(selectedSubCategoryId));
      formData.append("homeView", String(productHomeView));
      formData.append("soldqty", String(soldqty));
      formData.append("updateBy", session?.user?.name || "Admin"); // Update user
      formData.append("createdBy", session?.user?.name || "Admin"); // Created user
      if (productImageUrl) {
        formData.append("images", JSON.stringify(productImageUrl)); // Attach file
      }

      const method = editingProduct ? "PUT" : "POST";
      if (editingProduct) {
        formData.append("id", String(editingProduct.id));
      }

      const res = await fetch("/api/protected/products", {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // ✅ Send FormData
      });

      if (!res.ok) throw new Error("Failed to save product");

      // Reset form
      setProductName("");
      setProductPrice("");
      setProductHomeView(0);
      setSelectedCategoryId(null);
      setSelectedSubCategoryId(null);
      setProductImage(null);
      setProductImageUrl([]);
      setShowDialog(false);
      setEditingProduct(null);
      setProductPriceDisc("");
      setSoldQty(0);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("An error occurred while saving the product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    if (!selectedProductId) return;
    try {
      const res = await fetch("/api/protected/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedProductId }),
      });

      if (!res.ok) throw new Error("Failed to delete product");

      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setShowConfirmDialog(false);
      setSelectedProductId(0);
    }
  };

  const openDialog = async (product?: Product) => {
    setEditingProduct(product || null);
    setProductName(product?.name || "");
    setProductPrice(product?.price || "");
    setProductPriceDisc(product?.priceDisc || "");
    setProductHomeView(product?.homeView || 0);
    setProductImageUrl(product?.images || []);
    setSelectedCategoryId(product?.categoryId || null);
    setSoldQty(product?.soldqty || 0);

    // Fetch subcategories terlebih dahulu
    if (product?.categoryId) {
      await fetchSubcategory(product.categoryId);
    }

    // Setelah subkategori di-fetch, baru isi selectedSubCategoryId
    setSelectedSubCategoryId(product?.subcategoryId || null);

    setShowDialog(true);
  };

  const confirmDelete = (productId: number) => {
    setSelectedProductId(productId);
    setShowConfirmDialog(true);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubcategory();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchSubcategory(selectedCategoryId);
      // Jangan reset subkategori kalau sedang edit produk
      if (!editingProduct) {
        setSelectedSubCategoryId(null);
      }
    }
  }, [editingProduct, selectedCategoryId]);

  useEffect(() => {
    console.log("productImageUrl", productImageUrl);
  }, [productImageUrl]);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Produk</h1>
        <button
          onClick={() => openDialog()}
          className="p-1.5 inline-flex items-center"
        >
          <PlusCircleIcon className="h-10 w-10" />
          <span className="sr-only">Tambah Produk</span>
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari produk..."
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
                Nama Produk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sub Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harga Asli
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harga Promo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Terjual
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tampilkan di Home
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gambar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.subcategory}</td>
                <td className="px-6 py-4">{formatRupiah(product.price)}</td>
                <td className="px-6 py-4">
                  {product.priceDisc ? formatRupiah(product.priceDisc) : "-"}
                </td>
                <td className="px-6 py-4">{product.soldqty}</td>
                <td className="px-6 py-4">
                  {product.homeView ? "Ya" : "Tidak"}
                </td>
                <td className="px-6 py-4">
                  {product.images?.[0] &&
                    typeof product.images[0] === "string" && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={150}
                        height={100}
                        className="object-cover rounded"
                      />
                    )}
                </td>
                <td className="px-6 py-4 flex items-center space-x-2">
                  <button onClick={() => openDialog(product)}>
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button onClick={() => confirmDelete(product.id)}>
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Hapus Produk</h2>
            <p>Apakah Anda yakin ingin menghapus Produk ini?</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={deleteProduct}
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
              {editingProduct ? "Edit" : "Tambah"} Produk
            </h2>

            {/* Nama Produk */}
            <input
              type="text"
              placeholder="Nama produk"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            {/* Harga */}
            <input
              type="number"
              placeholder="Harga Produk"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={productPrice}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Hanya angka yang diperbolehkan
                  setProductPrice(value);
                }
              }}
            />

            {/* Harga Promo */}
            <input
              type="number"
              placeholder="Harga Promo Produk"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={productPriceDisc}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Hanya angka yang diperbolehkan
                  setProductPriceDisc(value);
                }
              }}
            />

            {/* soldqty */}
            <input
              type="number"
              placeholder="Produk Terjual"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={soldqty}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Hanya angka yang diperbolehkan
                  setSoldQty(Number(value));
                }
              }}
            />

            {/* home view */}
            <label className="flex items-center space-x-2 mb-4">
              <span>Home View</span>
              <input
                type="checkbox"
                className="w-5 h-5 border-gray-300 rounded"
                checked={productHomeView === 1} // Jika `productHomeView` adalah "1", maka dicentang
                onChange={(e) => setProductHomeView(e.target.checked ? 1 : 0)} // Toggle antara 1 dan 0
              />
            </label>

            {/* Kategori */}
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={selectedCategoryId || 0}
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sub Kategori */}
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={selectedSubCategoryId || 0}
              onChange={(e) => setSelectedSubCategoryId(Number(e.target.value))}
            >
              <option value="">Pilih Sub Kategori</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>

            {/* Gambar */}
            <MultiImageUpload
              value={productImageUrl || []}
              onChange={(images) => setProductImageUrl(images)}
            />

            {/* Tombol Simpan */}
            <button
              onClick={saveProduct}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
