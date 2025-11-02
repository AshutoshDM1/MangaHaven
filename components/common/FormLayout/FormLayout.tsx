'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface ImageText {
  text: string;
  className?: string;
}

interface Breadcrumb {
  text: string;
  href: string;
}

interface FormLayoutProps {
  children?: React.ReactNode;
  title?: string;
  imageTexts?: ImageText[];
  description?: string;
  image?: string;
  breadcrumb?: Breadcrumb[];
}

const FormLayout: React.FC<FormLayoutProps> = ({
  children = <></>,
  title = 'MangaHaven',
  image = '/images/from-layout/login.webp',
  breadcrumb = [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Dashboard',
      href: '/dashboard',
    },
    {
      text: 'Signup',
      href: '/signup',
    },
  ],
  imageTexts = [
    {
      text: 'Capturing Moments,',
      className: 'text-4xl lg:text-5xl font-bold leading-tight',
    },
    {
      text: 'Creating Memories.',
      className: 'text-4xl lg:text-5xl font-bold leading-tight',
    },
  ],
}) => {
  const gradientClassName = 'bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800';
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[40%] relative overflow-hidden">
        <div className={cn('absolute inset-0', image ? 'bg-purple-900' : gradientClassName)}>
          {image && (
            <Image
              src={image}
              alt="background image"
              className="h-full w-full object-cover object-bottom-left bg-black opacity-70"
              width={1000}
              height={1000}
              priority
              quality={100}
            />
          )}
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src="/favicon.webp" alt="logo" className="w-full h-full object-cover" />
            </div>
            {title && <span className="text-xl font-semibold tracking-wide">{title}</span>}
          </div>

          <div className="space-y-6">
            {imageTexts &&
              imageTexts.map((text: { text: string; className?: string }, index: number) => (
                <p
                  key={index}
                  className={cn('text-4xl lg:text-5xl font-bold leading-tight', text.className)}
                >
                  {text.text}
                </p>
              ))}

            <div className="flex space-x-2">
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-1 bg-gray-300/50 rounded-full"></div>
              <div className="w-2 h-1 bg-gray-300/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[60%] flex items-center justify-center p-8 bg-[#0D0D0D] relative">
        <nav className="absolute top-4 left-4 flex items-center gap-2 text-sm text-gray-400">
          {breadcrumb &&
            breadcrumb.map((item: Breadcrumb, index: number) => (
              <>
                <Link
                  className={cn(
                    'hover:text-purple-400 transition-colors duration-200',
                    index === breadcrumb.length - 1 ? 'text-purple-400' : 'text-gray-300'
                  )}
                  key={index}
                  href={item.href}
                >
                  {item.text}
                </Link>
                {index < breadcrumb.length - 1 && <span>/</span>}
              </>
            ))}
        </nav>
        <div className="w-full h-full flex items-center justify-center my-10">{children}</div>
      </div>
    </div>
  );
};

export default FormLayout;
