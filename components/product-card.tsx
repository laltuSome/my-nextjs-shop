import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.salePrice && product.salePrice < product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.isNewArrival && (
            <Badge className="bg-accent text-accent-foreground text-xs">New</Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-destructive text-destructive-foreground text-xs">
              -{discountPercent}%
            </Badge>
          )}
        </div>
        {product.isBestseller && (
          <div className="absolute right-2 top-2">
            <Badge className="bg-primary text-primary-foreground text-xs">Bestseller</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-sm font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        {product.size && (
          <p className="text-xs text-muted-foreground">Size: {product.size}</p>
        )}
        <div className="mt-auto flex items-center gap-2 pt-1">
          <span className="text-lg font-bold text-primary">
            Rs {hasDiscount ? product.salePrice : product.price}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              Rs {product.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
