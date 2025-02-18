"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// This would typically come from a database or API
const product = {
  id: 1,
  name: "Sunshine Bouquet",
  price: 59.99,
  description:
    "A vibrant mix of sunflowers, roses, and daisies that brings warmth and joy to any room.",
  fullDescription:
    "Our Sunshine Bouquet is a radiant arrangement that captures the essence of a perfect summer day. Featuring a stunning combination of golden sunflowers, soft pink roses, and pure white daisies, this bouquet is designed to uplift spirits and brighten any space. Each flower is carefully selected for freshness and arranged by our expert florists to ensure a perfect balance of color and texture. Whether it's for a birthday, to cheer someone up, or simply to bring a touch of sunshine into your home, this bouquet is an ideal choice.",
  image: "/placeholder.svg?height=600&width=600",
  sizes: ["Small", "Medium", "Large"],
  addOns: ["Vase", "Chocolate Box", "Greeting Card"],
};

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
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const handleAddOnToggle = (addOn: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOn)
        ? prev.filter((item) => item !== addOn)
        : [...prev, addOn]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-2xl text-pink-600 font-semibold mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
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
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Add-ons</h2>
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
            </div>
          </div>

          <button className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-600 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product Details
        </h2>
        <p className="text-gray-600">{product.fullDescription}</p>
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
