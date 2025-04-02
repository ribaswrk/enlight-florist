"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
	const router = useRouter();

	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center p-4"
			style={{ backgroundColor: "#faf6f6" }}
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
			>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
					className="mx-auto mb-6 flex justify-center"
				>
					<CheckCircle size={80} className="text-[#9f6564]" />
				</motion.div>

				<motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
					className="text-2xl font-bold mb-2"
					style={{ color: "#9f6564" }}
				>
					Order Successfully Sent!
				</motion.h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className="text-gray-600 mb-8"
				>
					Thank you for your order. We've received your details and will contact
					you shortly via WhatsApp.
				</motion.p>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
				>
					<Button
						onClick={() => router.push("/home")}
						className="px-8 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-md"
						style={{
							backgroundColor: "#9f6564",
							color: "white",
							border: "none",
						}}
					>
						Return to Home
					</Button>
				</motion.div>
			</motion.div>
		</div>
	);
}
