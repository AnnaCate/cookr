import React from 'react'
import Link from 'next/link'
import { compose, map } from 'lodash/fp'
import dbConnect from '../utils/dbConnect'
import { default as RecipeModel }  from '../models/Recipe'
import { Layout, PageHeader, Tile } from '../components'
import { Recipe } from '../types'

const Index = ({ recipes }: {recipes: Recipe.Existing[]}) => (
  <Layout>
    <PageHeader title="cookr" subtitle="keep your recipes organized" />
    <div className="flex flex-row flex-wrap justify-center align-start w-full">
      {recipes.map((recipe: Recipe.Existing) => (
        <Link key={recipe._id} href="/[id]" as={`/${recipe._id}`}>
          <a className="pr-4 w-1/2 md:w-full max-w-xs">
            <Tile
              key={recipe._id}
              img={recipe.image}
              title={recipe.name}
              user={{name: 'Anna'}}
            />
          </a>
        </Link>
      ))}
    </div>
  </Layout>
)

export async function getServerSideProps(): Promise<{
  props: {
      recipes: Recipe.Existing[];
  }
}> {
  await dbConnect()

  const result: any[] = await RecipeModel.find({})
  const recipes = result.map((doc) => {
    const recipe = doc.toObject()
    return {
      ...recipe,
      _id: recipe._id.toString(),
      recipeIngredients: recipe.recipeIngredients.map(v => ({...v, _id: v._id.toString()})),
      recipeInstructions: recipe.recipeInstructions.map(v => ({...v, _id: v._id.toString()})),
    }
  })
  return { props: { recipes } }
}

export default Index
