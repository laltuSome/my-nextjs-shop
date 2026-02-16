"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { siteConfig } from "@/lib/config"

const sliderImages = [
  "/images/hero-banner.jpg",
  "/images/hero-banner.jpg",
  "/images/hero-banner.jpg",
]

// Animated God names list
const godNames = ["Laddu Gopal", "Radha Rani", "Kanha Ji", "Gopal"];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [nameIndex, setNameIndex] = useState(0)

  // Slider Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Dynamic Name Logic
  useEffect(() => {
    const nameTimer = setInterval(() => {
      setNameIndex((prev) => (prev === godNames.length - 1 ? 0 : prev + 1))
    }, 3000) // Protite 3 second por por nam change hobe
    return () => clearInterval(nameTimer)
  }, [])

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden flex items-center">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="h-full w-full object-cover">
          <source src="/videos/review3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-12 md:flex-row-reverse md:py-24">
        
        {/* Right Side: Text Content */}
        <div className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left">
          <span className="inline-block rounded-full bg-primary/20 border border-primary/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
            Handcrafted with Love
          </span>
          
          <h1 className="text-balance font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-7xl min-h-[120px] md:min-h-0">
            Beautiful Dresses for Your{" "}
            <br />
            <span className="text-primary italic transition-all duration-500 inline-block animate-in fade-in slide-in-from-bottom-2">
              {godNames[nameIndex]}
            </span>
          </h1>
          
          <p className="max-w-lg text-pretty leading-relaxed text-gray-200 text-lg">
            Discover our exclusive collection of premium vastra, shringar, accessories and singhasan.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-8 h-14 rounded-2xl">
                Explore Collection
              </Button>
            </Link>
            
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-base h-14 rounded-2xl px-8 bg-transparent">
                <Phone className="h-5 w-5" />
                WhatsApp Order
              </Button>
            </a>
          </div>
        </div>

        {/* Left Side: Slider */}
        <div className="relative flex-1 w-full max-w-lg">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white/10">
            {sliderImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image src={img} alt="Slider" fill className="object-cover" priority={index === 0} />
              </div>
            ))}
          </div>
          
          <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-4 shadow-2xl">
            <p className="text-[10px] uppercase tracking-widest text-gray-300">Starting from</p>
            <p className="text-3xl font-black text-primary">₹250</p>
          </div>
        </div>

      </div>
    </section>
  )
}