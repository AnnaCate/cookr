import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import { FaRegPlusSquare, FaTimesCircle } from 'react-icons/fa'
import { Input } from './TextInput'
import { Dropdown } from '../'
import { formatCategory } from '../../utils/format-category'
import { IngredientsSubSection } from './IngredientsSubSection'
import { Recipe, IngredientSection } from '../../types'

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
    originalSource: recipeForm.originalSource,
    recipeInstructions: recipeForm.recipeInstructions,
    recipeYield: recipeForm.recipeYield,
    suitableForDiet: recipeForm.suitableForDiet,
    untested: recipeForm.untested,
  })

  const handleCategorySelection = (category: {
    value: string
    label: string
  }) => {
    setForm({
      ...form,
      recipeCategory: category.value,
    })
  }

  const handleDietChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const diets = [...form.suitableForDiet]
    const dietWasDeselected =
      diets.filter((v) => v === e.target.name).length > 0
    if (dietWasDeselected) {
      const newDiets = diets.filter((v) => v !== e.target.name)
      setForm({ ...form, suitableForDiet: newDiets })
    } else {
      diets.push(e.target.name)
      setForm({ ...form, suitableForDiet: diets })
    }
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
    const ingredients = form.ingredients.filter(
      (ingredient) => ingredient.id !== x.id,
    )
    setForm({ ...form, ingredients })
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    let val: any

    if (e.target.type === 'checkbox' && 'checked' in e.target) {
      val = e.target.checked
    } else {
      val = e.target.value
    }
    setForm({
      ...form,
      [e.target.name]: val,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="sm:bg-white sm:p-6 sm:rounded-xl sm:shadow-sm">
      <div className="text-left">
        <p className="text-gray-600 text-sm">
          <span className="text-red-600">*</span> Required
        </p>
      </div>
      <div className="my-7">
        <form id={formId} onSubmit={handleSubmit}>
          <fieldset className="mb-6 flex items-center">
            <input
              id="untested"
              name="untested"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              onChange={handleChange}
              checked={form.untested}
            />
            <div className="ml-2 text-sm leading-6">
              <label
                htmlFor="untested"
                className="font-semibold text-gray-900 text-base"
              >
                Check this box if you cannot vouch for this recipe{' '}
                <span className="font-normal italic">
                  (e.g. you'd like to make it someday, but haven't made it yet)
                </span>
              </label>
            </div>
          </fieldset>
          <Input
            handleChange={handleChange}
            label="Recipe Title"
            name="name"
            required={true}
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
          <div className="flex flex-col xs:flex-row items-center xs:space-x-4">
            <div className="w-full xs:w-1/2">
              <label className="c-input-label" htmlFor="categories">
                Category<span className="text-red-600 font-normal">*</span>
              </label>
              <div className="w-full">
                <Dropdown
                  id="recipeCategory"
                  name="recipeCategory"
                  onChange={handleCategorySelection}
                  value={formatCategory(form.recipeCategory)}
                  options={[
                    {
                      value: 'appetizer',
                      label: 'Appetizer',
                    },
                    {
                      value: 'beverage',
                      label: 'Beverage',
                    },
                    {
                      value: 'breakfast_brunch',
                      label: 'Breakfast/Brunch',
                    },
                    {
                      value: 'bread',
                      label: 'Bread',
                    },
                    {
                      value: 'dessert',
                      label: 'Dessert',
                    },
                    {
                      value: 'main',
                      label: 'Main',
                    },
                    {
                      value: 'side',
                      label: 'Side',
                    },
                    {
                      value: 'snack',
                      label: 'Snack',
                    },
                    {
                      value: 'other',
                      label: 'Other',
                    },
                  ]}
                />
              </div>
            </div>
            <div className="w-full xs:w-1/2">
              <Input
                handleChange={handleChange}
                label="Yield"
                name="recipeYield"
                placeholder="6 servings"
                value={form.recipeYield}
              />
            </div>
          </div>
          <div className="flex flex-col xs:flex-row">
            <div className="xs:pr-4 w-full xs:w-1/3">
              <Input
                handleChange={handleChange}
                label="Active Time"
                name="prepTime"
                placeholder="20 min"
                value={form.prepTime}
              />
            </div>
            <div className="xs:pr-4 w-full xs:w-1/3">
              <Input
                handleChange={handleChange}
                label="Cook Time"
                name="cookTime"
                placeholder="10 min"
                value={form.cookTime}
              />
            </div>
            <div className="w-full xs:w-1/3">
              <Input
                handleChange={handleChange}
                label="Total Time"
                name="totalTime"
                placeholder="30 min"
                value={form.totalTime}
              />
            </div>
          </div>
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
                {arr.length > 1 && (
                  <button
                    type="button"
                    className="hidden group-hover:inline absolute -top-1 -right-1 text-red-400 bg-white"
                    onClick={() => {
                      handleRemoveIngrSection(ingredient)
                    }}
                  >
                    <FaTimesCircle />
                  </button>
                )}
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
            type="url"
            id="originalSource"
            label="Source / Adapted From"
            name="originalSource"
            value={form.originalSource}
            placeholder="https://www.foodandwine.com/chimichurri-steak/"
            handleChange={handleChange}
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
            <label className="c-input-label" htmlFor="special-diets">
              Special Diet(s)
            </label>
            <fieldset>
              <legend className="sr-only">Special Diet(s)</legend>
              <div className="sm:space-x-6 flex flex-col sm:flex-row justify-evenly flex-wrap">
                {[
                  {
                    label: 'Gluten Free',
                    value: 'gluten-free',
                  },
                  {
                    label: 'Dairy Free',
                    value: 'dairy-free',
                  },
                  {
                    label: 'Vegetarian',
                    value: 'vegetarian',
                  },
                  {
                    label: 'Vegan',
                    value: 'vegan',
                  },
                  {
                    label: 'Pescatarian',
                    value: 'pescatarian',
                  },
                  {
                    label: 'Low Carb',
                    value: 'low-carb',
                  },
                  {
                    label: 'High Protein',
                    value: 'high-protein',
                  },
                  {
                    label: 'Low Cholesterol',
                    value: 'low-cholesterol',
                  },
                  {
                    label: 'Paleo',
                    value: 'paleo',
                  },
                  {
                    label: 'Whole30',
                    value: 'whole30',
                  },
                ].map((diet) => (
                  <div
                    key={diet.value}
                    className="relative flex flex-row flex-nowrap items-start"
                  >
                    <div className="flex h-6 items-center">
                      <input
                        id={diet.value}
                        name={diet.value}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={handleDietChange}
                        checked={form.suitableForDiet.includes(diet.value)}
                      />
                    </div>
                    <div className="ml-2 text-sm leading-6">
                      <label
                        htmlFor={diet.value}
                        className="font-medium text-gray-900"
                      >
                        {diet.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
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
              placeholder="meal prep, grill, quick, summer"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-4 justify-center w-full items-center">
            <button
              type="submit"
              className="w-full max-w-xs py-4 text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl focus:bg-indigo-600 focus:outline-none"
            >
              {forNewRecipe ? 'Submit' : 'Save'}
            </button>
            <button
              onClick={() => router.back()}
              type="button"
              className="w-full max-w-xs py-4 text-gray-400 hover:text-gray-500 rounded-xl border-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
