import { PrismaClient } from "@prisma/client";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const R2_ENDPOINT = process.env.R2_ENDPOINT!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!; // Cloudflare public URL

// ✅ Cloudflare R2 Client
const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// ✅ Helper function to upload image
async function uploadImage(file: File): Promise<string | null> {
  if (!file) return null;
  try {
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
  } catch (error) {
    console.log(error);
    return ``;
  }
}

// ✅ Helper function to delete image
async function deleteImage(imageUrl: string) {
  if (!imageUrl) return;

  // Extract Key from URL
  const fileKey = imageUrl.replace(`${R2_PUBLIC_URL}/`, "");

  await s3.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileKey,
    })
  );
}

// ✅ Get Products
export async function getProducts(
  catId?: number,
  homeView?: number,
  productId?: number
) {
  const whereCondition: any = {};
  if (catId) whereCondition.categoryId = catId;
  if (homeView !== undefined) whereCondition.homeView = homeView;
  if (productId !== undefined) whereCondition.productid = productId;

  const products = await prisma.product.findMany({
    where: whereCondition,
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return products.map(
    ({ productid, name, price, stock, category, homeView, imageUrl }) => ({
      id: productid,
      name,
      price,
      stock,
      homeView,
      category: category.name,
      imageUrl, // ✅ Ensure image is included
    })
  );
}

// ✅ Create Product (Now Supports FormData)
export async function createProduct(data: FormData) {
  let imageUrl: string | null = null;
  const file = data.get("file") as File | null;

  if (file) {
    imageUrl = await uploadImage(file);
  }

  return await prisma.product.create({
    data: {
      name: data.get("name") as string,
      price: String(data.get("price")),
      stock: String(data.get("stock")),
      categoryId: Number(data.get("categoryId")),
      homeView: Number(data.get("homeView")),
      createdBy: data.get("createdBy") as string,
      updateBy: data.get("updateBy") as string,
      createdAt: new Date(),
      updateAt: new Date(),
      imageUrl,
    },
  });
}

// ✅ Update Product (Deletes Old Image)
export async function updateProduct(productid: number, data: FormData) {
  let imageUrl: string | null = null;
  const file = data.get("file") as File | null;

  if (file) {
    const existingProduct = await prisma.product.findUnique({
      where: { productid },
      select: { imageUrl: true },
    });

    if (existingProduct?.imageUrl) {
      await deleteImage(existingProduct.imageUrl); // ✅ Delete old image
    }

    imageUrl = await uploadImage(file);
  }

  return await prisma.product.update({
    where: { productid },
    data: {
      name: data.get("name") as string,
      price: String(data.get("price")),
      stock: String(data.get("stock")),
      categoryId: Number(data.get("categoryId")),
      homeView: Number(data.get("homeView")),
      updateBy: data.get("updateBy") as string,
      updateAt: new Date(),
      ...(imageUrl && { imageUrl }), // ✅ Only update image if new file is uploaded
    },
  });
}

// ✅ Delete Product (Deletes Image)
export async function deleteProduct(productid: number) {
  const product = await prisma.product.findUnique({
    where: { productid },
    select: { imageUrl: true },
  });

  if (product?.imageUrl) {
    await deleteImage(product.imageUrl); // ✅ Delete image
  }

  return await prisma.product.delete({ where: { productid } });
}
