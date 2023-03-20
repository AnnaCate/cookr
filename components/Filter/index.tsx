import React from 'react'
import { useRouter } from 'next/router'

import { FilterDropdown } from './Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faX } from '@fortawesome/free-solid-svg-icons'
import { Menu } from '@headlessui/react'

type Filter = {
  type: 'recipeCategory' | 'keywords' | 'suitableForDiet'
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
  const router = useRouter()

  const [open, setOpen] = React.useState({
    recipeCategory: false,
    keywords: false,
    suitableForDiet: false,
  })

  const [nums, setNums] = React.useState({
    recipeCategory: 0,
    keywords: 0,
    suitableForDiet: 0,
  })

  React.useEffect(() => {
    console.log('props.filter', props.filter)
    props.filter.forEach((f) => {
      setNums({
        ...nums,
        [f.type]: nums[f.type] + 1,
      })
    })
  }, [props.filter])

  const handleSelection = (
    criteria: 'recipeCategory' | 'keywords' | 'suitableForDiet',
    selection: { label: string; value: string },
  ) => {
    const didDeselect =
      props.filter.filter(
        (v) => v.type === criteria && v.filter.value === selection.value,
      ).length > 0
    const filterArray = [...props.filter]

    if (didDeselect) {
      removeQueryParam(criteria, selection.value)
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
      appendQueryParam(criteria, selection.value)

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

  const appendQueryParam = (key: string, val: string) => {
    const { query } = router

    let baseVal = ''

    if (`${key}` in query) {
      baseVal = query[key] + ',' + val
    } else baseVal = val

    router.push({
      pathname: router.pathname,
      query: { ...router.query, [key]: encodeURI(baseVal) },
    })
  }

  const removeQueryParam = (key: string, val: string) => {
    const { query } = router

    const baseVal = query[key]
    const splitVals = (baseVal as string).split(',')
    const newVals = splitVals.filter((v) => v !== val).join(',')
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [key]: encodeURI(newVals) },
    })
  }

  const handleOpenDropdown = (type: string) =>
    setOpen({ ...open, [type]: true })

  return (
    <>
      <div className="w-full sm:px-8 py-4 flex flex-row items-center justify-center border-b border-gray-200">
        <Menu as="div" className="relative">
          <Menu.Button
            className="flex flex-row items-center justify-center space-x-2 px-3 sm:px-6 border-r-2 border-gray-200"
            onClick={() => handleOpenDropdown('recipeCategory')}
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
          {open.recipeCategory && (
            <FilterDropdown
              handleSelection={handleSelection}
              filters={props.filter}
              options={CATEGORY_OPTIONS}
              type="recipeCategory"
            />
          )}
        </Menu>
        <Menu as="div" className="relative">
          <Menu.Button
            className="flex flex-row items-center justify-center space-x-2 px-3 sm:px-6 border-r-2 border-gray-200"
            onClick={() => handleOpenDropdown('suitableForDiet')}
          >
            <span className="text-base text-gray-500">Diet</span>
            {nums.suitableForDiet > 0 && (
              <span className="bg-gray-200 rounded-md px-2 text-base text-gray-500">
                {nums.suitableForDiet}
              </span>
            )}
            <FontAwesomeIcon
              className="text-gray-500 w-5 h-5"
              icon={faAngleDown}
            />
          </Menu.Button>
          {open.suitableForDiet && (
            <FilterDropdown
              handleSelection={handleSelection}
              filters={props.filter}
              options={SUITABLE_FOR_DIET}
              type="suitableForDiet"
            />
          )}
        </Menu>

        <Menu as="div" className="relative">
          <Menu.Button
            className="flex flex-row items-center justify-center space-x-2 px-3 sm:px-6"
            onClick={() => handleOpenDropdown('keywords')}
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
          {open.keywords && (
            <FilterDropdown
              handleSelection={handleSelection}
              filters={props.filter}
              options={props.keywords.map((kw) => ({ label: kw, value: kw }))}
              type="keywords"
            />
          )}
        </Menu>
      </div>
      {(nums.recipeCategory > 0 ||
        nums.keywords > 0 ||
        nums.suitableForDiet > 0) && (
        <div className="w-full sm:px-8 py-3 flex flex-row items-center justify-start bg-gray-100 overflow-x-scroll">
          <div className="border-r-2 border-gray-200 text-gray-500 pr-4 mr-4">
            Filters:
          </div>
          <div className="w-full flex space-x-3">
            {props.filter.map((v) => (
              <button
                key={v.filter.value}
                type="button"
                className="bg-white rounded-full px-3 py-1 sm:py-2 border border-gray-200 flex items-center whitespace-nowrap"
                onClick={() => {
                  handleSelection(v.type, v.filter)
                }}
              >
                {v.filter.label || v.filter.value}
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

const CATEGORY_OPTIONS = [
  {
    value: 'appetizer',
    label: 'Appetizer',
  },
  {
    value: 'beverage',
    label: 'Beverage',
  },
  {
    value: 'breakfast_brunch',
    label: 'Breakfast/Brunch',
  },
  {
    value: 'bread',
    label: 'Bread',
  },
  {
    value: 'dessert',
    label: 'Dessert',
  },
  {
    value: 'main',
    label: 'Main',
  },
  {
    value: 'side',
    label: 'Side',
  },
  {
    value: 'snack',
    label: 'Snack',
  },
  {
    value: 'other',
    label: 'Other',
  },
]

const SUITABLE_FOR_DIET = [
  { label: 'Dairy Free', value: 'dairy-free' },
  { label: 'Gluten Free', value: 'gluten-free' },
  { label: 'Low Carb', value: 'low-carb' },
  { label: 'Low Cholesterol', value: 'low-cholesterol' },
  { label: 'High Protein', value: 'high-protein' },
  {
    label: 'Paleo',
    value: 'paleo',
  },
  { label: 'Pescatarian', value: 'pescatarian' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Vegan', value: 'vegan' },
  {
    label: 'Whole30',
    value: 'whole30',
  },
]
