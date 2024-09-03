import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MangaHaven",
  description: "Your go-to place for All mangas.",
  icons: {
    icon: "/MH Favicon HD.png",
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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased dark:bg-[#0d0d0d] ",
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
