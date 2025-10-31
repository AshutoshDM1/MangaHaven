'use client';
import Section from '@/components/common/Section/Section';
import LargeCarousel from './components/LargeCarousel';
import MangaCarousel from './components/MangaCarousel';
import MangaSection from './components/MangaSection';

export default function Dashboard() {
  return (
    <>
      <Section>
        <h1 className="sr-only">Manga Dashboard - Latest and Popular Manga</h1>
        <LargeCarousel/>
        <MangaCarousel/>
        <MangaSection/>
      </Section>
    </>
  );
}
