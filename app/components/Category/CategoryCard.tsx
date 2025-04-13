import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  imageUrl: string;
  categoryName: string;
  slug: string;
}

export default function CategoryCard({
  imageUrl,
  categoryName,
  slug,
}: CategoryCardProps) {
  return (
    <div key={slug}>
      <Link href={`/categories/${slug}`} className="block">
        <div className="border rounded-lg overflow-hidden shadow-md relative">
          <div className="relative aspect-[4/3]">
            <Image
              src={imageUrl || "/placeholder.svg?height=300&width=400"}
              alt={categoryName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
              <h3 className="text-black bold text-lg font-semibold">
                {categoryName}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
