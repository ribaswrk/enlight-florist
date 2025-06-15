"use client";

import AutoSlider from "@/components/MultiImage/autoslider";
import { formatRupiah } from "@/lib/formatrupiah";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  category: string;
  categoryId: number;
  name: string;
  price: string;
  priceDisc: string;
  soldqty: string;
  homeView: number;
  addFlag: number;
  addVal: string; //dalam bentuk serialize JSON
  images: string[];
  description: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<{
    name: string;
    price: string;
    discPrice: string;
  } | null>(null);

  const getRandomProducts = (
    products: Product[],
    excludeId: number,
    limit = 3
  ): Product[] => {
    const filtered = products.filter((p) => p.id !== excludeId);
    if (filtered.length <= limit) return filtered;

    return filtered.sort(() => Math.random() - 0.5).slice(0, limit);
  };
  const fetchRelatedProducts = useCallback(
    async (categoryId: number, excludeProductId: number) => {
      try {
        const res = await fetch(
          `/api/protected/products?categoryId=${categoryId}`
        );
        if (!res.ok) throw new Error("Failed to fetch related products");

        const data: Product[] = await res.json();
        const limited = getRandomProducts(data, excludeProductId);
        setRelatedProducts(limited);
      } catch (error) {
        console.error(
          "❌ Error fetching related products:",
          (error as Error).message || error
        );
      }
    },
    [setRelatedProducts]
  );

  const fetchProductDetail = useCallback(async () => {
    try {
      const res = await fetch(`/api/protected/products?productId=${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");

      const [productData]: Product[] = await res.json(); // ✅ Use correct typing if possible
      setProduct(productData);

      if (productData?.categoryId) {
        fetchRelatedProducts(productData.categoryId, productData.id);
      }
    } catch (error) {
      console.error(
        "❌ Error fetching product:",
        (error as Error).message || error
      );
    }
  }, [id, fetchRelatedProducts]);

  useEffect(() => {
    if (id) fetchProductDetail();
  }, [fetchProductDetail, id]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  const displayPrice = () => {
    const price = selectedOption
      ? Number(selectedOption.price)
      : Number(product.price);
    const discPrice = selectedOption
      ? Number(selectedOption.discPrice)
      : Number(product.priceDisc);

    const isDiscounted = discPrice && discPrice !== 0;

    return (
      <div className="text-2xl font-semibold">
        {isDiscounted ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-400 line-through">
              {formatRupiah(price)}
            </span>
            <span className="text-pink-600">{formatRupiah(discPrice)}</span>
          </div>
        ) : (
          <span className="text-pink-600">{formatRupiah(price)}</span>
        )}
      </div>
    );
  };

  const getDisplayPrice = (price: string, priceDisc: string) =>
    formatRupiah(
      priceDisc !== "0" && priceDisc !== "" ? Number(priceDisc) : Number(price)
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Button
          onClick={() => router.back()}
          variant="default"
          className="flex items-center text-black-500 hover:underline"
        >
          <ArrowUturnLeftIcon className="h-8 w-8 mr-2" />
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <AutoSlider images={product.images} interval={4000} />
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <div className="text-2xl text-pink-600 font-semibold mb-4">
            {displayPrice()}
          </div>
          {/* Additional Options */}
          {product.addFlag === 1 && product.addVal && (
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-2">
                Pilih Variasi:
              </h3>
              <div className="flex flex-wrap gap-2">
                {JSON.parse(product.addVal).map(
                  (
                    opt: { name: string; price: string; discPrice: string },
                    index: number
                  ) => (
                    <button
                      key={index}
                      onClick={() => setSelectedOption(opt)}
                      className={`px-3 py-1 rounded-full border text-sm transition ${
                        selectedOption?.name === opt.name
                          ? "bg-pink-500 text-white border-pink-500"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {opt.name}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          <p className="text-gray-600 mb-6">
            {product.description || "tidak ada deskripsi."}
          </p>

          <Link href={`/order/${product.id}`}>
            <button className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-600 transition duration-300">
              Pesan Sekarang
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
                  className="rounded-lg mb-4 mx-auto"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {relatedProduct.name}
                </h3>
                <p className="text-pink-600 font-semibold">
                  {getDisplayPrice(
                    relatedProduct.price,
                    relatedProduct.priceDisc
                  )}
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
