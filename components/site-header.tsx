"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All Products" },
  { href: "/category/dresses", label: "Dresses" },
  { href: "/category/accessories", label: "Accessories" },
  { href: "/category/singhasan", label: "Singhasan" },
  { href: "/category/festival", label: "Festival Special" },
  { href: "/puja-fardo", label: "Puja Fardo" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:text-sm">
          <span>Free Shipping on orders above Rs 999</span>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-medium hover:underline"
          >
            <Phone className="h-3 w-3" />
            <span className="sr-only sm:not-sr-only">WhatsApp:</span> +91 86738 24619
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-lg font-bold">
            B
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-foreground">{siteConfig.name}</span>
            <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
              Laddu Gopal Vastra
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/search" aria-label="Search products">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button className="bg-[#25D366] text-[#fff] hover:bg-[#1da851] gap-2">
              <Phone className="h-4 w-4" />
              Order Now
            </Button>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2"
            >
              <Button className="w-full bg-[#25D366] text-[#fff] hover:bg-[#1da851] gap-2">
                <Phone className="h-4 w-4" />
                WhatsApp Order
              </Button>
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
