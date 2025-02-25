"use client"

import Image from "next/image";
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
	{
		text: "Enlight Florist never fails to amaze me with their stunning arrangements. They've been my go-to for every special occasion!",
		author: "Sarah J.",
	},
	{
		text: "The team at Enlight Florist brought my wedding vision to life. Their flowers were the talk of the reception!",
		author: "Michael & Emma",
	},
	{
		text: "I'm always impressed by the creativity and quality of Enlight Florist's bouquets. They truly brighten up my day!",
		author: "David L.",
	},
	{
		text: "For corporate events, Enlight Florist is our only choice. Their professionalism and attention to detail are unmatched.",
		author: "Laura M., Event Planner",
	},
];

export default function AboutUs() {
	const [currentTestimonial, setCurrentTestimonial] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
		}, 5000); // Change testimonial every 5 seconds

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Origin Story */}
			<section className="mb-16">
				<h1 className="text-4xl font-bold mb-6">About Enlight Florist</h1>
				<p className="text-lg mb-4">
					Enlight Florist blossomed into existence in 2015, founded by a
					passionate group of floral enthusiasts who dreamed of bringing light
					and joy to people's lives through the beauty of flowers. What started
					as a small corner shop has now grown into a beloved local institution,
					known for our creative arrangements and commitment to quality.
				</p>
				<p className="text-lg">
					Our journey began with a simple idea: to create floral designs that
					not only please the eye but also touch the heart. Over the years,
					we've cultivated relationships with local growers, experimented with
					unique combinations, and always strived to exceed our customers'
					expectations.
				</p>
			</section>

			{/* Testimonials Carousel */}
			<section className="mb-16">
				<h2 className="text-3xl font-semibold mb-6">What Our Clients Say</h2>
				<div className="bg-gray-100 p-6 rounded-lg h-48 flex flex-col justify-center">
					<p className="italic mb-4 text-center">
						&ldquo;{testimonials[currentTestimonial].text}&rdquo;
					</p>
					<p className="font-semibold text-center">
						- {testimonials[currentTestimonial].author}
					</p>
				</div>
				<div className="flex justify-center mt-4">
					{testimonials.map((_, index) => (
						<button
							key={index}
							className={`h-3 w-3 rounded-full mx-1 ${
								index === currentTestimonial ? "bg-blue-500" : "bg-gray-300"
							}`}
							onClick={() => setCurrentTestimonial(index)}
						/>
					))}
				</div>
			</section>

			{/* Store Location */}
			<section className="mb-16">
				<h2 className="text-3xl font-semibold mb-6">Visit Our Store</h2>
				<div className="flex items-center mb-4">
					<MapPin className="mr-2" />
					<p className="text-lg">123 Blossom Street, Flowertown, FL 12345</p>
				</div>
				<div className="aspect-w-16 aspect-h-9">
					<Image
						src="/placeholder.svg?height=450&width=800"
						alt="Map of Enlight Florist location"
						width={800}
						height={450}
						className="rounded-lg object-cover"
					/>
				</div>
			</section>
		</div>
	);
}
