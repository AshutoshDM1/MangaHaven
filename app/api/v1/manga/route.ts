import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

type Manga = {
  title: string;
  imageUrl: string;
  genres: string[];
}

// GET request handler
const GET = async () => {
  return NextResponse.json({ message: 'Hello World' });
}


