"use client"

import Link from "next/link"
import Image from "next/image";
import { useState } from "react"
import { Menu, X, Search, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/products", label: "All PRODUCTS" },
  { href: "/category/dresses", label: "DRESSES" },
  { href: "/category/accessories", label: "ACCESSORIES" },
  { href: "/category/singhasan", label: "SINGASAN" },
  { href: "/category/festival", label: "FESTIVAL SPECIAL" },
  { href: "/puja-fardo", label: "PUJA FARDO" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Top bar */}
      <div className=" text-secondary-foreground">
       <div className="bg-secondary mx-auto flex max-w-3xl items-center justify-between px-4 py-3 text-xs sm:text-sm rounded-b-2xl">
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
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
     
          <div className="flex flex-col leading-tight">
           <Image 
  src="/brand.webp"          
  alt={siteConfig.name} 
  width={250}               
  height={63} 
  className="object-contain"
/>

           
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
            <Button className="bg-[#ed701d] text-[#fff] hover:bg-[#772237] gap-2">
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
