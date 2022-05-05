import * as React from 'react'
import Link from 'next/link'
import { FaRegPlusSquare } from 'react-icons/fa'
import { useUser } from '@auth0/nextjs-auth0'

export function NavBar(props) {
  const { user } = useUser()

  return (
    <nav
      className="bg-white flex flex-grow-0 items-stretch flex-shrink-0 shadow relative z-30 py-4 px-4 sm:px-8"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="flex justify-center items-center">
        <Link
          href={{
            pathname: '/',
            query: { page: '1' },
          }}
        >
          <a className="text-gray-700 no-underline">Home</a>
        </Link>
      </div>

      <div className="justify-end ml-auto items-stretch flex">
        <div className="items-center flex flex-grow-0 flex-shrink-0 text-gray-700">
          <div className="items-center flex justify-start">
            {user && (
              <Link href="/new">
                <a>
                  <FaRegPlusSquare
                    title="Add new recipe"
                    className="h-8 w-8 mr-4"
                  />
                </a>
              </Link>
            )}
            {/* {!user && (
              <a
                href="/api/auth/login"
                className="mr-2 bg-blue-500 font-semibold text-white rounded-lg border cursor-pointer justify-center px-4 py-3 text-center"
              >
                Sign Up
              </a>
            )} */}
            {!user && (
              <a
                className="bg-gray-200 text-gray-700 rounded-lg border cursor-pointer justify-center px-4 py-3 text-center"
                href="/api/auth/login"
              >
                Log in
              </a>
            )}
            {user && (
              <a
                className="bg-gray-200 text-gray-700 rounded-lg border cursor-pointer justify-center px-4 py-3 text-center"
                href="/api/auth/logout"
              >
                Log out
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
