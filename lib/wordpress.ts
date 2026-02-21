import type { Product, Category, WPProduct, WPCategory } from "./types"

const WP_API_URL = "https://bhaktistore.sajadvertising.com/wp-json/wp/v2"
const USE_MOCK = false 

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
    price: wp.acf?.price || 0,
    salePrice: wp.acf?.sale_price || undefined,
    size: wp.acf?.size || undefined,
    material: wp.acf?.material || undefined,
    isBestseller: wp.acf?.is_bestseller || false,
    isNewArrival: wp.acf?.is_new_arrival || false,
    isCombo: wp.acf?.is_combo || false, 
    // --- নুতন ফিল্ড যা ফিল্টারের জন্য লাগবে ---
    thakur_type: wp.acf?.thakur_type || "", // ACF field name: thakur_type
    rating: wp.acf?.product_rating || 0,   // ACF field name: product_rating
    
    categories: terms.map((t: any) => ({ id: t.id, name: t.name, slug: t.slug })),
  }
}

/**
 * Transforms WordPress API category data into our local Category type
 */
function transformWPCategory(wp: WPCategory, index: number): Category {
  const defaultImages = [
    "/images/categories/dresses.jpg",
    "/images/categories/accessories.jpg",
    "/images/categories/singhasan.jpg",
    "/images/categories/festival.jpg",
  ];
  
  let acfImage = "";
  if (wp.acf?.category_image) {
    if (typeof wp.acf.category_image === "string") {
      acfImage = wp.acf.category_image;
    } 
    else if (typeof wp.acf.category_image === "object" && (wp.acf.category_image as any).url) {
      acfImage = (wp.acf.category_image as any).url;
    }
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
  material?: string   // Added material param
  thakur?: string     // Added thakur param
  rating?: number     // Added rating param
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
    
    // 1. Map all data
    let products = data.map(transformWPProduct)

    // 2. Filter by Category slug
    if (params?.category) {
      products = products.filter((p) => 
        p.categories.some((c) => c.slug === params.category)
      )
    }

    // 3. Filter by Bestseller ACF
    if (params?.bestseller) {
      products = products.filter((p) => p.isBestseller)
    }

    // 4. Filter by New Arrival ACF
    if (params?.newArrival) {
      products = products.filter((p) => p.isNewArrival)
    }

    // 5. Filter by Combo ACF
    if (params?.combo) {
      products = products.filter((p) => (p as any).isCombo === true)
    }

    // 6. Filter by Material (Backend Logic)
    if (params?.material) {
        products = products.filter((p) => p.material?.toLowerCase() === params.material?.toLowerCase())
    }

    // 7. Filter by Thakur Type (Backend Logic)
    if (params?.thakur) {
        products = products.filter((p) => (p as any).thakur_type?.toLowerCase() === params.thakur?.toLowerCase())
    }

    // 8. Pagination
    const perPage = params?.perPage || 100
    const page = params?.page || 1
    const paginatedProducts = products.slice((page - 1) * perPage, page * perPage)

    return { products: paginatedProducts, total: products.length }
  } catch (error) {
    console.error("Fetch error:", error)
    return { products: [], total: 0 }
  }
}

// ... বাকি ফাংশনগুলো (getProductBySlug, getCategories, etc.) আগের মতোই থাকবে।

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
    console.error("Slug fetch error:", error)
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
    console.error("Category fetch error:", error)
    return [] 
  }
}

export function getWhatsAppLink(product: Product): string {
  const message = encodeURIComponent(
    `Namaskar! I am interested in ordering "${product.title}".\n\nPrice: Rs ${product.salePrice || product.price}\nSize: ${product.size || "N/A"}\n\nPlease share more details.`
  )
  return `https://wa.me/918637824619?text=${message}`
}