import Link from "next/link"
import { ArrowRight, MessageCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

interface ProductSectionProps {
  title: string
  subtitle?: string
  products: Product[]
  viewAllHref?: string
}

export function ProductSection({ title, subtitle, products, viewAllHref }: ProductSectionProps) {
  if (products.length === 0) return null

  const getWhatsAppLink = (product: Product) => {
    const message = encodeURIComponent(
      `Namaskar! I am interested in this product:\n\n*Product:* ${product.title}\n*Price:* ₹${product.salePrice || product.price}\n\nPlease provide more details.`
    );
    return `https://wa.me/918637824619?text=${message}`;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      {/* Header Section */}
      <div className="mb-10 flex items-end justify-between border-b pb-6">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#772237] md:text-5xl">{title}</h2>
          {subtitle && <p className="mt-2 text-lg text-muted-foreground italic">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Link href={viewAllHref} className="hidden sm:block">
            <Button variant="ghost" className="gap-2 text-[#772237] hover:bg-[#772237]/10 font-bold text-lg">
              View All <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        )}
      </div>

      {/* Grid Layout - Fixed 3 Columns on Desktop */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col bg-white rounded-3xl border border-gray-100 p-4 hover:shadow-xl transition-all duration-300">
            
            {/* Image Container */}
            <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden rounded-2xl mb-5 bg-gray-50">
              <img 
                src={product.image || '/placeholder.webp'} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </Link>

            {/* Info Section */}
            <div className="flex-grow space-y-2 mb-6">
              <Link href={`/product/${product.slug}`}>
                <h3 className="text-2xl font-bold text-gray-800 line-clamp-1 hover:text-[#772237] transition-colors">
                  {product.title}
                </h3>
              </Link>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#772237]">
                  ₹{product.salePrice || product.price}
                </span>
                {product.salePrice && (
                  <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                )}
              </div>
            </div>

            {/* Action Buttons - View & Order */}
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
        ))}
      </div>

      {/* View All for Mobile */}
      {viewAllHref && (
        <div className="mt-10 text-center sm:hidden">
          <Link href={viewAllHref}>
            <Button className="w-full py-6 bg-[#772237] text-white font-bold rounded-xl">
              View All Products <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </section>
  )
}