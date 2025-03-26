import { Award, Building, Calendar, Check, Clock, Gift, Mail, MessageSquare, Phone, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Corporate() {
  return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative h-[50vh] overflow-hidden">
				<div className="absolute inset-0 bg-[#9f6564]/10">
					<Image
						src="/placeholder.svg?height=800&width=1600"
						alt="Corporate floral arrangement"
						fill
						className="object-cover opacity-40"
						priority
					/>
				</div>
				<div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
					<h1 className="font-serif text-4xl font-light tracking-wide text-gray-800 md:text-6xl">
						Corporate Partnerships
					</h1>
					<div className="mt-4 h-0.5 w-24 bg-[#9f6564]"></div>
					<p className="mt-6 max-w-2xl text-lg text-gray-700">
						Elevate your business environment with custom floral solutions
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

			{/* Introduction Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-3xl text-center">
						<h2 className="font-serif text-3xl font-light text-gray-800">
							Bloom & Petal for Business
						</h2>
						<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
						<p className="mt-6 text-gray-600">
							At Bloom & Petal, we understand that businesses need more than
							just beautiful flowers—they need reliable, consistent, and
							impressive floral solutions that enhance their brand and create
							memorable experiences for clients and employees alike.
						</p>
						<p className="mt-4 text-gray-600">
							Our corporate partnership program is designed to provide your
							business with custom floral services tailored to your specific
							needs, schedule, and budget—all while making the process
							effortless for you.
						</p>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="font-serif text-3xl font-light text-gray-800">
							Partnership Benefits
						</h2>
						<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
						<p className="mx-auto mt-4 max-w-2xl text-gray-600">
							Discover the advantages of establishing a corporate partnership
							with us
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9f6564]/10">
								<Sparkles className="h-6 w-6 text-[#9f6564]" />
							</div>
							<h3 className="font-serif text-xl font-medium text-gray-800">
								Customized Solutions
							</h3>
							<p className="mt-4 text-gray-600">
								Floral arrangements designed specifically for your brand, space,
								and corporate culture. We align our creations with your
								company's aesthetic and values.
							</p>
						</div>

						<div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9f6564]/10">
								<Clock className="h-6 w-6 text-[#9f6564]" />
							</div>
							<h3 className="font-serif text-xl font-medium text-gray-800">
								Regular Refreshment
							</h3>
							<p className="mt-4 text-gray-600">
								Scheduled deliveries ensure your spaces always look fresh and
								inviting. We handle everything from installation to maintenance,
								so you don't have to worry about a thing.
							</p>
						</div>

						<div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9f6564]/10">
								<Award className="h-6 w-6 text-[#9f6564]" />
							</div>
							<h3 className="font-serif text-xl font-medium text-gray-800">
								Premium Quality
							</h3>
							<p className="mt-4 text-gray-600">
								Access to the freshest, highest-quality blooms and premium
								design services. Our corporate partners receive priority
								selection of seasonal and exotic flowers.
							</p>
						</div>

						<div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9f6564]/10">
								<Gift className="h-6 w-6 text-[#9f6564]" />
							</div>
							<h3 className="font-serif text-xl font-medium text-gray-800">
								Employee Perks
							</h3>
							<p className="mt-4 text-gray-600">
								Exclusive discounts for your employees on personal orders.
								Perfect for birthdays, anniversaries, or just because. Boost
								morale with beautiful blooms.
							</p>
						</div>

						<div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9f6564]/10">
								<Calendar className="h-6 w-6 text-[#9f6564]" />
							</div>
							<h3 className="font-serif text-xl font-medium text-gray-800">
								Event Support
							</h3>
							<p className="mt-4 text-gray-600">
								Priority scheduling and special rates for corporate events, from
								intimate client meetings to large-scale conferences. We'll help
								make every event memorable.
							</p>
						</div>

						<div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9f6564]/10">
								<Building className="h-6 w-6 text-[#9f6564]" />
							</div>
							<h3 className="font-serif text-xl font-medium text-gray-800">
								Simplified Billing
							</h3>
							<p className="mt-4 text-gray-600">
								Streamlined invoicing and payment options tailored to your
								accounting processes. Monthly, quarterly, or custom billing
								cycles available.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Service Packages */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="font-serif text-3xl font-light text-gray-800">
							Our Corporate Packages
						</h2>
						<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
						<p className="mx-auto mt-4 max-w-2xl text-gray-600">
							Flexible solutions designed to meet your business needs
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						<div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
							<div className="mb-4 inline-block rounded-full bg-[#9f6564]/10 px-4 py-1 text-sm font-medium text-[#9f6564]">
								Essential
							</div>
							<h3 className="font-serif text-2xl font-medium text-gray-800">
								Reception & Lobby
							</h3>
							<p className="mt-2 text-gray-600">
								Perfect for creating a welcoming first impression
							</p>
							<div className="mt-6 text-3xl font-bold text-gray-800">
								From $299
								<span className="text-base font-normal text-gray-600">
									/month
								</span>
							</div>

							<ul className="mt-6 space-y-3">
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										Weekly reception/lobby arrangement
									</span>
								</li>
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										Custom design aligned with your brand
									</span>
								</li>
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										Installation and maintenance included
									</span>
								</li>
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										10% discount on additional orders
									</span>
								</li>
							</ul>

							<Link
								href="/contact"
								className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-[#9f6564] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9f6564]/90"
							>
								Get Started
							</Link>
						</div>

						<div className="relative rounded-lg border-2 border-[#9f6564] bg-white p-8 shadow-md transition-all hover:shadow-lg">
							<div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#9f6564] px-4 py-1 text-sm font-medium text-white">
								Most Popular
							</div>
							<div className="mb-4 inline-block rounded-full bg-[#9f6564]/10 px-4 py-1 text-sm font-medium text-[#9f6564]">
								Premium
							</div>
							<h3 className="font-serif text-2xl font-medium text-gray-800">
								Full Office Experience
							</h3>
							<p className="mt-2 text-gray-600">
								Comprehensive floral program for your entire space
							</p>
							<div className="mt-6 text-3xl font-bold text-gray-800">
								From $599
								<span className="text-base font-normal text-gray-600">
									/month
								</span>
							</div>

							<ul className="mt-6 space-y-3">
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										Weekly reception/lobby arrangement
									</span>
								</li>
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										Bi-weekly arrangements for conference rooms
									</span>
								</li>
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										Monthly executive office refreshes
									</span>
								</li>
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">Seasonal decor updates</span>
								</li>
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										15% discount on additional orders
									</span>
								</li>
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										Employee birthday program
									</span>
								</li>
							</ul>

							<Link
								href="/contact"
								className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-[#9f6564] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9f6564]/90"
							>
								Get Started
							</Link>
						</div>

						<div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
							<div className="mb-4 inline-block rounded-full bg-[#9f6564]/10 px-4 py-1 text-sm font-medium text-[#9f6564]">
								Enterprise
							</div>
							<h3 className="font-serif text-2xl font-medium text-gray-800">
								Custom Corporate Solution
							</h3>
							<p className="mt-2 text-gray-600">
								Tailored program for multiple locations or special needs
							</p>
							<div className="mt-6 text-3xl font-bold text-gray-800">
								Custom
								<span className="text-base font-normal text-gray-600">
									{" "}
									pricing
								</span>
							</div>

							<ul className="mt-6 space-y-3">
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										All Premium features included
									</span>
								</li>
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										Multi-location coordination
									</span>
								</li>
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										Dedicated account manager
									</span>
								</li>
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										Corporate gifting program
									</span>
								</li>
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										Event planning assistance
									</span>
								</li>
								<li className="flex items-start">
									<Check className="mr-2 h-5 w-5 flex-shrink-0 text-[#9f6564]" />
									<span className="text-gray-600">
										20% discount on additional orders
									</span>
								</li>
							</ul>

							<Link
								href="/contact"
								className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-[#9f6564] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9f6564]/90"
							>
								Contact Us
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="font-serif text-3xl font-light text-gray-800">
							Trusted by Businesses
						</h2>
						<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
						<p className="mx-auto mt-4 max-w-2xl text-gray-600">
							See what our corporate partners have to say
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2">
						<div className="rounded-lg bg-white p-8 shadow-sm">
							<div className="mb-6 flex items-center">
								<div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#9f6564]/20">
									<Image
										src="/placeholder.svg?height=100&width=100"
										alt="Company logo"
										fill
										className="object-cover"
									/>
								</div>
								<div className="ml-4">
									<h3 className="font-medium text-gray-800">
										Horizon Financial Group
									</h3>
									<p className="text-sm text-gray-600">Financial Services</p>
								</div>
							</div>
							<p className="italic text-gray-600">
								"Bloom & Petal has transformed our office environment. Our
								clients consistently comment on our beautiful arrangements, and
								our team loves coming into a space that feels fresh and vibrant.
								The service is impeccable—they handle everything so we don't
								have to think about it."
							</p>
							<p className="mt-4 font-medium text-gray-800">
								— Jennifer Lawson, Office Manager
							</p>
						</div>

						<div className="rounded-lg bg-white p-8 shadow-sm">
							<div className="mb-6 flex items-center">
								<div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#9f6564]/20">
									<Image
										src="/placeholder.svg?height=100&width=100"
										alt="Company logo"
										fill
										className="object-cover"
									/>
								</div>
								<div className="ml-4">
									<h3 className="font-medium text-gray-800">
										Nexus Technologies
									</h3>
									<p className="text-sm text-gray-600">Software Development</p>
								</div>
							</div>
							<p className="italic text-gray-600">
								"As a tech company, we wanted to bring some natural elements
								into our modern space. The team at Bloom & Petal understood our
								vision perfectly. Their weekly arrangements add life to our
								office, and the employee birthday program has been a huge hit
								for team morale."
							</p>
							<p className="mt-4 font-medium text-gray-800">
								— David Chen, Facilities Director
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="font-serif text-3xl font-light text-gray-800">
							How It Works
						</h2>
						<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
						<p className="mx-auto mt-4 max-w-2xl text-gray-600">
							Setting up your corporate partnership is simple
						</p>
					</div>

					<div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-4">
						<div className="text-center">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9f6564] text-xl font-bold text-white">
								1
							</div>
							<h3 className="mt-4 font-serif text-xl font-medium text-gray-800">
								Consultation
							</h3>
							<p className="mt-2 text-gray-600">
								We meet to understand your needs, space, and brand aesthetic
							</p>
						</div>

						<div className="text-center">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9f6564] text-xl font-bold text-white">
								2
							</div>
							<h3 className="mt-4 font-serif text-xl font-medium text-gray-800">
								Custom Proposal
							</h3>
							<p className="mt-2 text-gray-600">
								We create a tailored plan and pricing structure for your
								approval
							</p>
						</div>

						<div className="text-center">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9f6564] text-xl font-bold text-white">
								3
							</div>
							<h3 className="mt-4 font-serif text-xl font-medium text-gray-800">
								Implementation
							</h3>
							<p className="mt-2 text-gray-600">
								We begin your service with the first delivery and installation
							</p>
						</div>

						<div className="text-center">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9f6564] text-xl font-bold text-white">
								4
							</div>
							<h3 className="mt-4 font-serif text-xl font-medium text-gray-800">
								Ongoing Service
							</h3>
							<p className="mt-2 text-gray-600">
								Regular refreshes and check-ins to ensure your complete
								satisfaction
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="rounded-lg bg-[#9f6564]/10 p-8 text-center shadow-sm md:p-12">
						<h2 className="font-serif text-3xl font-light text-gray-800">
							Ready to Elevate Your Workspace?
						</h2>
						<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
						<p className="mx-auto mt-6 max-w-2xl text-gray-600">
							Contact us today to schedule a consultation and discover how our
							corporate floral services can enhance your business environment,
							impress your clients, and boost employee morale.
						</p>
						<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
							<Link
								href="/contact"
								className="inline-flex items-center justify-center rounded-md bg-[#9f6564] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9f6564]/90"
							>
								<Mail className="mr-2 h-4 w-4" />
								Request Consultation
							</Link>
							<Link
								href="tel:+15551234567"
								className="inline-flex items-center justify-center rounded-md border border-[#9f6564] bg-white px-6 py-3 text-sm font-medium text-[#9f6564] transition-colors hover:bg-[#9f6564]/5"
							>
								<Phone className="mr-2 h-4 w-4" />
								Call Us
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Corporate Contact Form */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-3xl">
						<div className="mb-8 text-center">
							<h2 className="font-serif text-3xl font-light text-gray-800">
								Corporate Inquiry
							</h2>
							<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
							<p className="mx-auto mt-4 max-w-2xl text-gray-600">
								Fill out the form below and our corporate team will contact you
								within 24 hours
							</p>
						</div>

						<form className="space-y-6">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<label
										htmlFor="name"
										className="mb-2 block text-sm font-medium text-gray-700"
									>
										Your Name
									</label>
									<input
										type="text"
										id="name"
										className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#9f6564] focus:outline-none focus:ring-1 focus:ring-[#9f6564]"
										placeholder="Enter your name"
									/>
								</div>
								<div>
									<label
										htmlFor="title"
										className="mb-2 block text-sm font-medium text-gray-700"
									>
										Job Title
									</label>
									<input
										type="text"
										id="title"
										className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#9f6564] focus:outline-none focus:ring-1 focus:ring-[#9f6564]"
										placeholder="Enter your job title"
									/>
								</div>
							</div>

							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<label
										htmlFor="company"
										className="mb-2 block text-sm font-medium text-gray-700"
									>
										Company Name
									</label>
									<input
										type="text"
										id="company"
										className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#9f6564] focus:outline-none focus:ring-1 focus:ring-[#9f6564]"
										placeholder="Enter your company name"
									/>
								</div>
								<div>
									<label
										htmlFor="industry"
										className="mb-2 block text-sm font-medium text-gray-700"
									>
										Industry
									</label>
									<input
										type="text"
										id="industry"
										className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#9f6564] focus:outline-none focus:ring-1 focus:ring-[#9f6564]"
										placeholder="Enter your industry"
									/>
								</div>
							</div>

							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<label
										htmlFor="email"
										className="mb-2 block text-sm font-medium text-gray-700"
									>
										Email Address
									</label>
									<input
										type="email"
										id="email"
										className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#9f6564] focus:outline-none focus:ring-1 focus:ring-[#9f6564]"
										placeholder="Enter your email"
									/>
								</div>
								<div>
									<label
										htmlFor="phone"
										className="mb-2 block text-sm font-medium text-gray-700"
									>
										Phone Number
									</label>
									<input
										type="tel"
										id="phone"
										className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#9f6564] focus:outline-none focus:ring-1 focus:ring-[#9f6564]"
										placeholder="Enter your phone number"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="locations"
									className="mb-2 block text-sm font-medium text-gray-700"
								>
									Number of Locations
								</label>
								<select
									id="locations"
									className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#9f6564] focus:outline-none focus:ring-1 focus:ring-[#9f6564]"
								>
									<option value="" disabled selected>
										Select number of locations
									</option>
									<option value="1">1 location</option>
									<option value="2-5">2-5 locations</option>
									<option value="6-10">6-10 locations</option>
									<option value="11+">11+ locations</option>
								</select>
							</div>

							<div>
								<label
									htmlFor="interest"
									className="mb-2 block text-sm font-medium text-gray-700"
								>
									I'm Interested In
								</label>
								<select
									id="interest"
									className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#9f6564] focus:outline-none focus:ring-1 focus:ring-[#9f6564]"
								>
									<option value="" disabled selected>
										Select your interest
									</option>
									<option value="essential">Essential Package</option>
									<option value="premium">Premium Package</option>
									<option value="enterprise">Enterprise Solution</option>
									<option value="custom">Custom Solution</option>
									<option value="not-sure">Not Sure Yet</option>
								</select>
							</div>

							<div>
								<label
									htmlFor="message"
									className="mb-2 block text-sm font-medium text-gray-700"
								>
									Additional Information
								</label>
								<textarea
									id="message"
									rows={5}
									className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#9f6564] focus:outline-none focus:ring-1 focus:ring-[#9f6564]"
									placeholder="Please share any specific requirements or questions you have about our corporate services."
								></textarea>
							</div>

							<div className="flex items-center">
								<input
									id="newsletter"
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-[#9f6564] focus:ring-[#9f6564]"
								/>
								<label
									htmlFor="newsletter"
									className="ml-2 text-sm text-gray-600"
								>
									Subscribe to our corporate newsletter for floral trends and
									special offers
								</label>
							</div>

							<div>
								<button
									type="submit"
									className="inline-flex w-full items-center justify-center rounded-md bg-[#9f6564] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9f6564]/90 sm:w-auto"
								>
									<MessageSquare className="mr-2 h-4 w-4" />
									Submit Inquiry
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>

			{/* Decorative Elements */}
			<div className="pointer-events-none fixed -bottom-24 -left-24 z-0 h-64 w-64 rounded-full bg-[#9f6564]/5"></div>
			<div className="pointer-events-none fixed -right-32 top-1/4 z-0 h-96 w-96 rounded-full bg-[#9f6564]/5"></div>
		</div>
	);
}
