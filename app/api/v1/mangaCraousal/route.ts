import { MangaItem } from '@/components/data/mangaCarouselData';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const mangaDashboardData = await prisma.mangaCarousel.findMany();
    return NextResponse.json(mangaDashboardData);
  } catch (error) {
    console.error('Error fetching manga dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch manga dashboard data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: MangaItem[] = await request.json();

    const newMangaCarousels = await prisma.mangaCarousel.createMany({
      data: body.map((item) => ({
        title: item.title,
        description: item.description,
        chapter: item.chapter,
        volume: item.volume,
        status: item.status,
        genres: item.genres,
        imageUrl: item.imageUrl,
      })),
    });

    return NextResponse.json(newMangaCarousels, { status: 201 });
  } catch (error) {
    console.error('Error creating manga carousel entries:', error);
    return NextResponse.json({ error: 'Failed to create manga carousel entries' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
