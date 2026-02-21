import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

export function WhatsAppCTA() {
  return (
    <section className="relative overflow-hidden bg-[#772237] py-16"> 
      {/* Background Decor Elements - Full Width-এ সুন্দর দেখাবে */}
      <div className="absolute left-0 top-0 h-full w-full opacity-10 pointer-events-none">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-white" />
        <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-[#ed701d]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        <div className="flex flex-col items-center gap-4">
          
          <h2 className="font-serif text-3xl font-black text-white md:text-4xl uppercase tracking-tighter">
            Order via WhatsApp
          </h2>
          
          <p className="max-w-xl text-white/80 text-base md:text-lg leading-relaxed">
            আপনার পছন্দের ডিজাইনটি খুঁজে পাচ্ছেন না? সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন, আমরা সাহায্য করব।
          </p>

          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Namaskar! I would like to order from Bhakti Store. Please help me find the right product.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4"
          >
            <Button
              className="bg-[#ed701d] text-white hover:bg-[#d66318] gap-3 rounded-full px-10 py-7 text-lg font-bold transition-all hover:scale-105 shadow-xl border-b-4 border-[#b55210] active:border-b-0"
            >
              <MessageSquare className="h-6 w-6" />
              Start Chatting
            </Button>
          </a>

          {/* Features Bar - একটু গ্যাপ দিয়ে সাজানো */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ed701d]">
            <span className="bg-white/10 px-3 py-1 rounded-full text-white">● Secure Payments</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-white">● Fast Delivery</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-white">● Easy Returns</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-white">● COD Available</span>
          </div>
        </div>
      </div>
    </section>
  )
}