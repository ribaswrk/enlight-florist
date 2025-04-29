import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";

// Define root and subfolder names
const subFolder = "products";

const R2_ENDPOINT = process.env.R2_ENDPOINT!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!;

// R2-Compatible S3Client
const s3Client = new S3Client({
  region: "auto", // R2 does not use regions like AWS
  endpoint: R2_ENDPOINT, // R2 custom endpoint
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Uploads a file to R2.
 */
export async function uploadFileToR2(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const fileExtension = fileName.substring(fileName.lastIndexOf("."));
  const uniqueFileName = `${nanoid()}${fileExtension}`;
  const filePath = `${subFolder}/${uniqueFileName}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: filePath,
    Body: file,
    ContentType: contentType,
  });

  await s3Client.send(command);

  return `${R2_PUBLIC_URL}/${filePath}`;
}

/**
 * Extracts the object key from R2 public URL.
 */
export function extractKeyFromR2Url(url: string): string {
  const baseUrl = `${R2_PUBLIC_URL}/`;
  return url.startsWith(baseUrl) ? url.replace(baseUrl, "") : url;
}

/**
 * Deletes a file from R2.
 */
export async function deleteFileFromR2(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });

  try {
    await s3Client.send(command);
    console.log("File deleted from R2:", key);
  } catch (error) {
    console.error("Failed to delete from R2:", error);
    throw error;
  }
}

/**
 * Generates a signed URL for uploading to R2.
 */
export async function getSignedUploadUrlR2(
  fileName: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<{ uploadUrl: string; publicUrl: string }> {
  const fileExtension = fileName.substring(fileName.lastIndexOf("."));
  const uniqueFileName = `${nanoid()}${fileExtension}`;
  const filePath = `${subFolder}/${uniqueFileName}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: filePath,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn });
  const publicUrl = `${R2_PUBLIC_URL}/${filePath}`;

  return { uploadUrl, publicUrl };
}
