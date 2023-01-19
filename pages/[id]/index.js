import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import { formatCategory } from '../../utils/format-category'
import dbConnect from '../../utils/dbConnect'
import Recipe from '../../models/Recipe'
import { Layout } from '../../components'

export default function RecipeDetails({ recipe }) {
  const router = useRouter()
  const { user } = useUser()

  const [message, setMessage] = useState('')
  const [userIsOwner, setUserIsOwner] = useState(false)
  console.log(recipe.recipeInstructions)
  useEffect(() => {
    if (user) setUserIsOwner(user.sub === recipe.submittedBy.sub)
  }, [user])

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
  console.log(recipe.recipeCategory)
  return (
    <>
      <Head>
        <title>{recipe.name}</title>
        <meta property="og:description" content={recipe.description} />
      </Head>
      <Layout>
        <p className="italic text-gray-400 text-sm sm:-mt-4 mb-3 sm:ml-2">
          <a href="/">Recipes</a> &gt;{' '}
          {formatCategory(recipe.recipeCategory).label}
        </p>
        <div
          key={recipe._id}
          className="sm:bg-white sm:p-6 sm:rounded-xl sm:shadow-sm"
        >
          <h1 className="text-3xl font-semibold dark:text-gray-200 mb-1">
            {recipe.name}
          </h1>
          <p className="c-input-label text-gray-900 mb-2">
            Submitted By:{' '}
            <span className="font-normal">{recipe.submittedBy.name}</span>
          </p>
          {recipe.originalSource && (
            <p className="c-input-label text-gray-900 mb-2">
              Original Source:{' '}
              <span
                className="font-normal"
              >
                {recipe.originalSource}
              </span>
            </p>
          )}
          {/* <figure className="sm:float-right sm:ml-8">
            <img alt={`image of ${recipe.name}`} src={recipe.image} />
            <figcaption className="text-gray-400 bg-gray-100 text-xs">
              <a href={recipe.originalSource} rel="noopener" target="_blank">
                {recipe.originalSource}
              </a>
            </figcaption>
          </figure> */}
          {recipe.description && (
            <p className="italic text-gray-600 mb-3">
              "{recipe.description.trim()}"
            </p>
          )}
          <p className="c-input-label text-gray-900">
            Yield: <span className="font-normal">{recipe.recipeYield}</span>
          </p>
          <hr className="my-4" />
          <div>
            <p className="c-input-label c-view">Ingredients:</p>
            {recipe.ingredients.map((ingr) => (
              <div className="mb-3" key={ingr._id}>
                <p className="font-semibold">{ingr.header}</p>
                <p className="whitespace-pre-wrap">{ingr.ingredients}</p>
              </div>
            ))}
            {recipe.recipeInstructions && (
              <>
                <p className="c-input-label c-view mt-4">Instructions:</p>
                <p className="whitespace-pre-line mb-4">
                  {recipe.recipeInstructions}
                </p>
              </>
            )}
            {userIsOwner && (
              <div className="flex flex-row items-center my-6 sm:mb-0">
                <Link href="/[id]/edit" as={`/${recipe._id}/edit`}>
                  <a className="cursor-pointer text-center mr-6 py-4 px-6 text-white bg-gray-500 hover:bg-gray-600 rounded-xl focus:bg-gray-600">
                    <span>Edit</span>
                  </a>
                </Link>

                <button
                  className="cursor-pointer text-center mr-4 p-4 w-20 text-white bg-red-300 hover:bg-red-500 rounded-xl focus:bg-red-500"
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this recipe?',
                      )
                    )
                      handleDelete()
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          {message && <p>{message}</p>}
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const recipe = await Recipe.findById(params.id)
    .populate('submittedBy', ['name', 'sub'])
    .lean()

  return {
    props: {
      recipe: {
        ...recipe,
        _id: recipe._id.toString(),
        ingredients: recipe.ingredients.map((v) => ({
          ...v,
          _id: v._id.toString(),
        })),
        submittedBy: {
          ...recipe.submittedBy,
          _id: recipe.submittedBy._id.toString(),
        },
      },
    },
  }
}
