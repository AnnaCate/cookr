import React from 'react'

export const Search = (props: {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [value, setValue] = React.useState('')
  const handleSearch = () => {
    props.setSearchQuery(value)
  }

  return (
    <form
      id="search-container"
      className="w-full mt-4 sm:mt-0 mb-4 mx-auto flex items-center justify-center"
      onSubmit={(e) => {
        e.preventDefault()
        handleSearch()
      }}
    >
      <input
        className="c-input max-w-xs"
        placeholder="Type a search term"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="ml-2 w-fit px-8 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg focus:bg-indigo-600 focus:outline-none"
        type="submit"
      >
        Search
      </button>
    </form>
  )
}
