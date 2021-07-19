import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../utils/dbConnect'
import Recipe from '../../models/Recipe'

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

  return (
    <div key={recipe._id}>
      <img src={recipe.image_url} />
      <h1>{recipe.title}</h1>
      <div>
        <p>Category: {JSON.stringify(recipe.recipeCategory)}</p>
        <p>Ingredients: {recipe.recipeIngredients}</p>
        <p>Instructions: {recipe.recipeInstructions}</p>
        <p>Yield: {recipe.recipeYield}</p>
        <p>Keywords: {recipe.keywords}</p>
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
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const recipe = await Recipe.findById(params.id).lean()
  recipe._id = recipe._id.toString()

  return { props: { recipe } }
}
