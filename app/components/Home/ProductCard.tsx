"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: string;
  priceDisc: string;
  image: string;
  category: string;
}

interface CategorySection {
  name: string;
  slug: string;
  products: Product[];
}

export default function CategoryCarousel({
  category,
}: {
  category: CategorySection;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const productsPerSlide = 4;

  // Group products into slides of 4
  const getProductSlides = (products: Product[]) => {
    const slides = [];
    for (let i = 0; i < products.length; i += productsPerSlide) {
      slides.push(products.slice(i, i + productsPerSlide));
    }
    return slides;
  };

  const productSlides = getProductSlides(category.products);
  const totalSlides = productSlides.length;

  // Auto-slide functionality
  const handleNextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, totalSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000); // Change slides every 5 seconds

    return () => clearInterval(timer);
  }, [handleNextSlide]);

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="mb-24 last:mb-0 pt-12">
      {/* Category Title */}
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-3xl font-serif font-medium tracking-tight">
          {category.name}
        </h2>
        <p className="text-muted-foreground">
          Discover our beautiful selection of {category.name.toLowerCase()}
        </p>
      </div>

      {/* Product Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `100%`,
            }}
          >
            {productSlides.map((slide, slideIndex) => (
              <div key={slideIndex} className="flex gap-6 min-w-full px-3">
                {slide.map((product) => (
                  <div key={product.id} className="flex-1 group">
                    <div className="relative bg-white dark:bg-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow h-full">
                      <Link
                        href={`/productdetail/${product.id}`}
                        key={product.id}
                      >
                        <div className="aspect-square relative overflow-hidden rounded-md mb-4">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <h3 className="font-medium text-lg mb-2">
                          {product.name}
                        </h3>
                        <p className="text-rose-600 dark:text-rose-400 font-semibold">
                          {product.priceDisc !== "0" ? (
                            <>
                              <span className="text-red-400 line-through text-sm">
                                {formatRupiah(Number(product.price))}
                              </span>
                              <span className="text-red-500 font-bold">
                                {formatRupiah(Number(product.priceDisc))}
                              </span>
                            </>
                          ) : (
                            <span className="text-red-600 font-semibold">
                              {formatRupiah(Number(product.price))}
                            </span>
                          )}
                        </p>
                      </Link>
                    </div>
                  </div>
                ))}
                {/* Add empty placeholders if needed */}
                {slide.length < productsPerSlide &&
                  Array(productsPerSlide - slide.length)
                    .fill(null)
                    .map((_, i) => (
                      <div key={`empty-${i}`} className="flex-1" />
                    ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 dark:bg-rose-700/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-rose-400 transition-colors"
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 dark:bg-rose-700/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-rose-400 transition-colors"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide
                  ? "bg-rose-500 w-4"
                  : "bg-rose-200 dark:bg-rose-800"
              }`}
              onClick={() => {
                setCurrentSlide(index);
                setIsTransitioning(true);
                setTimeout(() => setIsTransitioning(false), 500);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
