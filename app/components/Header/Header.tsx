"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`top-0 left-0 w-full z-50 shadow-md transition-all duration-500 translate-y-0 bg-customBg`}
    >
      <div className="container mx-auto flex flex-col items-center px-6 py-4 md:py-7 relative font-poppins">
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
            <Image
              src="/logos/logo.png"
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-20 object-fill"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex justify-center mt-4 space-x-10">
          {[
            { href: "/", label: "Halaman Utama" },
            { href: "/about", label: "Tentang Kami" },
            { href: "/categories", label: "Produk Kami" },
            { href: "/special", label: "Special Request" },
            { href: "/coorporate", label: "Coorporate Partnership" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-base text-gray-800 hover:text-rose-600 font-medium transition duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <nav
          className={`w-full lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col items-center space-y-4 py-4 border-t border-gray-100">
            {[
              { href: "/", label: "Halaman Utama" },
              { href: "/about", label: "Tentang Kami" },
              { href: "/categories", label: "Produk Kami" },
              { href: "/special", label: "Special Request" },
              { href: "/coorporate", label: "Coorporate Partnership" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-base font-medium text-gray-800 hover:text-rose-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
