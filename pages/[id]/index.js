import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { useUser } from '@auth0/nextjs-auth0'
import { formatCategory } from '../../utils/format-category'
import dbConnect from '../../utils/dbConnect'
import Recipe from '../../models/Recipe'
import { Layout } from '../../components'
import { titleCase } from '../../utils/title-case'
import { ImWarning } from 'react-icons/im'

export default function RecipeDetails({ recipe }) {
  const router = useRouter()
  const { user } = useUser()

  const [message, setMessage] = useState('')
  const [userIsOwner, setUserIsOwner] = useState(false)

  useEffect(() => {
    if (user)
      setUserIsOwner(
        user.sub === recipe.submittedBy.sub ||
          user.sub === 'auth0|61f33efb749f690074053e77',
      )
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

  if (!recipe) {
    return <div>Loading...</div>
  } else
    return (
      <>
        <NextSeo
          title={recipe.name}
          description={recipe.description}
          openGraph={{
            title: recipe.name,
            description: recipe.description,
            images: [
              {
                url: recipe.image,
              },
            ],
            siteName: 'cookr',
          }}
        />
        <Layout>
          <p className="italic text-gray-400 text-sm sm:-mt-4 mb-3 sm:ml-2">
            <a href="/">Recipes</a> &gt;{' '}
            {formatCategory(recipe.recipeCategory).label}
          </p>

          <div
            key={recipe._id}
            className="sm:bg-white sm:p-6 sm:rounded-xl sm:shadow-sm"
          >
            {recipe.untested && (
              <div className="mb-4 font-semibold bg-red-100 rounded-md py-2 px-4 max-w-max flex">
                <span className="pr-2 pt-1">
                  <ImWarning style={{ color: '#FF0000' }} size="18" />
                </span>
                <p>
                  Proceed with caution - this recipe has not yet been tested by
                  the submitter.
                </p>
              </div>
            )}
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
                <span className="font-normal">{recipe.originalSource}</span>
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
            <div className="flex flex-row justify-start flex-wrap">
              {recipe.suitableForDiet.map((diet) => (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 whitespace-nowrap mb-2 mr-2">
                  {titleCase(diet)}
                </span>
              ))}
            </div>
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
                <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center justify-center sm:justify-start my-6 sm:mb-0">
                  <Link href="/[id]/edit" as={`/${recipe._id}/edit`}>
                    <a className="cursor-pointer text-center mb-4 sm:mb-0 sm:mr-6 py-4 px-6 text-white bg-gray-500 hover:bg-gray-600 rounded-xl focus:bg-gray-600 w-full sm:w-20">
                      <span>Edit</span>
                    </a>
                  </Link>

                  <button
                    className="cursor-pointer text-center sm:mr-4 p-4 sm:w-20 text-white bg-red-300 hover:bg-red-500 rounded-xl focus:bg-red-500 w-full"
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

export async function getServerSideProps({ req, res, params }) {
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
