import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Form, Layout, PageHeader } from '../../components'

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

  // ensure user is the owner of the recipe
  const { user } = useUser()
  const [userIsAuthorized, setUserIsAuthorized] = useState(false)
  useEffect(() => {
    if (user && recipe) setUserIsAuthorized(user.sub === recipe.submittedBy.sub)
  }, [recipe, user])

  if (error) return <p>Failed to load</p>
  if (!recipe || !user) return <p>Loading...</p>
  if (recipe && user && !userIsAuthorized) return <p>Unauthorized</p>

  const recipeForm = {
    cookTime: recipe.cookTime,
    description: recipe.description,
    imageUrl: recipe.imageUrl,
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
    <Layout>
      <div className="mb-8">
        <PageHeader title="edit a recipe" />
      </div>
      <Form
        formId="edit-recipe-form"
        onSubmit={putData}
        recipeForm={recipeForm}
        forNewRecipe={false}
      />
    </Layout>
  )
}

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

export default withPageAuthRequired(EditRecipe)
