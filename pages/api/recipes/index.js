import Recipe from '../../../models/Recipe'
import User from '../../../models/User'
import { getSession } from '@auth0/nextjs-auth0'

export default async function handler(req, res) {
  const session = getSession(req, res)
  const { method, query } = req
  const { search = '', skip = 0, userId } = query
  const authFilter = session ? {} : { originalSource: { $exists: false } }
  const userFilter = userId ? { submittedBy: userId } : {}

  const skipNum = Number(skip)

  const findQuery = search
    ? {
        $and: [
          { ...authFilter },
          { ...userFilter },
          {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { 'ingredients.ingredients': { $regex: search, $options: 'i' } },
              { keywords: { $regex: search, $options: 'i' } },
            ],
          },
        ],
      }
    : { ...authFilter, ...userFilter }

  switch (method) {
    case 'GET':
      try {
        const recipes = await Recipe.find(findQuery)
          .populate('submittedBy', 'name')
          .sort('name')
          .skip(skipNum)
          .limit(8)

        const totalNum = await Recipe.countDocuments(findQuery).exec()
        res.status(200).json({ success: true, data: { recipes, totalNum } })
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
