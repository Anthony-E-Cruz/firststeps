import React from 'react'
import styles from '../styles/products.module.scss'
import Navbar from '../components/navbar'
import Header from '../components/header'

const products = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Header />
      <h1>Subscription Options</h1>
      <p>pause, skip, or cancel anytime</p>

    </div>
  )
}

export default products
