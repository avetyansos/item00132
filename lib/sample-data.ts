export interface Recipe {
  id: string
  title: string
  image: string
  cuisineType: string
  ingredients: string[]
  instructions: string
  prepTime: number
  cookTime: number
}

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    image: "/placeholder.svg?height=400&width=600",
    cuisineType: "Italian",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g pecorino cheese",
      "50g parmesan",
      "Freshly ground black pepper",
      "Salt",
    ],
    instructions: "Cook pasta. Mix eggs and cheese. Fry pancetta. Combine all ingredients.",
    prepTime: 10,
    cookTime: 15,
  },
  {
    id: "2",
    title: "Chicken Tacos",
    image: "/placeholder.svg?height=400&width=600",
    cuisineType: "Mexican",
    ingredients: [
      "500g chicken breast",
      "8 small tortillas",
      "1 avocado",
      "Lime juice",
      "Taco seasoning",
      "Sour cream",
      "Salsa",
    ],
    instructions: "Season and cook chicken. Warm tortillas. Assemble tacos with toppings.",
    prepTime: 15,
    cookTime: 20,
  },
  {
    id: "3",
    title: "Vegetable Stir Fry",
    image: "/placeholder.svg?height=400&width=600",
    cuisineType: "Asian",
    ingredients: ["Broccoli", "Carrots", "Bell peppers", "Snow peas", "Soy sauce", "Ginger", "Garlic"],
    instructions: "Chop vegetables. Heat oil in wok. Stir fry vegetables. Add sauce and serve.",
    prepTime: 15,
    cookTime: 10,
  },
  {
    id: "4",
    title: "Classic Burger",
    image: "/placeholder.svg?height=400&width=600",
    cuisineType: "American",
    ingredients: [
      "500g ground beef",
      "4 burger buns",
      "Lettuce",
      "Tomato",
      "Onion",
      "Cheese slices",
      "Ketchup and mustard",
    ],
    instructions: "Form patties. Grill until desired doneness. Assemble burgers with toppings.",
    prepTime: 10,
    cookTime: 15,
  },
  {
    id: "5",
    title: "Greek Salad",
    image: "/placeholder.svg?height=400&width=600",
    cuisineType: "Mediterranean",
    ingredients: ["Cucumber", "Tomatoes", "Red onion", "Feta cheese", "Kalamata olives", "Olive oil", "Oregano"],
    instructions: "Chop vegetables. Combine in bowl. Add feta and olives. Dress with olive oil and oregano.",
    prepTime: 15,
    cookTime: 0,
  },
  {
    id: "6",
    title: "Margherita Pizza",
    image: "/placeholder.svg?height=400&width=600",
    cuisineType: "Italian",
    ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella", "Fresh basil", "Olive oil", "Salt"],
    instructions: "Roll out dough. Spread sauce. Add cheese. Bake until crispy. Top with fresh basil.",
    prepTime: 20,
    cookTime: 15,
  },
  {
    id: "7",
    title: "Beef Enchiladas",
    image: "/placeholder.svg?height=400&width=600",
    cuisineType: "Mexican",
    ingredients: ["Ground beef", "Enchilada sauce", "Tortillas", "Cheese", "Onions", "Black beans", "Sour cream"],
    instructions: "Cook beef with spices. Fill tortillas. Cover with sauce and cheese. Bake until bubbly.",
    prepTime: 25,
    cookTime: 30,
  },
  {
    id: "8",
    title: "Pad Thai",
    image: "/placeholder.svg?height=400&width=600",
    cuisineType: "Asian",
    ingredients: ["Rice noodles", "Chicken or tofu", "Bean sprouts", "Eggs", "Peanuts", "Lime", "Fish sauce"],
    instructions: "Soak noodles. Stir fry protein. Add eggs. Mix in noodles and sauce. Garnish and serve.",
    prepTime: 20,
    cookTime: 15,
  },
  {
    id: "9",
    title: "BBQ Ribs",
    image: "/placeholder.svg?height=400&width=600",
    cuisineType: "American",
    ingredients: ["Pork ribs", "BBQ rub", "BBQ sauce", "Apple juice", "Brown sugar", "Garlic powder", "Paprika"],
    instructions: "Apply rub. Slow cook ribs. Brush with sauce. Finish on grill or broiler.",
    prepTime: 30,
    cookTime: 180,
  },
  {
    id: "10",
    title: "Hummus and Pita",
    image: "/placeholder.svg?height=400&width=600",
    cuisineType: "Mediterranean",
    ingredients: ["Chickpeas", "Tahini", "Lemon juice", "Garlic", "Olive oil", "Pita bread", "Paprika"],
    instructions: "Blend chickpeas with tahini, lemon, and garlic. Drizzle with olive oil. Serve with pita.",
    prepTime: 10,
    cookTime: 0,
  },
]

