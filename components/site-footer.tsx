import Link from "next/link"
import { Phone, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-[#f1f1f1] text-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand & Logo Section */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#772237] text-white font-serif text-2xl font-black shadow-lg transition-transform group-hover:rotate-12">
                B
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-[#772237] leading-none uppercase">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#ed701d] uppercase">
                  Bhakti Store
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-600 font-medium">
              Premium handcrafted dresses, accessories & singhasan for Laddu Gopal. Made with love and devotion for your deities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-[#772237]">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              {["All Products", "Dresses", "Accessories", "Singhasan"].map((item) => (
                <Link 
                  key={item}
                  href={item === "All Products" ? "/products" : `/category/${item.toLowerCase()}`} 
                  className="text-sm font-semibold text-gray-500 hover:text-[#ed701d] transition-colors w-fit"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-[#772237]">Specialities</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/category/festival" className="text-sm font-semibold text-gray-500 hover:text-[#ed701d] transition-colors w-fit">Festival Special</Link>
              <Link href="/products?bestseller=true" className="text-sm font-semibold text-gray-500 hover:text-[#ed701d] transition-colors w-fit">Bestsellers</Link>
              <Link href="/products?new=true" className="text-sm font-semibold text-gray-500 hover:text-[#ed701d] transition-colors w-fit">New Arrivals</Link>
              <Link href="/category/jewelry" className="text-sm font-semibold text-gray-500 hover:text-[#ed701d] transition-colors w-fit">Shringar & Jewelry</Link>
            </nav>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-[#772237]">Support</h3>
            <div className="flex flex-col gap-4">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#1da851] hover:scale-105 active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Business Hours</p>
                <p className="text-xs font-semibold text-gray-600">
                  Mon - Sat: 10:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Handcrafted with Devotion.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#772237]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#772237]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}