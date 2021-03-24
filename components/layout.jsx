import * as React from 'react';
import {Footer, NavBar} from './';

export function Layout(props) {
  return (
    <div id='site' className='min-h-screen flex flex-col justify-between'>
      <NavBar />
      <main className='w-full max-w-6xl mx-auto px-4 xs:px-8 lg:px-4 flex-grow'>
        {props.children}
      </main>
      <Footer />
    </div>
  );
}
