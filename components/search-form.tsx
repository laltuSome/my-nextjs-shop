"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchFormProps {
  initialQuery?: string
}

export function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search dresses, accessories, singhasan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 py-6 text-base"
          aria-label="Search products"
        />
      </div>
      <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
        Search
      </Button>
    </form>
  )
}
