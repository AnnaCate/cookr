import { handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

const afterCallback = async (req, res, session, state) => {
  const { user: auth0User } = session
  try {
    // connect to MongoDB
    await dbConnect()
    // see if user already exists in database
    User.findOne({ sub: auth0User.sub }, (err, mongoUser) => {
      if (err) {
        console.log(err)
      } else if (!mongoUser) {
        // if not, create new user in database
        console.log('Creating new user')
        User.create({
          avatar: auth0User.picture,
          email: auth0User.email,
          name: auth0User.name,
          sub: auth0User.sub,
        })
      } else {
        // else do nothing
        console.log('User already exists')
      }
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
  async login(req, res) {
    try {
      await handleLogin(req, res, { returnTo: '/' })
    } catch (error) {
      res.status(error.status || 500).end(error.message)
    }
  },
})
