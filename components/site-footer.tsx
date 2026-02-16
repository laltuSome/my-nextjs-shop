import Link from "next/link"
import { Phone } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-base font-bold">
                B
              </div>
              <span className="text-lg font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              Premium handcrafted dresses, accessories & singhasan for Laddu Gopal. Made with love and devotion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">Quick Links</h3>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              <Link href="/products" className="text-sm opacity-80 hover:opacity-100 hover:underline">All Products</Link>
              <Link href="/category/dresses" className="text-sm opacity-80 hover:opacity-100 hover:underline">Dresses</Link>
              <Link href="/category/accessories" className="text-sm opacity-80 hover:opacity-100 hover:underline">Accessories</Link>
              <Link href="/category/singhasan" className="text-sm opacity-80 hover:opacity-100 hover:underline">Singhasan</Link>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">Categories</h3>
            <nav className="flex flex-col gap-2" aria-label="Category navigation">
              <Link href="/category/festival" className="text-sm opacity-80 hover:opacity-100 hover:underline">Festival Special</Link>
              <Link href="/products?bestseller=true" className="text-sm opacity-80 hover:opacity-100 hover:underline">Bestsellers</Link>
              <Link href="/products?new=true" className="text-sm opacity-80 hover:opacity-100 hover:underline">New Arrivals</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-medium text-[#fff] transition-colors hover:bg-[#1da851]"
              >
                <Phone className="h-4 w-4" />
                WhatsApp: +91 86738 24619
              </a>
              <p className="text-xs opacity-60">
                Order via WhatsApp. We reply within 30 minutes during business hours.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-secondary-foreground/20 pt-6 text-center text-xs opacity-60">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Made with devotion.</p>
        </div>
      </div>
    </footer>
  )
}
