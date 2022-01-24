import dbConnect from '../../../utils/dbConnect'
import Recipe from '../../../models/Recipe'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const recipes = await Recipe.find({}).populate(
          'submittedBy',
        ) /* find all the data in our database */
        res.status(200).json({ success: true, data: recipes })
      } catch (error) {
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