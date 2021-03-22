import { removeTokenCookie } from '../../lib/auth-cookies'

// export default async function logout(req, res) {
const Logout = async (req, res) => {
  removeTokenCookie(res)
  res.writeHead(302, { Location: '/' })
  res.end()
}

export default Logout
