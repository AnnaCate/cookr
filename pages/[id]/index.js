import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../utils/dbConnect'
import Recipe from '../../models/Recipe'
import { Layout } from '../../components'

export default function RecipeDetails({ recipe }) {
  const router = useRouter()
  const [message, setMessage] = useState('')

  const handleDelete = async () => {
    const recipeID = router.query.id

    try {
      await fetch(`/api/recipes/${recipeID}`, {
        method: 'DELETE',
      })
      router.push('/')
    } catch (error) {
      console.error(error)
      setMessage('Failed to delete the recipe.')
    }
  }
  console.log(recipe)
  return (
    <Layout>
      <div key={recipe._id}>
        <img src={recipe.image_url} />
        <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
          {recipe.name}
        </h1>
        <div>
          <p className="c-input-label">
            Category: {JSON.stringify(recipe.recipeCategory)}
          </p>
          <p className="c-input-label">Ingredients:</p>
          {recipe.ingredients.map((ingr) => (
            <div key={ingr._id}>
              <p>{ingr.header}</p>
              <p className="whitespace-pre-wrap">{ingr.ingredients}</p>
            </div>
          ))}
          <p className="c-input-label">Instructions:</p>
          <p className="whitespace-pre-wrap">{recipe.recipeInstructions}</p>
          <p className="c-input-label">Yield: {recipe.recipeYield}</p>
          <p className="c-input-label">Keywords: {recipe.keywords}</p>
          <div className="flex flex-row">
            <div className="mr-4 p-4">
              <Link href="/[id]/edit" as={`/${recipe._id}/edit`}>
                <a>Edit</a>
              </Link>
            </div>
            <div className="p-4">
              <button type="button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
        {message && <p>{message}</p>}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const recipe = await Recipe.findById(params.id).lean()

  return {
    props: {
      recipe: {
        ...recipe,
        _id: recipe._id.toString(),
        ingredients: recipe.ingredients.map((v) => ({
          ...v,
          _id: v._id.toString(),
        })),
      },
    },
  }
}
