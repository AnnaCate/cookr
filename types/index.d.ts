export interface Image {
  path: string
  preview: string
  lastModified: number
  lastModifiedDate: Date
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

export namespace Recipe {
  interface Base {
    author?: string
    complimentaryRecipes?: string[]
    cookTime?: string
    difficulty?: 'easy' | 'intermediate' | 'hard'
    description: string
    image?: string // deprecated
    imageUrl?: string
    uploadedImage?: {
      id: string
      image: Image
    }
    keywords?: string[]
    name: string
    nutrition?: Nutrition
    prepTime?: string
    recipeCategory: string
    recipeCuisine?: string
    ingredients: IngredientSection[]
    recipeInstructions: string
    recipeYield?: string
    similarRecipes?: string[]
    originalSource?: string
    suitableForDiet?: string[]
    totalTime?: string
  }

  interface Existing extends Base {
    _id: string
    datePublished: Date
    submittedBy: User
  }
}

export interface IngredientSection {
  id: string
  header: string
  ingredients: string
}

interface Nutrition {
  calories: string
  carbohydrateContent: string
  cholesterolContent: string
  fatContent: string
  fiberContent: string
  proteinContent: string
  saturatedFatContent: string
  servingSize: string
  sodiumContent: string
  sugarContent: string
  transFatContent: string
  unsaturatedFatContent: string
}

export interface Tile {
  img: string
  difficulty?: string
  meal?: string
  originalSource?: string
  title: string
  user?: User
}

interface User {
  _id: string
  avatar: string
  favorites: Recipe.Existing[]
  name: string
  email: string
  recipes: Recipe.Existing[]
  sub: string
  wantToCook: Recipe.Existing[]
  wouldNotCookAgain: Recipe.Existing[]
}
