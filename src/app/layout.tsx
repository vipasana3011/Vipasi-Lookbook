import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.title} | ${SITE_CONFIG.subtitle}`,
  description: `${SITE_CONFIG.brandName} - ${SITE_CONFIG.tagline}`,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="robots" content="noindex, nofollow, noimageindex" />
      </head>
      <body className="bg-[#FAF7F2] text-[#2A1A1D] font-sans antialiased selection:bg-[#5E1224] selection:text-white">
        {children}
      </body>
    </html>
  );
}
