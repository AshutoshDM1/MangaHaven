import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function GET() {
  try {
    const mangaDashboardData = await prisma.mangaCarousel.findMany();
    return Response.json(mangaDashboardData);
  } catch (error) {
    console.error('Error fetching manga dashboard data:', error);
    return Response.json({ error: 'Failed to fetch manga dashboard data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newMangaCarousel = await prisma.mangaCarousel.create({
      data: {
        title: body.title,
        description: body.description,
        chapter: body.chapter,
        volume: body.volume,
        status: body.status,
        genres: body.genres,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(newMangaCarousel, { status: 201 });
  } catch (error) {
    console.error('Error creating manga carousel entry:', error);
    return NextResponse.json({ error: 'Failed to create manga carousel entry' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
