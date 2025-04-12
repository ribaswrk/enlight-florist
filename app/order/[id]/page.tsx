'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  homeView: number;
  stock: string;
}

export default function ShippingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    recipientName: '',
    phoneNumber: '',
    shippingAddress: '',
    quantity: 1,
    cardMessage: '',
    balloonText: '',
    deliveryDateTime: '',
    flowerType: 'real', // Default to real flowers
  });

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Replace with your WhatsApp business phone number (international format without + or spaces)
  const WHATSAPP_NUMBER = '6281998570313';

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/protected/products?productId=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Failed to fetch product');

      const data = await res.json();
      console.log('Fetched product:', data[0]);

      setProduct(data[0]);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchProductDetail();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    // Format the message for WhatsApp
    const message = formatWhatsAppMessage(formData, product);

    // Create WhatsApp URL with the message
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    router.push('/order-success');
  };

  const formatWhatsAppMessage = (formData: any, product: Product) => {
    const totalPrice = Number.parseFloat(product.price) * formData.quantity;
    const balloonTextSection =
      product.category.toLowerCase() === 'balloon'
        ? `*TEKS BALON:*
${formData.balloonText || '-'}

`
        : '';

    return `*✨ PESANAN BARU ✨*
━━━━━━━━━━━━━━━━━━━━━

*DETAIL PRODUK:*
• *Produk:* ${product.name}
• *Harga:* ${product.price}
• *Jumlah:* ${formData.quantity}
• *Jenis Bunga:* ${
      formData.flowerType === 'real' ? 'Bunga Asli' : 'Bunga Artificial'
    }
• *Total:* ${totalPrice.toFixed(2)}

*INFORMASI PELANGGAN:*
• *Pengirim:* ${formData.name}
• *Penerima:* ${formData.recipientName}
• *Telepon:* ${formData.phoneNumber}

*INFORMASI PENGIRIMAN:*
• *Alamat:* ${formData.shippingAddress}
• *Tanggal & Waktu:* ${formData.deliveryDateTime}

*PESAN KARTU:*
${formData.cardMessage || '-'}

${balloonTextSection}

━━━━━━━━━━━━━━━━━━━━━
*ID Pesanan:* \`${Date.now()}\`
*Tanggal Pesanan:* \`${new Date().toLocaleString()}\`
━━━━━━━━━━━━━━━━━━━━━`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Button
          className="mt-6 bg-teal-500 hover:bg-teal-600"
          onClick={() => router.push('/home')}
        >
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Order Information</h1>
      <div className="max-w-md mx-auto mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="productName"
              className="block text-sm font-semibold text-gray-700"
            >
              Product Name
            </label>
            <input
              id="productName"
              name="productName"
              value={product ? product.name : ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              value={product ? `$${product.price}` : ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="quantity"
              className="block text-sm font-semibold text-gray-700"
            >
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Sender Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="recipientName"
              className="block text-sm font-semibold text-gray-700"
            >
              Recipient's Name
            </label>
            <input
              id="recipientName"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="shippingAddress"
              className="block text-sm font-semibold text-gray-700"
            >
              Delivery Address
            </label>
            <textarea
              id="shippingAddress"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Remove the email field div entirely */}

          {/* Add these new fields before the total price section */}
          <div className="space-y-2">
            <label
              htmlFor="cardMessage"
              className="block text-sm font-semibold text-gray-700"
            >
              Card Message
            </label>
            <textarea
              id="cardMessage"
              name="cardMessage"
              value={formData.cardMessage}
              onChange={handleChange}
              placeholder="Enter your card message here"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          {product.category === 'baloon' && (
            <div className="space-y-2">
              <label
                htmlFor="balloonText"
                className="block text-sm font-semibold text-gray-700"
              >
                Balloon Text
              </label>
              <input
                id="balloonText"
                name="balloonText"
                value={formData.balloonText}
                onChange={handleChange}
                placeholder="Text to print on balloon"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="deliveryDateTime"
              className="block text-sm font-semibold text-gray-700"
            >
              Delivery Date & Time
            </label>
            <input
              id="deliveryDateTime"
              name="deliveryDateTime"
              type="datetime-local"
              value={formData.deliveryDateTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="flowerType"
              className="block text-sm font-semibold text-gray-700"
            >
              Flower Type
            </label>
            <select
              id="flowerType"
              name="flowerType"
              value={formData.flowerType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="real">Real Flowers</option>
              <option value="artificial">Artificial Flowers</option>
            </select>
          </div>

          <div className="pt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>
                $
                {(Number.parseFloat(product.price) * formData.quantity).toFixed(
                  2
                )}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Order via WhatsApp
          </Button>
        </form>
      </div>
    </div>
  );
}
