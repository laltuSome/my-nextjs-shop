"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { siteConfig } from "@/lib/config"

const sliderImages = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
]

// Animated God names list
const godNames = ["Laddu Gopal", "Radha Rani", "Kanha Ji", "Gopal Ji"];

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

    <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center bg-[#fff8e7]">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-[#fff8e7]" />

      {/* Container: 'max-w-7xl' theke bariye 'max-w-[1440px]' kora hoyeche jate wide lage */}
      <div className="relative z-10 mx-auto flex max-w-[1440px] w-full flex-col items-center gap-12 px-8 py-12 md:flex-row-reverse md:py-20">
        
        {/* Right Side: Text Content */}
        <div className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left">
          
       
            <Image 
            src="/brand.webp"          
            alt={siteConfig.name} 
            width={400}               
            height={102} 
            className="object-contain mb-4"
          />
          {/* Font Size: lg:text-8xl theke lg:text-7xl kora hoyeche jate khub boro na lage */}
       <h1 className="text-balance font-serif text-6xl font-extrabold leading-[1.2] text-[#1a1a1a] md:text-5xl lg:text-7xl tracking-tight">
            Beautiful Dresses <br /> 
            <span className="text-[#4a4a4a] font-light">for Your</span>{" "}
        
            {/* Dynamic Text: lg:text-7xl theke lg:text-6xl kora hoyeche */}
          <span className="text-primary inline-block text-4xl md:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-3 duration-1000">
  {godNames[nameIndex]}
</span>
          </h1>
          
         <p className="max-w-xl text-pretty leading-[1.6] text-[#333333] text-base md:text-lg font-medium opacity-95 mb-4">
    Explore our diverse range of <span className="text-primary font-bold">Sarees, Ghagras, Jewelry, Mukuts, and Singhasans</span> for every deity. 
    We offer both <span className="font-bold border-b-2 border-primary/30">Online and Offline</span> shopping experiences. 
    You are most welcome to visit our physical store to feel the quality yourself. 
    Find our exact location on Google Maps or contact us directly via phone for any assistance.
  </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Link href="/products">
              <Button size="lg" className="bg-[#1a1a1a] text-white hover:bg-primary hover:text-white transition-all duration-300 gap-2 text-base font-bold px-10 h-14 rounded-2xl shadow-lg">
                Explore Collection
              </Button>
            </Link>
            
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300 text-base h-14 rounded-2xl px-10 bg-transparent">
                <Phone className="h-5 w-5" />
                WhatsApp Order
              </Button>
            </a>
          </div>
        </div>

        {/* Left Side: Slider (Wide frame) */}
        <div className="relative flex-1 w-full max-w-xl">
          <div className="relative aspect-[4/4] w-full overflow-hidden ">
            {sliderImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image src={img} alt="Slider" fill className="object-cover scale-105" priority={index === 0} />
              </div>
            ))}
          </div>
          
         <div className="absolute -bottom-8 -left-8 rounded-[2rem] bg-white px-10 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[#eee6d3] transform hover:scale-105 transition-transform duration-300">
  <p className="text-[11px] uppercase tracking-[0.25em] text-[#666666] font-bold mb-1">
    Starting from
  </p>
  <div className="flex items-baseline gap-1">
    <span className="text-4xl font-black text-[#1a1a1a]">₹50</span>
    <span className="text-xs font-medium text-[#999999]">/-</span>
  </div>
</div>
        </div>

      </div>
    </section>
  )
}