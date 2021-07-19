import React from 'react'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import '../style.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>cookr recipe app</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
