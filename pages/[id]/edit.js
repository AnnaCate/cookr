import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditRecipe = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: recipe, error } = useSWR(id ? `/api/recipes/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!recipe) return <p>Loading...</p>

  const recipeForm = {
    image: recipe.image,
    keywords: recipe.keywords,
    recipeCategory: recipe.recipeCategory,
    recipeIngredients: recipe.recipeIngredients,
    recipeInstructions: recipe.recipeInstructions,
    recipeYield: recipe.recipeYield,
    title: recipe.recipeTitle
  }

  return <Form formId="edit-recipe-form" recipeForm={recipeForm} forNewRecipe={false} />
}

export default EditRecipe
