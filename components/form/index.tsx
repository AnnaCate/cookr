import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'

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
    <p className="text-sm text-gray-500 font-semibold">Sub-Header:</p>
    {idx === 0 && <p className="text-gray-500 italic text-sm">Use if you need to divide your ingredients into multiple sub-sections. Leave blank if you only need one list of ingredients.</p>}
    <input
      className="c-input mb-1"
      type="text"
      name="header"
      onChange={(e) => handleChange(e, idx)}
      placeholder="Marinade"
      value={state.ingredients[idx].header}
    />
    <p className="text-sm text-gray-500 font-semibold">List of Ingredients:</p>
    {idx === 0 && <p className="text-gray-500 italic text-sm">Write each ingredient on a new line.</p>}
    <textarea
      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 whitespace-pre-wrap"
      name="ingredients"
      value={state.ingredients[idx].ingredients}
      rows={5}
      onChange={(e) => handleChange(e, idx)}
      placeholder={`1/2 bunch fresh parsley chopped\n1 Tbsp fresh squeezed lemon juice`}
    />
  </>
)

export function Form({
  formId,
  onSubmit,
  recipeForm,
  forNewRecipe = true,
}: {
  formId: string
  onSubmit: (form: any) => Promise<void>
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
      <div className="flex flex-row w-48">
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
      await onSubmit(form)
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

  return (
    <div className="flex items-center">
      <div className="container mx-auto">
        <div className="max-w-xxl mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              {`${forNewRecipe ? "Add New" : "Edit"} Recipe`}
            </h1>
            <p className="text-gray-400 dark:text-gray-400">
              {`${forNewRecipe? "Import or manually add a new recipe." : "Make changes to an existing recipe."}`}
            </p>
          </div>
          <div className="m-7">
            <form id={formId} onSubmit={handleSubmit}>
              <Input
                handleChange={handleChange}
                label="Recipe Title"
                name="name"
                placeholder="Chimichurri Steak"
                value={form.name}
              />
              <div className="mb-6">
                <label className="c-input-label" htmlFor="recipeInstructions">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  name="description"
                  rows={3}
                  placeholder="This is a great recipe for a backyard barbecue, or can be portioned out for meal prep. Flank steak is recommended, but you can use another cut if you prefer."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <fieldset className="c-input-wrapper">
                <legend className="c-input-label">Category</legend>
                <div className="flex justify-start w-full flex-wrap px-4">
                  {[
                    'Appetizer',
                    'Beverage',
                    'Breakfast/Brunch',
                    'Dessert',
                    'Main',
                    'Side',
                    'Snack',
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
                {form.ingredients.map((ingredient, idx, arr) => (
                    <div key={ingredient.id} className="group relative">
                      <IngredientsSubSection
                        idx={idx}
                        state={form}
                        handleChange={(e) => handleIngrChange(e, idx)}
                      />
                      {arr.length > 1 && (<button
                        type="button"
                        className="hidden group-hover:inline absolute -top-1 -right-1 text-red-400 bg-white"
                        onClick={() => {
                          handleRemoveIngrSection(ingredient)
                        }}
                      >
                        <FaTimesCircle />
                      </button>)}
                    </div>
                  ))}
                <button
                  className="py-1 px-3 flex items-center justify-center text-white bg-gray-400 hover:bg-gray-500 rounded-md focus:bg-gray-500 focus:outline-none"
                  onClick={() => {
                    setForm({
                      ...form,
                      ingredients: [
                        ...form.ingredients,
                        { header: '', id: uuid(), ingredients: '' },
                      ],
                    })
                  }}
                  type="button"
                >
                  <>
                    <FaRegPlusSquare className="inline-block mr-2" />
                    Add ingredients sub-section
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
                  placeholder={`1. Mix all marinade ingredients together in a medium bowl.\n2. Marinate steak for 1 hour at room temperature.`}
                  value={form.recipeInstructions}
                  onChange={handleChange}
                />
              </div>
              <Input
                handleChange={handleChange}
                label="Yield"
                name="recipeYield"
                placeholder="6 servings"
                value={form.recipeYield}
              />
              <div className="flex">
                <div className="pr-4">
                <Input
                  handleChange={handleChange}
                  label="Active Time"
                  name="prepTime"
                  placeholder="20 min"
                  value={form.prepTime}
                />
                </div>
                <div className="pr-4">
                <Input
                  handleChange={handleChange}
                  label="Cook Time"
                  name="cookTime"
                  placeholder="10 min"
                  value={form.cookTime}
                />
                </div>
                <div>
                <Input
                  handleChange={handleChange}
                  label="Total Time"
                  name="totalTime"
                  placeholder="30 min"
                  value={form.totalTime}
                />
                </div>
              </div>
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
                  Use commas to separate keywords.
                </p>
                <textarea
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  name="keywords"
                  value={form.keywords}
                  placeholder="meal prep, grill, quick, paleo, summer"
                  onChange={handleChange}
                />
              </div>
              <div className="flex space-x-4 justify-start w-full items-start">
              <button
                type="submit"
                className="w-full max-w-xs py-4 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                Submit
              </button>
              <button
                onClick={() => router.push('/')}
                type="button"
                className="w-full max-w-xs py-4 text-white bg-gray-400 hover:bg-gray-500 rounded-md focus:bg-gray-500 focus:outline-none"
              >
                Cancel
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
