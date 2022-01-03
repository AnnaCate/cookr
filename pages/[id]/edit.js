import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Form } from '../../components'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditRecipe = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: recipe, error } = useSWR(
    id ? `/api/recipes/${id}` : null,
    fetcher,
  )

  if (error) return <p>Failed to load</p>
  if (!recipe) return <p>Loading...</p>

  const recipeForm = {
    description: recipe.description,
    image: recipe.image,
    keywords: recipe.keywords,
    cookTime: recipe.cookTime,
    prepTime: recipe.prepTime,
    totalTime: recipe.totalTime,
    recipeCategory: recipe.recipeCategory,
    ingredients: recipe.ingredients,
    recipeInstructions: recipe.recipeInstructions,
    recipeYield: recipe.recipeYield,
    name: recipe.name,
  }

  return (
    <Form
      formId="edit-recipe-form"
      recipeForm={recipeForm}
      forNewRecipe={false}
    />
  )
}

export default EditRecipe
