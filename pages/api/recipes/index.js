import dbConnect from '../../../utils/dbConnect'
import Recipe from '../../../models/Recipe'
import User from '../../../models/User'

export default async function handler(req, res) {
  await dbConnect()

  const { method, query } = req
  const {
    keywords = '',
    recipeCategory = '',
    search = '',
    shuffle = false,
    skip = 0,
    suitableForDiet = '',
    userId,
  } = query

  // create query filters and constraints
  const userFilter = userId ? { submittedBy: userId } : {}
  const searchFilter = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          {
            'ingredients.ingredients': { $regex: search, $options: 'i' },
          },
          { keywords: { $regex: search, $options: 'i' } },
        ],
      }
    : {}
  const recipeCategoryFilter = recipeCategory
    ? {
        $or: recipeCategory.split(',').map((category) => ({
          recipeCategory: category,
        })),
      }
    : {}
  const keywordsFilter = keywords
    ? {
        $and: keywords.split(',').map((kw) => ({
          keywords: { $regex: kw, $options: 'i' },
        })),
      }
    : {}
  const dietsFilter = suitableForDiet
    ? {
        $and: suitableForDiet.split(',').map((diet) => ({
          suitableForDiet: { $regex: diet, $options: 'i' },
        })),
      }
    : {}

  const findQuery = {
    $and: [
      { ...userFilter },
      { ...searchFilter },
      { ...recipeCategoryFilter },
      { ...keywordsFilter },
      { ...dietsFilter },
    ],
  }

  const skipNum = Number(skip)

  switch (method) {
    case 'GET':
      try {
            let recipes;

            if (shuffle === 'true') {
              recipes = await Recipe.aggregate([
                {
                $match: findQuery
                },
                { $lookup: { from: 'users', localField: 'submittedBy', foreignField: '_id', as: 'submittedBy' } },
                { $sample: { size: 10 } }
              ])
            } else {
              recipes = await Recipe.aggregate([
                {
                $match: findQuery
                },
                { $lookup: { from: 'users', localField: 'submittedBy', foreignField: '_id', as: 'submittedBy' } },
                { $sort: { name: 1 } },
                { $skip: skipNum },
                { $limit: 10 }
              ])
            }
        const totalNum = await Recipe.countDocuments(findQuery).exec()
        res.status(200).json({ success: true, data: { recipes, totalNum } })
      } catch (error) {
        console.error(error)
        res.status(500).json({ success: false })
      }
      break
    case 'POST':
      try {
        // create a new model in the database
        const recipe = await Recipe.create(req.body)

        // add recipe to user profile
        const user = await User.findByIdAndUpdate(
          recipe.submittedBy,
          { $push: { recipes: recipe._id } },
          { safe: true, upsert: true, new: true },
        )

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
