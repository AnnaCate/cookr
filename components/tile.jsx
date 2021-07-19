import React from 'react';

export function Tile({img, difficulty, meal, title, user}) {
  return (
    <div className='w-full h-72 overflow-hidden rounded border bg-white shadow m-1 md:m-4 transform transition duration-300 hover:shadow-md hover:scale-105'>
      <div className='relative'>
        <div
          className='h-48 w-full bg-cover bg-no-repeat bg-center'
          style={{
            backgroundImage: `url(${img})`,
          }}
        />
      </div>
      <div className='p-3'>
        <h3 className='text-sm truncate-2nd'>
          <a className='hover:text-blue-500' href='#'>
            {title}
          </a>
        </h3>
        <p className='text-xs text-gray-500'>
          Submitted by:{' '}
          <a href='#' className='hover:underline hover:text-blue-500'>
            {user.name}
          </a>
        </p>
      </div>
    </div>
  );
}
