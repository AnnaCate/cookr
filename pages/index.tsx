import React from 'react'
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr'

import dbConnect from '../utils/dbConnect'
import { default as RecipeModel } from '../models/Recipe'
import { Layout, PageHeader, Pagination, Search, Tile } from '../components'
import { Recipe } from '../types'

const fetcher = (url: string) =>
  fetch(url, { method: 'GET' })
    .then((res) => res.json())
    .then((json) => json.data)

export default function Index({ totalNum }: { totalNum: number }) {
  const router = useRouter()
  const { query } = router
  const { page = 1 } = query
  const parsedPage = parseInt(page as string)

  const [currPage, setCurrPage] = React.useState(parsedPage)

  const [visibleRecipes, setVisibleRecipes] = React.useState([])
  // Search
  const [searchQuery, setSearchQuery] = React.useState('')

  // Pagination
  const appendQueryParam = (key: string, value: string) => {
    router.push({
      pathname: router.pathname,
      query: { [key]: encodeURI(value) },
    })
  }
  const handlePaginate = async (newPage: number) => {
    appendQueryParam('page', newPage.toString())
    setCurrPage(newPage)
  }

  React.useEffect(() => {
    appendQueryParam('page', currPage.toString())
  }, [])

  const { data: renderedRecipes, error } = useSWR(
    `/api/recipes?skip=${(currPage - 1) * 8}`,
    fetcher,
  )
  const { data: filteredRecipes } = useSWR(
    () => `/api/recipes?skip=${(currPage - 1) * 8}&search=${searchQuery}`,
    fetcher,
  )

  React.useEffect(() => {
    setVisibleRecipes(filteredRecipes || renderedRecipes)
  }, [filteredRecipes, renderedRecipes])

  React.useEffect(() => {
    if (page !== currPage.toString()) {
      setCurrPage(parsedPage)
    }
  }, [page])

  return (
    <Layout>
      <PageHeader title="cookr" subtitle="keep your recipes organized." />
      <div
        className={`mb-4 ${!renderedRecipes && !error && 'mt-4 flex-grow '}`}
      >
        {!visibleRecipes ||
          (visibleRecipes.length === 0 && !searchQuery && !error && (
            <div className="mx-auto flex flex-col xs:flex-row flex-grow flex-wrap justify-start align-start xs:w-full">
              Loading...
            </div>
          ))}
        {!visibleRecipes ||
          (visibleRecipes.length === 0 && !searchQuery && error && (
            <div>
              Error loading recipes, please refresh the page to try again.
            </div>
          ))}
        {!error && <Search setSearchQuery={setSearchQuery} />}
        {(!visibleRecipes || visibleRecipes.length === 0) && searchQuery && (
          <div className="w-full mx-auto text-center">
            No recipes found, please try a different search term.
          </div>
        )}

        <div className="mx-auto flex flex-col xs:flex-row flex-grow flex-wrap justify-center align-start xs:w-full">
          {visibleRecipes &&
            visibleRecipes.length > 0 &&
            visibleRecipes.map((recipe: Recipe.Existing) => (
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
      </div>
      <Pagination
        currPage={currPage}
        handlePaginate={handlePaginate}
        numPages={Math.ceil(totalNum / 8)}
      />
    </Layout>
  )
}

export async function getServerSideProps(): Promise<{
  props: {
    totalNum: number
  }
}> {
  await dbConnect()

  const totalNum = await RecipeModel.countDocuments().exec()
  return { props: { totalNum } }
}
