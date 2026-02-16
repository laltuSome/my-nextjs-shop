import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-serif text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
      <p className="max-w-md text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link href="/">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Go Home</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline">Browse Products</Button>
        </Link>
      </div>
    </section>
  )
}
