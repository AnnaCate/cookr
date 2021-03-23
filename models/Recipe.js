import mongoose from 'mongoose'

const RecipeSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String,
  },
  keywords: {
    type: Array,
  },
  recipeCategory: {
    type: Array,
  },
  recipeIngredient: {
    type: Array,
  },
  recipeInstructions: {
    type: String
  },
  recipeYield: {
    type: String
  },
  title: {
    type: String,
    required: [true, 'Please provide a title for this recipe.']
  },
})

export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema)
