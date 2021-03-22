import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies'
import keys from '../config/keys'

// const TOKEN_SECRET = process.env.TOKEN_SECRET
const TOKEN_SECRET = keys.TOKEN_SECRET

export async function setLoginSession(res, session, body) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE, body }
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)
  setTokenCookie(res, token)
}

export async function getLoginSession(req) {
  const token = getTokenCookie(req)
  console.log("token", !!token)
  if (!token) return

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
  console.log("session", !!session)
  const expiresAt = session.createdAt + session.maxAge * 1000
  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  const res = await fetch('http://localhost:3000/express_api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(session),
  })
    .then(function (res) {
      return res.json();
    })
  console.log("get login sesh express", res)

  return res
}
