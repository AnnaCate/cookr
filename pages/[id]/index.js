import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../utils/dbConnect'
import Recipe from '../../models/Recipe'

/* Allows you to view recipe card info and delete recipe card*/
const RecipePage = ({ recipe }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const recipeID = router.query.id

    try {
      await fetch(`/api/recipes/${recipeID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the recipe.')
    }
  }

  return (
    <div key={recipe._id}>
      <div>
        <img src={recipe.image_url} />
        <h5>{recipe.title}</h5>
        <div className="main-content">
          <p className="pet-name">Category: {recipe.recipeCategory}</p>
          <p className="owner">Ingredients: {recipe.recipeIngredients}</p>
          <p className="owner">Instructions: {recipe.recipeInstructions}</p>
          <p className="owner">Yield: {recipe.recipeYield}</p>
          <p className="owner">Keywords: {recipe.keywords}</p>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${recipe._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
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

export default RecipePage
