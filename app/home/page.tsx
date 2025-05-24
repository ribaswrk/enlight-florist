"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Flower2 } from "lucide-react";
import CategoryCarousel from "../components/Home/ProductCard";
import Link from "next/link";
interface Product {
  id: string;
  name: string;
  price: number;
  priceDisc: string;
  image: string;
  category: string;
  soldQty: string;
}
interface CategorySection {
  name: string;
  slug: string;
  products: Product[];
}

interface events {
  name: string;
  urls: string;
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categories, setCategories] = useState<CategorySection[]>([]);
  const [events, setEvents] = useState<events[]>([]);

  // Simulasi data produk
  const fetchCategory = async () => {
    try {
      const res = await fetch("/api/protected/products?view=home", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch category");

      const data: CategorySection[] = await res.json();
      console.log("raw data", data);

      const transformedCategories: CategorySection[] = data.map((category) => ({
        name: category.name,
        slug: category.slug,
        products: category.products.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          priceDisc: product.priceDisc,
          image: product.image,
          category: product.category,
          soldQty: product.soldQty,
        })),
      }));

      setCategories(transformedCategories);
      console.log("transformed", transformedCategories);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/protected/events?homeView=1", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch events");

      const data: events[] = await res.json();
      console.log("raw event data", data);

      setEvents(data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchCategory();
  }, []);

  useEffect(() => {
    if (events.length <= 1) return; // ✅ Prevent carousel logic if only 1 image

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 5000); // 5 seconds or whatever your timing is

    return () => clearInterval(interval);
  }, [events]);

  return (
    <main className="bg-customBg min-h-screen">
      {/* Carousel event Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        {events.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.urls || "/placeholder.svg"}
              alt={image.name}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        ))}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {events.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => {
                if (events.length > 1) setCurrentSlide(index);
              }}
            />
          ))}
        </div>
      </div>
      {/* Product section*/}

      <div className="container px-4 md:px-6 pt-20">
        <div className="flex text-rose-500 dark:text-rose-400 items-center justify-center text-center">
          <Flower2 className="h-8 w-8 animate-pulse" />
        </div>
        {categories
          .filter((category) => category.products.length > 0)
          .map((category) => (
            <CategoryCarousel key={category.slug} category={category} />
          ))}
      </div>
      {/* Store Information Section */}
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg shadow-lg p-8 bg-[#9f6564]/10">
          <h2 className="text-3xl font-semibold text-center text-rose-500 mb-6">
            Selamat Datang di Toko Bunga Kami
          </h2>
          <p className="text-center text-gray-700 mb-8">
            Kami menyediakan rangkaian bunga segar dan indah untuk berbagai
            acara spesial Anda.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-rose-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-gray-700">
                Jl. Bunga Indah No. 123, Kota Bunga, 12345
              </span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-rose-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-gray-700">(021) 123-4567</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-rose-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-700">info@tokobungaindah.com</span>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block px-6 py-3 text-lg font-semibold text-white bg-rose-400 rounded-full hover:bg-rose-600 transition duration-300 ease-in-out"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
