import { handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

const afterCallback = async (req, res, session, state) => {
  await dbConnect()

  try {
    const { user } = session
    const result = await User.create({
      avatar: user.picture,
      email: user.email,
      name: user.name,
      sub: user.sub,
    })
  } catch (error) {
    console.log(error)
  }
  return session
}

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, {
        afterCallback,
        redirectUri: `${process.env.AUTH0_BASE_URL}`,
      })
    } catch (error) {
      res.status(error.status || 400).end(error.message)
    }
  },
  async login(req, res) {
    try {
      await handleLogin(req, res, { returnTo: `${process.env.AUTH0_BASE_URL}` })
    } catch (error) {
      res.status(error.status || 500).end(error.message)
    }
  },
})
