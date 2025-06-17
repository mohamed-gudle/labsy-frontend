import { AuthProvider } from "@/context/auth-context";
import { AuthErrorBoundary } from "@/components/auth";
import type { Metadata } from "next";
import { Inter, Poppins } from 'next/font/google'
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Labsy - Custom Print-on-Demand Platform",
  description: "Design and customize products with Labsy's intuitive print-on-demand platform. Create unique apparel, accessories, and more with our easy-to-use design tools.",
  keywords: ["print-on-demand", "custom apparel", "design tools", "t-shirts", "hoodies", "custom printing"],
  authors: [{ name: "Labsy Team" }],
  creator: "Labsy",
  publisher: "Labsy",
  openGraph: {
    title: "Labsy - Custom Print-on-Demand Platform",
    description: "Design and customize products with Labsy's intuitive print-on-demand platform.",
    url: "https://labsy.com",
    siteName: "Labsy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Labsy - Custom Print-on-Demand Platform",
    description: "Design and customize products with Labsy's intuitive print-on-demand platform.",
    creator: "@labsy",
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
        <body
          className="font-inter"
        >
          <AuthErrorBoundary>
            {children}
          </AuthErrorBoundary>
        </body>
      </html>
    </AuthProvider>
  );
}
