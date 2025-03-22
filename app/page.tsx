import { SearchRecipes } from "@/components/search-recipes"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6">Find Your Next Meal</h1>
        <SearchRecipes />
      </main>
    </div>
  )
}

