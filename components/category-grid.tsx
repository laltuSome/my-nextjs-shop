import Image from "next/image"
import Link from "next/link"
import type { Category } from "@/lib/types"

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20"> {/* প্যাডিং বাড়িয়ে দেওয়া হয়েছে */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-black text-[#772237]">
          Shop by Category
        </h2>
       
        <p className="mt-4 text-gray-600 font-medium">Find the perfect outfit for every occasion</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-4"> {/* ৩টি কলাম করা হয়েছে যাতে বক্স বড় দেখায় */}
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="group relative overflow-hidden rounded-[2.5rem] shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            {/* Aspect Ratio পরিবর্তন করে ১:১ (Square) বা ৩:৪ করা হয়েছে বড় দেখানোর জন্য */}
            <div className="relative aspect-[4/5] w-full"> 
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#772237]/90 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-8 text-white text-center">
              <h3 className="text-2xl font-medium capitalize  drop-shadow-md">
                {cat.name}
              </h3>
              <div className="mt-2 inline-block rounded-full bg-[#ed701d] px-4 py-1 text-xs font-bold uppercase tracking-widest">
                {cat.count} Items
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}