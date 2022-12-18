import { NextApiResponse, NextApiRequest } from 'next'
import { setCookie } from '../../../utils/set-cookie'
import * as jose from 'jose'

const { JWT_SECRET, WWW_PASSWORD } = process.env

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const { password }  = JSON.parse(req.body)

		if (password === WWW_PASSWORD) {
			const token = await getToken()
			setCookie(res, 'session', token, {
				maxAge: 2592000,
				path: '/',
				sameSite: 'lax',
			})
			return res.status(200).json({ success: true })
		}
		return res.status(401).json({ success: false })
	} catch (error) {
		console.error(error)
		return res.status(500).json('Something went wrong. Please try again.')
	}
}

const alg = 'HS256'

async function getToken() {
	const secret = new TextEncoder().encode(JWT_SECRET)
	return await new jose.SignJWT({ authenticated: true })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime('30d')
		.sign(secret)
}