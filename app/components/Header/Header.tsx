"use client";

import React, { useState, useEffect } from "react";

const Header = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const carouselHeight = window.innerHeight * 0.6; // Match carousel height

      setIsTransparent(scrollY < carouselHeight * 0.7); // Transparent while over the carousel
      setIsScrolledPast(scrollY > carouselHeight); // "Scroll away" effect when past carousel
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-500 ${
        isScrolledPast ? "-translate-y-full" : "translate-y-0"
      } ${isTransparent ? "bg-white/80 backdrop-blur-md" : "bg-white"}`}
    >
      <div className="container mx-auto flex flex-col items-center px-6 py-4">
        {/* Logo */}
        <div className="text-4xl font-serif font-extrabold text-center">
          <a
            href="/"
            className="text-pink-500 hover:text-pink-600 transition-colors duration-200"
          >
            Enlight Florist
          </a>
        </div>

        {/* Navigation */}
        <nav className="w-full">
          <ul className="lg:flex lg:justify-center space-x-6 hidden">
            <li>
              <a
                href="/"
                className="text-lg font-medium hover:text-teal-400 transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-lg font-medium hover:text-teal-400 transition-colors duration-200"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="text-lg font-medium hover:text-teal-400 transition-colors duration-200"
              >
                Our Product
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
