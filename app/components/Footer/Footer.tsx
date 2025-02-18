import { Mail, Phone, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-gray-100 text-gray-600 py-8">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
					<div className="text-center md:text-left">
						<h3 className="text-lg font-semibold mb-4">Address</h3>
						<p className="mb-2">123 Example Street</p>
						<p className="mb-2">Example City, 12345</p>
						<p>United States</p>
					</div>
					<div className="text-center">
						<h3 className="text-lg font-semibold mb-4">Your Company</h3>
						<p>Providing quality services since 2023</p>
					</div>
					<div className="text-center md:text-right">
						<h3 className="text-lg font-semibold mb-4">Contact</h3>
						<ul className="space-y-2">
							<li className="flex items-center justify-center md:justify-end">
								<Mail className="w-5 h-5 mr-2" />
								<Link
									href="mailto:info@example.com"
									className="hover:text-gray-900"
								>
									info@example.com
								</Link>
							</li>
							<li className="flex items-center justify-center md:justify-end">
								<Phone className="w-5 h-5 mr-2" />
								<Link
									href="https://wa.me/12345678901"
									className="hover:text-gray-900"
								>
									+1 (234) 567-8901
								</Link>
							</li>
							<li className="flex items-center justify-center md:justify-end">
								<Instagram className="w-5 h-5 mr-2" />
								<Link
									href="https://www.instagram.com/example"
									className="hover:text-gray-900"
								>
									@example
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 text-center">
					<p>
						&copy; {new Date().getFullYear()} Your Company Name. All Rights
						Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
