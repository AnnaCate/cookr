import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

export const Form = ({ formId, recipeForm, forNewRecipe = true }) => {
  const router = useRouter()
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    image: recipeForm.image,
    keywords: recipeForm.keywords,
    recipeCategory: recipeForm.recipeCategory,
    recipeIngredients: recipeForm.recipeIngredients,
    recipeInstructions: recipeForm.recipeInstructions,
    recipeYield: recipeForm.recipeYield,
    title: recipeForm.title,
  })

  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error(res.status)

      const { data } = await res.json()

      mutate(`/api/recipes/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update recipe')
    }
  }

  const postData = async (form) => {
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })
      console.log(res)
      if (!res.ok) throw new Error(res.status)

      router.push('/')
    } catch (error) {
      setMessage('Failed to add recipe')
    }
  }
  console.log(form)
  const handleChange = (e) => {
    const target = e.target

    setForm({
      ...form,
      [target.name]: target.value,
    })
  }

  const handleCategoryChange = (e) => {
    console.log(e.target)
    if (form.recipeCategory.includes(e.target.name)) {
      setForm({
        ...form,
        recipeCategory: [
          ...form.recipeCategory.filter((v) => v !== e.target.name),
        ],
      })
    } else
      setForm({
        ...form,
        recipeCategory: [...form.recipeCategory].concat(e.target.name),
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewRecipe ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.title) err.name = 'Title is required'
    return err
  }

  return (
    <>
      <div class="flex items-center">
        <div class="container mx-auto">
          <div class="max-w-xxl mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
            <div class="text-center">
              <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Add New Recipe
              </h1>
              <p class="text-gray-400 dark:text-gray-400">
                Import or manually add a new recipe.
              </p>
            </div>
            <div class="m-7">
              <form id={formId} onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    htmlFor="title"
                  >
                    Recipe Title
                  </label>
                  <input
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    required
                  />
                </div>
                <fieldset className="mb-6 w-full">
                  <legend className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                    Categories
                  </legend>
                  <div className="flex justify-between flex-wrap px-4">
                    <div className="flex items-center w-24">
                      <input
                        className="mr-2"
                        type="checkbox"
                        id="category-breakfast"
                        name="breakfast"
                        onChange={handleCategoryChange}
                      />
                      <label
                        className="text-gray-600 text-sm"
                        htmlFor="breakfast"
                      >
                        Breakfast
                      </label>
                    </div>
                    <div className="flex items-center w-24">
                      <input
                        className="mr-2"
                        type="checkbox"
                        id="category-lunch"
                        name="lunch"
                        onChange={handleCategoryChange}
                      />
                      <label className="text-gray-600 text-sm" htmlFor="lunch">
                        Lunch
                      </label>
                    </div>
                    <div className="flex items-center w-24">
                      <input
                        className="mr-2"
                        type="checkbox"
                        id="category-snacks"
                        name="snacks"
                        onChange={handleCategoryChange}
                      />
                      <label className="text-gray-600 text-sm" htmlFor="snacks">
                        Snack
                      </label>
                    </div>
                    <div className="flex items-center w-24">
                      <input
                        className="mr-2"
                        type="checkbox"
                        id="category-dinner"
                        name="dinner"
                        onChange={handleCategoryChange}
                      />
                      <label className="text-gray-600 text-sm" htmlFor="dinner">
                        Dinner
                      </label>
                    </div>
                    <div className="flex items-center w-24">
                      <input
                        className="mr-2"
                        type="checkbox"
                        id="category-side"
                        name="side"
                        onChange={handleCategoryChange}
                      />
                      <label className="text-gray-600 text-sm" htmlFor="side">
                        Side
                      </label>
                    </div>
                    <div className="flex items-center w-24">
                      <input
                        className="mr-2"
                        type="checkbox"
                        id="category-dessert"
                        name="dessert"
                        onChange={handleCategoryChange}
                      />
                      <label
                        className="text-gray-600 text-sm"
                        htmlFor="dessert"
                      >
                        Dessert
                      </label>
                    </div>
                    <div className="flex items-center w-24">
                      <input
                        className="mr-2"
                        type="checkbox"
                        id="category-drink"
                        name="drink"
                        onChange={handleCategoryChange}
                      />
                      <label className="text-gray-600 text-sm" htmlFor="drink">
                        Drink
                      </label>
                    </div>
                    <div className="flex items-center w-24">
                      <input
                        className="mr-2"
                        type="checkbox"
                        id="category-other"
                        name="other"
                        onChange={handleCategoryChange}
                      />
                      <label className="text-gray-600 text-sm" htmlFor="other">
                        Other
                      </label>
                    </div>
                  </div>
                </fieldset>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    htmlFor="recipeIngredients"
                  >
                    Ingredients
                  </label>
                  <input
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    type="text"
                    name="subheader-1"
                    placeholder="Subheader (Optional)"
                  />
                  <textarea
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    name="recipeIngredients"
                    value={form.recipeIngredients}
                    rows={5}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    htmlFor="recipeInstructions"
                  >
                    Instructions
                  </label>
                  <textarea
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    name="recipeInstructions"
                    rows={5}
                    value={form.recipeInstructions}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    htmlFor="recipeYield"
                  >
                    Yield
                  </label>
                  <input
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    type="text"
                    name="recipeYield"
                    checked={form.recipeYield}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    htmlFor="image"
                  >
                    Image URL
                  </label>
                  <input
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    type="url"
                    id="image"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    htmlFor="keywords"
                  >
                    Keywords
                  </label>
                  <textarea
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    name="keywords"
                    value={form.keywords}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  class="w-full max-w-xs mx-auto px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}
