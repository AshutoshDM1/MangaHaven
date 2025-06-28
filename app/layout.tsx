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
  title: {
    default: "MangaHaven - Your Ultimate Manga Reading Destination",
    template: "%s | MangaHaven",
  },
  description:
    "Discover, read, and enjoy thousands of manga titles at MangaHaven. Your go-to platform for the latest manga chapters, popular series, and hidden gems. Read manga online for free with high-quality images and fast loading.",
  keywords: [
    "manga",
    "read manga online",
    "manga reader",
    "free manga",
    "manga chapters",
    "japanese comics",
    "manga streaming",
    "online manga",
    "manga library",
    "latest manga",
  ],
  authors: [{ name: "MangaHaven Team" }],
  creator: "MangaHaven",
  publisher: "MangaHaven",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://mangahaven.elitedev.tech"
  ),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/MangaHaven Logo.png", sizes: "32x32", type: "image/png" },
      { url: "/MangaHaven Logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/MangaHaven Logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/MangaHaven Logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "MangaHaven - Your Ultimate Manga Reading Destination",
    description:
      "Discover, read, and enjoy thousands of manga titles at MangaHaven. Your go-to platform for the latest manga chapters, popular series, and hidden gems.",
    siteName: "MangaHaven",
    images: [
      {
        url: "/Images/image.png",
        width: 1200,
        height: 630,
        alt: "MangaHaven - Read Manga Online",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MangaHaven - Your Ultimate Manga Reading Destination",
    description:
      "Discover, read, and enjoy thousands of manga titles. Your go-to platform for the latest manga chapters and popular series.",
    images: ["/Images/image.png"],
    creator: "@MangaHaven",
    site: "@MangaHaven",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: process.env.GOOGLE_SITE_VERIFICATION,
  //   yandex: process.env.YANDEX_VERIFICATION,
  //   yahoo: process.env.YAHOO_VERIFICATION,
  // },
  category: "entertainment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/MangaHaven Logo.png" />
        <link rel="apple-touch-icon" href="/MangaHaven Logo.png" />
        <link
          rel="canonical"
          href={
            process.env.NEXT_PUBLIC_APP_URL ||
            "https://mangahaven.elitedev.tech"
          }
        />
        <meta name="theme-color" content="#0d0d0d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MangaHaven" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="MangaHaven" />
        <meta name="msapplication-TileColor" content="#0d0d0d" />
        <meta name="msapplication-TileImage" content="/MangaHaven Logo.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MangaHaven",
              alternateName: "Manga Haven",
              url:
                process.env.NEXT_PUBLIC_APP_URL ||
                "https://mangahaven.elitedev.tech",
              description:
                "Your ultimate destination for reading manga online. Discover thousands of manga titles, latest chapters, and popular series.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL || "https://mangahaven.elitedev.tech"}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "MangaHaven",
                logo: {
                  "@type": "ImageObject",
                  url: `${process.env.NEXT_PUBLIC_APP_URL || "https://mangahaven.elitedev.tech"}/MangaHaven Logo.png`,
                },
              },
            }),
          }}
        />
      </head>
      <body
        className={cn(
          "bg-background font-sans antialiased bg-white  dark:bg-[#0d0d0d] ",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
