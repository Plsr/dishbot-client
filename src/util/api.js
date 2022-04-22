/**
 * TODO:
 * GENERAL TODOS FOR THIS FILE:
 * - Use context to get user token instead of having to pass it in with every request
 * - use api base class that sets the headers and so on?
 */
const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

export async function validateToken(token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  const res = await fetch(SERVER_BASE_URL + '/token',requestOptions)
  const json = await res.json()
  return json
}

export async function postRecipe(token, reicpe) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(reicpe)
  }

  const res = await fetch(SERVER_BASE_URL + '/recipes', requestOptions)
  if (res.status !== 201) throw new Error("Could not create recipe")
  const json = await res.json()
  return json.recipe
}

export async function getRecipes(token) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  const res = await fetch(SERVER_BASE_URL + '/recipes', requestOptions)
  const json = await res.json()
  return json.recipes
}
