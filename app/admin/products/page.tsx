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

// Tipe data untuk produk
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  priceDisc: number;
  homeView: number;
  stock: number;
  imageUrl?: string;
  sold?: number;
};

type Category = {
  id: number;
  name: string;
};

export default function ProductsManagement() {
  // Data produk contoh (ganti dengan data sebenarnya dari API/database)
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState<number | string>("");
  const [productHomeView, setProductHomeView] = useState<number | string>("");
  const [productPrice, setProductPrice] = useState<number | string>("");
  const [productPriceDisc, setProductPriceDisc] = useState<number | string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const { data: session } = useSession();
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImageUrl, setProductImageUrl] = useState<string>("");
  const [sold, setSold] = useState<string | number>("");

  // Filter produk berdasarkan pencarian
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const saveProduct = async () => {
    if (!productName.trim() || !selectedCategoryId || productPrice === "") {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const token = session?.accessToken;
      if (!token) throw new Error("No token available");

      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", String(productPrice));
      formData.append("stock", String(productStock));
      formData.append("categoryId", String(selectedCategoryId));
      formData.append("homeView", String(productHomeView));
      formData.append('sold', String(sold));
      formData.append("updateBy", session?.user?.name || "Admin"); // Update user
      formData.append("createdBy", session?.user?.name || "Admin"); // Created user
      if (productImage) {
        formData.append("file", productImage); // Attach file
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
      setProductStock("");
      setProductHomeView(0);
      setSelectedCategoryId(null);
      setProductImage(null);
      setProductImageUrl("");
      setShowDialog(false);
      setEditingProduct(null);
      setProductPriceDisc("");
      setSold(0);
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

  const openDialog = (product?: Product) => {
    const matchedCategory = categories.find(
      (cat) => cat.name === product?.category
    );
    setEditingProduct(product || null);
    setProductName(product?.name || "");
    setProductPrice(product?.price || "");
    setProductStock(product?.stock || "");
    setProductHomeView(product?.homeView || 0);
    setSelectedCategoryId(matchedCategory?.id || null);
    setSold(product?.sold || 0);
    setShowDialog(true);
  };

  const confirmDelete = (productId: number) => {
    setSelectedProductId(productId);
    setShowConfirmDialog(true);
  };

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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
          onChange={e => setSearchTerm(e.target.value)}
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
                Harga Asli
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harga Promo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Terjual
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
            {filteredProducts.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{formatRupiah(product.price)}</td>
                <td className="px-6 py-4">{formatRupiah(product.priceDisc)}</td>
                <td className="px-6 py-4">{product.sold}</td>
                <td className="px-6 py-4">
                  {product.imageUrl && (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={150} // ✅ Set a default width
                      height={100} // ✅ Set a default height
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
              {editingProduct ? 'Edit' : 'Tambah'} Produk
            </h2>

            {/* Nama Produk */}
            <input
              type="text"
              placeholder="Nama produk"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={productName}
              onChange={e => setProductName(e.target.value)}
            />

            {/* Harga */}
            <input
              type="number"
              placeholder="Harga produk"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={productPrice}
              onChange={e => {
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
              placeholder="Harga produk"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={productPriceDisc}
              onChange={e => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Hanya angka yang diperbolehkan
                  setProductPriceDisc(value);
                }
              }}
            />

            {/* Sold */}
            <input
              type="number"
              placeholder="Produk Terjual"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={sold}
              onChange={e => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Hanya angka yang diperbolehkan
                  setSold(value);
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
                onChange={e => setProductHomeView(e.target.checked ? 1 : 0)} // Toggle antara 1 dan 0
              />
            </label>

            {/* Kategori */}
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={selectedCategoryId || 0}
              onChange={e => setSelectedCategoryId(Number(e.target.value))}
            >
              <option value="">Pilih Kategori</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Gambar */}
            {productImageUrl && (
              <Image
                src={productImageUrl}
                alt="Preview"
                width={200} // ✅ Set a default width
                height={200} // ✅ Set a default height
                className="rounded-lg shadow-md"
              />
            )}
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  setProductImage(e.target.files[0]); // Store the selected image
                  setProductImageUrl(URL.createObjectURL(e.target.files[0])); // Show preview
                }
              }}
            />

            {/* Tombol Simpan */}
            <button
              onClick={saveProduct}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
