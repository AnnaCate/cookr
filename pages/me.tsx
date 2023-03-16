import React from 'react'
import { useRouter } from 'next/router'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import dbConnect from '../utils/dbConnect'
import Recipe from '../models/Recipe'

import {
  Filter,
  Layout,
  Page,
  PageHeader,
  Pagination,
  Search,
} from '../components'

export default function Me({
  keywords,
  mongoUser,
}: {
  keywords: string[]
  mongoUser: string | null
}) {
  const router = useRouter()
  const { query } = router
  const { page = 1 } = query
  const parsedPage = parseInt(page as string)

  const [currPage, setCurrPage] = React.useState(parsedPage)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [filter, setFilter] = React.useState<
    {
      type: 'recipeCategory' | 'keywords' | 'suitableForDiet'
      filter: { label: string; value: string }
    }[]
  >([])
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
    filter,
    searchQuery,
    userId: mongoUser,
  }

  if (!mongoUser) return <div>Loading...</div>

  return (
    mongoUser && (
      <Layout>
        <PageHeader title="My Recipes" center />
        <div className={`mb-4 mt-4 flex-grow`}>
          <Search setSearchQuery={setSearchQuery} />
          <div className="my-4">
            <Filter filter={filter} setFilter={setFilter} keywords={keywords} />
          </div>
          <Page currPage={currPage} opts={opts} setTotalNum={setTotalNum} />
          <div style={{ display: 'none' }}>
            <Page currPage={currPage + 1} opts={opts} />
          </div>
        </div>
        <Pagination
          currPage={currPage}
          handlePaginate={handlePaginate}
          numPages={Math.ceil(totalNum / 10)}
        />
      </Layout>
    )
  )
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/me',
  async getServerSideProps({ req, res }) {
    const session = getSession(req, res)
    if (session) {
      const result = await fetch(
        `${process.env.VERCEL_URL}/api/users/${session.user.sub}`,
      )
      if (!result.ok) {
        const { statusText } = result
        throw new Error(statusText)
      }
      const { data: user } = await result.json()

      await dbConnect()
      const { _id } = user
      const keywords = await Recipe.distinct('keywords', {
        submittedBy: _id,
      })
      const split = keywords.flatMap((v) => v.split(',').map((kw) => kw.trim()))
      const deduplicated = [...new Set(split)].sort().filter((v) => v)

      return { props: { keywords: deduplicated, mongoUser: user._id } }
    }
    return { props: { keywords: [], mongoUser: null } }
  },
})
