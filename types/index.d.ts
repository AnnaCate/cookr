export namespace Recipe {

  interface Base {
    author?: string
    complimentaryRecipes?: string[]
    cookTime?: string
    description: string
    image?: string
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
    suitableForDiet?: string[]
    totalTime?: string
  }

  interface Existing extends Base {
    _id: string
    datePublished: Date
    submittedBy: string
  }
}

export interface IngredientSection {
  id: number
  header: string
  ingredients: string
}

interface Nutrition {
  calories: string,
  carbohydrateContent: string,
  cholesterolContent: string,
  fatContent: string,
  fiberContent: string,
  proteinContent: string,
  saturatedFatContent: string,
  servingSize: string,
  sodiumContent: string,
  sugarContent: string,
  transFatContent: string,
  unsaturatedFatContent: string,
}

export interface Tile {
  img: string
  difficulty?: string
  meal?: string
  title: string
  user?: {
    name: string
  }
}
