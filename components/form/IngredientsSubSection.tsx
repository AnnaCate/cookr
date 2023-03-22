import React from 'react'
import { Recipe } from '../../types'

export const IngredientsSubSection = ({
  handleChange,
  idx,
  state,
}: {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number,
  ) => void
  idx: number
  state: Recipe.Base
}) => (
  <>
    <p className="text-sm text-gray-500 font-semibold">Sub-Header:</p>
    {idx === 0 && (
      <p className="text-gray-500 italic text-sm">
        Use if you need to divide your ingredients into multiple sub-sections.
        Leave blank if you only need one list of ingredients.
      </p>
    )}
    <input
      className="c-input mb-1"
      type="text"
      name="header"
      onChange={(e) => handleChange(e, idx)}
      placeholder="Marinade"
      value={state.ingredients[idx].header}
    />
    <p className="text-sm text-gray-500 font-semibold">
      List of Ingredients:<span className="text-red-600 font-normal">*</span>
    </p>
    {idx === 0 && (
      <p className="text-gray-500 italic text-sm">
        Write each ingredient on a new line.
      </p>
    )}
    <textarea
      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 whitespace-pre-wrap"
      name="ingredients"
      value={state.ingredients[idx].ingredients}
      rows={5}
      onChange={(e) => handleChange(e, idx)}
      placeholder={`1/2 bunch fresh parsley chopped\n1 Tbsp fresh squeezed lemon juice`}
    />
  </>
)
