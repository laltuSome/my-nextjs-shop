"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useTransition } from "react";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    
    startTransition(() => {
      router.push(`/products?${params.toString()}`, { scroll: false });
    });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== (searchParams.get("q") || "")) {
        updateFilter("q", searchTerm);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

// Updated Lists for Frontend Filters
  const thakurs = [
    'Gopal', 
    'Radha Ghera', 
    'Laxmi Sari', 
    'Laxmi Ghera', 
    'Ganesh Dhuti', 
    'Radha Krishna Set', 
    'Nitai Gaur Set', 
    'Jagannath Vastra',
    'Hair / Chul',      // Notun Add
    'Jewelry / Shringar' // Notun Add
  ];

  const materials = [
    'Cotton', 
    'Silk', 
    'Khadi', 
    'Net', 
    'Velvet', 
    'Satin', 
    'Banarasi', 
    'Wool',
    'Metal / Stone'     // Jewelry-r jonno material
  ];

  const prices = ['50', '100', '150', '200', '300', '500', '1000'];

  return (
    <div className={`space-y-8 ${isPending ? 'opacity-50' : 'opacity-100'} transition-opacity`}>
      {/* 1. Search Bar */}
      <div className="space-y-2">
        <h4 className="font-bold text-gray-800 uppercase text-[10px] tracking-tighter">Search Products</h4>
        <div className="relative">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to find..."
            className="pl-9 py-5 rounded-xl border-gray-200 text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* 2. Dress Type Filter */}
      <div className="space-y-3">
        <h4 className="font-bold text-gray-800 uppercase text-[10px] tracking-tighter">Thakur Dress</h4>
        <div className="flex flex-col gap-2">
          {thakurs.map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={searchParams.get("thakur") === t.toLowerCase()}
                onChange={(e) => updateFilter("thakur", e.target.checked ? t.toLowerCase() : "")}
                className="w-4 h-4 rounded border-gray-300 text-[#772237] focus:ring-[#772237]"
              />
              <span className="text-sm text-gray-600 group-hover:text-[#772237] transition-colors">{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Price Filter Buttons */}
      <div className="space-y-3">
        <h4 className="font-bold text-gray-800 uppercase text-[10px] tracking-tighter">Price (Fixed)</h4>
        <div className="grid grid-cols-2 gap-2">
          {prices.map((p) => (
            <button
              key={p}
              onClick={() => updateFilter("price", searchParams.get("price") === p ? "" : p)}
              className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all ${
                searchParams.get("price") === p 
                ? 'bg-[#772237] border-[#772237] text-white shadow-md' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-[#772237]'
              }`}
            >
              ₹{p}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Material Filter */}
      <div className="space-y-3">
        <h4 className="font-bold text-gray-800 uppercase text-[10px] tracking-tighter">Material</h4>
        <div className="flex flex-col gap-2">
          {materials.map((m) => (
            <label key={m} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={searchParams.get("material") === m.toLowerCase()}
                onChange={(e) => updateFilter("material", e.target.checked ? m.toLowerCase() : "")}
                className="w-4 h-4 rounded border-gray-300 text-[#772237] focus:ring-[#772237]"
              />
              <span className="text-sm text-gray-600 group-hover:text-[#772237] transition-colors">{m}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 5. Rating Filter */}
      <div className="space-y-3">
        <h4 className="font-bold text-gray-800 uppercase text-[10px] tracking-tighter">Ratings</h4>
        {[5, 4, 3].map((star) => (
          <button
            key={star}
            onClick={() => updateFilter("rating", searchParams.get("rating") === star.toString() ? "" : star.toString())}
            className={`flex items-center gap-2 w-full text-sm transition-colors ${
              searchParams.get("rating") === star.toString() ? 'text-[#772237] font-bold' : 'text-gray-500 hover:text-[#772237]'
            }`}
          >
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < star ? 'fill-[#ed701d] text-[#ed701d]' : 'fill-gray-200 text-gray-200'}`} />
              ))}
            </div>
            <span className="text-[10px]">{star}+ Stars</span>
          </button>
        ))}
      </div>
    </div>
  );
}