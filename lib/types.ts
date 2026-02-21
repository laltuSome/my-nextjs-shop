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
    // --- Variants (Repeater Field) Support ---
    product_variants?: {
      variant_size: string;
      variant_price: number;
      variant_sale_price?: number;
      variant_image?: string | { url: string }; // প্রতিটি সাইজের আলাদা ছবি থাকতে পারে
    }[];
    // ------------------------------------------
    size?: string
    material?: string
    is_bestseller?: boolean
    is_new_arrival?: boolean
    is_combo?: boolean
    thakur_type?: string; 
    product_rating?: number;
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
    category_image?: any; 
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
  // --- Frontend-এ ভ্যারিয়েন্ট দেখানোর জন্য নতুন ফিল্ড ---
  variants?: {
    size: string;
    price: number;
    salePrice?: number;
    image?: string;
  }[];
  // ------------------------------------------------
  size?: string
  material?: string
  isBestseller: boolean
  isNewArrival: boolean
  isCombo: boolean
  thakur_type?: string; 
  rating?: number;      
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