import { Award, TicketPercent, Clock, Gift } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Corporate() {
  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-[#9f6564]/10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className=" text-4xl font-light tracking-wide text-gray-800 md:text-6xl">
            Corporate Partnership
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
              Enlight Florist Corporate Partnership
            </h2>
            <div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
            <p className="mt-6 text-gray-600">
              Enlight Florist sangat terbuka untuk menjalin kerja sama dengan
              perusahaan (PT) atau brand yang membutuhkan rangkaian bunga untuk
              berbagai keperluan, seperti ucapan selamat, dukacita, atau hadiah
              bagi rekan bisnis dan klien.
            </p>
            <p className="mt-4 text-gray-600">
              Kami menyediakan potongan harga khusus serta berbagai benefit
              menarik bagi mitra korporat yang ingin bekerja sama secara
              berkelanjutan. Hubungi tim kami untuk mendiskusikan kebutuhan Anda
              dan temukan solusi terbaik yang sesuai dengan brand atau
              perusahaan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className=" text-3xl font-light text-gray-800">
              Keuntungan Partnership
            </h2>
            <div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Berikut adalah keuntungan menjalin kerja sama dengan kami
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Item 1 */}
            <div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9f6564]/10">
                <TicketPercent className="h-6 w-6 text-[#9f6564]" />
              </div>
              <h3 className=" text-xl font-semibold text-gray-800">
                Harga Spesial
              </h3>
              <p className="mt-4 text-gray-600">
                Kami memberikan harga spesial untuk produk yang dipesan.
              </p>
            </div>

            {/* Item 2 */}
            <div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9f6564]/10">
                <Clock className="h-6 w-6 text-[#9f6564]" />
              </div>
              <h3 className=" text-xl font-semibold text-gray-800">
                Hampers Eksklusif
              </h3>
              <p className="mt-4 text-gray-600">
                Kami siap menerima pesanan dalam jumlah banyak untuk hari besar
                atau event perusahaan.
              </p>
            </div>

            {/* Item 3 */}
            <div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9f6564]/10">
                <Award className="h-6 w-6 text-[#9f6564]" />
              </div>
              <h3 className=" text-xl font-semibold text-gray-800">
                Pembayaran Tempo
              </h3>
              <p className="mt-4 text-gray-600">
                Kami memberikan sistem pembayaran tempo sesuai kesepakatan
                bersama.
              </p>
            </div>

            {/* Item 4 */}
            <div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9f6564]/10">
                <Gift className="h-6 w-6 text-[#9f6564]" />
              </div>
              <h3 className=" text-xl font-semibold text-gray-800">
                Program Membership
              </h3>
              <p className="mt-4 text-gray-600">
                Setiap pembelian produk ke-sepuluh anda akan mendapatkan gratis
                1 rangkaian bunga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className=" text-3xl font-light text-gray-800">Perusahaan</h2>
            <div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Berikut beberapa perusahaan yang sudah pernah memesan produk kami
            </p>
          </div>

          <div>
            {/* Grid of logos */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center rounded-lg bg-white p-6 shadow-sm"
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[#9f6564]/20">
                    <Image
                      src={`/logos/logo-${index + 1}.png`} // ganti dengan path logo asli
                      alt={`Company logo ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className=" text-3xl font-light text-gray-800">
              Cara Menjalin Kerja Sama
            </h2>
            <div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
          </div>

          <div className="mx-auto max-w-3xl text-center text-gray-700">
            Caranya sangat mudah, cukup hubungi kami melalui Whatsapp, lalu kami
            siap kerja sama apa yang anda butuhkan dan kami siap menjalin kerja
            sama yang baik dengan perusahaan anda.
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-lg bg-[#9f6564]/10 p-8 text-center shadow-sm md:p-12">
            <h2 className=" text-3xl font-light text-gray-800">
              Siap untuk menjalin kerja sama dengan kami ?
            </h2>
            <div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
            <p className="mx-auto mt-6 max-w-2xl text-gray-600">
              Hubungi kami sekarang dan kami siap mendiskusikan kebutuhan
              perusahaan anda, silahkan hubungi Whatsapp kami dengan menekan
              tombol dibawah ini.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="https://wa.me/6281998570313?text=Halo%20min%2C%20saya%20ingin%20menjalin%20partnership%20dengan%20enlight%20florist%2C%20bisakah%20minta%20waktunya%20untuk%20berdiskusi%20%3F"
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
  );
}
