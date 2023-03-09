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

export default function Index() {
  const router = useRouter()
  const { query } = router
  const { page = 1 } = query
  const parsedPage = parseInt(page as string)

  const [currPage, setCurrPage] = React.useState(parsedPage)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [filter, setFilter] = React.useState<
    {
      type: 'recipeCategory' | 'keywords'
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
      <PageHeader title="cookr" subtitle="keep your recipes organized." />
      <div className={`mb-4 mt-4 flex-grow`}>
        <Search setSearchQuery={setSearchQuery} />
        <div className="my-4">
          <Filter filter={filter} setFilter={setFilter} />
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
