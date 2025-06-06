import { PrismaClient } from "@prisma/client";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { Prisma } from "@prisma/client";

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
async function uploadEventImage(file: File): Promise<string | null> {
  if (!file) return null;
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileKey = `event/${uuidv4()}-${file.name}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: fileKey,
        Body: buffer,
        ContentType: file.type,
      })
    );

    return `${R2_PUBLIC_URL}/${fileKey}`;
  } catch {
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

export async function getEvent(eventid?: number, homeView?: number) {
  const whereCondition: Prisma.EventWhereInput = {};

  if (eventid !== undefined) {
    whereCondition.eventId = eventid;
  }

  if (homeView !== undefined) {
    whereCondition.show = homeView;
  }

  const events = await prisma.event.findMany({
    where: whereCondition,
  });

  return events.map(({ eventId, show, name, imageEventUrl }) => ({
    id: eventId,
    name,
    show,
    urls: imageEventUrl,
  }));
}

// ✅ Create a new event
export async function createEvent(data: FormData) {
  let imageEventUrl: string | null = null;

  const file = data.get("file") as File | null;

  if (file) {
    imageEventUrl = await uploadEventImage(file);
  }
  try {
    const result = await prisma.event.create({
      data: {
        name: String(data.get("name")),
        show: Number(data.get("show")),
        createdBy: data.get("createdBy") as string,
        updateBy: data.get("updateBy") as string,
        createdAt: new Date(),
        updateAt: new Date(),
        imageEventUrl: String(imageEventUrl),
      },
    });
    return result;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("❌ Failed to create event:", errMsg || error);
    throw error;
  }
}

// ✅ Update a event
export async function updateEvent(eventId: number, data: FormData) {
  let imageEventUrl: string | null = null;

  const file = data.get("file") as File | null;

  if (file) {
    const existingProduct = await prisma.event.findUnique({
      where: { eventId },
      select: { imageEventUrl: true },
    });

    if (existingProduct?.imageEventUrl) {
      await deleteImage(existingProduct.imageEventUrl); // ✅ Delete old image
    }

    imageEventUrl = await uploadEventImage(file);
  }
  try {
    return await prisma.event.update({
      where: { eventId },
      data: {
        name: data.get("name") as string,
        show: Number(data.get("show")),
        updateBy: data.get("updateBy") as string,
        updateAt: new Date(), // ✅ Correct way to set the current timestamp
        ...(imageEventUrl && { imageEventUrl }),
      },
    });
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("❌ Failed to update event:", errMsg || error);
    throw error;
  }
}

// ✅ Delete a event
export async function deleteEvent(eventId: number) {
  return await prisma.event.delete({ where: { eventId } });
}
