"use client";

import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { Product } from '@/lib/types'; 

interface ComboSectionProps {
  products: Product[];
}

export const ComboSection = ({ products }: ComboSectionProps) => {
  if (!products || products.length === 0) return null;

  const getWhatsAppLink = (product: Product) => {
    // Description theke HTML tags remove korar jonno
    const cleanDescription = product.description 
      ? product.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + "..." 
      : "No description available";

    const message = encodeURIComponent(
      `Namaskar! I want to order this Special Combo:\n\n` +
      `*Product:* ${product.title}\n` +
      `*Price:* ₹${product.salePrice || product.price}\n` +
      `*Details:* ${cleanDescription}\n\n` +
      `Please confirm my order.`
    );
    return `https://wa.me/918637824619?text=${message}`;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#fffbf5] to-[#fff5e6]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Sparkles className="text-orange-500 w-5 h-5 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#772237]">
              Gopal Ji Special Combos
            </h2>
            <Sparkles className="text-orange-500 w-5 h-5 animate-pulse" />
          </div>
          <p className="text-gray-600 font-medium ">Full Shringar Set: Dress, Jewelry, Pagri & More</p>
       
        </div>

        {/* Combo Grid (3 columns for 3 items) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-orange-100/50 flex flex-col">
              
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-gray-50">
                <img 
                  src={product.image || '/placeholder.webp'} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Bundle Deal</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="pt-5 flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#4d1a27] transition-colors">
                  {product.title}
                </h3>
                
                {/* Description Preview (WordPress Content) */}
                <div 
                  className="text-gray-500 text-sm line-clamp-2 mb-4"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                
                <div className="mb-6">
                  {product.salePrice && (
                    <span className="text-xs text-gray-400 line-through block">M.R.P: ₹{product.price}</span>
                  )}
                  <span className="text-2xl font-black text-[#772237]">RS{product.salePrice || product.price}</span>
                </div>
              </div>

              {/* Full Width Order Now Button */}
              <a 
                href={getWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#772237] text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Order Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};