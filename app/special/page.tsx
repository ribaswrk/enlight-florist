'use client";';
import Link from "next/link";
import React from "react";
import Head from "next/head";

export default function SpecialRequest() {
	// 	const formatWhatsAppMessage = `*✨ Special Request ✨*
	// ━━━━━━━━━━━━━━━━━━━━━
	// Halo min, saya ingin memesan bunga impian saya! 🌸
	// Mohon bantuannya yaa`;

	return (
		<>
			<Head>
				<title>
					Special Request - Custom Bunga & Bouquets | Enlight Florist
				</title>
				<meta
					name="description"
					content="Pesan custom bunga dan bouquets impian anda di Enlight Florist. Kami siap mewujudkan rangkaian bunga sesuai keinginan Anda."
				/>
				<meta
					name="keywords"
					content="special request, custom bunga, custom bouquets, bunga impian, rangkaian bunga, Enlight Florist"
				/>
				<meta name="author" content="Enlight Florist" />
			</Head>
			<div className="min-h-screen bg-white font-poppins">
				{/* Hero Section */}
				<section className="relative h-[50vh] overflow-hidden">
					<div className="absolute inset-0 bg-[#9f6564]/10"></div>
					<div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
						<h1 className=" text-4xl font-light tracking-wide text-gray-800 md:text-6xl">
							Special Request
						</h1>
						<div className="mt-4 h-0.5 w-24 bg-[#9f6564]"></div>
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
							<h2 className=" text-3xl font-light text-gray-800">
								Kami Siap Mewujudkan Mimpi Bunga Anda
							</h2>
							<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
							<p className="mt-6 text-gray-600">
								Di Enlight Florist, kami dengan senang hati menerima pesanan
								custom bagi Anda yang menginginkan rangkaian bunga dengan model
								atau warna khusus yang belum tersedia di katalog kami.
							</p>
							<p className="mt-4 text-gray-600">
								Jika Anda memiliki referensi foto atau desain tertentu, silakan
								kirimkan kepada kami, kami siap mewujudkannya sesuai keinginan
								Anda. Jangan ragu untuk menghubungi admin kami dan menyampaikan
								semua permintaan Anda. Kami akan dengan senang hati membantu
								hingga Anda menemukan rangkaian bunga yang paling cocok untuk
								momen spesial Anda.
							</p>
						</div>
					</div>
				</section>
				{/* Process Section */}
				<section className="py-16">
					<div className="container mx-auto px-4">
						<div className="flex flex-col items-center gap-16 md:flex-row">
							<div className="md:w-1/2">
								<h2 className=" text-3xl font-light text-gray-800">
									Cara mewujudkan mimpi bunga anda
								</h2>
								<div className="mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
								<div className="mt-8">
									<div className="mb-6 flex">
										<div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#9f6564] text-white">
											1
										</div>
										<div>
											<h3 className=" text-xl font-medium text-gray-800">
												Hubungi kami
											</h3>
											<p className="mt-2 text-gray-600">
												Bisa menghubungi kami melalui Whatsapp di nomor +62 819
												9857 0313
											</p>
										</div>
									</div>
									<div className="mb-6 flex">
										<div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#9f6564] text-white">
											2
										</div>
										<div>
											<h3 className=" text-xl font-medium text-gray-800">
												Konsultasi
											</h3>
											<p className="mt-2 text-gray-600">
												Berikan kami rincian bunga impian anda seperti jenis
												bunga, warna kertas, atau barang apa yang ingin
												dimasukan kedalam rangkaian bunga kami, apapun itu kami
												akan berusaha sebaik mungkin untuk mewujudkannya.
											</p>
										</div>
									</div>
									<div className="mb-6 flex">
										<div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#9f6564] text-white">
											3
										</div>
										<div>
											<h3 className=" text-xl font-medium text-gray-800">
												Feedback
											</h3>
											<p className="mt-2 text-gray-600">
												Setelah anda memberikan kami detail yang diinginkan,
												kami juga akan memberikan saran terbaik yang kami miliki
												untuk bunga impian anda, kami juga akan memberikan
												estimasi harganya kepada anda
											</p>
										</div>
									</div>

									<div className="flex">
										<div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#9f6564] text-white">
											4
										</div>
										<div>
											<h3 className=" text-xl font-medium text-gray-800">
												Pengiriman
											</h3>
											<p className="mt-2 text-gray-600">
												Setelah sepakat kami akan mengerjakannya dan mengirimkan
												pesanan anda.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* Testimonials */}
				<section className="bg-gray-50 py-16">
					<div className="container mx-auto px-4">
						<div className="mb-12 text-center">
							<h2 className=" text-3xl font-light text-gray-800">
								Cerita Pelanggan Kami
							</h2>
							<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
							<p className="mx-auto mt-4 max-w-2xl text-gray-600">
								Suara pelanggan kami yang sudah menggunakan jasa special request
								kami !
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{[
								"Adminnya fast respon, slalu bagus & memuaskan hasilnya 💖 best bgt !!!",
								"Bunga dan wrappingannya cantik. Pas banget buat temen yang lagi graduation. Padahal order h-1 pas weekend, tapi hasilnya memuaskan banget. Pilihan bunganya macem macem dan lucu, karena ga cuma bunga tapi ada bouquet foto dll.",
								"Pesan papan bunga untuk rekan kerja yang sedang berduka, hasilnya cepat, rapi, dan pengirimannya tepat waktu. Adminnya juga responsif banget, bantu proses dari awal sampai selesai. Thank you Enlight Florist!",
								"Udah beberapa kali order papan bunga untuk acara kantor dan hasilnya selalu memuaskan. Bahkan pernah minta custom tulisan agak panjang, dan tetap ditata cantik di papan. Recommended banget!",
								"Terima kasih Enlight Florist! Papan bunga ucapan selamatnya keren, elegan, dan beda dari yang biasa saya lihat. Klien kami suka banget. Pasti repeat order untuk acara berikutnya.",
								"Sukaaa bgt buketnya lucuuu bgt, ownernya jg ramah, jujurly aku ga expect sebagus iniii, over all worth it banget 😍❤",
							].map((quote, index) => (
								<div
									key={index}
									className="rounded-lg bg-white p-6 text-gray-600 italic shadow-sm"
								>
									“{quote}”
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-16">
					<div className="container mx-auto px-4">
						<div className="rounded-lg bg-[#9f6564]/10 p-8 text-center shadow-sm md:p-12">
							<h2 className=" text-3xl font-light text-gray-800">
								Siap untuk memesan bunga impian anda?
							</h2>
							<div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
							<p className="mx-auto mt-6 max-w-2xl text-gray-600">
								Kami sangat senang mendengar ide-ide cantik dari bunga impian
								anda. Segera hubungi kami dengan menekan tombol dibawah ini,
								Anda akan langsung diarahakn ke Whatsapp kami.
							</p>
							<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
								<Link
									href={`https://wa.me/6281998570313?text=Halo%20min%2C%20saya%20ingin%20memesan%20bunga%20impian%20saya%21%20Mohon%20bantuannya%20yaa
`}
									target="_blank" // Menambahkan target _blank agar terbuka di tab baru
									className="inline-flex items-center justify-center rounded-md bg-[#9f6564] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9f6564]/90"
								>
									Whatsapp
								</Link>
							</div>
						</div>
					</div>
				</section>
				{/* Decorative Elements */}
				<div className="pointer-events-none fixed -bottom-24 -left-24 z-0 h-64 w-64 rounded-full bg-[#9f6564]/5"></div>
				<div className="pointer-events-none fixed -right-32 top-1/4 z-0 h-96 w-96 rounded-full bg-[#9f6564]/5"></div>
			</div>
		</>
	);
}
