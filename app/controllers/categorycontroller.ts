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
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!;

const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// ✅ Upload Image Helper
async function uploadImage(file: File): Promise<string | null> {
  if (!file) return null;
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileKey = `categories/${uuidv4()}-${file.name}`;

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
    return null;
  }
}

// ✅ Delete Image Helper
async function deleteImage(imageUrl: string) {
  if (!imageUrl) return;

  const fileKey = imageUrl.replace(`${R2_PUBLIC_URL}/`, "");

  await s3.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileKey,
    })
  );
}

// get category
export async function getcategory() {
  const category = await prisma.category.findMany({
    select: {
      categoryId: true, // Select only the necessary fields
      name: true,
      updateBy: true,
      imageCatUrl: true, // Include image if needed
    },
  });
  return category.map(({ categoryId, name, imageCatUrl }) => ({
    id: categoryId,
    name,
    imageCatUrl, // ✅ Ensure image is included
  }));
}

// ✅ Create Category with Image Upload
export async function createcategory(data: FormData) {
  let imageCatUrl: string | null = null;
  const file = data.get("file") as File | null;

  if (file) {
    imageCatUrl = await uploadImage(file);
  }
  try {
    return await prisma.category.create({
      data: {
        name: data.get("name") as string,
        createdBy: data.get("createdBy") as string,
        updateBy: data.get("updateBy") as string,
        imageCatUrl,
      },
    });
  } catch (error: any) {
    console.error("❌ Failed to create category:", error.message || error);
    throw error;
  }
}

// ✅ Update Category (Deletes Old Image)
export async function updatecategory(categoryId: number, data: FormData) {
  let imageCatUrl: string | null = null;
  const file = data.get("file") as File | null;

  if (file) {
    const existingCategory = await prisma.category.findUnique({
      where: { categoryId: categoryId },
      select: { imageCatUrl: true },
    });

    if (existingCategory?.imageCatUrl) {
      await deleteImage(existingCategory.imageCatUrl);
    }

    imageCatUrl = await uploadImage(file);
  }
  try {
    return await prisma.category.update({
      where: { categoryId: categoryId },
      data: {
        name: data.get("name") as string,
        updateBy: data.get("updateBy") as string,
        ...(imageCatUrl && { imageCatUrl }),
      },
    });
  } catch (error: any) {
    console.error("❌ Failed to update category:", error.message || error);
    throw error;
  }
}

// ✅ Delete Category (Deletes Image)
export async function deletecategory(categoryId: number) {
  const category = await prisma.category.findUnique({
    where: { categoryId: categoryId },
    select: { imageCatUrl: true },
  });

  if (category?.imageCatUrl) {
    await deleteImage(category.imageCatUrl);
  }

  return await prisma.category.delete({ where: { categoryId: categoryId } });
}
