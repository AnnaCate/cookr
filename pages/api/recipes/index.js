import dbConnect from '../../../utils/dbConnect'
import Recipe from '../../../models/Recipe'
import User from '../../../models/User'

export default async function handler(req, res) {
  const { method, query } = req
  const { skip = 0 } = query
  const skipNum = Number(skip)

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const recipes = await Recipe.find({})
          .populate('submittedBy', 'name')
          .skip(skipNum)
          .limit(8)

        res.status(200).json({ success: true, data: recipes })
      } catch (error) {
        console.error(error)
        res.status(500).json({ success: false })
      }
      break
    case 'POST':
      try {
        console.log(req.body)
        const recipe = await Recipe.create(
          req.body,
        ) /* create a new model in the database */
        console.log('recipe', recipe)

        // add recipe to user profile
        const user = await User.findByIdAndUpdate(
          recipe.submittedBy,
          { $push: { recipes: recipe._id } },
          { safe: true, upsert: true, new: true },
        )
        console.log('user.recipes', user.recipes)

        res.status(201).json({ success: true, data: recipe })
      } catch (error) {
        console.log(error)
        res.status(500).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
