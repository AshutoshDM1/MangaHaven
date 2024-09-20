import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import {v2 as cloudinary} from 'cloudinary';

// Cloudinary configuration (ensure to replace with your actual credentials)
cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const { mangaName } = await request.json(); // Get manga name from request body

  if (!mangaName) {
    return NextResponse.json({ error: 'Manga name is required' }, { status: 400 });
  }

  try {
    // Fetch images from Cloudinary based on the manga folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: `MangaHaven/manga/${mangaName}/`, // Folder path for manga images
      max_results: 500, // Adjust as necessary
    });

    // Return the list of resources (images)
    return NextResponse.json(result.resources);
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
