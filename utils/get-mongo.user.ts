export async function getMongoUser(sub: string | null | undefined) {
  try {
    if (!sub) throw new Error('No user')
    const res = await fetch(`/api/users/${sub}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) throw new Error(res.statusText)
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}
