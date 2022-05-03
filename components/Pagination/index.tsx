import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export function Pagination({
  handlePaginate,
  numPages,
}: {
  handlePaginate: (page: number) => void
  numPages: number
}) {
  const [currPage, setCurrPage] = React.useState(1)

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
            setCurrPage(num)
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
    setCurrPage(currPage - 1)
    handlePaginate(currPage - 1)
  }

  const handleNext = () => {
    setCurrPage(currPage + 1)
    handlePaginate(currPage + 1)
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0"
    >
      <div
        className={`-mt-px w-0 flex-1 flex ${
          currPage === 1 ? 'invisible' : ''
        }`}
      >
        <a
          className="pt-4 pr-1 border-t-2 border-transparent hover:border-gray-300 flex cursor-pointer"
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
      <ul className="hidden md:-mt-px md:flex">
        {[1, 2, 3].map((num) => (
          <PageNum num={num} />
        ))}
        <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
          ...
        </span>
        {[8, 9, 10].map((num) => (
          <PageNum num={num} />
        ))}
      </ul>
      <div
        className={`-mt-px w-0 flex-1 flex justify-end ${
          currPage === numPages ? 'invisible' : ''
        }`}
      >
        <a
          className="pt-4 pl-1 border-t-2 border-transparent hover:border-gray-300 flex cursor-pointer"
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
    </nav>
  )
}
