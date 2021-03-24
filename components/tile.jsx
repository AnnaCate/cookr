import React from 'react';

export function Tile({img, difficulty, meal, title, user}) {
  return (
    <div className='w-full max-w-sm overflow-hidden rounded border bg-white shadow m-4'>
      <div className='relative'>
        <div
          className='h-48 bg-cover bg-no-repeat bg-center'
          style={{
            backgroundImage: `url(${img})`,
          }}
        />

        <div className='absolute bottom-0 mb-2 ml-3 px-2 py-1 rounded text-sm text-white'>
          {difficulty}
        </div>
      </div>
      <div className='p-3'>
        <h3 className='mr-10 text-sm truncate-2nd'>
          <a className='hover:text-blue-500' href='#'>
            {title}
          </a>
        </h3>
        <div className='flex items-start justify-between'>
          <p className='text-xs text-gray-500'>{meal}</p>
          <button
            className='outline text-xs text-gray-500 hover:text-blue-500'
            title='Bookmark this ad'>
            <i className='far fa-bookmark'></i>
          </button>
        </div>
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
