import { NextApiRequest, NextApiResponse } from 'next'
import { handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

const afterCallback = async (
  _req: NextApiRequest,
  _res: NextApiResponse,
  session: { user: any },
) => {
  const { user: auth0User } = session
  try {
    // connect to MongoDB
    await dbConnect()
    // see if user already exists in database
    User.findOne({ sub: auth0User.sub }, (err: any, mongoUser: any) => {
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
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleCallback(req, res, { afterCallback })
    } catch (error: any) {
      res.status(error.status || 400).end(error.message)
    }
  },
  async login(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleLogin(req, res, { returnTo: '/me' })
    } catch (error: any) {
      res.status(error.status || 500).end(error.message)
    }
  },
})
