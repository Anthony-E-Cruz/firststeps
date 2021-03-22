// import React from 'react'
// import Navbar from '../components/navbar'
// import styles from '../styles/login.module.scss'

// function Register() {
//   return (
//     <div className={styles.container}>
//       <Navbar />
//       <h1>Create Account</h1>
//     </div>
//   )
// }

// export default Register


import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import Form from '../components/form'

const Signup = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      rpassword: e.currentTarget.rpassword.value,
      firstName: e.currentTarget.firstName.value,
      lastName: e.currentTarget.lastName.value,
    }

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`)
      return
    }
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        Router.push('/login')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form isLogin={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  )
}

export default Signup