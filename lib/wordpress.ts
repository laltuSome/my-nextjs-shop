import type { Product, Category, WPProduct, WPCategory } from "./types"

const WP_API_URL = "https://bhaktistore.sajadvertising.com/wp-json/wp/v2"

// --- WordPress API Helpers ---

/**
 * Transforms WordPress API product data into our local Product type
 */
function transformWPProduct(wp: WPProduct): Product {
  const media = wp._embedded?.["wp:featuredmedia"]?.[0]
  const terms = wp._embedded?.["wp:term"]?.[0] || []
  
  return {
    id: wp.id,
    slug: wp.slug,
    title: wp.title.rendered,
    description: wp.content.rendered,
    excerpt: wp.excerpt.rendered.replace(/<[^>]+>/g, ""),
    image: media?.source_url || "/images/products/dress-1.jpg",
    gallery: wp.acf?.product_gallery?.map((img: any) => ({ url: img.url, alt: img.alt })) || [],
    
    // সরাসরি ACF ফিল্ড থেকে ডেটা নেওয়া (আপনার বানানো price, size, sale_price)
    price: Number(wp.acf?.price || 0),
    salePrice: wp.acf?.sale_price ? Number(wp.acf.sale_price) : undefined,
    size: wp.acf?.size || undefined,
    
    material: wp.acf?.material || undefined,
    isBestseller: wp.acf?.is_bestseller || false,
    isNewArrival: wp.acf?.is_new_arrival || false,
    isCombo: wp.acf?.is_combo || false, 
    thakur_type: wp.acf?.thakur_type || "", 
    rating: wp.acf?.product_rating || 0,   
    
    categories: terms.map((t: any) => ({ id: t.id, name: t.name, slug: t.slug })),
  }
}

/**
 * একই নামের অন্য সাইজের প্রোডাক্টগুলো খুঁজে বের করার ফাংশন
 * এটি টাইটেলের প্রথম অংশ দিয়ে সার্চ করে অন্য প্রোডাক্টের লিঙ্ক নিয়ে আসে
 */
export async function getProductVariants(currentProduct: Product): Promise<{size: string, slug: string}[]> {
  try {
    // টাইটেল থেকে মেইন নামটা বের করা (যেমন: "Laddu Gopal - 5" থেকে "Laddu Gopal" নেওয়া)
    // হাইফেন (-) বা স্পেস থাকলে তার আগের অংশটুকু নেবে
    const mainTitle = currentProduct.title.split('-')[0].split('|')[0].trim();
    
    const res = await fetch(`${WP_API_URL}/products?search=${encodeURIComponent(mainTitle)}&_embed=true`);
    const data: WPProduct[] = await res.json();
    
    // বর্তমান লিস্ট থেকে সাইজ এবং স্লাগ বের করা
    return data
      .filter(wp => wp.acf?.size) // যাদের সাইজ দেওয়া আছে শুধু তাদের নেবে
      .map(wp => ({
        size: String(wp.acf.size),
        slug: wp.slug
      }))
      .sort((a, b) => parseFloat(a.size) - parseFloat(b.size)); // সাইজ অনুযায়ী সাজানো
  } catch (error) {
    console.error("Variant fetch error:", error);
    return [];
  }
}

/**
 * Fetches products from WordPress with optional filters
 */
export async function getProducts(params?: {
  category?: string
  search?: string
  perPage?: number
  page?: number
  bestseller?: boolean
  newArrival?: boolean
  combo?: boolean
  material?: string 
  thakur?: string    
  rating?: number    
}): Promise<{ products: Product[]; total: number }> {
  
  try {
    const queryParams = new URLSearchParams()
    queryParams.set("_embed", "true")
    queryParams.set("per_page", "100") 
    
    if (params?.search) queryParams.set("search", params.search)

    const res = await fetch(`${WP_API_URL}/products?${queryParams.toString()}`, {
      next: { revalidate: 60 },
    })
    
    if (!res.ok) throw new Error("Failed to fetch products")
    const data: WPProduct[] = await res.json()
    
    let products = data.map(transformWPProduct)

    if (params?.category) {
      products = products.filter((p) => 
        p.categories.some((c) => c.slug === params.category)
      )
    }

    if (params?.bestseller) products = products.filter((p) => p.isBestseller)
    if (params?.newArrival) products = products.filter((p) => p.isNewArrival)
    if (params?.combo) products = products.filter((p) => p.isCombo === true)

    if (params?.material) {
        products = products.filter((p) => p.material?.toLowerCase() === params.material?.toLowerCase())
    }

    if (params?.thakur) {
        products = products.filter((p) => p.thakur_type?.toLowerCase() === params.thakur?.toLowerCase())
    }

    const perPage = params?.perPage || 100
    const page = params?.page || 1
    const paginatedProducts = products.slice((page - 1) * perPage, page * perPage)

    return { products: paginatedProducts, total: products.length }
  } catch (error) {
    console.error("Fetch error:", error)
    return { products: [], total: 0 }
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${WP_API_URL}/products?slug=${slug}&_embed=true`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error("Failed to fetch product")
    const data: WPProduct[] = await res.json()
    if (data.length === 0) return null
    return transformWPProduct(data[0])
  } catch (error) {
    return null
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${WP_API_URL}/product-category?per_page=100&hide_empty=false`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error("Failed to fetch categories")
    const data: WPCategory[] = await res.json()
    return data.map((cat, index) => transformWPCategory(cat, index))
  } catch (error) {
    return [] 
  }
}

function transformWPCategory(wp: WPCategory, index: number): Category {
  const defaultImages = ["/images/categories/dresses.jpg", "/images/categories/accessories.jpg"];
  let acfImage = "";
  if (wp.acf?.category_image) {
    acfImage = typeof wp.acf.category_image === "object" ? wp.acf.category_image?.url : wp.acf.category_image;
  }

  return {
    id: wp.id,
    name: wp.name,
    slug: wp.slug,
    count: wp.count,
    description: wp.description || "",
    image: acfImage || defaultImages[index % defaultImages.length],
  };
}

export function getWhatsAppLink(product: Product): string {
  const message = encodeURIComponent(
    `Namaskar! I am interested in ordering "${product.title}".\n\nPrice: Rs ${product.salePrice || product.price}\nSize: ${product.size || "N/A"}\n\nPlease share more details.`
  )
  return `https://wa.me/918637824619?text=${message}`
}