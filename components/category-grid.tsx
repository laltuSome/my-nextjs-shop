import Image from "next/image"
import Link from "next/link"
import type { Category } from "@/lib/types"

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Shop by Category
        </h2>
        <p className="mt-2 text-muted-foreground">Find the perfect outfit for every occasion</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="group relative overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-xl"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 text-[#fff]">
              <h3 className="text-lg font-bold">{cat.name}</h3>
              <p className="mt-0.5 text-sm opacity-80">{cat.count} Products</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
