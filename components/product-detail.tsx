"use client"

import Image from "next/image"
import { useState } from "react"
import { Phone, ChevronLeft, Truck, Shield, RotateCcw } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getWhatsAppLink } from "@/lib/wordpress"
import type { Product } from "@/lib/types"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const allImages = [
    { url: product.image, alt: product.title },
    ...product.gallery.filter((g) => g.url !== product.image),
  ]
  const [selectedImage, setSelectedImage] = useState(0)

  const hasDiscount = product.salePrice && product.salePrice < product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
        <span>/</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Image Gallery */}
        <div className="flex-1">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <Image
              src={allImages[selectedImage].url}
              alt={allImages[selectedImage].alt}
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
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    i === selectedImage ? "border-primary" : "border-border"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col gap-5">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {product.isNewArrival && (
              <Badge className="bg-accent text-accent-foreground">New Arrival</Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-primary text-primary-foreground">Bestseller</Badge>
            )}
            {product.categories.map((cat) => (
              <Badge key={cat.id} variant="outline">{cat.name}</Badge>
            ))}
          </div>

          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            {product.title}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              Rs {hasDiscount ? product.salePrice : product.price}
            </span>
            {hasDiscount && (
              <span className="text-xl text-muted-foreground line-through">Rs {product.price}</span>
            )}
          </div>

          <Separator />

          {/* Details */}
          <div className="flex flex-col gap-3">
            {product.size && (
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

          {/* WhatsApp Book */}
          <a href={getWhatsAppLink(product)} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="w-full bg-[#25D366] text-[#fff] hover:bg-[#1da851] gap-2 text-lg py-6"
            >
              <Phone className="h-5 w-5" />
              Book via WhatsApp
            </Button>
          </a>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1 rounded-lg bg-muted p-3 text-center">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-xs text-muted-foreground">Free Shipping 999+</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg bg-muted p-3 text-center">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-xs text-muted-foreground">Quality Assured</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg bg-muted p-3 text-center">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span className="text-xs text-muted-foreground">Easy Returns</span>
            </div>
          </div>

          <Separator />

          {/* Description */}
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
