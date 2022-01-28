import React from 'react'
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Form } from '../../components'

function EditRecipe() {
  const router = useRouter()
  const { id } = router.query

  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(res.statusText)
      const { data } = await res.json()
      mutate(`/api/recipes/${id}`, data, false)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

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
      onSubmit={putData}
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
