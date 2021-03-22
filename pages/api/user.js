import { getLoginSession } from '../../lib/auth'
import { findUser } from '../../lib/user'

export default async function user(req, res) {
  try {
    const session = await getLoginSession(req)
    res.status(200).json(session)
  } catch (error) {
    res.end('Authentication token is invalid, please log in')
  }
}