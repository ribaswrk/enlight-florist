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
  image: string;
  category: string;
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

const carouselImages: events[] = [
  {
    urls: "https://cdn.rri.co.id/berita/Fak_Fak/o/1719405685005-pexels-pixabay-bunga_matahari/t3u3g0x7y1jswn2.jpeg",
    name: "Rangkaian bunga indah 1",
  },
  {
    urls: "https://www.quipper.com/id/blog/wp-content/uploads/2023/01/pexels-pixabay-36753.webp",
    name: "Rangkaian bunga indah 2",
  },
  {
    urls: "https://asset.kompas.com/crops/ILXe4fpUJp5syKO801bvechD-j4=/0x0:1000x667/1200x800/data/photo/2022/07/25/62de3dc731bfa.jpg",
    name: "Rangkaian bunga indah 3",
  },
];

const clients = [
  {
    name: "Vogue Wedding",
    logo: "/placeholder.svg?height=80&width=160",
  },
  {
    name: "Elegant Venues",
    logo: "/placeholder.svg?height=80&width=160",
  },
  {
    name: "Luxury Hotels",
    logo: "/placeholder.svg?height=80&width=160",
  },
  {
    name: "Wedding Magazine",
    logo: "/placeholder.svg?height=80&width=160",
  },
  {
    name: "Event Planners",
    logo: "/placeholder.svg?height=80&width=160",
  },
  {
    name: "Bridal Magazine",
    logo: "/placeholder.svg?height=80&width=160",
  },
];

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
          image: product.image,
          category: product.category,
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
      {/* Decorative Background */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center pt-32">
        {/* Decorative Flower Icon */}
        <div className="text-rose-500 dark:text-rose-400">
          <Flower2 className="h-8 w-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
            Our Clients
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground italic md:text-lg">
            Proudly creating floral magic for these wonderful partners
          </p>
        </div>
      </div>
      {/* Curved Decorative Line */}
      <div className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="relative mt-8 mb-12">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-200 dark:via-rose-800 to-transparent" />
        </div>

        <div className="mx-auto grid grid-cols-2 gap-8 md:grid-cols-3 lg:gap-12 [&_img]:mx-auto max-w-5xl">
          {clients.map((client) => (
            <div
              key={client.name}
              className="group relative flex items-center justify-center p-6 transition-all duration-300 hover:scale-105"
            >
              {/* Subtle Hover Effect Background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-rose-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity dark:from-rose-950/20" />

              <Image
                src={client.logo || "/placeholder.svg"}
                alt={`${client.name} logo`}
                width={160}
                height={80}
                className="relative object-contain transition-all duration-300 group-hover:brightness-110"
              />
            </div>
          ))}
        </div>

        {/* Bottom Decorative Elements */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-200 dark:to-rose-800" />
          <Flower2 className="h-5 w-5 text-rose-400 rotate-45" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-200 dark:to-rose-800" />
        </div>
      </div>
      {/* Store Information Section */}
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-rose-50 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-center text-rose-600 mb-6">
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
              className="inline-block px-6 py-3 text-lg font-semibold text-white bg-rose-500 rounded-full hover:bg-rose-600 transition duration-300 ease-in-out"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
