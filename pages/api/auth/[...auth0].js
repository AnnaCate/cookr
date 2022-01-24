import { handleAuth, handleCallback } from '@auth0/nextjs-auth0'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

const afterCallback = async (req, res, session, state) => {
  await dbConnect()

  try {
    const auth0User = session.user
    await User.create({
      avatar: auth0User.picture,
      email: auth0User.email,
      name: auth0User.name,
      sub: auth0User.sub,
    })
  } catch (error) {
    console.log(error)
  }
  return session
}

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback })
    } catch (error) {
      res.status(error.status || 400).end(error.message)
    }
  },
})
