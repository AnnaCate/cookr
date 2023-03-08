import React from 'react'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { UserProvider } from '@auth0/nextjs-auth0'
import '../style.css'

function MyApp({ Component, pageProps }) {
  const { user } = pageProps
  return (
    <>
      <NextSeo
        title="cookr"
        description="keep your recipes organized"
        openGraph={{
          title: 'cookr',
          description: 'keep your recipes organized',
          siteName: 'cookr',
        }}
      />
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <UserProvider user={user}>
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}

export default MyApp
