"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const carouselImages = [
  {
    src: "https://cdn.rri.co.id/berita/Fak_Fak/o/1719405685005-pexels-pixabay-bunga_matahari/t3u3g0x7y1jswn2.jpeg",
    alt: "Rangkaian bunga indah 1",
  },
  {
    src: "https://www.quipper.com/id/blog/wp-content/uploads/2023/01/pexels-pixabay-36753.webp",
    alt: "Rangkaian bunga indah 2",
  },
  {
    src: "https://asset.kompas.com/crops/ILXe4fpUJp5syKO801bvechD-j4=/0x0:1000x667/1200x800/data/photo/2022/07/25/62de3dc731bfa.jpg",
    alt: "Rangkaian bunga indah 3",
  },
];

// Simulasi data produk
const products: Product[] = [
  {
    id: 1,
    name: "Red Rose Bouquet",
    price: 999.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "Bouquet",
  },
  {
    id: 2,
    name: "Flower Board",
    price: 499.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "Board",
  },
  {
    id: 3,
    name: "Golden Rose Bouquet",
    price: 99.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "Bouquet",
  },
  {
    id: 4,
    name: "Money Bouquet",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "Bouquet",
  },
];
export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [topProducts, setTopProducts] = useState(products);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-white min-h-screen">
      {/* Carousel Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        ))}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Store Information Section */}
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-pink-50 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-center text-pink-600 mb-6">
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
                className="h-6 w-6 text-pink-500"
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
                className="h-6 w-6 text-pink-500"
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
                className="h-6 w-6 text-pink-500"
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
            <a
              href="#"
              className="inline-block px-6 py-3 text-lg font-semibold text-white bg-pink-500 rounded-full hover:bg-pink-600 transition duration-300 ease-in-out"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
