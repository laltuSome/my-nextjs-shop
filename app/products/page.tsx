import type { Metadata } from "next"
import Link from "next/link"
import { getProducts } from "@/lib/wordpress" 
import { ProductCard } from "@/components/product-card"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ProductFilters } from "@/components/ProductFilters"

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our complete collection of Laddu Gopal dresses.",
}

interface PageProps {
  searchParams: Promise<{ 
    q?: string; 
    material?: string; 
    thakur?: string;
    price?: string; 
    rating?: string;
    bestseller?: string; 
    new?: string 
  }>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  const { products } = await getProducts({
    bestseller: params.bestseller === "true" || undefined,
    newArrival: params.new === "true" || undefined,
    search: params.q || undefined, 
  });

  // --- Filter Logic ---
  let filteredProducts = products;
  
  // 1. Thakur/Dress Type Filter
  if (params.thakur) {
    filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(params.thakur!.toLowerCase()) || 
        (p as any).thakur_type?.toLowerCase() === params.thakur?.toLowerCase()
    );
  }

  // 2. Material Filter
  if (params.material) {
    filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(params.material!.toLowerCase()) || 
        (p as any).material?.toLowerCase() === params.material?.toLowerCase()
    );
  }

  // 3. Exact Price Match Filter
  if (params.price) {
    filteredProducts = filteredProducts.filter(p => {
        const productPrice = p.salePrice || p.price;
        return productPrice.toString() === params.price;
    });
  }

  // 4. Rating Filter
  if (params.rating) {
    filteredProducts = filteredProducts.filter(p => 
        (p as any).rating >= parseInt(params.rating!)
    );
  }

  const title = params.bestseller === "true" ? "Bestsellers" : params.new === "true" ? "New Arrivals" : "All Products";

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-8">
        
        {/* Header Section: Content Left | Banner Right */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center">
          <div className="w-full md:w-1/3 space-y-4 text-left">
            <nav className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Link href="/" className="hover:text-[#772237]">Home</Link>
              <span>/</span>
              <span className="text-[#772237] font-bold">{title}</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-black text-[#772237] uppercase leading-tight">
              {title}
            </h1>
           
            <p className="text-gray-500  font-medium">Handcrafted with love for your deities.</p>
          </div>

          <div className="w-full md:w-2/3 h-[250px] md:h-[300px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white bg-[#772237]/5">
            <img 
              src="https://via.placeholder.com/900x300/772237/ffffff?text=Premium+Handmade+Collection" 
              alt="Banner" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar Area */}
          <aside className="w-full md:w-64">
             <ProductFilters />
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            <div className="mb-6">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Showing {filteredProducts.length} Results
               </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid gap-8 grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed">
                <p className="text-xl font-medium text-gray-400">No products match your criteria.</p>
                <Link href="/products" className="mt-4 inline-block text-[#772237] font-bold underline">
                    Reset all filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </>
  )
}