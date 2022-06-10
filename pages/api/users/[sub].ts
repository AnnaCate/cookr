import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { sub },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const user = await User.findOne({ sub }).lean()
        if (!user) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    // case 'PUT' /* Edit a model by its ID */:
    //   try {
    //     const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
    //       new: true,
    //       runValidators: true,
    //     })
    //     if (!recipe) {
    //       return res.status(400).json({ success: false })
    //     }
    //     res.status(200).json({ success: true, data: recipe })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break

    // case 'DELETE' /* Delete a model by its ID */:
    //   try {
    //     const deletedRecipe = await Recipe.deleteOne({ _id: id })
    //     if (!deletedRecipe) {
    //       return res.status(400).json({ success: false })
    //     }
    //     res.status(200).json({ success: true, data: {} })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break

    default:
      res.status(400).json({ success: false })
      break
  }
}
