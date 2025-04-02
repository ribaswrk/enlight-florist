"use server";

export async function sendToWhatsApp(formData: FormData) {
	try {
		// Get your WhatsApp business phone number (with country code)
		const businessPhone = process.env.WHATSAPP_BUSINESS_PHONE;

		if (!businessPhone) {
			throw new Error("WhatsApp business phone number not configured");
		}

		// Extract form data
		const name = formData.get("name")?.toString() || "";
		const phone = formData.get("phone")?.toString() || "";
		const email = formData.get("email")?.toString() || "";
		const occasion = formData.get("occasion")?.toString() || "Not specified";
		const message = formData.get("message")?.toString() || "";

		// Format the message for WhatsApp
		const whatsappMessage = `
🌸 *New Florist Inquiry* 🌸

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Occasion:* ${occasion}

*Message:*
${message}
    `.trim();

		// Encode the message for a URL
		const encodedMessage = encodeURIComponent(whatsappMessage);

		// Create the WhatsApp API URL
		const whatsappUrl = `https://api.whatsapp.com/send?phone=${businessPhone}&text=${encodedMessage}`;

		return { success: true, url: whatsappUrl };
	} catch (error) {
		console.error("Error in sendToWhatsApp:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error occurred",
		};
	}
}
