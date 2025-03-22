import Link from "next/link"
import { BookmarkIcon, Home } from "lucide-react"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <span className="text-primary">Recipe Finder</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/bookmarks"
            className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
          >
            <BookmarkIcon className="h-4 w-4" />
            Bookmarks
          </Link>
        </nav>
      </div>
    </header>
  )
}

