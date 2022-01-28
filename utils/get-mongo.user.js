export async function getMongoUser(sub) {
  try {
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
