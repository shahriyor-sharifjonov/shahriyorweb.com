import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className={`${styles.wrapper} wrapper`}>
      <Head>
        <title>Shahriyorweb Full-stack developer</title>
        <meta name="description" content="Shahriyorweb Full-stack developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header page="home"/>
      <motion.div className={`${styles.container} main`} initial="pageInitial" animate="pageAnimate" variants={{
        pageInitial: {
          opacity: 0
        },
        pageAnimate: {
          opacity: 1
        }
      }}>
        <motion.div
          initial={{ opacity: 0, y: '10%' }} animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 1,
            },
          }}
          exit={{
            opacity: 0,
            y: '10%',
            transition: {
              duration: 1,
            },
          }}
        >
          <p className={styles.hello}>Hi all. I am</p>
          <h1 className={styles.title}>Shahriyor Web</h1>
          <h2 className={styles.subtitle}>&gt; Full-stack developer</h2>
          <p className={styles.comment}>&#47;&#47; complete the game to continue</p>
          <p className={styles.comment}>&#47;&#47; you can also see it on my Github page</p>
          <pre className={styles.code}>const <span className='variable'>githubLink</span> <span className='punctuation'>=</span> <a href="https://github.com/shahriyor-sharifjonov/shahriyorweb.com" rel="noreferrer" target="_blank" className='string link'>“https:&#47;&#47;github.com&#47;example&#47;url”</a></pre>
        </motion.div>
        <motion.div className={styles.game}
          initial={{ opacity: 0 }} animate={{
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 1,
            },
          }}
        >
          <div className={styles.gameContent}>
            <motion.button className={`btn ${styles.gameStartBtn}`}
              initial={{ x: '-50%'}}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              start-game
            </motion.button>
          </div>
          <div className={styles.gameInfo}>
            <div className={styles.gameTop}>
              <div className={styles.gameController}>
                <p className={styles.gameComment}>&#47;&#47; use keyboard</p>
                <p className={styles.gameComment}>&#47;&#47; arrows to play</p>
                <div className={styles.gameControllerButtons}>
                  <div className={styles.gameControllerButtonsTop}>
                    <svg width="51" height="30" viewBox="0 0 51 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1.46094" y="1.46356" width="48.0787" height="27.6912" rx="7.5" fill="#010C15" stroke="#1E2D3D"/>
                      <path d="M25.5 12.3091L29.75 18.3091H21.25L25.5 12.3091Z" fill="white"/>
                    </svg>
                  </div>
                  <div className={styles.gameControllerButtonsBot}>
                    <svg width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="49.0786" y="28.6547" width="48.0787" height="27.6912" rx="7.5" transform="rotate(-180 49.0786 28.6547)" fill="#010C15" stroke="#1E2D3D"/>
                      <path d="M22.0391 14.8091L28.0391 10.5591L28.0391 19.0592L22.0391 14.8091Z" fill="white"/>
                    </svg>
                    <svg width="51" height="30" viewBox="0 0 51 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="49.5391" y="28.6547" width="48.0787" height="27.6912" rx="7.5" transform="rotate(-180 49.5391 28.6547)" fill="#010C15" stroke="#1E2D3D"/>
                      <path d="M25.5 17.8091L21.25 11.8091L29.75 11.8091L25.5 17.8091Z" fill="white"/>
                    </svg>
                    <svg width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="49" y="28.6547" width="48.0787" height="27.6912" rx="7.5" transform="rotate(-180 49 28.6547)" fill="#010C15" stroke="#1E2D3D"/>
                      <path d="M27.9604 14.8091L21.9604 19.0592L21.9604 10.5591L27.9604 14.8091Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p className={styles.gameComment}>&#47;&#47; food left</p>
              <div className={styles.gameFloods}>
                <div className={`${styles.gameFlood}`}></div>
                <div className={`${styles.gameFlood}`}></div>
                <div className={`${styles.gameFlood}`}></div>
                <div className={`${styles.gameFlood}`}></div>
                <div className={`${styles.gameFlood}`}></div>
                <div className={`${styles.gameFlood}`}></div>
                <div className={`${styles.gameFlood}`}></div>
                <div className={`${styles.gameFlood}`}></div>
                <div className={`${styles.gameFlood}`}></div>
                <div className={`${styles.gameFlood}`}></div>
              </div>
            </div>
            <motion.button className={`btn ${styles.gameSkipBtn}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
            >
              skip
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  )
}
