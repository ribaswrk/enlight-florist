"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const Header = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [isNotHome, setisNotHome] = useState<string>("fixed");
  const path = usePathname();

  useEffect(() => {
    console.log(path);
    if (path !== "/home") {
      setisNotHome("");
      setIsTransparent(false);
      setIsScrolledPast(false);
      return; // Skip if not on home page
    } else {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const carouselHeight = window.innerHeight * 0.6;

        setisNotHome("fixed");
        setIsTransparent(scrollY < carouselHeight * 0.7);
        setIsScrolledPast(scrollY > carouselHeight);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [path]);

  return (
    <header
      className={`${isNotHome} top-0 left-0 w-full z-50 shadow-md transition-all duration-500 ${
        isScrolledPast ? "-translate-y-full" : "translate-y-0"
      } ${isTransparent ? "bg-white-100/80 backdrop-blur-md" : "bg-white"}`}
    >
      <div className="container mx-auto flex flex-col items-center px-6 py-4">
        {/* Logo */}
        <div className="text-4xl font-serif font-extrabold text-center">
          <a href="/" className="text-pink-500 transition-colors duration-200">
            Enlight Florist
          </a>
        </div>

        {/* Navigation */}
        <nav className="w-full">
          <ul className="lg:flex lg:justify-center space-x-6 hidden">
            <li>
              <a
                href="/"
                className={`text-lg font-medium ${
                  isTransparent
                    ? "text-pink-100 hover:text-white-400"
                    : "text-black hover:text-gray-500"
                }  transition-colors duration-200`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className={`text-lg font-medium ${
                  isTransparent
                    ? "text-pink-100 hover:text-white-400"
                    : "text-black hover:text-gray-500"
                }  transition-colors duration-200`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/categories"
                className={`text-lg font-medium ${
                  isTransparent
                    ? "text-pink-100 hover:text-white-400"
                    : "text-black hover:text-gray-500"
                }  transition-colors duration-200`}
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
