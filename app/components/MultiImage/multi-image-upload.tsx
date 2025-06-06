"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { X, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios, { AxiosError, AxiosProgressEvent, AxiosResponse } from "axios";
import Image from "next/image";

// Define expected types for API responses
interface SignedUrlResponse {
  uploadUrl: string;
  publicUrl: string;
}

// Define progress callback type
type UploadProgressCallback = (percent: number) => void;

/**
 * Generates a signed URL for uploading a file.
 *
 * @param fileName - The name of the file to be uploaded.
 * @param contentType - The MIME type of the file.
 * @returns A promise that resolves with an object containing the upload URL.
 */
export async function generateSignedUrl(
  fileName: string,
  contentType: string
): Promise<SignedUrlResponse> {
  try {
    const response: AxiosResponse<SignedUrlResponse> = await axios.post(
      "/api/protected/images",
      {
        fileName,
        contentType,
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    if (axiosError.isAxiosError && axiosError.response) {
      throw new Error(
        `Error generating signed URL: ${axiosError.response.data.error}`
      );
    }
    throw new Error(`Error generating signed URL: ${String(error)}`);
  }
}

/**
 * Uploads a file using the provided signed URL and reports progress.
 *
 * @param file - The file to be uploaded.
 * @param signedUrl - The signed URL to upload the file to.
 * @param onProgress - Callback function to report the upload progress (percentage).
 * @returns A promise that resolves when the upload is complete.
 */
export async function uploadFileToSignedUrl(
  file: File,
  signedUrl: string,
  onProgress: UploadProgressCallback
): Promise<void> {
  try {
    await axios.put(signedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
      // Disable request transformation so the File/Blob is sent as-is
      transformRequest: [(data: unknown) => data],
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: string }>;
    if (axiosError.isAxiosError && axiosError.response) {
      console.error("Error response data:", axiosError.response.data);
      throw new Error(
        `Error uploading file: ${
          axiosError.response.data.error || "Unknown error"
        }`
      );
    }
    throw new Error(`Error uploading file: ${String(error)}`);
  }
}

/**
 * Deletes a file using the internal API path.
 *
 * @param fileUrl - The URL of the file to be deleted.
 * @returns A promise that resolves when the deletion is complete.
 */
export async function deleteFile(fileUrl: string): Promise<void> {
  try {
    await axios.delete("/api/protected/images", {
      data: { fileUrl },
    });
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    if (axiosError.isAxiosError && axiosError.response) {
      throw new Error(`Error deleting file: ${axiosError.response.data.error}`);
    }
    throw new Error(`Error deleting file: ${String(error)}`);
  }
}
// --- Types ---
interface MultiImageUploadProps {
  value?: string[];
  onChange?: (images: string[]) => void;
  maxImages?: number;
  className?: string;
  name?: string;
  imageRegex?: RegExp;
  accept?: string;
}

interface UploadedFile {
  id: string;
  url: string;
  deleteUrl: string;
  progress: number;
  fileType: string;
  isUploading: boolean;
  isDeleting: boolean;
}

interface ImagePreviewProps {
  src: string;
  alt?: string;
  onDelete?: () => void;
  isUploading?: boolean;
  progress?: number;
  fileType: string;
  isDeleting?: boolean;
}

// --- Image Preview Component ---
export const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt = "File preview",
  onDelete,
  isUploading = false,
  progress = 0,
  fileType,
  isDeleting = false,
}) => {
  const isImage = fileType.startsWith("image/");
  return (
    <div
      className={cn(
        "relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-md transition-all duration-600 ease-in-out",
        isDeleting && "animate-glow-effect"
      )}
    >
      {isImage ? (
        <Image
          src={src}
          alt={alt}
          width={500} // Replace with real width
          height={300} // Replace with real height
          className="w-full h-full object-cover rounded-md transition-opacity duration-500 ease-in-out"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
          <File className="h-8 w-8 text-gray-500 sm:h-10 sm:w-10" />
        </div>
      )}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
          <span className="text-white text-xs sm:text-sm">{progress}%</span>
        </div>
      )}
      {onDelete && !isUploading && !isDeleting && (
        <button
          onClick={onDelete}
          className="absolute right-1 top-1 rounded-full bg-gray-200 p-1 text-gray-600 hover:bg-gray-300 focus:outline-none"
          aria-label="Remove file"
          type="button"
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      )}
    </div>
  );
};

// --- MultiImageUpload Component ---
export const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  value = [],
  onChange,
  maxImages,
  className,
  name,
  imageRegex = /\.(jpeg|jpg|png|gif|webp|avif)$/i,
  accept = "image/*",
}) => {
  // Initialize state with value directly
  console.log("value multi", value);
  const [files, setFiles] = React.useState<UploadedFile[]>(() =>
    value.map((url, index) => ({
      id: `${index}-${Date.now()}`,
      url,
      deleteUrl: url,
      progress: 100,
      fileType: imageRegex.test(url)
        ? `image/${url.split(".").pop()?.toLowerCase() || "jpeg"}`
        : "application/octet-stream",
      isUploading: false,
      isDeleting: false,
    }))
  );

  const prevValueRef = useRef<string[]>(value);
  const isControlled = !!onChange;

  // Helper to map URLs to UploadedFile objects

  const mapToFiles = useCallback(
    (urls: string[]): UploadedFile[] =>
      urls.map((url, index) => {
        const existing = files.find((f) => f.url === url);
        return (
          existing || {
            id: `${index}-${Date.now()}`,
            url,
            deleteUrl: url,
            progress: 100,
            fileType: imageRegex.test(url)
              ? `image/${url.split(".").pop()?.toLowerCase() || "jpeg"}`
              : "application/octet-stream",
            isUploading: false,
            isDeleting: false,
          }
        );
      }),
    [files, imageRegex]
  );

  // Sync state with parent value and form state

  useEffect(() => {
    if (!isControlled) return;

    const prevUrls = prevValueRef.current;
    const nextUrls = value;

    const hasChanged = JSON.stringify(prevUrls) !== JSON.stringify(nextUrls);

    if (hasChanged) {
      const newFiles = mapToFiles(nextUrls);
      setFiles(newFiles);
      onChange(nextUrls);
      prevValueRef.current = nextUrls;
    }
  }, [value, isControlled, onChange, mapToFiles]);

  // Handle file upload
  const handleUpload = useCallback(
    (filesList: FileList) => {
      const fileArray = Array.from(filesList).slice(
        0,
        maxImages ? maxImages - files.length : undefined
      );

      if (fileArray.length === 0 && maxImages) {
        console.warn(`Maximum of ${maxImages} files allowed`);
        return;
      }

      const newFiles: UploadedFile[] = fileArray.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        url: URL.createObjectURL(file),
        deleteUrl: "",
        progress: 0,
        fileType: file.type || "application/octet-stream",
        isUploading: true,
        isDeleting: false,
      }));

      setFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach((newFile, index) => {
        const file = fileArray[index];
        const upload = async () => {
          try {
            const { uploadUrl, publicUrl } = await generateSignedUrl(
              file!.name,
              file!.type
            );
            await uploadFileToSignedUrl(file!, uploadUrl, (progress) => {
              setFiles((prev) =>
                prev.map((f) => (f.id === newFile.id ? { ...f, progress } : f))
              );
            });
            setFiles((prev) =>
              prev.map((f) =>
                f.id === newFile.id
                  ? {
                      ...f,
                      url: publicUrl!,
                      deleteUrl: publicUrl!,
                      isUploading: false,
                      progress: 100,
                    }
                  : f
              )
            );
          } catch (error) {
            console.error(`Upload failed for ${file!.name}:`, error);
            setFiles((prev) => prev.filter((f) => f.id !== newFile.id));
          } finally {
            if (newFile.url.startsWith("blob:"))
              URL.revokeObjectURL(newFile.url);
          }
        };
        upload();
      });
    },
    [files.length, maxImages]
  );

  // Handle file deletion
  const handleDeleteImage = useCallback(
    (id: string) => {
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, isDeleting: true } : f))
      );
      const fileToDelete = files.find((f) => f.id === id);
      if (!fileToDelete) return;

      deleteFile(fileToDelete.deleteUrl)
        .then(() => setFiles((prev) => prev.filter((f) => f.id !== id)))
        .catch((error) => {
          console.error("Failed to delete file:", error);
          setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, isDeleting: false } : f))
          );
        });
    },
    [files]
  );

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.url.startsWith("blob:")) URL.revokeObjectURL(file.url);
      });
    };
  }, [files]);

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div className="flex flex-wrap gap-4">
        {(maxImages === undefined || files.length < maxImages) && (
          <Button
            variant="outline"
            className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0"
          >
            <label className="flex h-full w-full cursor-pointer items-center justify-center text-sm sm:text-base">
              Browse
              <input
                type="file"
                accept={accept}
                multiple
                className="hidden"
                name={name}
                onChange={(e) =>
                  e.target.files?.length && handleUpload(e.target.files)
                }
              />
            </label>
          </Button>
        )}
        {files.map((file) => (
          <ImagePreview
            key={file.id}
            src={file.url}
            alt={`File ${file.id}`}
            fileType={file.fileType}
            isUploading={file.isUploading}
            progress={file.progress}
            isDeleting={file.isDeleting}
            onDelete={() => handleDeleteImage(file.id)}
          />
        ))}
      </div>
    </div>
  );
};
