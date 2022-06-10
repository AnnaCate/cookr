import type { AppProps } from 'next/app'
import React from 'react'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0'
import '../style.css'

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = pageProps
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>cookr</title>
      </Head>
      <UserProvider user={user}>
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}

export default MyApp
