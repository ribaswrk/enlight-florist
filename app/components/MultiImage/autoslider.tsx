"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface AutoSliderProps {
  images: string[]; // array of image URLs
  interval?: number; // interval in ms
}

export default function AutoSlider({
  images,
  interval = 4000,
}: AutoSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return; // no need to auto-slide with one image
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(slider);
  }, [images, interval]);

  if (images.length === 0) {
    return (
      <div className="relative w-full h-[600px]">
        <Image
          src="/placeholder.svg"
          alt="No image"
          fill
          className="rounded-lg shadow-lg object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px]">
      {images.map((url, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={url || "/placeholder.svg"}
            alt={`Slide ${index}`}
            fill
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
