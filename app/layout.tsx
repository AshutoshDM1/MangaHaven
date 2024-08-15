import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MangaHaven",
  description: "Your go-to place for All mangas.",
  icons: {
    icon: "/MH Favicon HD.png", // This points to your favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/MH Favicon HD.png" />
        <title>MangaHaven</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
