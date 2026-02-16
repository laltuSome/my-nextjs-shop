import type { Metadata } from "next"
import { getProducts } from "@/lib/wordpress"
import { ProductCard } from "@/components/product-card"
import { SearchForm } from "@/components/search-form"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export const metadata: Metadata = {
  title: "Search Products",
  description: "Search our collection of Laddu Gopal dresses, accessories, and singhasan.",
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const query = params.q || ""
  const { products } = query ? await getProducts({ search: query }) : { products: [] }

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Search Products</h1>
          <p className="mt-2 text-muted-foreground">Find the perfect outfit for your Laddu Gopal</p>
        </div>

        <SearchForm initialQuery={query} />

        {query && (
          <div className="mt-10">
            <p className="mb-6 text-sm text-muted-foreground">
              {products.length} results for &ldquo;{query}&rdquo;
            </p>
            {products.length > 0 ? (
              <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-20 text-center">
                <p className="text-lg text-muted-foreground">No products match your search.</p>
                <p className="text-sm text-muted-foreground">
                  Try a different keyword or browse our categories.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
      <WhatsAppFloat />
    </>
  )
}
