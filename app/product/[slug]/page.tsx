import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug, getProducts } from "@/lib/wordpress"
import { ProductDetail } from "@/components/product-detail"
import { ProductSection } from "@/components/product-section"
import { WhatsAppFloat } from "@/components/whatsapp-float"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "Product Not Found" }
  return {
    title: product.title,
    description: product.excerpt,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const { products: related } = await getProducts()
  const relatedProducts = related.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <>
      <ProductDetail product={product} />
      {relatedProducts.length > 0 && (
        <ProductSection
          title="You May Also Like"
          subtitle="Similar products from our collection"
          products={relatedProducts}
          viewAllHref="/products"
        />
      )}
      <WhatsAppFloat />
    </>
  )
}
