import React from 'react'

export function UserDropdown(user: any) {
  return (
    <nav className="absolute bg-gray-50 w-36 right-0 shadow rounded-sm py-4">
      <ul className="w-full">
        <li className="w-full text-right cursor-pointer hover:bg-gray-200 text-gray-700 p-4">
          <a
            className="w-full text-right cursor-pointer hover:bg-gray-200 text-gray-700 p-4 whitespace-nowrap"
            href="/me"
          >
            My Recipes
          </a>
        </li>
        <li className="w-full text-right cursor-pointer hover:bg-gray-200 text-gray-700 p-4">
          <a
            className="w-full text-right cursor-pointer hover:bg-gray-200 text-gray-700 p-4"
            href="/api/auth/logout"
          >
            Log out
          </a>
        </li>
      </ul>
    </nav>
  )
}
