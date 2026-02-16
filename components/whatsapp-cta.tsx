import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

export function WhatsAppCTA() {
  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center">
        <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
          Order via WhatsApp
        </h2>
        <p className="max-w-lg text-primary-foreground/80 leading-relaxed">
          Can&apos;t find what you&apos;re looking for? Send us a message on WhatsApp with your requirements and we&apos;ll help you find the perfect outfit for your Laddu Gopal.
        </p>
        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Namaskar! I would like to order from Bhakti Store. Please help me find the right product.")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="bg-[#25D366] text-[#fff] hover:bg-[#1da851] gap-2 text-lg px-8 py-6"
          >
            <Phone className="h-5 w-5" />
            Chat on WhatsApp
          </Button>
        </a>
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-primary-foreground/70">
          <span>Secure Payments</span>
          <span>Fast Delivery</span>
          <span>Easy Returns</span>
          <span>COD Available</span>
        </div>
      </div>
    </section>
  )
}
