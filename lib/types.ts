export interface WPProduct {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  featured_media: number
  categories: number[]
  acf: {
    price: number
    sale_price?: number
    product_gallery?: { url: string; alt: string }[]
    size?: string
    material?: string
    is_bestseller?: boolean
    is_new_arrival?: boolean
    
  }
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string
      alt_text: string
    }[]
    "wp:term"?: {
      id: number
      name: string
      slug: string
    }[][]
  }
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
  parent: number;
  acf?: {
    category_image?: any; // এখানে any দিলে এটি সব ফরম্যাট একসেপ্ট করবে
  };
}

export interface Product {
  id: number
  slug: string
  title: string
  description: string
  excerpt: string
  image: string
  gallery: { url: string; alt: string }[]
  price: number
  salePrice?: number
  size?: string
  material?: string
  isBestseller: boolean
  isNewArrival: boolean
  categories: { id: number; name: string; slug: string }[]
}

export interface Category {
  id: number
  name: string
  slug: string
  count: number
  description: string
  image: string
}
