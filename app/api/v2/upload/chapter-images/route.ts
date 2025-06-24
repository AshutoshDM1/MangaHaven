import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  [key: string]: any;
}

interface UploadResponse {
  success: boolean;
  publicId?: string;
  url?: string;
  error?: string;
  fileName?: string;
}

// Helper function to upload a single file to Cloudinary
async function uploadToCloudinary(buffer: Buffer, fileName: string, path: string): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        folder: `MangaHavenV2/ChapterImages/${path}`,
        public_id: `${Date.now()}_${fileName.replace(/\.[^/.]+$/, "")}`, // Remove extension and add timestamp
        resource_type: "image"
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as CloudinaryUploadResult);
      },
    );
    uploadStream.end(buffer);
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const path = formData.get("path") as string;
    // Get all files from FormData
    const files: File[] = [];
    
    // Handle both single file and multiple files
    const fileEntries = formData.getAll("files"); // For multiple files
    const singleFile = formData.get("file"); // For backward compatibility
    
    if (fileEntries.length > 0) {
      // Multiple files case
      fileEntries.forEach(entry => {
        if (entry instanceof File) {
          files.push(entry);
        }
      });
    } else if (singleFile instanceof File) {
      // Single file case (backward compatibility)
      files.push(singleFile);
    }

    // Check if any files exist
    if (files.length === 0) {
      return NextResponse.json({ 
        error: "No files found. Please upload at least one file." 
      }, { status: 400 });
    }

    // Validate file types
    const invalidFiles = files.filter(file => !file.type.startsWith("image/"));
    if (invalidFiles.length > 0) {
      return NextResponse.json({
        error: `Invalid file types detected. Only images are allowed. Invalid files: ${invalidFiles.map(f => f.name).join(", ")}`
      }, { status: 400 });
    }

    // Upload all files to Cloudinary
    const uploadPromises = files.map(async (file): Promise<UploadResponse> => {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const result = await uploadToCloudinary(buffer, file.name, path);
        
        return {
          success: true,
          publicId: result.public_id,
          url: result.secure_url,
          fileName: file.name
        };
      } catch (error) {
        console.error(`Upload failed for file ${file.name}:`, error);
        return {
          success: false,
          error: `Failed to upload ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
          fileName: file.name
        };
      }
    });

    // Wait for all uploads to complete
    const results = await Promise.all(uploadPromises);
    
    // Separate successful and failed uploads
    const successfulUploads = results.filter(result => result.success);
    const failedUploads = results.filter(result => !result.success);

    // Return comprehensive response
    return NextResponse.json({
      totalFiles: files.length,
      successCount: successfulUploads.length,
      failCount: failedUploads.length,
      successfulUploads: successfulUploads.map(upload => ({
        publicId: upload.publicId,
        url: upload.url,
        fileName: upload.fileName
      })),
      failedUploads: failedUploads.map(upload => ({
        fileName: upload.fileName,
        error: upload.error
      })),
      message: `Successfully uploaded ${successfulUploads.length} out of ${files.length} files`
    }, { status: 200 });

  } catch (error) {
    console.error("Upload process failed:", error);
    return NextResponse.json({ 
      error: "Upload process failed",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
