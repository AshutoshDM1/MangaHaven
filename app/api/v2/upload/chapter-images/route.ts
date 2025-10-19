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
    const file = formData.get("file") as File;

    // Check if file exists
    if (!file) {
      return NextResponse.json({ 
        error: "No file found. Please upload a file." 
      }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({
        error: `Invalid file type. Only images are allowed. Received: ${file.type}`
      }, { status: 400 });
    }

    // Upload file to Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const result = await uploadToCloudinary(buffer, file.name, path);
    
    return NextResponse.json({
      success: true,
      publicId: result.public_id,
      url: result.secure_url,
      fileName: file.name,
      message: "File uploaded successfully"
    }, { status: 200 });

  } catch (error) {
    console.error("Upload process failed:", error);
    return NextResponse.json({ 
      success: false,
      error: "Upload process failed",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
