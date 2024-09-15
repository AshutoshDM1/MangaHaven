import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  // Handle GET request
  return NextResponse.json({ error: 'Manga name and chapter are required' }, { status: 400 });
}

// Uncommenting and fixing the POST function
// export async function POST(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const mangaName = searchParams.get('manga');
//   const chapter = searchParams.get('chapter');

//   if (!mangaName || !chapter) {
//     return NextResponse.json({ error: 'Manga name and chapter are required' }, { status: 400 });
//   }

//   try {
//     const mangaChapter = await prisma.mangaChapter.findFirst({
//       where: {
//         manga: {
//           name: mangaName
//         },
//         chapterNumber: parseInt(chapter)
//       },
//       include: {
//         manga: true,
//         pages: true
//       }
//     });

//     if (!mangaChapter) {
//       return NextResponse.json({ error: 'Manga chapter not found' }, { status: 404 });
//     }

//     return NextResponse.json(mangaChapter);
//   } catch (error) {
//     console.error('Error fetching manga chapter:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
