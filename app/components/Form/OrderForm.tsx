"use client";

import React, { useState } from "react";

export default function ShippingForm() {
	const [formData, setFormData] = useState({
		name: "",
		recipientName: "",
		phoneNumber: "",
		shippingAddress: "",
		email: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		// Here you would typically send the data to your server or API
	};

	return (
		<div className="max-w-md mx-auto mt-8">
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="space-y-2">
					<label
						htmlFor="name"
						className="block text-sm font-semibold text-gray-700"
					>
						Sender Name
					</label>
					<input
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="recipientName"
						className="block text-sm font-semibold text-gray-700"
					>
						Recipient's Name
					</label>
					<input
						id="recipientName"
						name="recipientName"
						value={formData.recipientName}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="phoneNumber"
						className="block text-sm font-semibold text-gray-700"
					>
						Phone Number
					</label>
					<input
						id="phoneNumber"
						name="phoneNumber"
						type="tel"
						value={formData.phoneNumber}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="shippingAddress"
						className="block text-sm font-semibold text-gray-700"
					>
						Deliver Address
					</label>
					<textarea
						id="shippingAddress"
						name="shippingAddress"
						value={formData.shippingAddress}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="email"
						className="block text-sm font-semibold text-gray-700"
					>
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
				>
					Order
				</button>
			</form>
		</div>
	);
}
