import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className={`${styles.wrapper} wrapper`}>
      <Header page="home"/>
      <motion.div className={`${styles.container} main`} initial="pageInitial" animate="pageAnimate" variants={{
        pageInitial: {
          opacity: 0
        },
        pageAnimate: {
          opacity: 1
        }
      }}>
        <Head>
          <title>Shahriyorweb Full-stack developer</title>
          <meta name="description" content="Shahriyorweb Full-stack developer" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Home</h1>
      </motion.div>
      <Footer />
    </div>
  )
}
