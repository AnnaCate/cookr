import React, { useState } from 'react'
import { ClickawayListener, ErrorMessage } from '..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

export interface DropdownOption {
  label: string
  value: string | number
}

export interface DropdownProps {
  error?: boolean
  errorMsg?: string
  id?: string
  name: string
  options: DropdownOption[]
  onChange: (selectedVal: DropdownOption) => void
  placeholder?: string
  value: DropdownOption
}

export const Dropdown = (props: DropdownProps) => {
  const {
    error,
    errorMsg = 'Please select one',
    id,
    name,
    options,
    onChange,
    placeholder = 'Select One',
    value,
  } = props

  const [open, setOpen] = useState(false)

  const handleSelection = (val: DropdownOption) => {
    setOpen(false)
    onChange(val)
  }

  return (
    <ClickawayListener setState={setOpen}>
      <div
        className={`w-full bg-white ${
          !open ? 'rounded-md mb-6' : 'rounded-t-md mb-6.5 rounded-b-none'
        } 
      `}
        id={id}
        onClick={() => setOpen(!open)}
      >
        <button
          aria-expanded={open}
          aria-haspopup="true"
          className={`rounded-md relative z-10 flex h-full w-full items-center border border-solid bg-white 
      px-3 py-2  ${!error ? 'border-gray-300 ' : 'border-red-500'} ${
            !open ? 'rounded-b-md' : 'rounded-b-none border-b-transparent'
          }`}
          id={`${id}-options-menu`}
          onClick={() => setOpen(!open)}
          type="button"
          name={name}
          tabIndex={0}
        >
          <div className="flex w-full items-center justify-between">
            <span
              className={`truncate-width ml-0 truncate capitalize ${
                !value.value && 'text-gray-300'
              }`}
            >
              {value.label || value.value || placeholder}
            </span>
            {open ? (
              <FontAwesomeIcon
                className="pr-1"
                icon={faAngleUp}
                style={{ width: '20px', height: '20px' }}
              />
            ) : (
              <FontAwesomeIcon
                className="pr-1"
                icon={faAngleDown}
                style={{ width: '20px', height: '20px' }}
              />
            )}
          </div>
        </button>
        <div
          className={`relative z-10 -mt-0.5 bg-transparent
                  ${!open ? 'hidden' : 'flex'}`}
        >
          <div
            id="dropdown-menu"
            className={`rounded-b-md absolute z-0
                  w-full overflow-y-scroll border border-t-0 border-solid bg-white ${
                    !error ? 'border-gray-300 ' : 'border-red-500'
                  }`}
          >
            <ul
              aria-orientation="vertical"
              aria-labelledby={`${id}-options-menu`}
              className="w-full py-2"
              role="menu"
            >
              {options.map((item) => (
                <li key={item.value} role="menuitem">
                  <button
                    className={`w-full px-3 py-2
                   text-left text-base font-normal capitalize bg-white
                   
                   `}
                    onClick={() => handleSelection(item)}
                    type="button"
                  >
                    {item.label || item.value}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {error && <ErrorMessage message={errorMsg} />}
    </ClickawayListener>
  )
}
