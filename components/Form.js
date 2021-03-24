import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const Form = ({ formId, recipeForm, forNewRecipe = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    image_url: recipeForm.image_url,
    keywords: recipeForm.keywords,
    recipeCategory: recipeForm.recipeCategory,
    recipeIngredients: recipeForm.recipeIngredients,
    recipeInstructions: recipeForm.recipeInstructions,
    recipeYield: recipeForm.recipeYield,
    title: recipeForm.title
  })

  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
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

      if (!res.ok) throw new Error(res.status)
    
      router.push('/')
    } catch (error) {
      setMessage('Failed to add recipe')
    }
  }

  const handleChange = (e) => {
    const target = e.target

    setForm({
      ...form,
      [target.name]: target.value,
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
      <form id={formId} onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex w-1/2">
        <label htmlFor="title">Title</label>
        <input
          className="border rounded-md"
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        </div>
        <div className="flex w-1/2">

        <label htmlFor="recipeCategory">Category</label>
        <input
                    className="border rounded-md"
                    type="text"
          name="recipeCategory"
          value={form.recipeCategory}
          onChange={handleChange}
        />
</div>
<div className="flex w-1/2">

        <label htmlFor="recipeIngredients">Ingredients</label>
        <input
                    className="border rounded-md"
                    type="text"
          name="recipeIngredients"
          value={form.recipeIngredients}
          onChange={handleChange}
        />
</div>
<div className="flex w-1/2">

        <label htmlFor="recipeInstructions">Instructions</label>
        <input
                    className="border rounded-md"
                    type="text"
          name="recipeInstructions"
          value={form.recipeInstructions}
          onChange={handleChange}
        />
</div>
<div className="flex w-1/2">

        <label htmlFor="recipeYield">Yield</label>
        <input
                    className="border rounded-md"
                    type="text"
          name="recipeYield"
          checked={form.recipeYield}
          onChange={handleChange}
        />
</div>
<div className="flex w-1/2">

        <label htmlFor="image_url">Image URL</label>
        <input
                  className="border rounded-md"
                  type="url"
          name="image"
          value={form.image}
          onChange={handleChange}
        />
</div>
<div className="flex w-1/2">

        <label htmlFor="keywords">Keywords</label>
        <textarea
                   className="border rounded-md"
                   name="keywords"
          value={form.keywords}
          onChange={handleChange}
        />
</div>
        <button type="submit">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default Form
