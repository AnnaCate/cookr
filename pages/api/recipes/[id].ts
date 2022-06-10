import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/dbConnect'
import Recipe from '../../../models/Recipe'
import User from '../../../models/User'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id: recipeId },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const recipe = await Recipe.findById(recipeId)
          .populate('submittedBy')
          .lean()
        if (!recipe) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: recipe })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const recipe = await Recipe.findByIdAndUpdate(recipeId, req.body, {
          new: true,
          runValidators: true,
        })
        if (!recipe) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: recipe })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        await Recipe.findById(
          recipeId,
          'submittedBy',
          null,
          async function (err: any, recipe: any) {
            if (err) console.log(err)
            await User.findByIdAndUpdate(
              recipe.submittedBy,
              { $pull: { recipes: recipeId } },
              { new: true },
              async function (err: any, user: any) {
                if (err) throw new Error(err)
                console.log('user', user)
                const deletedRecipe = await Recipe.deleteOne({ _id: recipeId })
                if (!deletedRecipe) throw new Error()
              },
            )
          },
        )
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
