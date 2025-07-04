"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

interface Product {
	id: number;
	category: string;
	categoryId: number;
	name: string;
	price: string;
	priceDisc: string;
	soldqty: string;
	homeView: number;
	addFlag: number;
	addVal: string;
	images: string[];
	description: string;
}

interface FormData {
	quantity: number;
	balloonText?: string;
	variant?: string;
	name: string;
	recipientName: string;
	phoneNumber: string;
	shippingAddress: string;
	deliveryDateTime: string;
	cardMessage?: string;
}

interface Varian {
	name: string;
	price: string;
	discPrice: string;
}

export default function ShippingPage() {
	const { id } = useParams();
	const router = useRouter();
	const [varian, setVarian] = useState<Varian[]>([]);
	const [formData, setFormData] = useState<FormData>({
		name: "",
		recipientName: "",
		phoneNumber: "",
		shippingAddress: "",
		quantity: 1,
		cardMessage: "",
		balloonText: "",
		deliveryDateTime: "",
		variant: "",
	});

	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	// Replace with your WhatsApp business phone number (international format without + or spaces)
	const WHATSAPP_NUMBER = "6281998570313";

	const formatRupiah = (price: number) =>
		new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(price);

	const formatTanggalBaru = (date: Date) => {
		const dd = String(date.getDate()).padStart(2, "0");
		const mm = String(date.getMonth() + 1).padStart(2, "0"); // Januari = 0
		const yyyy = date.getFullYear();
		const hh = String(date.getHours()).padStart(2, "0");
		const min = String(date.getMinutes()).padStart(2, "0");
		return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
	};

	const fetchProductDetail = useCallback(async () => {
		try {
			setLoading(true);
			const res = await fetch(`/api/protected/products?productId=${id}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (!res.ok) throw new Error("Failed to fetch product");

			const data = await res.json();

			setProduct(data[0]);
			const rawAddVal = data[0].addVal;

			const parsedVarian =
				rawAddVal && rawAddVal !== "0" ? JSON.parse(rawAddVal) : [];

			setVarian(parsedVarian);

			// Set default varian jika tersedia
			if (parsedVarian.length > 0) {
				setFormData((prevData) => ({
					...prevData,
					variant: parsedVarian[0].name,
				}));
			}
		} catch (error) {
			console.error("Error fetching product:", error);
		} finally {
			setLoading(false);
		}
	}, [id]);

	useEffect(() => {
		if (!id) return;
		fetchProductDetail();
	}, [fetchProductDetail, id]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!product) return;

		// Format the message for WhatsApp
		const message = formatWhatsAppMessage(formData, product);

		// Create WhatsApp URL with the message
		const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
			message
		)}`;
		// Open WhatsApp in a new tab
		window.open(whatsappUrl, "_blank");

		router.push("/order-success");
	};

	const formatWhatsAppMessage = (formData: FormData, product: Product) => {
		const selectedVarian = getSelectedVarian();
		const basePrice = Number(
			selectedVarian?.discPrice ||
				selectedVarian?.price ||
				product.priceDisc ||
				product.price
		);
		const totalPrice = basePrice * formData.quantity;
		const balloonTextSection =
			product.category.toLowerCase() === "balloon"
				? `*TEKS BALON:*
${formData.balloonText || "-"}

`
				: "";

		return `*✨ PESANAN BARU ✨*
━━━━━━━━━━━━━━━━━━━━━

*DETAIL PRODUK:*
• *Produk:* ${product.name}
• *Harga:* ${formatRupiah(basePrice)}
• *Jumlah:* ${formData.quantity}
• *Jenis Bunga:* ${formData.variant ? formData.variant : ""}
• *Total:* ${formatRupiah(totalPrice)}

*INFORMASI PELANGGAN:*
• *Pengirim:* ${formData.name}
• *Penerima:* ${formData.recipientName}
• *Telepon:* ${formData.phoneNumber}

*INFORMASI PENGIRIMAN:*
• *Alamat:* ${formData.shippingAddress}
• *Tanggal & Waktu:* ${formData.deliveryDateTime}

*PESAN KARTU:*
${formData.cardMessage || "-"}

${balloonTextSection}

━━━━━━━━━━━━━━━━━━━━━
*ID Pesanan:* \`${Date.now()}\`
*Tanggal Pesanan:* \`${formatTanggalBaru(new Date())}\`
━━━━━━━━━━━━━━━━━━━━━`;
	};

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8 flex justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<h1 className="text-2xl font-bold mb-4">Produk tidak ada</h1>
				<p>
					Produk yang Anda cari tidak ditemukan. Mungkin sudah dihapus atau
					tidak tersedia lagi.
				</p>
				<Button
					className="mt-6 bg-teal-500 hover:bg-teal-600"
					onClick={() => router.push("/home")}
				>
					Kembali ke halaman utama
				</Button>
			</div>
		);
	}

	const getSelectedVarian = () => {
		return Array.isArray(varian)
			? varian.find((v) => v.name === formData.variant)
			: undefined;
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<Button
				onClick={() => router.back()}
				variant="default"
				className="flex items-center text-black-500 hover:underline"
			>
				<ArrowUturnLeftIcon className="h-8 w-8 mr-2" />
			</Button>
			<h1 className="text-2xl font-bold mb-6 text-center">Rincian Pesanan</h1>
			<div className="max-w-md mx-auto mt-8">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<label
							htmlFor="productName"
							className="block text-sm font-semibold text-gray-700"
						>
							Nama Produk
						</label>
						<input
							id="productName"
							name="productName"
							value={product ? product.name : ""}
							disabled
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-100"
						/>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="price"
							className="block text-sm font-semibold text-gray-700"
						>
							Harga
						</label>
						<input
							id="price"
							name="price"
							value={formatRupiah(
								Number(
									getSelectedVarian()?.discPrice ||
										getSelectedVarian()?.price ||
										product.priceDisc ||
										product.price
								)
							)}
							disabled
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-100"
						/>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="quantity"
							className="block text-sm font-semibold text-gray-700"
						>
							Jumlah
						</label>
						<input
							id="quantity"
							name="quantity"
							type="number"
							min="1"
							value={formData.quantity}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
						/>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="name"
							className="block text-sm font-semibold text-gray-700"
						>
							Nama Pengirim
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
							Nama Penerima
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
							Nomor Telepon
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
							Alamat Kirim
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

					{/* Remove the email field div entirely */}

					{/* Add these new fields before the total price section */}
					<div className="space-y-2">
						<label
							htmlFor="cardMessage"
							className="block text-sm font-semibold text-gray-700"
						>
							Kartu Ucapan
						</label>
						<textarea
							id="cardMessage"
							name="cardMessage"
							value={formData.cardMessage}
							onChange={handleChange}
							placeholder="Enter your card message here"
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
						/>
					</div>
					{product.category === "baloon" && (
						<div className="space-y-2">
							<label
								htmlFor="balloonText"
								className="block text-sm font-semibold text-gray-700"
							>
								Tulisan di Balon
							</label>
							<input
								id="balloonText"
								name="balloonText"
								value={formData.balloonText}
								onChange={handleChange}
								placeholder="Text to print on balloon"
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
							/>
						</div>
					)}

					<div className="space-y-2">
						<label
							htmlFor="deliveryDateTime"
							className="block text-sm font-semibold text-gray-700"
						>
							Waktu dan Tanggal Pengiriman
						</label>
						<input
							id="deliveryDateTime"
							name="deliveryDateTime"
							type="datetime-local"
							value={formData.deliveryDateTime}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
						/>
					</div>

					{varian.length > 0 && (
						<div className="space-y-2">
							<label
								htmlFor="variant"
								className="block text-sm font-semibold text-gray-700"
							>
								Pilih Varian
							</label>
							<select
								id="variant"
								name="variant"
								value={formData.variant}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
							>
								{varian.map((item: Varian, index: number) => (
									<option key={index} value={item.name}>
										{item.name}
									</option>
								))}
							</select>
						</div>
					)}

					<div className="pt-4">
						<div className="flex justify-between font-semibold text-lg">
							<span>Total:</span>
							<span>
								{formatRupiah(
									Number(
										getSelectedVarian()?.discPrice ||
											getSelectedVarian()?.price ||
											product.priceDisc ||
											product.price
									) * formData.quantity
								)}
							</span>
						</div>
					</div>

					<Button
						type="submit"
						className="w-full py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
					>
						Order via WhatsApp
					</Button>
				</form>
			</div>
		</div>
	);
}
