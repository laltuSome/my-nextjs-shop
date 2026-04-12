import type { Metadata, Viewport } from "next"
import { Noto_Sans, Noto_Serif_Devanagari } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const notoSans = Noto_Sans({ subsets: ["latin", "devanagari"], variable: "--font-noto-sans" })
const notoSerif = Noto_Serif_Devanagari({ subsets: ["devanagari", "latin"], variable: "--font-noto-serif", weight: ["400", "700"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://rudranjalistore.vercel.app"), // আপনার মেইন ডোমেইন
  title: {
    default: "Rudraanjali Store - Premium Laddu Gopal Dresses & Accessories",
    template: "%s | Rudraanjali Store",
  },
  description:
    "Shop premium handcrafted dresses, accessories, singhasan & shringar for Laddu Gopal at Rudraanjali Store. Beautiful vastra collection with WhatsApp ordering. Free shipping available across India.",
  keywords: [
    "Rudraanjali Store",
    "Laddu Gopal dress online",
    "Kanha ji vastra collection",
    "Thakur ji poshaks",
    "Laddu Gopal accessories West Bengal",
    "handmade Gopal ji dress",
    "singhasan for thakurji",
    "shringar set for kanha ji",
    "Laddu Gopal winter wear",
    "WhatsApp shopping for Laddu Gopal",
  ],
  // Search Engine-কে ইনডেক্স করতে সাহায্য করবে
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // ডুপ্লিকেট কন্টেন্ট সমস্যা এড়াতে
  alternates: {
    canonical: "https://rudranjalistore.vercel.app",
  },
  openGraph: {
    title: "Rudraanjali Store - Premium Laddu Gopal Poshak",
    description: "Beautiful handcrafted dresses and accessories for your Laddu Gopal. Order now via WhatsApp!",
    url: "https://rudranjalistore.vercel.app",
    siteName: "Rudraanjali Store",
    images: [
      {
        url: "/og-image.png", // নিশ্চিত করুন public/og-image.png ফাইলটি আছে
        width: 1200,
        height: 630,
        alt: "Rudraanjali Store Laddu Gopal Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  // Google Search Console ভেরিফিকেশনের জন্য (প্রয়োজন হলে কোডটি বসাবেন)
  verification: {
    google: "your-google-verification-code", 
  },
};

export const viewport: Viewport = {
  themeColor: "#d97706",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}