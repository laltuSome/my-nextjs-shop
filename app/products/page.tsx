import type { Metadata } from "next"
import { getProducts } from "@/lib/wordpress"
import { ProductCard } from "@/components/product-card"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our complete collection of Laddu Gopal dresses, accessories, and singhasan.",
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ bestseller?: string; new?: string }>
}) {
  const params = await searchParams
  const isBestseller = params.bestseller === "true"
  const isNew = params.new === "true"

  const { products } = await getProducts({
    bestseller: isBestseller || undefined,
    newArrival: isNew || undefined,
  })

  const title = isBestseller ? "Bestsellers" : isNew ? "New Arrivals" : "All Products"
  const subtitle = isBestseller
    ? "Most loved by our devotees"
    : isNew
      ? "Fresh additions to our collection"
      : "Browse our complete collection"

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        {products.length > 0 ? (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-lg text-muted-foreground">No products found.</p>
          </div>
        )}
      </section>



      
      <WhatsAppFloat />
    </>
  )
}
