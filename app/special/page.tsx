import { Calendar, Heart, MessageSquare, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image"
import React from "react";

export default function SpecialRequest() {
  return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative h-[50vh] overflow-hidden">
				<div className="absolute inset-0 bg-[#9f6564]/10">
					<Image
						src="/placeholder.svg?height=800&width=1600"
						alt="Custom floral arrangement"
						fill
						className="object-cover opacity-40"
						priority
					/>
				</div>
				<div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
					<h1 className="font-serif text-4xl font-light tracking-wide text-gray-800 md:text-6xl">
						Special Requests
					</h1>
					<div className="mt-4 h-0.5 w-24 bg-[#9f6564]"></div>
					<p className="mt-6 max-w-2xl text-lg text-gray-700">
						Your vision, our expertise. Custom floral creations for every
						occasion.
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
							We Bring Your Floral Dreams to Life
						</h2>
						<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
						<p className="mt-6 text-gray-600">
							At Bloom & Petal, we understand that sometimes you need something
							uniquely yours. Whether it's a specific color palette, a rare
							flower variety, or a completely custom arrangement that tells your
							personal story, our expert florists are here to make it happen.
						</p>
						<p className="mt-4 text-gray-600">
							No request is too simple or too elaborate. We take pride in
							creating bespoke floral experiences that perfectly capture your
							vision and exceed your expectations.
						</p>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="font-serif text-3xl font-light text-gray-800">
							Our Custom Services
						</h2>
						<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
						<p className="mx-auto mt-4 max-w-2xl text-gray-600">
							Discover the many ways we can create something special just for
							you
						</p>
					</div>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9f6564]/10">
								<Heart className="h-6 w-6 text-[#9f6564]" />
							</div>
							<h3 className="font-serif text-xl font-medium text-gray-800">
								Wedding Flowers
							</h3>
							<p className="mt-4 text-gray-600">
								From intimate ceremonies to grand celebrations, we create custom
								bridal bouquets, centerpieces, and venue decorations that
								perfectly complement your special day.
							</p>
						</div>
						<div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9f6564]/10">
								<Calendar className="h-6 w-6 text-[#9f6564]" />
							</div>
							<h3 className="mt-0 font-serif text-xl font-medium text-gray-800">
								Event Styling
							</h3>
							<p className="mt-4 text-gray-600">
								Transform your space with custom floral installations for
								corporate events, birthdays, anniversaries, or any celebration
								that deserves a touch of natural beauty.
							</p>
						</div>
						<div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9f6564]/10">
								<Sparkles className="h-6 w-6 text-[#9f6564]" />
							</div>
							<h3 className="mt-0 font-serif text-xl font-medium text-gray-800">
								Unique Arrangements
							</h3>
							<p className="mt-4 text-gray-600">
								Looking for something one-of-a-kind? We can create custom
								arrangements featuring rare blooms, specific color schemes, or
								themed designs that tell your story.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Process Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-center gap-16 md:flex-row">
						<div className="md:w-1/2">
							<h2 className="font-serif text-3xl font-light text-gray-800">
								How It Works
							</h2>
							<div className="mt-2 h-0.5 w-16 bg-[#9f6564]"></div>

							<div className="mt-8">
								<div className="mb-6 flex">
									<div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#9f6564] text-white">
										1
									</div>
									<div>
										<h3 className="font-serif text-xl font-medium text-gray-800">
											Share Your Vision
										</h3>
										<p className="mt-2 text-gray-600">
											Tell us about your ideas, preferences, and any specific
											requirements. The more details you provide, the better we
											can bring your vision to life.
										</p>
									</div>
								</div>

								<div className="mb-6 flex">
									<div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#9f6564] text-white">
										2
									</div>
									<div>
										<h3 className="font-serif text-xl font-medium text-gray-800">
											Consultation
										</h3>
										<p className="mt-2 text-gray-600">
											Our expert florists will discuss your request, suggest
											flowers and designs, and work with you to refine the
											concept until it's perfect.
										</p>
									</div>
								</div>

								<div className="mb-6 flex">
									<div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#9f6564] text-white">
										3
									</div>
									<div>
										<h3 className="font-serif text-xl font-medium text-gray-800">
											Creation
										</h3>
										<p className="mt-2 text-gray-600">
											Our skilled artisans carefully craft your custom
											arrangement using the freshest, highest-quality blooms and
											materials.
										</p>
									</div>
								</div>

								<div className="flex">
									<div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#9f6564] text-white">
										4
									</div>
									<div>
										<h3 className="font-serif text-xl font-medium text-gray-800">
											Delivery
										</h3>
										<p className="mt-2 text-gray-600">
											We'll ensure your custom creation arrives on time and in
											perfect condition, ready to make your special moment even
											more memorable.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="relative h-[400px] w-full overflow-hidden rounded-lg md:w-1/2">
							<Image
								src="/placeholder.svg?height=800&width=600"
								alt="Florist creating custom arrangement"
								fill
								className="object-cover"
							/>
							<div className="absolute inset-0 border-8 border-white/30"></div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="font-serif text-3xl font-light text-gray-800">
							Customer Stories
						</h2>
						<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
						<p className="mx-auto mt-4 max-w-2xl text-gray-600">
							Hear from clients who trusted us with their special requests
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{[
							{
								name: "Emily Johnson",
								quote:
									"I had a very specific vision for my wedding flowers, and Bloom & Petal exceeded all my expectations. They incorporated my grandmother's brooch into my bouquet, making it truly special.",
								image: "/placeholder.svg?height=100&width=100",
							},
							{
								name: "Michael Chen",
								quote:
									"I needed a unique arrangement with flowers that represented my wife's home country for our anniversary. Not only did they source these rare blooms, but they created something more beautiful than I imagined.",
								image: "/placeholder.svg?height=100&width=100",
							},
							{
								name: "Sarah Williams",
								quote:
									"For our corporate event, we needed arrangements that incorporated our brand colors and logo. The team created stunning pieces that perfectly complemented our branding while still looking natural and elegant.",
								image: "/placeholder.svg?height=100&width=100",
							},
						].map((testimonial, index) => (
							<div key={index} className="rounded-lg bg-white p-8 shadow-sm">
								<div className="mb-4 flex items-center">
									<div className="relative h-12 w-12 overflow-hidden rounded-full">
										<Image
											src={testimonial.image || "/placeholder.svg"}
											alt={testimonial.name}
											fill
											className="object-cover"
										/>
									</div>
									<div className="ml-4">
										<h3 className="font-medium text-gray-800">
											{testimonial.name}
										</h3>
										<div className="flex text-[#9f6564]">
											<Star className="h-4 w-4 fill-current" />
											<Star className="h-4 w-4 fill-current" />
											<Star className="h-4 w-4 fill-current" />
											<Star className="h-4 w-4 fill-current" />
											<Star className="h-4 w-4 fill-current" />
										</div>
									</div>
								</div>
								<p className="italic text-gray-600">"{testimonial.quote}"</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="rounded-lg bg-[#9f6564]/10 p-8 text-center shadow-sm md:p-12">
						<h2 className="font-serif text-3xl font-light text-gray-800">
							Ready to Create Something Special?
						</h2>
						<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
						<p className="mx-auto mt-6 max-w-2xl text-gray-600">
							We're excited to hear about your ideas and bring them to life.
							Contact us today to discuss your special request and let our
							floral artisans create something uniquely beautiful for you.
						</p>
						<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
							<Link
								href="/contact"
								className="inline-flex items-center justify-center rounded-md bg-[#9f6564] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9f6564]/90"
							>
								Contact Us
							</Link>
							<Link
								href="tel:+15551234567"
								className="inline-flex items-center justify-center rounded-md border border-[#9f6564] bg-white px-6 py-3 text-sm font-medium text-[#9f6564] transition-colors hover:bg-[#9f6564]/5"
							>
								<svg
									className="mr-2 h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
								</svg>
								Call Us
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Request Form Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-3xl">
						<div className="mb-8 text-center">
							<h2 className="font-serif text-3xl font-light text-gray-800">
								Tell Us About Your Request
							</h2>
							<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
							<p className="mx-auto mt-4 max-w-2xl text-gray-600">
								Fill out the form below and we'll get back to you within 24
								hours
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
							</div>

							<div className="grid gap-6 md:grid-cols-2">
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
								<div>
									<label
										htmlFor="date"
										className="mb-2 block text-sm font-medium text-gray-700"
									>
										Date Needed
									</label>
									<input
										type="date"
										id="date"
										className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#9f6564] focus:outline-none focus:ring-1 focus:ring-[#9f6564]"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="occasion"
									className="mb-2 block text-sm font-medium text-gray-700"
								>
									Occasion
								</label>
								<select
									id="occasion"
									className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#9f6564] focus:outline-none focus:ring-1 focus:ring-[#9f6564]"
								>
									<option value="" disabled selected>
										Select an occasion
									</option>
									<option value="wedding">Wedding</option>
									<option value="birthday">Birthday</option>
									<option value="anniversary">Anniversary</option>
									<option value="corporate">Corporate Event</option>
									<option value="sympathy">Sympathy/Funeral</option>
									<option value="other">Other</option>
								</select>
							</div>

							<div>
								<label
									htmlFor="message"
									className="mb-2 block text-sm font-medium text-gray-700"
								>
									Tell Us About Your Request
								</label>
								<textarea
									id="message"
									rows={5}
									className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#9f6564] focus:outline-none focus:ring-1 focus:ring-[#9f6564]"
									placeholder="Please describe your special request in detail. Include any specific flowers, colors, or design elements you'd like us to incorporate."
								></textarea>
							</div>

							<div>
								<label
									htmlFor="budget"
									className="mb-2 block text-sm font-medium text-gray-700"
								>
									Budget Range
								</label>
								<select
									id="budget"
									className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#9f6564] focus:outline-none focus:ring-1 focus:ring-[#9f6564]"
								>
									<option value="" disabled selected>
										Select your budget range
									</option>
									<option value="under100">Under $100</option>
									<option value="100-250">$100 - $250</option>
									<option value="250-500">$250 - $500</option>
									<option value="500-1000">$500 - $1,000</option>
									<option value="over1000">Over $1,000</option>
								</select>
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
									Subscribe to our newsletter for seasonal updates and special
									offers
								</label>
							</div>

							<div>
								<button
									type="submit"
									className="inline-flex w-full items-center justify-center rounded-md bg-[#9f6564] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9f6564]/90 sm:w-auto"
								>
									<MessageSquare className="mr-2 h-4 w-4" />
									Submit Request
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
