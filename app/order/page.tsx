import ShippingForm from "../components/Form/OrderForm";

export default function ShippingPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-6 text-center">
				Order Information
			</h1>
			<ShippingForm />
		</div>
	);
}
