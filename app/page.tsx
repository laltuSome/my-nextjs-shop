import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { ProductSection } from "@/components/product-section"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { ReviewVideoSection } from "@/components/ReviewVideoSection"
import { PujaFardoCTA } from "@/components/PujaFardoCTA"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { getProducts, getCategories } from "@/lib/wordpress"

export default async function HomePage() {
  const [categories, { products: bestsellers }, { products: newArrivals }] = await Promise.all([
    getCategories(),
    getProducts({ bestseller: true }),
    getProducts({ newArrival: true }),
  ])

  return (
    <>
      <HeroSection />
      <CategoryGrid categories={categories} />
      <ProductSection
        title="Bestsellers"
        subtitle="Most loved by our devotees"
        products={bestsellers}
        viewAllHref="/products?bestseller=true"
      />
      <div className="mx-auto max-w-7xl px-4">
        <hr className="border-border" />
      </div>
      <ProductSection
        title="New Arrivals"
        subtitle="Fresh additions to our collection"
        products={newArrivals}
        viewAllHref="/products?new=true"
      />
      <ReviewVideoSection/>
<PujaFardoCTA/>
      <WhatsAppCTA />
      <WhatsAppFloat />
    </>
  )
}
