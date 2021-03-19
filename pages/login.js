import React from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/login.module.scss'

function Login() {
  return (
    <div className={styles.container}>
      <Navbar />
      <h1>Login Page</h1>
    </div>
  )
}

export default Login
