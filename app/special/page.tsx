import React from "react";

export default function SpecialRequest() {
	return (
		<div className="bg-gradient-to-b from-pink-500 to-rose-400 min-h-screen flex flex-col justify-center text-white">
			<header className="text-center py-16">
				<h1 className="text-5xl font-bold mb-4">Buat Pesanan Bunga Spesial</h1>
				<p className="text-xl">
					Wujudkan rangkaian bunga impian Anda dengan desain eksklusif dan
					personal!
				</p>
			</header>

			<section className="flex flex-col md:flex-row items-center justify-center px-6 py-16 space-y-8 md:space-y-0 md:space-x-8">
				{/* Gambar */}
				<div className="flex-shrink-0 w-full md:w-1/2">
					<img
						src="/images/special-flowers.jpg"
						alt="Special Flower Arrangement"
						className="w-full rounded-lg shadow-lg object-cover"
					/>
				</div>

				{/* Informasi */}
				<div className="w-full md:w-1/2 text-center md:text-left">
					<h2 className="text-3xl font-semibold mb-4">
						Mengapa Pesan Bunga Spesial?
					</h2>
					<p className="text-lg mb-4">
						Kami memahami bahwa setiap momen istimewa membutuhkan sentuhan yang
						unik. Dengan layanan **Special Request**, Anda bisa:
					</p>
					<ul className="list-none space-y-2 mb-6 text-lg">
						<li>🌸 Memilih jenis bunga favorit Anda</li>
						<li>🎨 Menyesuaikan warna dan desain rangkaian</li>
						<li>💌 Menambahkan pesan khusus yang bermakna</li>
						<li>🚚 Mengatur pengiriman di tanggal spesial</li>
					</ul>
					<a
						href="#contact"
						className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-lg text-xl font-semibold shadow-lg transform transition-transform hover:scale-105"
					>
						Hubungi Kami Sekarang
					</a>
				</div>
			</section>

			{/* Bagian Hubungi Kami */}
			<section id="contact" className="bg-white text-gray-800 py-16">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-semibold mb-6">
						Siap Membuat Bunga Spesial?
					</h2>
					<p className="text-xl mb-8">
						Tim kami siap membantu Anda merancang karangan bunga yang sempurna.
						Hubungi kami sekarang dan wujudkan impian Anda!
					</p>
					<a
						href="https://wa.me/6281234567890"
						className="bg-green-500 text-white px-8 py-4 rounded-lg text-2xl font-semibold transform transition-transform hover:scale-105"
					>
						WhatsApp Kami 💬
					</a>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-800 text-white text-center py-6 mt-auto">
				<p>&copy; 2025 Toko Bunga Anda. Keindahan dalam Setiap Momen.</p>
			</footer>
		</div>
	);
}
