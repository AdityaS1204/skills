import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Agent Skills Registry",
    template: "%s · AI Agent Skills Registry",
  },
  description: "A minimal, quiet interface for browsing, comparing, and installing AI agent skills.",
  openGraph: {
    title: "AI Agent Skills Registry",
    description: "A minimal, quiet interface for browsing, comparing, and installing AI agent skills.",
    url: "/",
    siteName: "AI Agent Skills Registry",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Agent Skills Registry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Skills Registry",
    description: "A minimal, quiet interface for browsing, comparing, and installing AI agent skills.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="flex min-h-full flex-col bg-page text-primary">
        {/* Subtle noise grain texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        <Navbar />
        <main className="flex-1">{children}</main>

        <footer className="border-t border-(--border-subtle) bg-page py-8 text-center text-[11px] text-tertiary">
          <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
            <div className="flex items-center gap-1.5 font-mono">
              <span>skills.registry</span>
              <span>·</span>
              <span>open specification</span>
            </div>
            <div className="flex items-center gap-4 text-secondary">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                GitHub
              </a>
              <a
                href="#"
                className="hover:text-primary"
              >
                Specification
              </a>
              <a
                href="#"
                className="hover:text-primary"
                >
                CLI
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
