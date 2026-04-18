import React from 'react'
import { useRouter } from 'next/router'

import {
  Filter,
  Layout,
  Page,
  PageHeader,
  Pagination,
  Search,
} from '../components'

export default function ToddlerFood({ keywords }: { keywords: string[] }) {
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
    toddlerFood: true,
  }

  return (
    <Layout>
      <PageHeader title="Toddler Food" center />
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
  return { props: { keywords: [] } }
}
