"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { BookmarkIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Recipe } from "@/lib/sample-data"
import Image from "next/image"

interface RecipeCardProps {
  recipe: Recipe
  isBookmarked: boolean
  onToggleBookmark: () => void
}

export function RecipeCard({ recipe, isBookmarked, onToggleBookmark }: RecipeCardProps) {
  const router = useRouter()

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleBookmark()
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-[200px] w-full">
        <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{recipe.title}</h3>
          <Button
            variant={isBookmarked ? "default" : "ghost"}
            size="icon"
            onClick={handleBookmarkClick}
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
      </CardHeader>
      <CardContent className="pb-2">
        <Badge variant="outline">{recipe.cuisineType}</Badge>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {recipe.ingredients.slice(0, 3).join(", ")}
          {recipe.ingredients.length > 3 ? ", ..." : ""}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => router.push(`/recipe/${recipe.id}`)}>
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  )
}

