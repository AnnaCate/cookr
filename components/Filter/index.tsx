import React from 'react'
import { CategoryDropdown } from './CategoryDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faX } from '@fortawesome/free-solid-svg-icons'
import { Menu } from '@headlessui/react'

type Props = {
  filter: {
    type: 'recipeCategory' | 'keywords'
    filter: {
      label: string
      value: string
    }
  }[]
  setFilter: React.Dispatch<
    React.SetStateAction<
      {
        type: 'recipeCategory' | 'keywords'
        filter: {
          label: string
          value: string
        }
      }[]
    >
  >
}

/**
 * @todo
 * add support for removing a category from the filter selections
 */

export const Filter = (props: Props) => {
  const [openCategory, setOpenCategory] = React.useState(false)

  const [nums, setNums] = React.useState({
    recipeCategory: 0,
    keywords: 0,
    submittedBy: 0,
  })

  const handleSelection = (
    criteria: 'recipeCategory' | 'keywords',
    selection: { label: string; value: string },
  ) => {
    setNums({
      ...nums,
      [criteria]: nums[criteria] + 1,
    })
    const filterArray = [...props.filter]
    filterArray.push({
      type: criteria,
      filter: selection,
    })
    props.setFilter(filterArray)
  }

  const handleSelectCategory = () => {
    setOpenCategory(true)
  }

  /**
   * @todo
   * get all unique values for keywords: `db.collection.distinct('x')`
   */

  return (
    <>
      <Menu
        as="div"
        className="w-full sm:px-8 py-4 flex flex-row items-center justify-center border-b border-gray-200"
      >
        <div className="relative">
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
        </div>
        {/* <button
          id="keywords"
          type="button"
          className="flex flex-row items-center justify-center space-x-2 px-3 sm:px-6 border-r-2 border-gray-200"
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
        </button> */}
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
      </Menu>
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
                type="button"
                className="bg-white rounded-full px-3 py-2 border border-gray-200 flex items-center"
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
