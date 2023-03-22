import React from 'react'
import { useRouter } from 'next/router'
import dbConnect from '../utils/dbConnect'
import Recipe from '../models/Recipe'

import { Filter, Layout, Page, Pagination, Search } from '../components'

type Props = {
  keywords: string[]
}

export default function Index(props: Props) {
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
  const handlePaginate = (newPage: number) => {
    appendQueryParam('page', newPage.toString())
    setCurrPage(newPage)
  }

  React.useEffect(() => {
    appendQueryParam('page', currPage.toString())
  }, [])

  React.useEffect(() => {
    if (searchQuery) handlePaginate(1)
  }, [searchQuery])

  React.useEffect(() => {
    if (page !== currPage.toString()) {
      setCurrPage(parsedPage)
    }
  }, [page])

  const opts = {
    searchQuery,
    filter,
  }

  return (
    <Layout>
      <div className={`mb-4 flex-grow`}>
        <Search setSearchQuery={setSearchQuery} />
        <div className="my-4">
          <Filter
            filter={filter}
            setFilter={setFilter}
            keywords={props.keywords}
          />
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

export async function getStaticProps() {
  await dbConnect()

  const keywords = await Recipe.distinct('keywords')
  const split = keywords.flatMap((v) =>
    v.split(',').map((kw: string) => kw.trim()),
  )
  const deduplicated = [...new Set(split)].sort().filter((v) => v)
  return {
    props: { keywords: deduplicated },
    revalidate: 60 * 5,
  }
}
