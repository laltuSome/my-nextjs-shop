import type { Metadata, Viewport } from "next"
import { Noto_Sans, Noto_Serif_Devanagari } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const notoSans = Noto_Sans({ subsets: ["latin", "devanagari"], variable: "--font-noto-sans" })
const notoSerif = Noto_Serif_Devanagari({ subsets: ["devanagari", "latin"], variable: "--font-noto-serif", weight: ["400", "700"] })

export const metadata: Metadata = {
  title: {
    default: "Bhakti Store - Premium Laddu Gopal Dresses & Accessories",
    template: "%s | Bhakti Store",
  },
  description:
    "Shop premium handcrafted dresses, accessories, singhasan & shringar for Laddu Gopal. Beautiful vastra collection with WhatsApp ordering. Free shipping available.",
  keywords: [
    "Laddu Gopal dress",
    "Kanha ji vastra",
    "Thakur ji dress",
    "Laddu Gopal accessories",
    "singhasan",
    "shringar",
    "Bhakti Store",
  ],
}

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
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
