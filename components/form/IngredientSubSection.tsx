import React from 'react'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import { Recipe } from '../../types'

const theme = 'snow'
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['link'],
  ],
}

const placeholder = `1/2 bunch fresh parsley chopped\n1 Tbsp fresh squeezed lemon juice`

const formats = ['bold', 'italic', 'underline', 'link']

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
}) => {
  const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder })

  React.useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(
        `<p style="white-space: pre-line">${state.ingredients[idx].ingredients}</>`,
      )
      quill.on('text-change', () => {
        console.log(quill.getContents()) // Get delta contents
        console.log(quill.root.innerHTML) // Get innerHTML using quill
        console.log(quillRef.current.firstChild.innerHTML) // Get innerHTML using quillRef
        const e = { target: { name: 'ingredients', value: quill.getText() } }
        handleChange(
          e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          idx,
        )
      })
    }
  }, [quill])

  return (
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
      <div
        id="quill-wrapper"
        className="w-full mb-2 min-h-48 border border-gray-300 rounded-b-md focus:outline-none  whitespace-pre-wrap placeholder-gray-50"
        ref={quillRef}
      />
    </>
  )
}
