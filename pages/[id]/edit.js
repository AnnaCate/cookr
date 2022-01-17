import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0'
import { Form } from '../../components'

function EditRecipe() {
  const router = useRouter()
  const { id } = router.query

  const { user } = useUser()

  const { data: recipe, error } = useSWR(
    id ? `/api/recipes/${id}` : null,
    fetcher,
  )

  if (error) return <p>Failed to load</p>
  if (!recipe) return <p>Loading...</p>
  // if (recipe && recipe.submittedBy.sub !== user.sub) return <p>Unauthorized</p>

  const recipeForm = {
    cookTime: recipe.cookTime,
    description: recipe.description,
    image: recipe.image,
    ingredients: recipe.ingredients,
    keywords: recipe.keywords,
    name: recipe.name,
    prepTime: recipe.prepTime,
    recipeCategory: recipe.recipeCategory,
    recipeInstructions: recipe.recipeInstructions,
    recipeYield: recipe.recipeYield,
    submittedBy: recipe.submittedBy,
    totalTime: recipe.totalTime,
  }

  return (
    <Form
      formId="edit-recipe-form"
      recipeForm={recipeForm}
      forNewRecipe={false}
    />
  )
}

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

export default withPageAuthRequired(EditRecipe)
