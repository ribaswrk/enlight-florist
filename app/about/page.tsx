"use client";

import { Wind, Heart, MapPin, Phone } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-[#9f6564]/10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className=" text-4xl font-light tracking-wide text-gray-800 md:text-6xl">
            Tentang Kami
          </h1>
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
              <h2 className=" text-3xl font-light text-gray-800">Kisah Kami</h2>
              <div className="mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
              <p className="mt-6 text-gray-600">
                Sejak didirikan pada tahun 2016, Enlight Florist telah tumbuh
                dari sebuah usaha rumahan menjadi penyedia rangkaian bunga
                profesional yang dipercaya oleh banyak pelanggan, termasuk
                perusahaan besar seperti BCA, OCBC, dan Maybank.
              </p>
              <p className="mt-4 text-gray-600">
                Kami menghadirkan berbagai jenis karangan bunga—mulai dari
                buket, balon dekoratif, vas bunga, papan ucapan, hingga layanan
                dekorasi untuk berbagai acara spesial.
              </p>
              <p className="mt-4 text-gray-600">
                Dengan komitmen dan ketulusan, setiap rangkaian bunga kami buat
                secara personal untuk menemani momen berharga Anda. Kepuasan
                pelanggan adalah prioritas utama kami, karena kami percaya bahwa
                setiap bunga membawa pesan dan perasaan yang tak tergantikan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className=" text-3xl font-light text-gray-800">Our Values</h2>
            <div className="mx-auto mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9f6564]/10">
                <Wind className="h-8 w-8 text-[#9f6564]" />
              </div>
              <h3 className="mt-6  text-xl font-medium text-gray-800">
                Fleksibel
              </h3>
              <p className="mt-4 text-gray-600">
                Kami menyediakan berbagai macam pilihan bunga dan tidak terpaku
                pada produk yang kami tampilkan di katalog, anda bisa merubah
                warna, jenis bunga dan lain lain sesuai dengan keinginan anda
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9f6564]/10">
                <Heart className="h-8 w-8 text-[#9f6564]" />
              </div>
              <h3 className="mt-6  text-xl font-medium text-gray-800">Hati</h3>
              <p className="mt-4 text-gray-600">
                Setiap rangkaian bunga yang kami buat adalah hasil dari cinta
                dan perhatian kami terhadap detail. Kami percaya bahwa setiap
                bunga memiliki cerita dan makna yang mendalam.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9f6564]/10">
                <MapPin className="h-8 w-8 text-[#9f6564]" />
              </div>
              <h3 className="mt-6  text-xl font-medium text-gray-800">
                Kualitas
              </h3>
              <p className="mt-4 text-gray-600">
                Kami percaya bahwa setiap detail memiliki makna. Karena itu,
                kami selalu mengutamakan kualitas—mulai dari pemilihan bahan,
                proses pengerjaan, hingga pelayanan kepada pelanggan. Kualitas
                bagi kami bukan sekadar hasil akhir, tapi pengalaman menyeluruh
                yang memuaskan dan tahan lama.
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
                <h2 className=" text-2xl font-light text-gray-800 md:text-3xl">
                  Kunjungi Toko Kami
                </h2>
                <div className="mt-2 h-0.5 w-16 bg-[#9f6564]"></div>
                <p className="mt-4 text-gray-600">
                  Kami dengan senang hati menyambut anda semua di toko kami.
                </p>
                <div className="mt-6 flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-[#9f6564]" />
                  <span className="text-gray-600">
                    Jl. Imam Bonjol No.238d, RT.001/RW.004, Bojong Jaya, Kec.
                    Karawaci, Kota Tangerang, Banten 15115
                  </span>
                </div>
                <div className="mt-2 flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-[#9f6564]" />
                  <span className="text-gray-600">+62 819 9857 0313</span>
                </div>
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
