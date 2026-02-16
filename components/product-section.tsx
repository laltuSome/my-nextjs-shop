import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"

interface ProductSectionProps {
  title: string
  subtitle?: string
  products: Product[]
  viewAllHref?: string
}

export function ProductSection({ title, subtitle, products, viewAllHref }: ProductSectionProps) {
  if (products.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
          {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Link href={viewAllHref} className="hidden sm:block">
            <Button variant="ghost" className="gap-1 text-primary hover:text-primary/80">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {viewAllHref && (
        <div className="mt-8 text-center sm:hidden">
          <Link href={viewAllHref}>
            <Button variant="outline" className="gap-1 text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </section>
  )
}
