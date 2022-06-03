import React from 'react'
import { useRouter } from 'next/router'
import dbConnect from '../utils/dbConnect'
import { default as RecipeModel } from '../models/Recipe'
import { Layout, Page, PageHeader, Pagination, Search } from '../components'

export default function Index({ totalNum }: { totalNum: number }) {
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
  }

  return (
    <Layout>
      <PageHeader title="cookr" subtitle="keep your recipes organized." />
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
}

export async function getServerSideProps(): Promise<{
  props: {
    totalNum: number
  }
}> {
  await dbConnect()

  const totalNum = await RecipeModel.countDocuments().exec()
  return { props: { totalNum } }
}
