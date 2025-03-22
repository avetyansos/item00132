"use client"

import { useState, useEffect } from "react"
import { RecipeCard } from "@/components/recipe-card"
import { type Recipe, sampleRecipes } from "@/lib/sample-data"

export function BookmarkedRecipes() {
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<Recipe[]>([])

  // Load bookmarks and update when localStorage changes
  useEffect(() => {
    const loadBookmarks = () => {
      const savedBookmarks = localStorage.getItem("bookmarkedRecipes")
      if (savedBookmarks) {
        const parsedBookmarks = JSON.parse(savedBookmarks)
        setBookmarks(parsedBookmarks)

        // Filter recipes based on bookmarks
        const recipes = sampleRecipes.filter((recipe) => parsedBookmarks.includes(recipe.id))
        setBookmarkedRecipes(recipes)
      } else {
        setBookmarks([])
        setBookmarkedRecipes([])
      }
    }

    // Load bookmarks initially
    loadBookmarks()

    // Set up event listener for storage changes
    window.addEventListener("storage", loadBookmarks)

    // Custom event for bookmark changes within the same window
    window.addEventListener("bookmarksUpdated", loadBookmarks)

    return () => {
      window.removeEventListener("storage", loadBookmarks)
      window.removeEventListener("bookmarksUpdated", loadBookmarks)
    }
  }, [])

  const toggleBookmark = (recipeId: string) => {
    const updatedBookmarks = bookmarks.filter((id) => id !== recipeId)
    setBookmarks(updatedBookmarks)
    localStorage.setItem("bookmarkedRecipes", JSON.stringify(updatedBookmarks))

    // Update displayed recipes
    setBookmarkedRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId))

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("bookmarksUpdated"))
  }

  return (
    <div>
      {bookmarkedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isBookmarked={true}
              onToggleBookmark={() => toggleBookmark(recipe.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You haven't bookmarked any recipes yet.</p>
        </div>
      )}
    </div>
  )
}

