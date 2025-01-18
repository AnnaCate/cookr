import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'

import { Tile } from '../'
import { Recipe } from '../../types'

const fetcher = (url: string) =>
  fetch(url, { method: 'GET' })
    .then((res) => res.json())
    .then((json) => json.data)

export const Page = ({
  currPage,
  setTotalNum,
  opts = {},
}: {
  currPage: number
  setTotalNum?: React.Dispatch<React.SetStateAction<number>>
  opts?: {
    filter?: {
      type: 'recipeCategory' | 'keywords' | 'suitableForDiet'
      filter: {
        label: string
        value: string
      }
    }[]
    searchQuery?: string
    shuffle?: boolean
    userId?: string
  }
}) => {
  const router = useRouter()
  const { filter = [], searchQuery = '', shuffle = false, userId = '' } = opts

  const recipeCategoryFilters = filter
    .filter((v) => v.type === 'recipeCategory')
    .map((v) => v.filter.value)
    .join(',')

  const keywordsFilters = filter
    .filter((v) => v.type === 'keywords')
    .map((v) => v.filter.value)
    .join(',')

  const dietFilters = filter
    .filter((v) => v.type === 'suitableForDiet')
    .map((v) => v.filter.value)
    .join(',')

  const { data, error, mutate } = useSWR(
    `/api/recipes?skip=${
      (currPage - 1) * 10
    }&search=${searchQuery}&userId=${userId}&recipeCategory=${recipeCategoryFilters}&keywords=${keywordsFilters}&suitableForDiet=${dietFilters}&shuffle=${shuffle}`,
    fetcher,
  )

  React.useEffect(() => {
    data && data.totalNum && setTotalNum && setTotalNum(data.totalNum)
  }, [data])

  return (
    <>
      {!data && !searchQuery && !error && (
        <div className="mx-auto flex flex-col xs:flex-row flex-grow flex-wrap justify-start align-start xs:w-full">
          Loading...
        </div>
      )}
      {!data && !searchQuery && error && (
        <div>Error loading recipes, please refresh the page to try again.</div>
      )}
      {data && data.recipes && data.recipes.length === 0 && searchQuery && (
        <div className="w-full mx-auto text-center">
          No recipes found, please try a different search term.
        </div>
      )}
      <div className="mx-auto flex flex-col xs:flex-row flex-grow flex-wrap justify-center align-start xs:w-full">
        {data &&
          data.recipes &&
          data.recipes.map((recipe: Recipe.Existing) => (
            <Link
              className="z-0 cursor-pointer w-full xs:w-auto mb-4 xs:mb-0"
              key={recipe._id}
              href={`/${recipe._id}`}
            >
              <a>
                <Tile
                  img={recipe.image}
                  meal={recipe.recipeCategory}
                  title={recipe.name}
                  user={recipe.submittedBy[0]}
                  originalSource={recipe.originalSource}
                  untested={recipe.untested}
                />
              </a>
            </Link>
          ))}
      </div>
    </>
  )
}
