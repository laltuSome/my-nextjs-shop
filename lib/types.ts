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
    
    // --- আপনি যে ৩টি আলাদা ফিল্ড বানিয়েছেন ---
    size?: string
    // ---------------------------------------

    // --- Size Guide Image (নতুন যোগ করা হয়েছে) ---
    size_guide?: string | { url: string }; 
    // ------------------------------------------

    material?: string
    is_bestseller?: boolean
    is_new_arrival?: boolean
    is_combo?: boolean
    thakur_type?: string; 
    product_rating?: number;

    // Repeater ফিল্ডটি রেখে দেওয়া হলো যদি ভবিষ্যতে লাগে, নাহলে এটি অপশনাল
    product_variants?: {
      variant_size: string;
      variant_price: number;
      variant_sale_price?: number;
      variant_image?: string | { url: string };
    }[];
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
  
  // --- সাইজ গাইডের জন্য ---
  size_guide?: string;
  
  // --- অন্যান্য সাইজের প্রোডাক্টের লিঙ্ক রাখার জন্য ---
  variants?: {
    size: string;
    slug: string; // এখানে slug থাকবে কারণ ক্লিক করলে অন্য পেজে যাবে
  }[];
  
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