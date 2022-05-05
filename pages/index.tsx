import React from 'react'
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr'

import dbConnect from '../utils/dbConnect'
import { default as RecipeModel } from '../models/Recipe'
import { Layout, PageHeader, Pagination, Tile } from '../components'
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

  const { data: renderedRecipes, error } = useSWR(
    `/api/recipes?skip=${(currPage - 1) * 8}`,
    fetcher,
  )
  React.useEffect(() => {
    appendQueryParam('page', currPage.toString())
  }, [])

  return (
    <Layout>
      <PageHeader title="cookr" subtitle="keep your recipes organized." />
      <div className="mb-4">
        {!renderedRecipes && !error && <div>Loading...</div>}
        {!renderedRecipes && error && (
          <div>
            Error loading recipes, please refresh the page to try again.
          </div>
        )}
        <div className="-mx-4 xs:mx-auto flex flex-col xs:flex-row flex-grow flex-wrap justify-center align-start xs:w-full">
          {renderedRecipes &&
            renderedRecipes.map((recipe: Recipe.Existing) => (
              <div
                className="z-0 cursor-pointer"
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
