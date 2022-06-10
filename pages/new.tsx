import React from 'react'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'

import { withPageAuthRequired } from '@auth0/nextjs-auth0'

import { Form, Layout, PageHeader } from '../components'
import { Recipe } from '../types'
import { getMongoUser } from '../utils/get-mongo.user'

const NewRecipe = () => {
  const router = useRouter()
  const { user: auth0User } = useUser()
  const recipeForm: Recipe.Base = {
    description: '',
    image: '',
    keywords: [],
    cookTime: '',
    prepTime: '',
    totalTime: '',
    recipeCategory: '',
    ingredients: [{ header: '', id: uuid(), ingredients: '' }],
    recipeInstructions: '',
    recipeYield: '',
    name: '',
  }

  const postData = async (form: Recipe.Base) => {
    try {
      const mongoUser = await getMongoUser(auth0User?.sub)

      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          submittedBy: mongoUser.data._id,
        }),
      })
      if (!res.ok) throw new Error(res.statusText)

      router.push('/')
    } catch (error) {}
  }

  return (
    <Layout>
      <>
        <PageHeader title="submit a recipe" />
        <Form
          formId="add-recipe-form"
          onSubmit={postData}
          recipeForm={recipeForm}
        />
      </>
    </Layout>
  )
}

export default withPageAuthRequired(NewRecipe)
