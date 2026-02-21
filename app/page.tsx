import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { ProductSection } from "@/components/product-section"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { ReviewVideoSection } from "@/components/ReviewVideoSection"
import { PujaFardoCTA } from "@/components/PujaFardoCTA"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { getProducts, getCategories } from "@/lib/wordpress"
import { ComboSection } from "@/components/ComboSection"

export default async function HomePage() {
  // Fetching data from WordPress API in parallel
  const [
    categories, 
    { products: bestsellers }, 
    { products: newArrivals },
    { products: combos }
  ] = await Promise.all([
    getCategories(),
    getProducts({ bestseller: true }),
    getProducts({ newArrival: true }),
    getProducts({ combo: true, perPage: 3 }), 
  ])

  return (
    <>
      <HeroSection />
      
      <CategoryGrid categories={categories} />

    <ComboSection products={combos} />

      {/* Bestsellers Section */}
      <ProductSection
        title="Bestsellers"
        subtitle="Most loved by our devotees"
        products={bestsellers}
        viewAllHref="/products?bestseller=true"
      />

      <div className="mx-auto max-w-7xl px-4">
        <hr className="border-border" />
      </div>

      {/* New Arrivals Section */}
      <ProductSection
        title="New Arrivals"
        subtitle="Fresh additions to our collection"
        products={newArrivals}
        viewAllHref="/products?new=true"
      />
 <WhatsAppCTA />
      <ReviewVideoSection />
      
      <PujaFardoCTA />
      
     
      
      <WhatsAppFloat />
    </>
  )
}