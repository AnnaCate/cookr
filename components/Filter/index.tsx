import React from 'react'
import { CategoryDropdown } from './CategoryDropdown'
import { KeywordDropdown } from './KeywordDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faX } from '@fortawesome/free-solid-svg-icons'
import { Menu } from '@headlessui/react'

type Filter = {
  type: 'recipeCategory' | 'keywords'
  filter: {
    label: string
    value: string
  }
}

type Props = {
  filter: Filter[]
  keywords: string[]
  setFilter: React.Dispatch<React.SetStateAction<Filter[]>>
}

export const Filter = (props: Props) => {
  const [openCategory, setOpenCategory] = React.useState(false)
  const [openKeywords, setOpenKeywords] = React.useState(false)

  const [nums, setNums] = React.useState({
    recipeCategory: 0,
    keywords: 0,
    submittedBy: 0,
  })

  const handleSelection = (
    criteria: 'recipeCategory' | 'keywords',
    selection: { label: string; value: string },
  ) => {
    const didDeselect =
      props.filter.filter(
        (v) => v.type === criteria && v.filter.value === selection.value,
      ).length > 0
    const filterArray = [...props.filter]

    if (didDeselect) {
      setNums({
        ...nums,
        [criteria]: nums[criteria] - 1,
      })
      const newArray = filterArray.filter(
        (v) =>
          (v.type === criteria && v.filter.value !== selection.value) ||
          v.type !== criteria,
      )
      props.setFilter(newArray)
    } else {
      setNums({
        ...nums,
        [criteria]: nums[criteria] + 1,
      })
      filterArray.push({
        type: criteria,
        filter: selection,
      })
      props.setFilter(filterArray)
    }
  }

  const handleSelectCategory = () => {
    setOpenCategory(true)
  }

  const handleSelectKeyword = () => {
    setOpenKeywords(true)
  }

  return (
    <>
      <div className="w-full sm:px-8 py-4 flex flex-row items-center justify-center border-b border-gray-200">
        <Menu as="div" className="relative">
          <Menu.Button
            className="flex flex-row items-center justify-center space-x-2 px-3 sm:px-6 border-r-2 border-gray-200"
            onClick={handleSelectCategory}
          >
            <span className="text-base text-gray-500">Category</span>
            {nums.recipeCategory > 0 && (
              <span className="bg-gray-200 rounded-md px-2 text-base text-gray-500">
                {nums.recipeCategory}
              </span>
            )}
            <FontAwesomeIcon
              className="text-gray-500 w-5 h-5"
              icon={faAngleDown}
            />
          </Menu.Button>
          {openCategory && (
            <CategoryDropdown
              handleSelection={handleSelection}
              filters={props.filter}
            />
          )}
        </Menu>
        <Menu as="div" className="relative">
          <Menu.Button
            className="flex flex-row items-center justify-center space-x-2 px-3 sm:px-6"
            onClick={handleSelectKeyword}
          >
            <span className="text-base text-gray-500">Keywords</span>
            {nums.keywords > 0 && (
              <span className="bg-gray-200 rounded-md px-2 text-base text-gray-500">
                {nums.keywords}
              </span>
            )}
            <FontAwesomeIcon
              className="text-gray-500 w-5 h-5"
              icon={faAngleDown}
            />
          </Menu.Button>
          {openKeywords && (
            <KeywordDropdown
              handleSelection={handleSelection}
              filters={props.filter}
              keywords={props.keywords}
            />
          )}
        </Menu>
        {/* <button
          id="keywords"
          type="button"
          className="flex flex-row items-center justify-center space-x-2 px-3 sm:px-6"
        >
          <span className="text-base text-gray-500">Submitted By</span>
          {nums.submittedBy > 0 && (
            <span className="bg-gray-200 rounded-md px-2 text-base text-gray-500">
              {nums.submittedBy}
            </span>
          )}
          <FontAwesomeIcon
            className="text-gray-500 w-5 h-5"
            icon={faAngleDown}
          />
        </button> */}
        {/* <Criteria
        label="Category"
        options={CATEGORY_OPTIONS}
        onSelect={(selection: { label: string; value: string }) =>
          handleSelection('category', selection)
        }
      /> */}
      </div>
      {(nums.recipeCategory > 0 ||
        nums.keywords > 0 ||
        nums.submittedBy > 0) && (
        <div className="w-full sm:px-8 py-3 flex flex-row items-center justify-start bg-gray-100 overflow-x-scroll">
          <div className="border-r-2 border-gray-200 text-gray-500 pr-4 mr-4">
            Filters:
          </div>
          <div className="w-full flex space-x-3">
            {props.filter.map((v) => (
              <button
                key={v.filter.value}
                type="button"
                className="bg-white rounded-full px-3 py-2 border border-gray-200 flex items-center"
                onClick={() => {
                  handleSelection(v.type, v.filter)
                }}
              >
                {v.filter.label}
                <FontAwesomeIcon
                  className="text-gray-400 w-3 h-3 ml-2"
                  icon={faX}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
