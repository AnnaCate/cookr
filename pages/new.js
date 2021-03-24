import Form from '../components/Form'

const NewRecipe = () => {
  const recipeForm = {
    image: '',
    keywords: [],
    recipeCategory: [],
    recipeIngredients: [],
    recipeInstructions: '',
    recipeYield: '',
    title: ''
  }
  return <Form formId="add-recipe-form" recipeForm={recipeForm} />
}

export default NewRecipe
