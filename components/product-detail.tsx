"use client"

import Image from "next/image"
import { useState, useMemo } from "react"
import { Phone, ChevronLeft, Truck, Shield, RotateCcw } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/lib/types"

// ভেরিয়েন্টের জন্য ইন্টারফেস (আলাদা প্রোডাক্টের জন্য)
interface Variant {
  size: string
  slug: string
}

interface ProductDetailProps {
  product: Product
  variants?: Variant[] // সার্ভার থেকে আসা রিলেটেড সাইজগুলো
}

export function ProductDetail({ product, variants = [] }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  // ১. ইমেজ গ্যালারি সেটআপ
  const allImages = useMemo(() => {
    return [
      { url: product.image, alt: product.title },
      ...product.gallery
    ]
  }, [product])

  // ২. প্রাইস লজিক (সরাসরি মেইন প্রোডাক্ট থেকে)
  const currentPrice = product.price
  const currentSalePrice = product.salePrice
  const hasDiscount = currentSalePrice && currentSalePrice < currentPrice
  const discountPercent = hasDiscount
    ? Math.round(((currentPrice - currentSalePrice!) / currentPrice) * 100)
    : 0

  // ৩. ডাইনামিক হোয়াটসঅ্যাপ লিঙ্ক
  const waLink = useMemo(() => {
    const message = encodeURIComponent(
      `Namaskar! I want to order "${product.title}".\nSize: ${product.size || "N/A"}\nPrice: Rs ${currentSalePrice || currentPrice}\n\nPlease confirm availability.`
    )
    return `https://wa.me/918637824619?text=${message}`
  }, [product, currentPrice, currentSalePrice])

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
        <span>/</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      <Link href="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ChevronLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Image Gallery */}
        <div className="flex-1">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <Image
              src={allImages[selectedImage]?.url || product.image}
              alt={allImages[selectedImage]?.alt || product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {hasDiscount && (
              <Badge className="absolute left-3 top-3 bg-destructive text-destructive-foreground">
                -{discountPercent}% OFF
              </Badge>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    i === selectedImage ? "border-primary" : "border-border"
                  }`}
                >
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {product.isNewArrival && <Badge className="bg-accent text-accent-foreground">New Arrival</Badge>}
            {product.isBestseller && <Badge className="bg-primary text-primary-foreground">Bestseller</Badge>}
            {product.categories.map((cat) => (
              <Badge key={cat.id} variant="outline">{cat.name}</Badge>
            ))}
          </div>

          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{product.title}</h1>

          {/* Price Display */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              Rs {hasDiscount ? currentSalePrice : currentPrice}
            </span>
            {hasDiscount && (
              <span className="text-xl text-muted-foreground line-through">Rs {currentPrice}</span>
            )}
          </div>

          <Separator />

          {/* ৪. Size Selection (এক প্রোডাক্ট থেকে অন্য প্রোডাক্টে লিঙ্ক করবে) */}
          {variants.length > 1 && (
            <div className="flex flex-col gap-4">
              <span className="text-sm font-bold text-foreground uppercase tracking-wider">Available Sizes:</span>
              <div className="flex flex-wrap gap-3">
                {variants.map((v, index) => (
                  <Link
                    key={index}
                    href={`/product/${v.slug}`}
                    className={`min-w-[60px] px-4 py-2 rounded-lg border-2 font-bold transition-all text-center flex items-center justify-center ${
                      v.slug === product.slug
                        ? "border-primary bg-primary/10 text-primary" // বর্তমানে যে সাইজ ওপেন আছে
                        : "border-border text-muted-foreground hover:border-primary"
                    }`}
                  >
                    {v.size}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {product.size && !variants.length && (
               <div className="flex items-center gap-3">
                 <span className="w-20 text-sm font-medium text-muted-foreground">Size</span>
                 <span className="text-sm text-foreground">{product.size}</span>
               </div>
            )}
            {product.material && (
              <div className="flex items-center gap-3">
                <span className="w-20 text-sm font-medium text-muted-foreground">Material</span>
                <span className="text-sm text-foreground">{product.material}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* WhatsApp Book Button */}
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full bg-[#25D366] text-[#fff] hover:bg-[#1da851] gap-2 text-lg py-7 rounded-xl shadow-lg shadow-green-200">
              <Phone className="h-5 w-5" />
              Book via WhatsApp
            </Button>
          </a>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1 rounded-lg bg-muted p-3 text-center">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-[10px] md:text-xs text-muted-foreground leading-tight">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg bg-muted p-3 text-center">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-[10px] md:text-xs text-muted-foreground leading-tight">Quality Check</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg bg-muted p-3 text-center">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span className="text-[10px] md:text-xs text-muted-foreground leading-tight">Easy Returns</span>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="mb-3 text-lg font-bold text-foreground">Description</h2>
            <div
              className="prose prose-sm text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}