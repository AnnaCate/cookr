import React from 'react'
import { v4 as uuid } from 'uuid'

import { Form, Layout } from '../components'
import { Recipe } from '../types'

const NewRecipe = () => {
  const recipeForm: Recipe.Base = {
    description: '',
    image: '',
    keywords: [],
    cookTime: '',
    prepTime: '',
    totalTime: '',
    recipeCategory: '',
    ingredients: [{header: '', id: uuid(), ingredients: ''}],
    recipeInstructions: '',
    recipeYield: '',
    name: '',
  }
  return (
    <Layout>
      <Form formId="add-recipe-form" recipeForm={recipeForm} />
    </Layout>
  )
}

export default NewRecipe
