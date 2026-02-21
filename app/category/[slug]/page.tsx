import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getProducts, getCategories } from "@/lib/wordpress"
import { ProductCard } from "@/components/product-card"
import { WhatsAppFloat } from "@/components/whatsapp-float"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const categories = await getCategories()
  const cat = categories.find((c) => c.slug === slug)
  return {
    title: cat ? cat.name : "Category",
    description: cat?.description || `Browse products in ${slug} category`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const [categories, { products }] = await Promise.all([
    getCategories(),
    getProducts({ category: slug }),
  ])
  const category = categories.find((c) => c.slug === slug)
  const categoryName = category?.name || slug.charAt(0).toUpperCase() + slug.slice(1)

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-8">
        
        {/* 1. Breadcrumb First */}
        <nav className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#772237]">Home</Link>
          <span>/</span>
          <span className="text-[#772237] font-bold">{categoryName}</span>
        </nav>

        {/* 2. Title Second */}
        <div className="mb-6">
          <h1 className="font-serif text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
            {categoryName}
          </h1>
          {category?.description && (
            <p className="mt-2 text-lg text-muted-foreground italic">{category.description}</p>
          )}
          <p className="mt-1 text-sm font-bold text-[#ed701d]">{products.length} Products Found</p>
        </div>

        {/* 3. Banner Image Third (Placeholder for all categories) */}
        <div className="relative w-full h-[200px] md:h-[300px]  overflow-hidden mb-10 ">
          <img 
            src="https://via.placeholder.com/1200x400/772237/ffffff?text=Premium+Collection" 
            alt="Category Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 4. Product Grid */}
        {products.length > 0 ? (
          <div className="grid gap-8 grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-center bg-gray-50 rounded-3xl">
            <p className="text-lg text-muted-foreground">No products found in this category.</p>
            <Link href="/" className="font-bold text-[#772237] underline">
              Back to Home
            </Link>
          </div>
        )}
      </section>
      
      <WhatsAppFloat />
    </>
  )
}