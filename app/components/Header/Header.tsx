"use client";

import React, { useState } from "react";
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white text-black py-8 shadow-lg">
      <div className="container mx-auto flex flex-col items-center px-6">
        {/* Logo */}
        <div className="text-4xl font-serif font-extrabold text-center mb-6">
          <a
            href="/"
            className="text-teal-600 hover:text-teal-500 transition-colors duration-200"
          >
            Enlight Florist
          </a>
        </div>

        {/* Navigation */}
        <nav className="w-full">
          <ul
            className={`lg:flex lg:justify-center space-x-6 ${
              isMenuOpen ? "block" : "hidden"
            } lg:space-x-6 lg:block`}
          >
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

        {/* Mobile Hamburger Icon */}
        <div className="lg:hidden flex items-center mt-6">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-white`}
      >
        <ul className="flex flex-col space-y-4 py-4 px-6">
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
              href="/contact"
              className="text-lg font-medium hover:text-teal-400 transition-colors duration-200"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
