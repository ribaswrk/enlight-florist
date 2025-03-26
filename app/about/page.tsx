"use client";

import Image from "next/image";
import { ArrowRight, Heart, Leaf, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative h-[50vh] overflow-hidden">
				<div className="absolute inset-0 bg-[#9f6564]/10">
					<Image
						src="/placeholder.svg?height=800&width=1600"
						alt="Floral arrangement"
						fill
						className="object-cover opacity-40"
						priority
					/>
				</div>
				<div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
					<h1 className="font-serif text-4xl font-light tracking-wide text-gray-800 md:text-6xl">
						Our Floral Story
					</h1>
					<div className="mt-4 h-0.5 w-24 bg-[#9f6564]"></div>
					<p className="mt-6 max-w-2xl text-lg text-gray-700">
						Crafting beautiful moments with nature's finest blooms since 2010
					</p>
				</div>
				<div className="absolute bottom-0 left-0 right-0">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1440 320"
						className="text-white"
					>
						<path
							fill="currentColor"
							fillOpacity="1"
							d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
						></path>
					</svg>
				</div>
			</section>

			{/* Our Story Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-center justify-between gap-12 md:flex-row">
						<div className="md:w-1/2">
							<h2 className="font-serif text-3xl font-light text-gray-800">
								Our Blooming Journey
							</h2>
							<div className="mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
							<p className="mt-6 text-gray-600">
								Our story began with a simple passion for flowers and their
								ability to transform moments into memories. Founded in 2010, our
								little flower shop has grown into a beloved part of the
								community, bringing joy and beauty to countless celebrations.
							</p>
							<p className="mt-4 text-gray-600">
								We believe in the power of nature's artistry. Each arrangement
								we create is a unique expression of beauty, crafted with care
								and attention to detail. Our dedicated team of florists combines
								traditional techniques with contemporary design to create
								stunning floral compositions for any occasion.
							</p>
							<Link
								href="/contact"
								className="mt-8 inline-flex items-center text-[#9f6564] hover:underline"
							>
								Get in touch with us <ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</div>
						<div className="relative h-80 w-full overflow-hidden rounded-lg md:w-2/5">
							<Image
								src="/placeholder.svg?height=600&width=500"
								alt="Our flower shop"
								fill
								className="object-cover"
							/>
							<div className="absolute inset-0 border-8 border-white/30"></div>
						</div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="font-serif text-3xl font-light text-gray-800">
							Our Values
						</h2>
						<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
					</div>
					<div className="grid gap-8 md:grid-cols-3">
						<div className="rounded-lg bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9f6564]/10">
								<Leaf className="h-8 w-8 text-[#9f6564]" />
							</div>
							<h3 className="mt-6 font-serif text-xl font-medium text-gray-800">
								Sustainability
							</h3>
							<p className="mt-4 text-gray-600">
								We source our flowers ethically and strive to minimize our
								environmental impact through eco-friendly practices.
							</p>
						</div>
						<div className="rounded-lg bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9f6564]/10">
								<Heart className="h-8 w-8 text-[#9f6564]" />
							</div>
							<h3 className="mt-6 font-serif text-xl font-medium text-gray-800">
								Passion
							</h3>
							<p className="mt-4 text-gray-600">
								Our love for flowers drives everything we do, from selecting the
								freshest blooms to creating breathtaking arrangements.
							</p>
						</div>
						<div className="rounded-lg bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9f6564]/10">
								<MapPin className="h-8 w-8 text-[#9f6564]" />
							</div>
							<h3 className="mt-6 font-serif text-xl font-medium text-gray-800">
								Community
							</h3>
							<p className="mt-4 text-gray-600">
								We're proud to be part of our local community, supporting local
								events and celebrating life's special moments together.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="bg-[#9f6564]/5 py-16">
				<div className="container mx-auto px-4">
					<div className="rounded-lg bg-white p-8 shadow-sm md:p-12">
						<div className="flex flex-col items-center justify-between gap-8 md:flex-row">
							<div>
								<h2 className="font-serif text-2xl font-light text-gray-800 md:text-3xl">
									Visit Our Flower Shop
								</h2>
								<div className="mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
								<p className="mt-4 text-gray-600">
									We'd love to meet you in person and help you find the perfect
									flowers for any occasion.
								</p>
								<div className="mt-6 flex items-center">
									<MapPin className="mr-2 h-5 w-5 text-[#9f6564]" />
									<span className="text-gray-600">
										123 Blossom Street, Flowertown
									</span>
								</div>
								<div className="mt-2 flex items-center">
									<Phone className="mr-2 h-5 w-5 text-[#9f6564]" />
									<span className="text-gray-600">(555) 123-4567</span>
								</div>
							</div>
							<div>
								<Link
									href="/contact"
									className="inline-flex items-center justify-center rounded-md bg-[#9f6564] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9f6564]/90"
								>
									Contact Us
								</Link>
							</div>
						</div>
						<div className="h-[300px] overflow-hidden rounded-lg border-4 border-white shadow-md md:h-[400px] mt-8">
							<div className="relative h-full w-full">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5020913572107!2d106.61944447499022!3d-6.197291893790373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ffbd858823a7%3A0xee4e5017afd5de62!2sEnlight%20Florist!5e0!3m2!1sen!2sid!4v1743009563070!5m2!1sen!2sid"
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen={false}
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									title="Flower Shop Location"
									className="absolute inset-0"
								></iframe>
								<div className="absolute inset-0 pointer-events-none border border-[#9f6564]/20"></div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Decorative Elements */}
			<div className="pointer-events-none fixed -bottom-24 -left-24 z-0 h-64 w-64 rounded-full bg-[#9f6564]/5"></div>
			<div className="pointer-events-none fixed -right-32 top-1/4 z-0 h-96 w-96 rounded-full bg-[#9f6564]/5"></div>
		</div>
	);
}
