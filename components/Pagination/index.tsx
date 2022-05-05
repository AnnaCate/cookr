import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export function Pagination({
  currPage,
  handlePaginate,
  numPages,
}: {
  currPage: number
  handlePaginate: (page: number) => void
  numPages: number
}) {
  const PageNum = ({ num }: { num: number }) => {
    const isCurrent = num === currPage

    return (
      <li
        className={`${
          isCurrent
            ? 'border-indigo-500 text-indigo-600 '
            : 'border-transparent text-gray-500'
        }   hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium cursor-pointer`}
      >
        <a
          onClick={() => {
            handlePaginate(num)
          }}
          aria-current={isCurrent}
          aria-label={
            isCurrent ? `Current Page, Page ${num}` : `Go to page ${num}`
          }
        >
          {num}
        </a>
      </li>
    )
  }

  const handlePrevious = () => {
    handlePaginate(currPage - 1)
  }

  const handleNext = () => {
    handlePaginate(currPage + 1)
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className="border-t border-gray-200 xs:px-4 sm:px-0 w-full"
    >
      <div className="flex flex-col justify-center items-center sm:flex-row w-full">
        <ul className="flex -mt-px sm:hidden">
          {Array.from({ length: numPages }, (_, i) => i + 1).map((num) => (
            <PageNum key={num} num={num} />
          ))}
          {/* <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
          ...
        </span> */}
        </ul>

        <div className="flex flex-grow-0 items-center justify-between w-full">
          <div
            className={`-mt-px flex-1 flex ${
              currPage === 1 ? 'invisible' : ''
            }`}
          >
            <a
              className="pt-4 pr-1 xs:border-t-2 border-transparent xs:hover:border-gray-300 flex cursor-pointer"
              onClick={handlePrevious}
            >
              <FontAwesomeIcon
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
                icon={faArrowLeft}
              />
              <p className="text-sm font-medium text-gray-500 hover:text-gray-700 ">
                Previous
              </p>
            </a>
          </div>
          <ul className="hidden sm:-mt-px sm:flex">
            {Array.from({ length: numPages }, (_, i) => i + 1).map((num) => (
              <PageNum key={num} num={num} />
            ))}
            {/* <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
          ...
        </span> */}
          </ul>
          <div
            className={`-mt-px flex-1 flex justify-end ${
              currPage === numPages ? 'invisible' : ''
            }`}
          >
            <a
              className="pt-4 pl-1 xs:border-t-2 border-transparent xs:hover:border-gray-300 flex cursor-pointer"
              onClick={handleNext}
            >
              <p className="text-sm font-medium text-gray-500 hover:text-gray-700 ">
                Next
              </p>
              <FontAwesomeIcon
                className="ml-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
                icon={faArrowRight}
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
