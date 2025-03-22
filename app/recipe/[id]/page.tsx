"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { type Recipe, sampleRecipes } from "@/lib/sample-data"
import { Button } from "@/components/ui/button"
import { Clock, ArrowLeft, BookmarkIcon } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function RecipeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarks, setBookmarks] = useState<string[]>([])

  useEffect(() => {
    // Find the recipe by ID
    const recipeId = params.id as string
    const foundRecipe = sampleRecipes.find((r) => r.id === recipeId)

    if (foundRecipe) {
      setRecipe(foundRecipe)
    }

    // Check if recipe is bookmarked
    const savedBookmarks = localStorage.getItem("bookmarkedRecipes")
    if (savedBookmarks) {
      const parsedBookmarks = JSON.parse(savedBookmarks)
      setBookmarks(parsedBookmarks)
      setIsBookmarked(parsedBookmarks.includes(recipeId))
    }
  }, [params.id])

  const toggleBookmark = () => {
    if (!recipe) return

    const updatedBookmarks = isBookmarked ? bookmarks.filter((id) => id !== recipe.id) : [...bookmarks, recipe.id]

    setBookmarks(updatedBookmarks)
    setIsBookmarked(!isBookmarked)
    localStorage.setItem("bookmarkedRecipes", JSON.stringify(updatedBookmarks))

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("bookmarksUpdated"))
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Recipe not found</p>
            <Button variant="outline" className="mt-4" onClick={() => router.push("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to recipes
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <Button variant="outline" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
            <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
          </div>

          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{recipe.title}</h1>
              <Button
                variant={isBookmarked ? "default" : "ghost"}
                size="icon"
                onClick={toggleBookmark}
                className={
                  isBookmarked
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-muted-foreground hover:bg-background hover:text-foreground"
                }
                aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
              >
                <BookmarkIcon className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
              </Button>
            </div>

            <Badge variant="outline" className="mt-2">
              {recipe.cuisineType}
            </Badge>

            <div className="flex gap-4 mt-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Prep: {recipe.prepTime} min</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Cook: {recipe.cookTime} min</span>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
              <ul className="list-disc pl-5 space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Instructions</h2>
              <p className="text-sm">{recipe.instructions}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

