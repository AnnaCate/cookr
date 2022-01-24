import * as React from 'react';
import Link from 'next/link'
import { FaRegPlusSquare } from 'react-icons/fa'
import { useUser } from '@auth0/nextjs-auth0'

export function NavBar(props) {
  const { user } = useUser()
  
  return (
    <nav
      className='bg-white relative z-30'
      role='navigation'
      aria-label='main navigation'>
      <div
        id='navbar'
        className='bg-white shadow py-2 pl-4 flex items-stretch flex-grow flex-shrink-0'>
        <div className='justify-start mr-auto items-stretch flex'>
        <Link href="/">
<a className='cursor-pointer items-center flex flex-grow-0 flex-shrink-0 text-gray-700 py-2 px-4 relative no-underline'>
            Home
          </a>
          </Link>
        </div>

        <div className='justify-end ml-auto items-stretch flex'>
          <div className='items-center flex flex-grow-0 flex-shrink-0 text-gray-700 py-2 px-3'>
            <div className='-mb-2 items-center flex flex-wrap justify-start'>
              {user && (<Link href="/new">
              <a><FaRegPlusSquare className="h-8 w-8" /></a>
              </Link>)}
              {!user && (
              <a href="/api/auth/login" className='mr-2 mb-2 bg-blue-500 text-white rounded-lg border cursor-pointer justify-center px-4 py-3 text-center'>
                <strong>Sign up</strong>
              </a>
              )}
              {!user && (<a className='mr-2 mb-2 bg-gray-200 text-gray-700 rounded-lg border cursor-pointer justify-center px-4 py-3 text-center'
              href="/api/auth/login">
                Log in
              </a>)}
              {user && <a className='mr-2 mb-2 bg-gray-200 text-gray-700 rounded-lg border cursor-pointer justify-center px-4 py-3 text-center'
              href="/api/auth/logout">
                Log out
              </a>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}