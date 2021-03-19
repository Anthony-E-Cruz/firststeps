import styles from '../styles/navbar.module.scss'
import Link from 'next/Link'

function Navbar() {
  return (
    <div className={styles.navbar}>
      <h1>
        First Steps Nursery
      </h1>
      <Link href="/">
        <a title="Home Page">Home</a>
      </Link>
      <Link href="/products">
        <a title="Boxes">View Subsciption Options</a>
      </Link>
      <Link href="/login">
        <a title="login">Login</a>
      </Link>
      <Link href="/register">
        <a title="register">Create Account</a>
      </Link>
    </div>
  )
}

export default Navbar
