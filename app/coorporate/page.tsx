import React from "react";

export default function Corporate() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-400 text-white text-center py-16">
        <h1 className="text-4xl font-bold">Bermitra dengan Kami 🤝</h1>
        <p className="text-lg mt-2">
          Solusi terbaik untuk kerja sama bisnis yang sukses
        </p>
      </header>

      {/* Section - Kenapa Bermitra dengan Kami */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Kenapa Memilih Kami?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <span className="text-blue-500 text-5xl">🚀</span>
            <h3 className="text-xl font-semibold mt-4">Inovasi & Teknologi</h3>
            <p className="text-gray-600 mt-2">
              Kami menggunakan teknologi terbaru untuk memberikan solusi terbaik
              bagi mitra kami.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <span className="text-blue-500 text-5xl">💼</span>
            <h3 className="text-xl font-semibold mt-4">Jaringan Luas</h3>
            <p className="text-gray-600 mt-2">
              Jaringan bisnis kami tersebar luas untuk membantu pertumbuhan
              usaha Anda.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <span className="text-blue-500 text-5xl">📈</span>
            <h3 className="text-xl font-semibold mt-4">
              Profitabilitas Tinggi
            </h3>
            <p className="text-gray-600 mt-2">
              Kami menawarkan model kerja sama yang menguntungkan dan
              berkelanjutan.
            </p>
          </div>
        </div>
      </section>

      {/* Section - Cara Kerja */}
      <section className="bg-blue-50 py-16 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Cara Kerja Kami
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">📞 Konsultasi Awal</h3>
            <p className="text-gray-600 mt-2">
              Kami memahami kebutuhan Anda melalui pertemuan awal.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">🛠️ Perencanaan</h3>
            <p className="text-gray-600 mt-2">
              Tim kami akan menyusun strategi dan solusi terbaik untuk bisnis
              Anda.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">🚀 Eksekusi & Kolaborasi</h3>
            <p className="text-gray-600 mt-2">
              Kami menjalankan proyek bersama dengan pendekatan profesional.
            </p>
          </div>
        </div>
      </section>

      {/* Section - Call to Action */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Siap Bekerja Sama?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Hubungi kami sekarang dan mari ciptakan kesuksesan bersama!
        </p>
        <a
          href="mailto:partnership@yourcompany.com"
          className="bg-blue-600 text-white px-8 py-3 text-lg rounded-lg font-semibold shadow-md transition hover:bg-blue-700"
        >
          Hubungi Kami 📩
        </a>
      </section>
    </div>
  );
}
