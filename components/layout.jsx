import * as React from 'react'
import { Footer, NavBar } from './'

export function Layout(props) {
  return (
    <div
      id="site"
      className="min-h-screen flex flex-col justify-between bg-gray-50"
    >
      <NavBar />
      <main className="w-full max-w-8xl mx-auto px-4 xs:px-8 md:px-12 py-4 sm:py-8 flex-grow">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}
