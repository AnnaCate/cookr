import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  filters: {
    type: 'recipeCategory' | 'keywords'
    filter: {
      label: string
      value: string
    }
  }[]
  keywords: string[]
  handleSelection: (
    criteria: string,
    selection: {
      label: string
      value: string
    },
  ) => void
}
export function KeywordDropdown(props: Props) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-36 max-h-96 overflow-y-scroll origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {props.keywords.map((kw) => {
            const isSelected =
              props.filters.filter(
                (v) => v.type === 'keywords' && v.filter.value === kw,
              ).length > 0
            return (
              <Menu.Item key={kw}>
                {({ active }) => (
                  <button
                    className={classNames(
                      active
                        ? 'bg-gray-200 text-gray-900'
                        : isSelected
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700',
                      'block px-4 py-2 text-sm w-full text-left my-1',
                    )}
                    type="button"
                    onClick={() =>
                      props.handleSelection('keywords', {
                        label: kw,
                        value: kw,
                      })
                    }
                  >
                    {kw}
                  </button>
                )}
              </Menu.Item>
            )
          })}
        </div>
      </Menu.Items>
    </Transition>
  )
}
