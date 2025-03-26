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
async function uploadEventImage(file: File): Promise<string | null> {
  if (!file) return null;

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
}

export async function getEvent(eventid?: number) {
  const whereCondition = eventid
    ? { eventId: eventid } // ✅ Filter based on category ID
    : undefined; // ✅ Avoid passing an empty object

  const event = await prisma.event.findMany({
    where: whereCondition, // ✅ Only applies the filter when categoryId is provided
  });

  // ✅ Transform the result to match your expected structure
  return event.map(({ eventId, name, imageEventUrl }) => ({
    id: eventId, // ✅ Rename `eventid` to `id`
    name,
    image: imageEventUrl, // ✅ Flatten category name
  }));
}
// ✅ Create a new event
export async function createEvent(data: {
  name: string;
  show: number;
  createdBy: string;
  updateBy: string;
  file?: File; // Optional image file
}) {
  let imageEventUrl: string | null = null;

  if (data.file) {
    imageEventUrl = await uploadEventImage(data.file);
  }
  return await prisma.event.create({
    data: {
      ...data,
      createdAt: new Date(),
      updateAt: new Date(),
      imageEventUrl,
    },
  });
}

// ✅ Update a event
export async function updateEvent(
  eventId: number,
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
    imageUrl = await uploadEventImage(data.file);
  }

  return await prisma.event.update({
    where: { eventId },
    data: {
      ...data,
      updateAt: new Date(), // ✅ Correct way to set the current timestamp
      ...(imageUrl && { imageUrl }),
    },
  });
}

// ✅ Delete a event
export async function deleteEvent(eventId: number) {
  return await prisma.event.delete({ where: { eventId } });
}
