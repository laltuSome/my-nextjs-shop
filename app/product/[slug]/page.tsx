import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug, getProducts, getProductVariants } from "@/lib/wordpress"
import { ProductDetail } from "@/components/product-detail"
import { ProductSection } from "@/components/product-section"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export const revalidate = 10;

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
  
  // ১. মেইন প্রোডাক্ট ডাটা আনা
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  // ২. একই নামের অন্য সাইজের প্রোডাক্টগুলো খুঁজে বের করা
  const variants = await getProductVariants(product)

  // ৩. রিলেটেড প্রোডাক্ট লজিক
  const { products: related } = await getProducts()
  const relatedProducts = related
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-gray-50/30">
      {/* আমরা 'variants' প্রপস হিসেবে পাঠিয়ে দিচ্ছি, 
          যাতে ProductDetail ফাইলে বাটনগুলো দেখা যায় 
      */}
      <ProductDetail product={product} variants={variants} />
      
      {relatedProducts.length > 0 && (
        <ProductSection
          title="You May Also Like"
          subtitle="Similar products from our collection"
          products={relatedProducts}
          viewAllHref="/products"
        />
      )}
      <WhatsAppFloat />
    </main>
  )
}