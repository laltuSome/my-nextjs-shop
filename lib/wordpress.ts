import type { Product, Category, WPProduct, WPCategory } from "./types"

const WP_API_URL = "https://bhaktistore.sajadvertising.com/wp-json/wp/v2"
const USE_MOCK = false // Set to false when WordPress REST API is ready

// --- Mock Data ---
const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Vastra / Dresses", slug: "dresses", count: 24, description: "Beautiful handcrafted outfits for Laddu Gopal", image: "/images/categories/dresses.jpg" },
  { id: 2, name: "Shringar / Accessories", slug: "accessories", count: 18, description: "Crowns, flutes, jewelry and ornaments", image: "/images/categories/accessories.jpg" },
  { id: 3, name: "Singhasan / Throne", slug: "singhasan", count: 8, description: "Beautiful thrones and sitting arrangements", image: "/images/categories/singhasan.jpg" },
  { id: 4, name: "Festival Special", slug: "festival", count: 12, description: "Special outfits for Janmashtami, Diwali & more", image: "/images/categories/festival.jpg" },
]

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1, slug: "royal-saffron-silk-vastra", title: "Royal Saffron Silk Vastra",
    description: "<p>Exquisite saffron silk outfit with intricate golden zari embroidery. Handcrafted with love for your Laddu Gopal. Includes matching pagdi (turban) and dupatta.</p><p>Perfect for daily puja or special occasions. Made from premium quality silk fabric with hand-stitched golden threadwork.</p>",
    excerpt: "Exquisite saffron silk outfit with intricate golden zari embroidery.",
    image: "/images/products/dress-1.jpg",
    gallery: [{ url: "/images/products/dress-1.jpg", alt: "Royal Saffron Silk Vastra" }],
    price: 450, salePrice: 399, size: "0-6 No", material: "Pure Silk",
    isBestseller: true, isNewArrival: false,
    categories: [{ id: 1, name: "Vastra / Dresses", slug: "dresses" }],
  },
  {
    id: 2, slug: "royal-blue-kundan-set", title: "Royal Blue Kundan Dress Set",
    description: "<p>Stunning royal blue outfit with kundan stone work and golden embellishments. Complete set includes dress, mukut (crown), and bansuri (flute).</p>",
    excerpt: "Stunning royal blue outfit with kundan stone work and golden embellishments.",
    image: "/images/products/dress-2.jpg",
    gallery: [{ url: "/images/products/dress-2.jpg", alt: "Royal Blue Kundan Set" }],
    price: 650, size: "0-4 No", material: "Silk Blend",
    isBestseller: true, isNewArrival: true,
    categories: [{ id: 1, name: "Vastra / Dresses", slug: "dresses" }],
  },
  {
    id: 3, slug: "maroon-rajasthani-vastra", title: "Maroon Rajasthani Vastra",
    description: "<p>Traditional Rajasthani style maroon outfit with mirror work and heavy zari embroidery. Features peacock feather crown and matching accessories.</p>",
    excerpt: "Traditional Rajasthani style maroon outfit with mirror work.",
    image: "/images/products/dress-3.jpg",
    gallery: [{ url: "/images/products/dress-3.jpg", alt: "Maroon Rajasthani Vastra" }],
    price: 550, salePrice: 499, size: "0-6 No", material: "Cotton Silk",
    isBestseller: false, isNewArrival: true,
    categories: [{ id: 1, name: "Vastra / Dresses", slug: "dresses" }],
  },
  {
    id: 4, slug: "janmashtami-special-green", title: "Janmashtami Special Green Set",
    description: "<p>Festive green and gold outfit specially designed for Janmashtami celebrations. Includes matching mukut, bansuri, and morpankh.</p>",
    excerpt: "Festive green and gold outfit for Janmashtami celebrations.",
    image: "/images/products/dress-4.jpg",
    gallery: [{ url: "/images/products/dress-4.jpg", alt: "Janmashtami Special" }],
    price: 750, size: "0-5 No", material: "Premium Silk",
    isBestseller: false, isNewArrival: true,
    categories: [{ id: 4, name: "Festival Special", slug: "festival" }],
  },
  {
    id: 5, slug: "white-pearl-vastra", title: "White Pearl Decorated Vastra",
    description: "<p>Elegant white outfit decorated with pearls and silver threadwork. Perfect for Sharad Purnima and special occasions.</p>",
    excerpt: "Elegant white outfit decorated with pearls and silver threadwork.",
    image: "/images/products/dress-5.jpg",
    gallery: [{ url: "/images/products/dress-5.jpg", alt: "White Pearl Vastra" }],
    price: 500, size: "0-6 No", material: "Silk",
    isBestseller: true, isNewArrival: false,
    categories: [{ id: 1, name: "Vastra / Dresses", slug: "dresses" }],
  },
  {
    id: 6, slug: "pink-bridal-style-vastra", title: "Pink Bridal Style Vastra",
    description: "<p>Heavy bridal-style pink outfit with kundan and stone work. Premium quality fabric with rich golden borders and matching jewelry set.</p>",
    excerpt: "Heavy bridal-style pink outfit with kundan and stone work.",
    image: "/images/products/dress-6.jpg",
    gallery: [{ url: "/images/products/dress-6.jpg", alt: "Pink Bridal Vastra" }],
    price: 850, salePrice: 749, size: "0-4 No", material: "Heavy Silk",
    isBestseller: true, isNewArrival: true,
    categories: [{ id: 1, name: "Vastra / Dresses", slug: "dresses" }],
  },
]

// --- WordPress API Helpers ---
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
    gallery: wp.acf?.product_gallery?.map((img) => ({ url: img.url, alt: img.alt })) || [],
    price: wp.acf?.price || 0,
    salePrice: wp.acf?.sale_price || undefined,
    size: wp.acf?.size || undefined,
    material: wp.acf?.material || undefined,
    isBestseller: wp.acf?.is_bestseller || false,
    isNewArrival: wp.acf?.is_new_arrival || false,
    categories: terms.map((t) => ({ id: t.id, name: t.name, slug: t.slug })),
  }
}

function transformWPCategory(wp: WPCategory, index: number): Category {
  // ব্যাকআপ ইমেজ (যদি ACF এ ছবি না থাকে তবে এখান থেকে সিরিয়াল অনুযায়ী ছবি নিবে)
  const defaultImages = [
    "/images/categories/dresses.jpg",
    "/images/categories/accessories.jpg",
    "/images/categories/singhasan.jpg",
    "/images/categories/festival.jpg",
  ];
  
  // ACF ডাটা এক্সট্রাক্ট করা
  let acfImage = "";
  
  if (wp.acf?.category_image) {
    // যদি ACF রিটার্ন ফরম্যাট 'Image URL' হয় তবে সরাসরি স্ট্রিং নিবে
    if (typeof wp.acf.category_image === "string") {
      acfImage = wp.acf.category_image;
    } 
    // যদি ACF রিটার্ন ফরম্যাট 'Image Array' বা 'Object' হয় তবে url টি নিবে
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
    // যদি ACF এ ছবি পায় তবে সেটি দেখাবে, না পেলে ব্যাকআপ ইমেজ দেখাবে
    image: acfImage || defaultImages[index % defaultImages.length],
  };
}


export async function getProducts(params?: {
  category?: string
  search?: string
  perPage?: number
  page?: number
  bestseller?: boolean
  newArrival?: boolean
}): Promise<{ products: Product[]; total: number }> {
  
  try {
    const queryParams = new URLSearchParams()
    queryParams.set("_embed", "true")
    // সব ডাটা নিয়ে এসে আমরা ফ্রন্টএন্ডে ফিল্টার করব যাতে নিখুঁত রেজাল্ট পাওয়া যায়
    queryParams.set("per_page", "100") 
    
    if (params?.search) queryParams.set("search", params.search)

    const res = await fetch(`${WP_API_URL}/products?${queryParams.toString()}`, {
      next: { revalidate: 60 },
    })
    
    if (!res.ok) throw new Error("Failed to fetch products")
    const data: WPProduct[] = await res.json()
    
    // ১. প্রথমে সব ডাটাকে আমাদের ফরমেটে রূপান্তর করা
    let products = data.map(transformWPProduct)

    // ২. ক্যাটাগরি অনুযায়ী ফিল্টার করা (এটিই আপনার মূল সমস্যা ছিল)
    if (params?.category) {
      products = products.filter((p) => 
        p.categories.some((c) => c.slug === params.category)
      )
    }

    // ৩. Bestseller ফিল্টার
    if (params?.bestseller) {
      products = products.filter((p) => p.isBestseller)
    }

    // ৪. New Arrival ফিল্টার
    if (params?.newArrival) {
      products = products.filter((p) => p.isNewArrival)
    }

    // ৫. Pagination (যদি লাগে)
    const perPage = params?.perPage || 12
    const page = params?.page || 1
    const paginatedProducts = products.slice((page - 1) * perPage, page * perPage)

    return { products: paginatedProducts, total: products.length }
  } catch (error) {
    console.error("Fetch error:", error)
    return { products: [], total: 0 }
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_MOCK) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null
  }
  try {
    const res = await fetch(`${WP_API_URL}/products?slug=${slug}&_embed=true`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error("Failed to fetch product")
    const data: WPProduct[] = await res.json()
    if (data.length === 0) return null
    return transformWPProduct(data[0])
  } catch {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null
  }
}

export async function getCategories(): Promise<Category[]> {
  if (USE_MOCK) {
    return MOCK_CATEGORIES
  }
  try {
    // এখানে '/categories' এর বদলে '/product-category' ব্যবহার করা হয়েছে
    // আপনার Taxonomy slug অনুযায়ী এই URL টি কাজ করবে
    const res = await fetch(`${WP_API_URL}/product-category?per_page=100&hide_empty=false`, {
      next: { revalidate: 300 },
    })
    
    if (!res.ok) throw new Error("Failed to fetch categories")
    
    const data: WPCategory[] = await res.json()
    
    // ডাটা ম্যাপ করা
    return data.map((cat, index) => transformWPCategory(cat, index))
  } catch (error) {
    console.error("Category fetch error:", error)
    // এরর হলে আপনার মক ডাটা দেখাবে যাতে সাইট ফাঁকা না থাকে
    return MOCK_CATEGORIES 
  }
}

export function getWhatsAppLink(product: Product): string {
  
  const message = encodeURIComponent(
    `Namaskar! I am interested in ordering "${product.title}" "${product.slug}".\n\nPrice: Rs ${product.salePrice || product.price}\nSize: ${product.size || "N/A"}\n\nPlease share more details.`
  )
  return `https://wa.me/918637824619?text=${message}`
}
