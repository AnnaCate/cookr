import React from 'react'
import { useRouter } from 'next/router'
import dbConnect from '../utils/dbConnect'
import { default as RecipeModel } from '../models/Recipe'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Layout, Page, PageHeader, Pagination, Search } from '../components'

export default function Me({
  mongoUser,
  totalNum,
}: {
  mongoUser: string | null
  totalNum: number
}) {
  const router = useRouter()
  const { query } = router
  const { page = 1 } = query
  const parsedPage = parseInt(page as string)

  const [currPage, setCurrPage] = React.useState(parsedPage)
  const [searchQuery, setSearchQuery] = React.useState('')

  // Pagination
  const appendQueryParam = (key: string, value: string) => {
    router.push({
      pathname: router.pathname,
      query: { [key]: encodeURI(value) },
    })
  }
  const handlePaginate = async (newPage: number) => {
    appendQueryParam('page', newPage.toString())
    setCurrPage(newPage)
  }

  React.useEffect(() => {
    appendQueryParam('page', currPage.toString())
  }, [])

  React.useEffect(() => {
    if (page !== currPage.toString()) {
      setCurrPage(parsedPage)
    }
  }, [page])

  const opts = {
    searchQuery,
    userId: mongoUser,
  }

  if (!mongoUser) return <div>Loading...</div>

  return (
    mongoUser && (
      <Layout>
        <PageHeader title="My Recipes" />
        <div className={`mb-4 mt-4 flex-grow`}>
          <Search setSearchQuery={setSearchQuery} />
          <Page currPage={currPage} opts={opts} />
          <div style={{ display: 'none' }}>
            <Page currPage={currPage + 1} opts={opts} />
          </div>
        </div>
        <Pagination
          currPage={currPage}
          handlePaginate={handlePaginate}
          numPages={Math.ceil(totalNum / 8)}
        />
      </Layout>
    )
  )
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/me',
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res)
    if (session) {
      await dbConnect()
      const totalNum = await RecipeModel.countDocuments().exec()

      const res = await fetch(
        `${process.env.VERCEL_URL}/api/users/${session.user.sub}`,
      )
      if (!res.ok) throw new Error(res.statusText)
      const { data: user } = await res.json()

      return { props: { totalNum, mongoUser: user._id } }
    }
    return { props: { mongoUser: null, totalNum: 0 } }
  },
})
