import React from 'react';

export function PageHeader(props) {
  return (
    <header className='w-full mb-4'>
      <h1 className='text-5xl'>{props.title}</h1>
      <h2 className='text-xl'>{props.subtitle}</h2>
    </header>
  );
}
