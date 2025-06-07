"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`top-0 left-0 w-full z-50 shadow-md transition-all duration-500 translate-y-0 bg-customBg`}
    >
      <div className="container mx-auto flex flex-col items-center px-6 py-4 md:py-7 relative">
        {/* Mobile Menu Button - positioned absolutely */}
        <button
          className="lg:hidden text-black focus:outline-none absolute right-6 top-1/2 transform -translate-y-1/2"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo - centered */}
        <div className="text-2xl md:text-3xl lg:text-4xl font-serif font-extrabold text-center">
          <Link
            href="/"
            className="text-rose-600 transition-colors duration-200"
          >
            Enlight Florist
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="w-full hidden lg:block mt-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link
                href="/"
                className={`text-lg font-medium text-black hover:text-gray-500
          transition-colors duration-200`}
              >
                Halaman Utama
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`text-lg font-medium text-black hover:text-gray-500
            transition-colors duration-200`}
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className={`text-lg font-medium text-black hover:text-gray-500
            transition-colors duration-200`}
              >
                Produk Kami
              </Link>
            </li>
            <li>
              <Link
                href="/special"
                className={`text-lg font-medium text-black hover:text-gray-500
            transition-colors duration-200`}
              >
                Special Request
              </Link>
            </li>
            <li>
              <Link
                href="/coorporate"
                className={`text-lg font-medium text-black hover:text-gray-500
            transition-colors duration-200`}
              >
                Cooporate Partnership
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <nav
          className={`w-full lg:hidden ${
            isMenuOpen ? "max-h-96" : "max-h-0"
          } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link
                href="/"
                className={`text-lg font-medium text-black hover:text-gray-500
          transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Halaman Utama
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`text-lg font-medium text-black hover:text-gray-500
            transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className={`text-lg font-medium text-black hover:text-gray-500
            transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Produk Kami
              </Link>
            </li>
            <li>
              <Link
                href="/special"
                className={`text-lg font-medium text-black hover:text-gray-500
            transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Special Request
              </Link>
            </li>
            <li>
              <Link
                href="/coorporate"
                className={`text-lg font-medium text-black hover:text-gray-500
            transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Cooporate Partnership
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
