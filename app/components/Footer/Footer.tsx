import { Phone, Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
	return (
		<footer className="bg-gray-100 text-gray-600 py-8">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
					<div className="text-center md:text-left">
						<h3 className="text-lg font-semibold mb-4">Alamat</h3>
						<a
							href="https://maps.app.goo.gl/sK5CrxFnKak16FYs6"
							target="_blank"
							rel="noopener noreferrer"
							className="block text-inherit no-underline"
						>
							<p className="mb-2">Jl. Imam Bonjol No.238d, RT.001/RW.004</p>
							<p className="mb-2">Bojong Jaya, Kec. Karawaci</p>
							<p className="mb-2">Kota Tangerang, Banten 15115</p>
							<p>Indonesia</p>
						</a>
					</div>
					<div className="text-center md:text-right">
						<h3 className="text-lg font-semibold mb-4">Kontak</h3>
						<ul className="space-y-2">
							<li className="flex items-center justify-center md:justify-end">
								<Phone className="w-5 h-5 mr-2" />
								<a
									href="https://wa.me/6281998570313"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-gray-900"
								>
									+62 819 9857 0313
								</a>
							</li>
							<li className="flex items-center justify-center md:justify-end">
								<Instagram className="w-5 h-5 mr-2" />
								<a
									href="https://www.instagram.com/enlight.florist"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-gray-900"
								>
									@enlight.florist
								</a>
							</li>
							<li className="flex items-center justify-center md:justify-end">
								<Image
									src="/tokopedia.svg"
									alt="Tokopedia"
									width={20}
									height={20}
									className="mr-2"
								/>
								<a
									href="https://www.tokopedia.com/archive-dolinstore"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-gray-900"
								>
									Dolin Store
								</a>
							</li>
							<li className="flex items-center justify-center md:justify-end">
								<Image
									src="/shopee.svg"
									alt="Shopee"
									width={20}
									height={20}
									className="mr-2"
								/>
								<a
									href="https://shopee.co.id/enlight.florist"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-gray-900"
								>
									Enlight Florist
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 text-center">
					<p>&copy; 2025 Enlight Florist. All Rights Reserved.</p>
				</div>
			</div>
		</footer>
	);
}
