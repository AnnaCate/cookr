import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { Tile } from '../'
import { Recipe } from '../../types'

const fetcher = (url: string) =>
  fetch(url, { method: 'GET' })
    .then((res) => res.json())
    .then((json) => json.data)

export const Page = ({
  currPage,
  opts = {},
}: {
  currPage: number
  opts?: {
    searchQuery?: string
    userId?: string
  }
}) => {
  const router = useRouter()
  const { searchQuery = '', userId = '' } = opts
  const { data: recipes, error } = useSWR(
    `/api/recipes?skip=${
      (currPage - 1) * 8
    }&search=${searchQuery}&userId=${userId}`,
    fetcher,
  )

  return (
    <>
      {!recipes && !searchQuery && !error && (
        <div className="mx-auto flex flex-col xs:flex-row flex-grow flex-wrap justify-start align-start xs:w-full">
          Loading...
        </div>
      )}
      {!recipes && !searchQuery && error && (
        <div>Error loading recipes, please refresh the page to try again.</div>
      )}
      {recipes && recipes.length === 0 && searchQuery && (
        <div className="w-full mx-auto text-center">
          No recipes found, please try a different search term.
        </div>
      )}
      <div className="mx-auto flex flex-col xs:flex-row flex-grow flex-wrap justify-center align-start xs:w-full">
        {recipes &&
          recipes.map((recipe: Recipe.Existing) => (
            <div
              className="z-0 cursor-pointer w-full xs:w-auto mb-4 xs:mb-0"
              key={recipe._id}
              onClick={() => router.push(`/${recipe._id}`)}
            >
              <Tile
                img={recipe.image}
                meal={recipe.recipeCategory}
                title={recipe.name}
                user={recipe.submittedBy}
                originalSource={recipe.originalSource}
              />
            </div>
          ))}
      </div>
    </>
  )
}
