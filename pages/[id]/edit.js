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
      router.back()
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
    if (user && recipe)
      setUserIsAuthorized(
        user.sub === recipe.submittedBy.sub ||
          user.sub === 'auth0|61f33efb749f690074053e77',
      )
  }, [recipe, user])

  if (error) return <p>Failed to load</p>
  if (!recipe || !user) return <p>Loading...</p>
  if (recipe && user && !userIsAuthorized) return <p>Unauthorized</p>

  const recipeForm = {
    cookTime: recipe.cookTime,
    description: recipe.description,
    image: recipe.image,
    ingredients: recipe.ingredients,
    keywords: recipe.keywords,
    name: recipe.name,
    originalSource: recipe.originalSource,
    prepTime: recipe.prepTime,
    recipeCategory: recipe.recipeCategory,
    recipeInstructions: recipe.recipeInstructions,
    recipeYield: recipe.recipeYield,
    submittedBy: recipe.submittedBy,
    suitableForDiet: recipe.suitableForDiet,
    totalTime: recipe.totalTime,
    untested: recipe.untested,
  }

  return (
    <Layout>
      <div className="mb-8">
        <PageHeader title="edit a recipe" center />
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
