import Head from 'next/head'
import styles from '../../styles/About.module.scss'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { motion } from 'framer-motion'
import AboutSidebar from '../../components/AboutSidebar'
import SubHeaderItem from '../../components/SubHeaderItem'

export default function About() {
    const text = `/**
* About me
* I have 2 years of experience in web
* development lorem ipsum dolor sit amet,
** /`
  return (
    <div className={`${styles.wrapper} wrapper`}>
      <Head>
        <title>About | Shahriyorweb</title>
        <meta name="description" content="Shahriyorweb Full-stack developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header page="about"/>
      <motion.div className={`${styles.container} main inner`} initial="pageInitial" animate="pageAnimate" variants={{pageInitial: {opacity: 0},pageAnimate: {opacity: 1}}}>
        <AboutSidebar />
        <div className={`${styles.content} content`}>
          <div className={`subheader`}>
            <SubHeaderItem title='personal-info'/> 
          </div>
          <div className={`${styles.contentRow}`}>
            <motion.div className={`${styles.text}`} 
                initial={{ opacity: 0, y: '-10%' }} animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                    duration: 0.5,
                    },
                }}
                exit={{
                    opacity: 0,
                    y: '-10%',
                    transition: {
                    duration: 0.5,
                    },
                }}
            >
                <p className={styles.comment}>{text}</p>
            </motion.div>
            <div className={styles.gists}>
                <p className={`comment ${styles.comment}`}>&#47;&#47; Code snippet showcase:</p>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  )
}
