"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// ✅ Define types for products
interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  homeView: number;
  stock: string;
}

const relatedProducts = [
  {
    id: 2,
    name: "Rose Elegance",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Tropical Paradise",
    price: 64.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Lavender Dreams",
    price: 54.99,
    image: "/placeholder.svg?height=300&width=300",
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (!id) return;

    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`/api/protected/products?productId=${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        console.log("Fetched product:", data);

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductDetail();
  }, [id]); // ✅ Ensure useEffect re-runs when id changes

  if (!product) return <p className="text-center py-10">Loading...</p>;
  console.log("isi product", product);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={"/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product?.name || "Product Name"}
          </h1>
          <p className="text-2xl text-pink-600 font-semibold mb-4">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget
            felis vel justo vulputate gravida. Integer convallis, nisl at congue
            vehicula, purus sapien tincidunt nunc, ac fermentum purus augue ac
            eros. Mauris malesuada, sapien nec accumsan vehicula, enim sapien...
          </p>

          {/* <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Size</h2>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-full ${
                    selectedSize === size
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-pink-100"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div> */}

          <div className="mb-6">
            {/* <h2 className="text-lg font-semibold mb-2">Add-ons</h2>
            <div className="space-y-2">
              {product.addOns.map((addOn) => (
                <label key={addOn} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-pink-500"
                    checked={selectedAddOns.includes(addOn)}
                    onChange={() => handleAddOnToggle(addOn)}
                  />
                  <span className="ml-2">{addOn}</span>
                </label>
              ))}
            </div> */}
          </div>

          <button className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-600 transition duration-300">
            Order Now
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product Details
        </h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget
          felis vel justo vulputate gravida. Integer convallis, nisl at congue
          vehicula, purus sapien tincidunt nunc, ac fermentum purus augue ac
          eros. Mauris malesuada, sapien nec accumsan vehicula, enim sapien
          fermentum nulla, ac eleifend justo urna at nisi. Vivamus ac dui felis.
          Sed pharetra sapien ut felis tristique, et varius ligula rhoncus.
          Suspendisse potenti. Ut at risus eu orci lobortis tempus. Nulla
          facilisi. Proin quis lacus eu libero dignissim sodales. Curabitur nec
          fermentum mauris. Fusce bibendum justo nec massa gravida, vel vehicula
          risus faucibus. Duis rhoncus erat sit amet libero sodales, ac auctor
          mauris molestie. Vestibulum posuere elit vitae pharetra pharetra. Cras
          facilisis, purus non sodales dignissim, sapien dui interdum felis, vel
          feugiat sapien neque nec metus. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas. In id est non
          purus fringilla tincidunt. Mauris rhoncus sem sed magna facilisis, in
          congue nulla interdum.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="border rounded-lg p-4 hover:shadow-lg transition duration-300"
            >
              <Image
                src={relatedProduct.image || "/placeholder.svg"}
                alt={relatedProduct.name}
                width={300}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {relatedProduct.name}
              </h3>
              <p className="text-pink-600 font-semibold">
                ${relatedProduct.price.toFixed(2)}
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
      </div>
    </div>
  );
}
