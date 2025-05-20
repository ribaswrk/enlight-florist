"use client";

import AutoSlider from "@/components/MultiImage/autoslider";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  category: string;
  categoryId: number;
  name: string;
  price: string;
  priceDisc: string;
  soldqty: string;
  homeView: number;
  images: string[];
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const formatRupiah = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const getRandomProducts = (
    products: Product[],
    excludeId: number,
    limit = 3
  ): Product[] => {
    const filtered = products.filter((p) => p.id !== excludeId);
    if (filtered.length <= limit) return filtered;

    return filtered.sort(() => Math.random() - 0.5).slice(0, limit);
  };

  const fetchProductDetail = async () => {
    try {
      const res = await fetch(`/api/protected/products?productId=${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");

      const [productData] = await res.json();
      setProduct(productData);

      if (productData?.categoryId) {
        fetchRelatedProducts(productData.categoryId, productData.id);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchRelatedProducts = async (
    categoryId: number,
    excludeProductId: number
  ) => {
    try {
      const res = await fetch(
        `/api/protected/products?categoryId=${categoryId}`
      );
      if (!res.ok) throw new Error("Failed to fetch related products");

      const data: Product[] = await res.json();
      const limited = getRandomProducts(data, excludeProductId);
      setRelatedProducts(limited);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  useEffect(() => {
    if (id) fetchProductDetail();
  }, [id]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  const displayPrice = (price: string, priceDisc: string) =>
    formatRupiah(priceDisc !== "0" ? Number(priceDisc) : Number(price));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <AutoSlider images={product.images} interval={4000} />

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-2xl text-pink-600 font-semibold mb-4">
            {displayPrice(product.price, product.priceDisc)}
          </p>
          <Link href={`/order/${product.id}`}>
            <button className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-600 transition duration-300">
              Order Now
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Produk lain yang mungkin kamu suka
        </h2>

        {relatedProducts.length === 0 ? (
          <p>Tidak ada produk lain di kategori ini.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="border rounded-lg p-4 hover:shadow-lg transition duration-300"
              >
                <Image
                  src={relatedProduct.images[0] || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  width={300}
                  height={300}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {relatedProduct.name}
                </h3>
                <p className="text-pink-600 font-semibold">
                  {displayPrice(relatedProduct.price, relatedProduct.priceDisc)}
                </p>
                <Link
                  href={`/products/${relatedProduct.id}`}
                  className="mt-2 inline-block text-pink-500 hover:text-pink-600"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
