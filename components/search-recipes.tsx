"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RecipeCard } from "@/components/recipe-card"
import { type Recipe, sampleRecipes } from "@/lib/sample-data"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { usePathname } from "next/navigation"

export function SearchRecipes() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cuisineType, setCuisineType] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes) // Initialize with all recipes
  const [loading, setLoading] = useState(false)
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const { toast } = useToast()
  const pathname = usePathname()

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedRecipes")
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    }
  }, [])

  // Reset filters when navigating away and back to home page
  useEffect(() => {
    const handleRouteChange = () => {
      // Only reset if we're on the home page
      if (pathname === "/") {
        // Check if we're coming back to the home page
        const lastPath = sessionStorage.getItem("lastPath")
        if (lastPath && lastPath !== "/") {
          // Reset filters
          setSearchQuery("")
          setCuisineType("")
          setRecipes(sampleRecipes)
        }
      }
      // Store current path for next comparison
      sessionStorage.setItem("lastPath", pathname)
    }

    handleRouteChange()
  }, [pathname])

  // Set up event listener for bookmark changes
  useEffect(() => {
    const handleBookmarkUpdate = () => {
      const savedBookmarks = localStorage.getItem("bookmarkedRecipes")
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks))
      } else {
        setBookmarks([])
      }
    }

    window.addEventListener("bookmarksUpdated", handleBookmarkUpdate)
    window.addEventListener("storage", handleBookmarkUpdate)

    return () => {
      window.removeEventListener("bookmarksUpdated", handleBookmarkUpdate)
      window.removeEventListener("storage", handleBookmarkUpdate)
    }
  }, [])

  // Auto-filter recipes when search query or cuisine type changes
  useEffect(() => {
    setLoading(true)

    // Short delay to prevent too many updates while typing
    const timer = setTimeout(() => {
      let filteredRecipes = [...sampleRecipes]

      if (searchQuery) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchQuery.toLowerCase())),
        )
      }

      if (cuisineType && cuisineType !== "all") {
        filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisineType === cuisineType)
      }

      setRecipes(filteredRecipes)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, cuisineType])

  const toggleBookmark = (recipeId: string) => {
    const recipe = sampleRecipes.find((r) => r.id === recipeId)
    if (!recipe) return

    const isCurrentlyBookmarked = bookmarks.includes(recipeId)
    const newBookmarks = isCurrentlyBookmarked ? bookmarks.filter((id) => id !== recipeId) : [...bookmarks, recipeId]

    setBookmarks(newBookmarks)
    localStorage.setItem("bookmarkedRecipes", JSON.stringify(newBookmarks))

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("bookmarksUpdated"))

    // Show toast notification with undo option when removing a bookmark
    if (isCurrentlyBookmarked) {
      toast({
        title: "Recipe removed from bookmarks",
        description: `"${recipe.title}" has been removed from your bookmarks.`,
        action: (
          <Button
            variant="outline"
            onClick={() => {
              // Restore the bookmark
              const updatedBookmarks = [...newBookmarks, recipeId]
              setBookmarks(updatedBookmarks)
              localStorage.setItem("bookmarkedRecipes", JSON.stringify(updatedBookmarks))
              window.dispatchEvent(new Event("bookmarksUpdated"))
            }}
          >
            Undo
          </Button>
        ),
      })
    }
  }

  // Clear search results and state
  const handleClearSearch = () => {
    setSearchQuery("")
    setCuisineType("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by ingredient or recipe name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={cuisineType} onValueChange={setCuisineType}>
            <SelectTrigger>
              <SelectValue placeholder="All Cuisines" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cuisines</SelectItem>
              <SelectItem value="Italian">Italian</SelectItem>
              <SelectItem value="Mexican">Mexican</SelectItem>
              <SelectItem value="Asian">Asian</SelectItem>
              <SelectItem value="American">American</SelectItem>
              <SelectItem value="Mediterranean">Mediterranean</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {(searchQuery || cuisineType) && (
          <Button variant="outline" onClick={handleClearSearch} className="md:w-auto">
            Clear Filters
          </Button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <Skeleton className="h-[200px] w-full rounded-md" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isBookmarked={bookmarks.includes(recipe.id)}
                  onToggleBookmark={() => toggleBookmark(recipe.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No recipes found. Try a different search.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

