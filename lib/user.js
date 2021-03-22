import { Console } from 'console'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
// import Router from 'next/router'

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

const users = []

export async function createUser(req) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(req.password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    email: req.email,
    password: req.password,
    rpassword: req.rpassword,
    firstName: req.firstName,
    lastName: req.lastName,
    hash,
    salt,
  }

  // This is an in memory store for users, there is no data persistence without a proper DB
  // users.push(user)
  const res = await fetch('http://localhost:3000/express_api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  // if (res.status === 200) {
  //   Router.push('/login')
  // } else {
  //   throw new Error(await res.text())
  // }

  return { res, createdAt: Date.now() }
}

// Here you should lookup for the user in your DB
export async function findUser(session) {
  // This is an in memory store for users, there is no data persistence without a proper DB
  // return users.find((user) => user.username === username)
  const body = {
    email: session.body.email,
    password: session.body.password
  }
  const res = await fetch('http://localhost:3000/express_api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
  // .then(json => {
  //   // return json
  // })
  // console.log("RES", res.body)
  if (res.status === 200) {
    // Router.push('/login')
    return res.body
  } else {
    throw new Error(await res.text())
  }
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}