import React from 'react'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import '../style.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>cookr</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
