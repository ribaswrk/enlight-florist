import { NextResponse } from "next/server";

// ** Import 3rd party library
import { z } from "zod";
import mime from "mime-types";

// ** Import helper
import {
  deleteFileFromR2,
  extractKeyFromR2Url,
  getSignedUploadUrlR2,
} from "@/controllers/imagecontroller";

// Define the input schema using Zod
const deleteFileSchema = z.object({
  fileUrl: z.string().url().optional(),
  key: z.string().min(1, "key is required").optional(),
});
const signedUrlSchema = z.object({
  fileName: z.string().min(1, "fileName is required"),
  contentType: z.string().optional(),
});

type SignedUrlInput = z.infer<typeof signedUrlSchema>;
// Define the expected TypeScript type for the input
type DeleteFileInput = z.infer<typeof deleteFileSchema>;

export async function DELETE(req: Request) {
  try {
    const json = await req.json();

    // Validate the input using Zod
    const parsedData = deleteFileSchema.safeParse(json);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsedData.error.format() },
        { status: 400 }
      );
    }

    const { fileUrl, key } = parsedData.data as DeleteFileInput;

    let s3Key = key;
    if (!s3Key && fileUrl) {
      s3Key = extractKeyFromR2Url(fileUrl);
    }

    if (!s3Key) {
      return NextResponse.json(
        { error: "Missing fileUrl or key" },
        { status: 400 }
      );
    }

    await deleteFileFromR2(s3Key);
    return NextResponse.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();

    // Validate the input data
    const parsedData = signedUrlSchema.safeParse(json);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsedData.error.format() },
        { status: 400 }
      );
    }

    const { fileName } = parsedData.data as SignedUrlInput;
    let { contentType } = parsedData.data as SignedUrlInput;

    // Use the mime-types package to get the proper MIME type if it's not provided.
    if (!contentType || contentType.trim() === "") {
      const detectedType = mime.lookup(fileName);
      contentType = detectedType ? detectedType : "application/octet-stream";
    }

    console.log("Generating signed URL for file:", fileName);
    console.log("Content type:", contentType);

    // Generate the signed URL for uploading the file to S3.
    const { uploadUrl, publicUrl } = await getSignedUploadUrlR2(
      fileName,
      contentType!
    );
    return NextResponse.json({ uploadUrl, publicUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
