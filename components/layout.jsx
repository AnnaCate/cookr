import * as React from 'react'
import { Footer, NavBar } from './'

export function Layout(props) {
  return (
    <div
      id="site"
      className="min-h-screen flex flex-col justify-between bg-gray-50"
    >
      <NavBar />
      <main className="flex flex-col max-w-8xl xs:mx-auto px-4 xs:px-8 md:px-12 pt-4 sm:pt-8 pb-16 flex-grow w-full">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}
