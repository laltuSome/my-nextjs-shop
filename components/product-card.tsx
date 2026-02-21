import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, Eye } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.salePrice && product.salePrice < product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  const getWhatsAppLink = (product: Product) => {
    const message = encodeURIComponent(
      `Namaskar! I want to order this product:\n\n*Product:* ${product.title}\n*Price:* Rs ${product.salePrice || product.price}`
    );
    return `https://wa.me/918637824619?text=${message}`;
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-card shadow-sm transition-all hover:shadow-xl p-4">
      {/* Image Area */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden rounded-2xl mb-4 bg-gray-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.isNewArrival && (
            <Badge className="bg-[#772237] text-white border-none text-[10px]">New</Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-orange-500 text-white border-none text-[10px]">
              -{discountPercent}%
            </Badge>
          )}
        </div>
        {product.isBestseller && (
          <div className="absolute right-2 top-2">
            <Badge className="bg-yellow-500 text-black border-none text-[10px]">Bestseller</Badge>
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="flex flex-1 flex-col gap-2">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-[#772237] transition-colors leading-tight">
            {product.title}
          </h3>
        </Link>
        
        {product.size && (
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Size: {product.size}</p>
        )}

        <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#772237]">
                  ₹{product.salePrice || product.price}
                </span>
                {product.salePrice && (
                  <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                )}
              </div>

        {/* Action Buttons - 2 Button Row */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
  {/* Details Button - Filled with Theme Color */}
  <Link href={`/product/${product.slug}`} className="w-full">
    <Button 
      variant="default" 
      className="w-full h-11 rounded-xl bg-[#772237] text-white font-bold text-sm border-none hover:bg-[#772237]"
    >
      Details
    </Button>
  </Link>
  
  {/* Order Button - Custom Orange Color (#ed701d) */}
  <a 
    href={getWhatsAppLink(product)}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full"
  >
    <Button 
      className="w-full h-11 rounded-xl bg-[#ed701d] text-white font-bold text-sm border-none hover:bg-[#ed701d] shadow-sm"
    >
      Order
    </Button>
  </a>
</div>
      </div>
    </div>
  )
}