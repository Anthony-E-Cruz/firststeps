import React from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/login.module.scss'

function Register() {
  return (
    <div className={styles.container}>
      <Navbar />
      <h1>Create Account</h1>
    </div>
  )
}

export default Register