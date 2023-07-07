import React from 'react'
import { useRouter } from 'next/router'
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

export default function PantryMeals({ keywords }: { keywords: string[] }) {
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
  >([
    {
      type: 'keywords',
      filter: { label: 'pantry', value: 'pantry' },
    },
    {
      type: 'recipeCategory',
      filter: { label: 'Main', value: 'main' },
    },
  ])
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
  }

  return (
    <Layout>
      <PageHeader
        title="Pantry Meals"
        center
        subtitle="Recipes that you may be able to make without going to the store. Made easier if you keep meat and diced onions in your freezer, and grow fresh herbs in your kitchen window."
      />
      <div className="mb-4 mt-4 flex-grow">
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
}

export const getServerSideProps = async () => {
  await dbConnect()
  const keywords = await Recipe.distinct('keywords', {
    keywords: { $regex: 'pantry', $options: 'i' },
  })
  const split = keywords.flatMap((v) => v.split(',').map((kw) => kw.trim()))
  const deduplicated = [...new Set(split)].sort().filter((v) => v)

  return { props: { keywords: deduplicated } }
}
