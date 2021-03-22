import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import Page from '../layout/Page'
import { useUser } from '../lib/hooks'
import Header from '../components/header'
// import Layout from '../components/layout'

const Home = () => {
  const user = useUser()
  console.log("user", user)
  return (
    <Page className={styles.container}>
      <Head>
        <title>First Steps Nursery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navbar />
        <Header />
        <h1 className={styles.title}>
          Welcome to First Steps Nursery
        </h1>
        {user && (
          <>
            <p>Currently logged in as:</p>
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
            <pre>{console.log("pre", user)}</pre>
            <pre>{user.email}</pre>
          </>
        )}
      </main>

      <footer className={styles.footer}>

      </footer>
    </Page>
  )
}


export default Home