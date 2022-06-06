import Head from 'next/head'
import styles from '../../styles/About.module.scss'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { motion } from 'framer-motion'
import AboutSidebar from '../../components/AboutSidebar'
import SubHeaderItem from '../../components/SubHeaderItem'
import { client } from '../../sanity/client'

export default function About({personalInfo}) {
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
                <p className={styles.comment}>{personalInfo}</p>
            </motion.div>
            <div className={styles.gists}>
              <p className={`comment ${styles.comment}`}>&#47;&#47; Code snippet showcase:</p>
              <div className={styles.gistsList}>
                <div className={styles.gist}>
                  <div className={styles.gistHeader}>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  const info = await client.fetch(`*[_type == "info"]`);
  let personalInfo = '';
  for(let i = 0; i < info.length; i++) {
    if(info[i].name == 'personal-info'){
      personalInfo = info[i].content
    }
  }

  return {
    props: {
      personalInfo: personalInfo,
    }
  };
}
