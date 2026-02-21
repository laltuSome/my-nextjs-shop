"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "./product-card";
import { Search, Star, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Product } from "@/lib/types";

export function ProductListContainer({ initialProducts }: { initialProducts: Product[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedThakur, setSelectedThakur] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Filtering Logic (No URL update)
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const price = product.salePrice || product.price;
      const title = product.title.toLowerCase();

      const matchesSearch = title.includes(searchTerm.toLowerCase());
      const matchesMaterial = !selectedMaterial || title.includes(selectedMaterial.toLowerCase());
      const matchesThakur = !selectedThakur || title.includes(selectedThakur.toLowerCase());
      const matchesPrice = !selectedPrice || price.toString() === selectedPrice;
      const matchesRating = !selectedRating || (product as any).rating >= selectedRating;

      return matchesSearch && matchesMaterial && matchesThakur && matchesPrice && matchesRating;
    });
  }, [searchTerm, selectedMaterial, selectedThakur, selectedPrice, selectedRating, initialProducts]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {/* Header & Banner Layout */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center">
        <div className="w-full md:w-1/3">
          <h1 className="font-serif text-4xl md:text-5xl font-black text-[#772237] uppercase">Premium Collection</h1>
          <div className="w-20 h-2 bg-[#ed701d] mt-2 rounded-full"></div>
        </div>
        <div className="w-full md:w-2/3 h-[250px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white bg-[#772237]/10">
          <img src="https://via.placeholder.com/900x300/772237/ffffff?text=Filter+Without+Reloading" className="w-full h-full object-cover" alt="Banner" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Filter Area */}
        <aside className="w-full md:w-64 space-y-8">
          {/* Search */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 uppercase text-xs">Search</h4>
            <div className="relative">
              <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="pl-9 py-5 rounded-xl border-gray-200" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Thakur Dress Filter */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 uppercase text-xs">Dress For</h4>
            {['Gopal', 'Radha Ghera', 'Laxmi Sari', 'Ganesh Dhuti'].map((t) => (
              <label key={t} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedThakur === t} onChange={() => setSelectedThakur(selectedThakur === t ? null : t)} className="w-4 h-4 accent-[#772237]" />
                <span className="text-sm text-gray-600">{t}</span>
              </label>
            ))}
          </div>

          {/* Price Filter (Fixed List) */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 uppercase text-xs">Price (Rs)</h4>
            <div className="grid grid-cols-2 gap-2">
              {['100', '150', '200', '300', '500'].map((p) => (
                <button key={p} onClick={() => setSelectedPrice(selectedPrice === p ? null : p)} className={`py-2 text-xs font-bold rounded-lg border ${selectedPrice === p ? 'bg-[#772237] text-white' : 'bg-white text-gray-600 hover:border-[#772237]'}`}>₹{p}</button>
              ))}
            </div>
          </div>

          {/* Material Filter */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 uppercase text-xs">Material</h4>
            {['Cotton', 'Silk', 'Khadi'].map((m) => (
              <label key={m} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedMaterial === m} onChange={() => setSelectedMaterial(selectedMaterial === m ? null : m)} className="w-4 h-4 accent-[#772237]" />
                <span className="text-sm text-gray-600">{m}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest">Showing {filteredProducts.length} Products</p>
          {filteredProducts.length > 0 ? (
            <div className="grid gap-8 grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-[2rem]">
              <p className="text-xl font-medium text-gray-400">No matching products found.</p>
              <button onClick={() => {setSearchTerm(""); setSelectedMaterial(null); setSelectedThakur(null); setSelectedPrice(null);}} className="mt-4 text-[#772237] font-bold underline">Reset Filters</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}