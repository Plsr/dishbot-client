const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

export async function validateToken(token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  // TODO: 4xx Handlind
  const res = await fetch(SERVER_BASE_URL + '/token',requestOptions)
  const json = await res.json()
  console.log(json)
  return json
}