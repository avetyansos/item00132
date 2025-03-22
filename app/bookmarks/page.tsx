import { Header } from "@/components/header"
import { BookmarkedRecipes } from "@/components/bookmarked-recipes"

export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6">Your Bookmarked Recipes</h1>
        <BookmarkedRecipes />
      </main>
    </div>
  )
}

