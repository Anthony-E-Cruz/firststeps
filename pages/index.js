import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import Page from '../layout/Page'

const Home = props => (
  <Page className={styles.container}>
    <Head>
      <title>First Steps Nursery</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <Navbar />
      <h1 className={styles.title}>
        Welcome to First Steps Nursery
        </h1>
    </main>

    <footer className={styles.footer}>

    </footer>
  </Page>
)


export default Home