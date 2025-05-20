import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  images: string[];
  price: number;
  category: string;
  soldqty: string;
  priceDisc: string;
  homeView: number;
}

async function getProducts(slug: string): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const url = slug
    ? `${baseUrl}/api/protected/products?categoryId=${encodeURIComponent(slug)}`
    : `${baseUrl}/api/protected/products`;

  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  if (!slug) {
    return <div>Loading...</div>;
  }

  const products = await getProducts(slug);
  console.log('products', products);
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-4">
        <Link href="/categories">
          <button className="flex items-center text-black-500 hover:underline">
            <ArrowUturnLeftIcon className="h-8 w-8 mr-2" />
          </button>
        </Link>
      </div>

      {products && products.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center capitalize">
            {products[0].category} Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => {
              return (
                <Link href={`/productdetail/${product.id}`} key={product.id}>
                  <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative aspect-square">
                      <Image
                        src={product.images[0] || '/placeholder.svg'}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h2 className="text-lg font-semibold">{product.name}</h2>

                      {/* Harga */}
                      <div className="flex items-center gap-2">
                        {product.priceDisc !== '0' ? (
                          <>
                            <span className="text-red-400 line-through text-sm">
                              {formatRupiah(Number(product.price))}
                            </span>
                            <span className="text-red-500 font-bold">
                              {formatRupiah(Number(product.priceDisc))}
                            </span>
                          </>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            {formatRupiah(Number(product.price))}
                          </span>
                        )}
                      </div>

                      {/* Terjual */}
                      <p className="text-sm text-gray-500">
                        {product.soldqty} terjual
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">This category is empty</div>
      )}
    </div>
  );
}
