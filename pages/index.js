import Link from 'next/link'
import dbConnect from '../utils/dbConnect'
import Recipe from '../models/Recipe'
import { Layout, PageHeader, Tile } from '../components'

const Index = ({ recipes }) => (
  <Layout>
    <PageHeader title="cookr" subtitle="keep your recipes organized" />
    <div className="flex flex-row flex-wrap justify-center align-start w-full">
      {recipes.map((recipe) => (
        <Link href="/[id]" as={`/${recipe._id}`}>
          <a className="pr-4 w-1/2 md:w-full max-w-xs">
            <Tile
              key={recipe._id}
              img={recipe.image}
              title={recipe.name}
              user={'Anna'}
            />
          </a>
        </Link>
      ))}
    </div>
  </Layout>
)

export async function getServerSideProps() {
  await dbConnect()

  const result = await Recipe.find({})
  const recipes = result.map((doc) => {
    const recipe = doc.toObject()
    recipe._id = recipe._id.toString()
    return recipe
  })

  return { props: { recipes } }
}

export default Index
