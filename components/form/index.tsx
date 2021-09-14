import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import { FaRegPlusSquare, FaTimesCircle } from 'react-icons/fa'
import { Input } from './input'
import { Recipe, IngredientSection } from '../../types'

const IngredientsSubSection = ({
  handleChange,
  idx,
  state,
}: {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number,
  ) => void
  idx: number
  state: Recipe.Base
}) => (
  <>
    <input
      className="c-input mb-1"
      type="text"
      name="header"
      onChange={(e) => handleChange(e, idx)}
      placeholder="Subheader (Optional)"
      value={state.ingredients[idx].header}
    />
    <textarea
      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
      name="ingredients"
      value={state.ingredients[idx].ingredients.join('\r\n')}
      rows={5}
      onChange={(e) => handleChange(e, idx)}
      placeholder="Type each ingredient on a separate line"
    />
  </>
)

export function Form({
  formId,
  recipeForm,
  forNewRecipe = true,
}: {
  formId: string
  recipeForm: Recipe.Base | Recipe.Existing
  forNewRecipe?: boolean
}) {
  const router = useRouter()

  const [form, setForm] = useState<Recipe.Base>({
    description: recipeForm.description,
    image: recipeForm.image,
    keywords: recipeForm.keywords,
    name: recipeForm.name,
    cookTime: recipeForm.cookTime,
    prepTime: recipeForm.prepTime,
    totalTime: recipeForm.totalTime,
    recipeCategory: recipeForm.recipeCategory,
    ingredients: recipeForm.ingredients,
    recipeInstructions: recipeForm.recipeInstructions,
    recipeYield: recipeForm.recipeYield,
  })

  const CategoryItem = ({ value }) => {
    const valueLower = value.toLowerCase()
    return (
      <div className="flex flex-row w-24">
        <input
          checked={valueLower === form.recipeCategory}
          className="mr-2"
          type="radio"
          id={valueLower}
          name="recipeCategory"
          value={valueLower}
          onChange={handleChange}
        />
        <label
          className="text-gray-600 text-sm -mt-1 pb-2"
          htmlFor={valueLower}
        >
          {value}
        </label>
      </div>
    )
  }

  const handleIngrChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number,
  ): void => {
    const ingredients = [...form.ingredients]
    const newIngrSection = { ...ingredients[idx] }
    newIngrSection[e.target.name] = e.target.value
    ingredients[idx] = newIngrSection
    setForm({ ...form, ingredients })
  }

  const handleRemoveIngrSection = (x: IngredientSection) => {
    const ingredients = form.ingredients.filter(ingredient => ingredient.id !== x.id)
    setForm({ ...form, ingredients })
  }

  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(res.statusText)
      const { data } = await res.json()
      mutate(`/api/recipes/${id}`, data, false)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const postData = async (form) => {
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(res.statusText)

      router.push('/')
    } catch (error) {}
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewRecipe ? await postData(form) : await putData(form)
    } else {
      console.error(errs)
    }
  }

  const formValidate = () => {
    let err = {}
    // @ts-ignore
    if (!form.name) err.name = 'Title is required'
    if (!form.recipeCategory)
      // @ts-ignore
      err.recipeCategory = 'Recipe category is required.'
    return err
  }
  console.log(form)

  return (
    <div className="flex items-center">
      <div className="container mx-auto">
        <div className="max-w-xxl mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Add New Recipe
            </h1>
            <p className="text-gray-400 dark:text-gray-400">
              Import or manually add a new recipe.
            </p>
          </div>
          <div className="m-7">
            <form id={formId} onSubmit={handleSubmit}>
              <Input
                handleChange={handleChange}
                label="Recipe Title"
                name="name"
                value={form.name}
              />
              <fieldset className="c-input-wrapper">
                <legend className="c-input-label">Category</legend>
                <div className="flex justify-between flex-wrap px-4">
                  {[
                    'Breakfast',
                    'Appetizer',
                    'Main',
                    'Side',
                    'Snack',
                    'Dessert',
                    'Beverage',
                    'Other',
                  ].map((cat) => (
                    <CategoryItem key={cat} value={cat} />
                  ))}
                </div>
              </fieldset>
              <div className="c-input-wrapper">
                <label className="c-input-label" htmlFor="ingredients">
                  Ingredients
                </label>
                {form.ingredients.map((ingredient, idx) => (
                    <div key={ingredient.id} className="group relative">
                      <IngredientsSubSection
                        idx={idx}
                        state={form}
                        handleChange={(e) => handleIngrChange(e, idx)}
                      />
                      <button
                        type="button"
                        className="hidden group-hover:inline absolute -top-1 -right-1 text-red-400 bg-white"
                        onClick={() => {
                          handleRemoveIngrSection(ingredient)
                        }}
                      >
                        <FaTimesCircle />
                      </button>
                    </div>
                  ))}
                <button
                  className="py-1 px-3 flex items-center justify-center text-white bg-gray-400 rounded-md focus:bg-gray-500 focus:outline-none"
                  onClick={() => {
                    setForm({
                      ...form,
                      ingredients: [
                        ...form.ingredients,
                        { header: '', id: uuid(), ingredients: [''] },
                      ],
                    })
                  }}
                  type="button"
                >
                  <>
                    <FaRegPlusSquare className="inline-block mr-2" />
                    Add sub-section
                  </>
                </button>
              </div>
              <div className="mb-6">
                <label className="c-input-label" htmlFor="recipeInstructions">
                  Instructions
                </label>
                <textarea
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  name="recipeInstructions"
                  rows={5}
                  value={form.recipeInstructions[0].text}
                  onChange={handleChange}
                />
              </div>
              <Input
                handleChange={handleChange}
                label="Yield"
                name="recipeYield"
                value={form.recipeYield}
              />
              <Input
                handleChange={handleChange}
                label="Active Time"
                name="prepTime"
                value={form.prepTime}
              />
              <Input
                handleChange={handleChange}
                label="Cook Time"
                name="cookTime"
                value={form.cookTime}
              />
              <Input
                handleChange={handleChange}
                label="Total Time"
                name="totalTime"
                value={form.totalTime}
              />
              <Input
                type="url"
                id="image"
                label="Image URL"
                name="image"
                value={form.image}
                handleChange={handleChange}
              />
              <div className="mb-6">
                <label className="c-input-label" htmlFor="keywords">
                  Keywords
                </label>
                <p className="text-gray-500 italic text-sm">
                  Use commas to separate keywords, e.g. meal prep, paleo, summer
                </p>
                <textarea
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  name="keywords"
                  value={form.keywords}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full max-w-xs mx-auto px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
