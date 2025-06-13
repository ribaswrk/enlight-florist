import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

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

async function uploadImage(file: File): Promise<string | null> {
  if (!file) return null;
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileKey = `subcategories/${uuidv4()}-${file.name}`;

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

// ✅ Get all subcategories
export async function getSubcategories(categoryId?: number) {
  const whereCondition: Prisma.SubcategoryWhereInput = {};
  if (categoryId) whereCondition.categoryId = categoryId;
  const subcategories = await prisma.subcategory.findMany({
    where: whereCondition,
    select: {
      subcategoryId: true,
      subcatname: true,
      imageSubCatUrl: true,
      homeView: true,
      updateBy: true,
      category: {
        select: {
          categoryId: true,
          name: true,
        },
      },
    },
  });

  return subcategories.map(
    ({ subcategoryId, subcatname, imageSubCatUrl, homeView, category }) => ({
      id: subcategoryId,
      name: subcatname,
      catid: category.categoryId,
      catname: category.name,
      imageSubCatUrl,
      homeView,
    })
  );
}

// ✅ Create subcategory
export async function createSubcategory(data: FormData) {
  const file = data.get("file") as File | null;
  let imageSubCatUrl: string | null = null;

  if (file) {
    imageSubCatUrl = await uploadImage(file);
  }

  return await prisma.subcategory.create({
    data: {
      subcatname: data.get("name") as string,
      homeView: Number(data.get("homeView")),
      categoryId: Number(data.get("categoryId")),
      createdBy: data.get("createdBy") as string,
      updateBy: data.get("updateBy") as string,
      imageSubCatUrl,
    },
  });
}

// ✅ Update subcategory
export async function updateSubcategory(subcategoryId: number, data: FormData) {
  const file = data.get("file") as File | null;
  let imageSubCatUrl: string | null = null;

  if (file) {
    const existing = await prisma.subcategory.findUnique({
      where: { subcategoryId },
      select: { imageSubCatUrl: true },
    });

    if (existing?.imageSubCatUrl) {
      await deleteImage(existing.imageSubCatUrl);
    }

    imageSubCatUrl = await uploadImage(file);
  }

  return await prisma.subcategory.update({
    where: { subcategoryId },
    data: {
      subcatname: data.get("name") as string,
      homeView: Number(data.get("homeView")),
      updateBy: data.get("updateBy") as string,
      categoryId: Number(data.get("categoryId")),
      ...(imageSubCatUrl && { imageSubCatUrl }),
    },
  });
}

// ✅ Delete subcategory
export async function deleteSubcategory(subcategoryId: number) {
  const existing = await prisma.subcategory.findUnique({
    where: { subcategoryId },
    select: { imageSubCatUrl: true },
  });

  if (existing?.imageSubCatUrl) {
    await deleteImage(existing.imageSubCatUrl);
  }

  return await prisma.subcategory.delete({
    where: { subcategoryId },
  });
}
