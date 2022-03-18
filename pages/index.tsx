import React from 'react'
import Link from 'next/link'
import dbConnect from '../utils/dbConnect'
import { default as RecipeModel } from '../models/Recipe'
import { Layout, PageHeader, Tile } from '../components'
import { Recipe } from '../types'

const Index = ({ recipes }: { recipes: Recipe.Existing[] }) => (
  <Layout>
    <PageHeader title="cookr" subtitle="keep your recipes organized." />
    <div className="flex flex-row flex-wrap justify-center align-start w-full">
      {recipes.map((recipe: Recipe.Existing, idx: number) => (
        <Link key={recipe._id} href="/[id]" as={`/${recipe._id}`}>
          <a>
            <Tile
              key={recipe._id}
              img={recipe.image}
              title={recipe.name}
              user={recipe.submittedBy}
            />
          </a>
        </Link>
      ))}
    </div>
  </Layout>
)

export async function getServerSideProps(): Promise<{
  props: {
    recipes: Recipe.Existing[]
  }
}> {
  await dbConnect()

  const result: any[] = await RecipeModel.find({}).populate(
    'submittedBy',
    'name',
  )
  const recipes = result.map((doc) => {
    const recipe = doc.toObject()
    return {
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
    }
  })
  return { props: { recipes } }
}

export default Index
