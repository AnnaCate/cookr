import React from 'react'
import { useRouter } from 'next/router'

import dbConnect from '../utils/dbConnect'
import { default as RecipeModel } from '../models/Recipe'
import { Layout, PageHeader, Pagination, Tile } from '../components'
import { Recipe } from '../types'

export default function Index({ totalNum }: { totalNum: number }) {
  const router = useRouter()

  const [page, setPage] = React.useState(1)
  const [renderedRecipes, setRenderedRecipes] = React.useState([])

  const handlePaginate = async (page: number) => {
    setPage(page)
  }

  React.useEffect(() => {
    const fetchRecipes = async () => {
      const result = await fetch(`/api/recipes?skip=${(page - 1) * 8}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
      const { data } = await result.json()
      setRenderedRecipes(data)
    }

    fetchRecipes().catch(console.error)
  }, [page])

  return (
    <Layout>
      <PageHeader title="cookr" subtitle="keep your recipes organized." />
      <div className="flex flex-row flex-wrap justify-center align-start w-full mb-4">
        {renderedRecipes.map((recipe: Recipe.Existing) => (
          <div
            className="z-0 cursor-pointer"
            onClick={() => router.push(`/${recipe._id}`)}
          >
            <Tile
              key={recipe._id}
              img={recipe.image}
              meal={recipe.recipeCategory}
              title={recipe.name}
              user={recipe.submittedBy}
              originalSource={recipe.originalSource}
            />
          </div>
        ))}
      </div>
      <Pagination
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
