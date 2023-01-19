import React from 'react'
import { useRouter } from 'next/router'
import { Layout, Page, PageHeader, Pagination, Search } from '../components'

export default function Index() {
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
  }

  return (
    <Layout>
      <PageHeader title="cookr" subtitle="keep your recipes organized." />
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
}
