"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RecipeCard } from "@/components/recipe-card"
import { type Recipe, sampleRecipes } from "@/lib/sample-data"
import { Skeleton } from "@/components/ui/skeleton"

export function SearchRecipes() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cuisineType, setCuisineType] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  // Load saved state from localStorage
  useEffect(() => {
    // Load bookmarks
    const savedBookmarks = localStorage.getItem("bookmarkedRecipes")
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    }

    // Load previous search state
    const savedSearchState = localStorage.getItem("recipeSearchState")
    if (savedSearchState) {
      const { query, cuisine, results, searched } = JSON.parse(savedSearchState)
      setSearchQuery(query || "")
      setCuisineType(cuisine || "")
      setRecipes(results || [])
      setHasSearched(searched || false)
    }
  }, [])

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

  // Save search state to localStorage
  useEffect(() => {
    const searchState = {
      query: searchQuery,
      cuisine: cuisineType,
      results: recipes,
      searched: hasSearched,
    }
    localStorage.setItem("recipeSearchState", JSON.stringify(searchState))
  }, [searchQuery, cuisineType, recipes, hasSearched])

  const handleSearch = () => {
    setLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
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
      setHasSearched(true)
      setLoading(false)
    }, 800)
  }

  const toggleBookmark = (recipeId: string) => {
    const newBookmarks = bookmarks.includes(recipeId)
      ? bookmarks.filter((id) => id !== recipeId)
      : [...bookmarks, recipeId]

    setBookmarks(newBookmarks)
    localStorage.setItem("bookmarkedRecipes", JSON.stringify(newBookmarks))

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("bookmarksUpdated"))
  }

  // Clear search results and state
  const handleClearSearch = () => {
    setSearchQuery("")
    setCuisineType("")
    setRecipes([])
    setHasSearched(false)
    localStorage.removeItem("recipeSearchState")
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={cuisineType} onValueChange={setCuisineType}>
            <SelectTrigger>
              <SelectValue placeholder="Cuisine Type" />
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
        <Button onClick={handleSearch} className="md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Search
        </Button>
        {hasSearched && (
          <Button variant="outline" onClick={handleClearSearch} className="md:w-auto">
            Clear
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
              <p className="text-muted-foreground">
                {hasSearched ? "No recipes found. Try a different search." : "Search for recipes to get started."}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

