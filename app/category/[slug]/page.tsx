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
      <section className="mx-auto max-w-7xl px-4 py-10">
        <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-foreground">{categoryName}</span>
        </nav>

        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{categoryName}</h1>
          {category?.description && (
            <p className="mt-2 text-muted-foreground">{category.description}</p>
          )}
          <p className="mt-1 text-sm text-muted-foreground">{products.length} products found</p>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-lg text-muted-foreground">No products found in this category.</p>
            <Link href="/products" className="text-sm text-primary hover:underline">
              Browse all products
            </Link>
          </div>
        )}
      </section>
      <WhatsAppFloat />
    </>
  )
}
