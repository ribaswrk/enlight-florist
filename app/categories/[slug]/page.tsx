import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
}

// // This is a server component, so we can fetch data here
// async function getProducts(slug: string): Promise<Product[]> {
// 	// In a real application, fetch products based on the slug
// 	// For now, we'll return dummy data
// 	return [
// 		{
// 			id: 1,
// 			name: "Red Rose Bouquet",
// 			image: "/placeholder.svg?height=200&width=200",
// 			price: 50,
// 		},
// 		{
// 			id: 2,
// 			name: "Sunflower Arrangement",
// 			image: "/placeholder.svg?height=200&width=200",
// 			price: 45,
// 		},
// 		{
// 			id: 3,
// 			name: "Mixed Flower Basket",
// 			image: "/placeholder.svg?height=200&width=200",
// 			price: 60,
// 		},
// 	];
// }

// Fetch products from the API
async function getProducts(slug: string): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // ✅ Adjust for deployment
  const url = slug
    ? `${baseUrl}/api/protected/products?categoryId=${encodeURIComponent(slug)}`
    : `${baseUrl}/api/protected/products`;

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store", // Ensure fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!params?.slug) {
    return <div>Loading...</div>; // ✅ Handle case where slug is not available
  }

  const products = await getProducts(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center capitalize">
        {products[1].category} Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={"/productdetail"}>
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative aspect-square">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
