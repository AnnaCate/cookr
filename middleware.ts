import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'

export const config = {
	matcher: ["/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)"],
}

export async function middleware(req: NextRequest) {
	const secret = new TextEncoder().encode(process.env.JWT_SECRET)
	const jwt = req.cookies.get('session')

	let isAuthenticated = false
	if (jwt) {
		const { payload } = await jose.jwtVerify(jwt, secret)
		isAuthenticated = payload.authenticated as boolean
	}

	req.nextUrl.pathname = !isAuthenticated ? '/login' : req.nextUrl.pathname

	return NextResponse.rewrite(req.nextUrl)
}