import { PrismaClient } from "@prisma/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const R2_ENDPOINT = process.env.R2_ENDPOINT!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!; // Cloudflare public URL

// Initialize Cloudflare R2 client
const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// ✅ Helper function to upload image to Cloudflare R2
async function uploadImage(file: File): Promise<string | null> {
  if (!file) return null;

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileKey = `products/${uuidv4()}-${file.name}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileKey,
      Body: buffer,
      ContentType: file.type,
    })
  );

  return `${R2_PUBLIC_URL}/${fileKey}`;
}

export async function getProducts(catId?: number) {
  const whereCondition = catId
    ? { categoryId: catId } // ✅ Filter based on category ID
    : undefined; // ✅ Avoid passing an empty object

  const products = await prisma.product.findMany({
    where: whereCondition, // ✅ Only applies the filter when categoryId is provided
    include: {
      category: {
        select: {
          name: true, // ✅ Fetch category name instead of ID
        },
      },
    },
  });

  // ✅ Transform the result to match your expected structure
  return products.map(({ productid, name, price, stock, category }) => ({
    id: productid, // ✅ Rename `productid` to `id`
    name,
    price,
    stock,
    category: category.name, // ✅ Flatten category name
  }));
}
// ✅ Create a new product
export async function createProduct(data: {
  name: string;
  price: string;
  stock: string;
  categoryId: number;
  createdBy: string;
  updateBy: string;
  file?: File; // Optional image file
}) {
  let imageUrl: string | null = null;

  if (data.file) {
    imageUrl = await uploadImage(data.file);
  }
  return await prisma.product.create({
    data: {
      ...data,
      createdAt: new Date(),
      updateAt: new Date(),
      imageUrl,
    },
  });
}

// ✅ Update a product
export async function updateProduct(
  productid: number,
  data: {
    name: string;
    price: string;
    stock: string;
    categoryId: number;
    updateBy: string;
    file?: File;
  }
) {
  let imageUrl: string | null = null;

  if (data.file) {
    imageUrl = await uploadImage(data.file);
  }

  return await prisma.product.update({
    where: { productid },
    data: {
      ...data,
      updateAt: new Date(), // ✅ Correct way to set the current timestamp
      ...(imageUrl && { imageUrl }),
    },
  });
}

// ✅ Delete a product
export async function deleteProduct(productid: number) {
  return await prisma.product.delete({ where: { productid } });
}
