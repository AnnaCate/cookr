import React from 'react'
import { useRouter } from 'next/router'

export default function Login() {
	const router = useRouter()

	const [value, setValue] = React.useState('')
	const [valid, setValid] = React.useState(true)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const res = await fetch('/api/auth/password', {
			method: 'POST',
			body: JSON.stringify({ password: value }),
		})

		if (res.status === 200) {
			setValid(true)
			router.push('/')
		} else setValid(false)
	}

	return (
		<div className="mt-48 mx-10 relative">
			<h1
        className='font-sacramento w-full text-7xl text-center'
      >
        cookr
      </h1>
			<form
				className="mx-auto max-w-md relative mt-1 flex rounded-md shadow-sm bg-white text-gray-800 border border-gray-300"
				onSubmit={handleSubmit}
				style={{ zIndex: 10 }}
			>
				<div className="flex items-stretch w-full rounded-md bg-transparent border-none py-3 px-5 text-base">
					<input
						type="password"
						name="password"
						id="password"
						className="w-full bg-transparent border-none focus:ring-0 flex-grow focus:outline-none "
						onChange={(e) => setValue(e.target.value)}
						placeholder="Password"
						value={value}
					/>
					<button
						type="submit"
						className="bg-gray-200 rounded-md px-12 py-2 font-medium bg-white/10 focus:outline-none hover:bg-gray-300"
					>
						Enter
					</button>
				</div>
			</form>
			{!valid && (
				<div
					className="max-w-md mx-auto relative bg-red-400 -mt-2 px-4 pb-4 pt-5 text-black rounded-md text-base"
					style={{ zIndex: -10 }}
				>
					Invalid password. Please try again.
				</div>
			)}
		</div>
	)
}