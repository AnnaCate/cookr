import React from 'react'
import { useRouter } from 'next/router'
import { default as RecipeModel } from '../models/Recipe'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Layout, Page, PageHeader, Pagination, Search } from '../components'

export default function Me({ mongoUser }: { mongoUser: string | null }) {
  const router = useRouter()
  const { query } = router
  const { page = 1 } = query
  const parsedPage = parseInt(page as string)

  const [currPage, setCurrPage] = React.useState(parsedPage)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [totalNum, setTotalNum] = React.useState(0)

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
    handlePaginate(1)
  }, [totalNum])

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
          <Page currPage={currPage} opts={opts} setTotalNum={setTotalNum} />
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
      const res = await fetch(
        `${process.env.VERCEL_URL}/api/users/${session.user.sub}`,
      )
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const { data: user } = await res.json()
      return { props: { mongoUser: user._id } }
    }
    return { props: { mongoUser: null } }
  },
})
