import { Form, Layout } from '../components'

const NewRecipe = () => {
  const recipeForm = {
    image: '',
    keywords: [],
    cookTime: '',
    prepTime: '',
    totalTime: '',
    recipeCategory: [],
    recipeIngredients: [],
    recipeInstructions: '',
    recipeYield: '',
    title: '',
  }
  return (
    <Layout>
      <Form formId="add-recipe-form" recipeForm={recipeForm} />
    </Layout>
  )
}

export default NewRecipe
