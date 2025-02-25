"use client";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header
      className={`top-0 left-0 w-full z-50 shadow-md transition-all duration-500 translate-y-0 bg-white`}
    >
      <div className="container mx-auto flex flex-col items-center px-6 py-4">
        {/* Logo */}
        <div className="text-4xl font-serif font-extrabold text-center">
          <Link
            href="/"
            className="text-pink-500 transition-colors duration-200"
          >
            Enlight Florist
          </Link>
        </div>

        {/* Navigation */}
        <nav className="w-full">
          <ul className="lg:flex lg:justify-center space-x-6 hidden">
            <li>
              <Link
                href="/"
                className={`text-lg font-medium text-black hover:text-gray-500 transition-colors duration-200`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`text-lg font-medium text-black hover:text-gray-500 transition-colors duration-200`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className={`text-lg font-medium text-black hover:text-gray-500 transition-colors duration-200`}
              >
                Our Product
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
