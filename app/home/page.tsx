"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Flower2 } from "lucide-react";
import CategoryCarousel from "../components/Home/ProductCard";
import Link from "next/link";
interface Product {
	id: string;
	name: string;
	price: number;
	priceDisc: string;
	image: string;
	category: string;
	soldQty: string;
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

			const transformedCategories: CategorySection[] = data.map((category) => ({
				name: category.name,
				slug: category.slug,
				products: category.products.map((product) => ({
					id: product.id,
					name: product.name,
					price: product.price,
					priceDisc: product.priceDisc,
					image: product.image,
					category: product.category,
					soldQty: product.soldQty,
				})),
			}));

			setCategories(transformedCategories);
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
		<>
			<Head>
				<title>Enlight Florist - Toko Bunga Tangerang</title>
				<meta
					name="description"
					content="Toko bunga di Tangerang untuk segala acara. Kirim bunga segar dan artificial dari Enlight Florist."
				/>
				<meta
					name="keywords"
					content="toko bunga Tangerang, florist Tangerang, Enlight Florist"
				/>
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://www.enlightflorist.com" />

				{/* Logo Structured Data for Google */}
				<script type="application/ld+json">
					{`
			{
				"@context": "https://schema.org",
				"@type": "LocalBusiness",
				"name": "Enlight Florist",
				"image": "https://www.enlightflorist.com/logo.png",
				"url": "https://www.enlightflorist.com",
				"telephone": "+62-812-3456-7890",
				"address": {
					"@type": "PostalAddress",
					"streetAddress": "Jl. Imam Bonjol No.238d, RT.001/RW.004 Bojong Jaya",
					"addressLocality": "Tangerang",
					"addressRegion": "Banten",
					"postalCode": "15115",
					"addressCountry": "ID"
				},
				"sameAs": [
					"https://www.instagram.com/enlight.florist",
				],
				"logo": "https://www.enlightflorist.com/logos/logo.png"
			}
		`}
				</script>
			</Head>

			<main className="bg-customBg min-h-screen">
				<div className="relative">
					{/* Carousel event Section */}
					<div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
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
									fill
									sizes="100vw"
									style={{
										objectFit: "cover",
									}}
									priority={index === 0}
								/>
							</div>
						))}
						<div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
							{events.map((_, index) => (
								<button
									key={index}
									className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
										index === currentSlide ? "bg-white" : "bg-white/50"
									}`}
									onClick={() => {
										if (events.length > 1) setCurrentSlide(index);
									}}
								/>
							))}
						</div>
					</div>

					{/* Product section dengan ilustrasi penghias */}
					<div className="relative">
						{/* Product section dengan ilustrasi penghias hanya di area categories */}
						<div className="relative container px-4 md:px-6 pt-20">
							{/* Ilustrasi penghias hanya di area categories - hidden di mobile */}
							<div className="absolute top-0 left-0 right-0 bottom-0 opacity-4 pointer-events-none overflow-hidden hidden md:block">
								{/* Scattered Flower Petals */}
								<div className="absolute top-16 left-12 w-8 h-8 text-rose-200 transform rotate-45">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
											fill="currentColor"
										/>
									</svg>
								</div>

								<div className="absolute top-32 right-24 w-6 h-6 text-pink-200 transform -rotate-30">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
											fill="currentColor"
										/>
									</svg>
								</div>

								{/* Leaves and Stems */}
								<div className="absolute top-48 left-8 w-12 h-16 text-green-200 transform rotate-12">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,15.5C2,15.5 2,16.5 3,16.5C4,16.5 4,16 4,15C4,13 5,12 6,12C7,12 8,13 8,14C8,15 7,16 6,16C5,16 5,15 5,15"
											fill="currentColor"
										/>
									</svg>
								</div>

								<div className="absolute top-72 right-16 w-10 h-14 text-green-200 transform -rotate-45">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,15.5C2,15.5 2,16.5 3,16.5C4,16.5 4,16 4,15C4,13 5,12 6,12C7,12 8,13 8,14C8,15 7,16 6,16C5,16 5,15 5,15"
											fill="currentColor"
										/>
									</svg>
								</div>

								{/* Small Flowers */}
								<div className="absolute top-96 left-20 w-10 h-10 text-rose-300 transform rotate-90">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15M12,2L14.39,5.42C15.72,7.54 17.46,9.39 19.58,10.72L23,13L19.58,15.28C17.46,16.61 15.72,18.46 14.39,20.58L12,24L9.61,20.58C8.28,18.46 6.54,16.61 4.42,15.28L1,13L4.42,10.72C6.54,9.39 8.28,7.54 9.61,5.42L12,2Z"
											fill="currentColor"
										/>
									</svg>
								</div>

								<div className="absolute bottom-80 right-32 w-8 h-8 text-pink-300 transform rotate-180">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15M12,2L14.39,5.42C15.72,7.54 17.46,9.39 19.58,10.72L23,13L19.58,15.28C17.46,16.61 15.72,18.46 14.39,20.58L12,24L9.61,20.58C8.28,18.46 6.54,16.61 4.42,15.28L1,13L4.42,10.72C6.54,9.39 8.28,7.54 9.61,5.42L12,2Z"
											fill="currentColor"
										/>
									</svg>
								</div>

								{/* Decorative Vines */}
								<div className="absolute top-20 right-8 w-16 h-32 text-green-200 transform rotate-15">
									<svg viewBox="0 0 24 48" className="w-full h-full">
										<path
											d="M12,2 Q8,8 12,14 Q16,20 12,26 Q8,32 12,38 Q16,44 12,48"
											stroke="currentColor"
											strokeWidth="1"
											fill="none"
										/>
										<circle cx="8" cy="8" r="2" fill="currentColor" />
										<circle cx="16" cy="20" r="1.5" fill="currentColor" />
										<circle cx="8" cy="32" r="2" fill="currentColor" />
									</svg>
								</div>

								<div className="absolute bottom-40 left-4 w-20 h-24 text-green-200 transform -rotate-20">
									<svg viewBox="0 0 24 48" className="w-full h-full">
										<path
											d="M12,2 Q16,8 12,14 Q8,20 12,26 Q16,32 12,38 Q8,44 12,48"
											stroke="currentColor"
											strokeWidth="1"
											fill="none"
										/>
										<circle cx="16" cy="8" r="1.5" fill="currentColor" />
										<circle cx="8" cy="20" r="2" fill="currentColor" />
										<circle cx="16" cy="32" r="1.5" fill="currentColor" />
									</svg>
								</div>

								{/* More Scattered Elements */}
								<div className="absolute top-64 left-32 w-6 h-6 text-rose-200 transform rotate-60">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
											fill="currentColor"
										/>
									</svg>
								</div>

								<div className="absolute top-80 right-40 w-8 h-8 text-pink-200 transform -rotate-75">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
											fill="currentColor"
										/>
									</svg>
								</div>

								<div className="absolute bottom-60 right-8 w-12 h-12 text-rose-300 transform rotate-135">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15M12,2L14.39,5.42C15.72,7.54 17.46,9.39 19.58,10.72L23,13L19.58,15.28C17.46,16.61 15.72,18.46 14.39,20.58L12,24L9.61,20.58C8.28,18.46 6.54,16.61 4.42,15.28L1,13L4.42,10.72C6.54,9.39 8.28,7.54 9.61,5.42L12,2Z"
											fill="currentColor"
										/>
									</svg>
								</div>

								<div className="absolute bottom-32 left-16 w-10 h-14 text-green-200 transform rotate-45">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,15.5C2,15.5 2,16.5 3,16.5C4,16.5 4,16 4,15C4,13 5,12 6,12C7,12 8,13 8,14C8,15 7,16 6,16C5,16 5,15 5,15"
											fill="currentColor"
										/>
									</svg>
								</div>

								{/* Additional scattered petals */}
								<div className="absolute top-40 left-40 w-4 h-4 text-pink-200 transform rotate-30">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
											fill="currentColor"
										/>
									</svg>
								</div>

								<div className="absolute top-56 right-48 w-5 h-5 text-rose-200 transform -rotate-90">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
											fill="currentColor"
										/>
									</svg>
								</div>

								<div className="absolute bottom-48 left-24 w-6 h-6 text-pink-300 transform rotate-120">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
											fill="currentColor"
										/>
									</svg>
								</div>

								<div className="absolute bottom-72 right-20 w-7 h-7 text-rose-200 transform -rotate-150">
									<svg viewBox="0 0 24 24" className="w-full h-full">
										<path
											d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
											fill="currentColor"
										/>
									</svg>
								</div>
							</div>

							<div className="flex text-rose-500 dark:text-rose-400 items-center justify-center text-center">
								<Flower2 className="h-8 w-8 animate-pulse" />
							</div>
							{categories
								.filter((category) => category.products.length > 0)
								.map((category) => (
									<CategoryCarousel key={category.slug} category={category} />
								))}
						</div>
					</div>
				</div>

				{/* Store Information Section - terpisah tanpa ilustrasi */}
				<div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
					<div className="rounded-lg shadow-lg p-8 bg-[#9f6564]/10">
						<h2 className="text-3xl font-semibold text-center text-rose-500 mb-6">
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
									Jl. Imam Bonjol No.238d, RT.001/RW.004 Bojong Jaya,
									Kec.Karawaci Kota Tangerang, Banten 15115 Indonesia
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
								<span className="text-gray-700">+62 819 9857 0313</span>
							</div>
						</div>
						<div className="mt-8 text-center">
							<Link
								href="https://wa.me/6281998570313"
								target="_blank"
								className="inline-flex items-center justify-center rounded-md bg-[#9f6564] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9f6564]/90"
							>
								Whatsapp
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
