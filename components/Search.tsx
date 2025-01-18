import React from 'react'
 import { Switch } from '@headlessui/react'

export const Search = (props: {
  shuffle: boolean
  setShuffle: React.Dispatch<React.SetStateAction<boolean>>
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
      <Switch
        checked={props.shuffle}
        onChange={() => props.setShuffle(!props.shuffle)}
        className={`${
          props.shuffle ? 'bg-indigo-600' : 'bg-gray-200'
        } mx-2 relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span
          className={`${
            props.shuffle ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <p className="text-indigo-600 font-medium">Shuffle</p>
    </form>
  )
}
