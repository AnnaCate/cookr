import React from 'react'
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
    recipeIngredients: [{header: '', recipeIngredient: ''}],
    recipeInstructions: [{text: '', url: ''}],
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
