import * as React from 'react'
import Link from 'next/link'
import { FaRegPlusSquare } from 'react-icons/fa'
import { useUser } from '@auth0/nextjs-auth0'
import { UserDropdown } from './UserMenu'

export function NavBar() {
  const { user } = useUser()
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)

  return (
    <nav
      className="bg-white flex flex-grow-0 items-stretch flex-shrink-0 shadow relative z-30 py-2 px-4 sm:px-8"
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
          {/* <a className="text-gray-700 no-underline">Home</a> */}
          <a className="font-sacramento w-full text-6xl -mb-2">cookr</a>
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
              <div className="relative">
                <img
                  className="rounded-full h-10 w-10 cursor-pointer"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  src={user.picture}
                />
                {userMenuOpen && <UserDropdown user={user} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
