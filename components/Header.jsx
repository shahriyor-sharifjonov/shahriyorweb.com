import styles from '../styles/Header.module.scss'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Header = ({page}) => {
  return (
    <header className={styles.header}>
        <div className={styles.left}>
            <Link href="/">
                <a className={`${styles.link} ${styles.logo}`}>shahriyor-web
                    <motion.div initial="pageInitial" animate="pageAnimate" variants={{
                            pageInitial: {
                                opacity: 0
                            },
                            pageAnimate: {
                                opacity: 1
                            }
                    }} className={styles.border}></motion.div>
                </a>
            </Link>
            {page == "home" ? (
                <Link href="/">
                    <a className={`${styles.link} ${styles.active}`}>_hello
                        <motion.div initial="pageInitial" animate="pageAnimate" variants={{
                            pageInitial: {
                                opacity: 0
                            },
                            pageAnimate: {
                                opacity: 1
                            }
                        }} className={styles.border}></motion.div>
                    </a>
                </Link>
            ) : (
                <Link href="/">
                    <a className={`${styles.link}`}>_hello
                        <motion.div initial="pageInitial" animate="pageAnimate" variants={{
                            pageInitial: {
                                opacity: 0
                            },
                            pageAnimate: {
                                opacity: 1
                            }
                        }} className={styles.border}></motion.div>
                    </a>
                </Link>
            )}
            {page == "about" ? (
                <Link href="/about">
                    <a className={`${styles.link} ${styles.active}`}>_about-me
                        <motion.div initial="pageInitial" animate="pageAnimate" variants={{
                            pageInitial: {
                                opacity: 0
                            },
                            pageAnimate: {
                                opacity: 1
                            }
                        }} className={styles.border}></motion.div>
                    </a>
                </Link>
            ) : (
                <Link href="/about">
                    <a className={`${styles.link}`}>_about-me
                        <motion.div initial="pageInitial" animate="pageAnimate" variants={{
                            pageInitial: {
                                opacity: 0
                            },
                            pageAnimate: {
                                opacity: 1
                            }
                        }} className={styles.border}></motion.div>
                    </a>
                </Link>
            )}
            {page == "projects" ? (
                <Link href="/projects">
                    <a className={`${styles.link} ${styles.active}`}>_projects
                        <motion.div initial="pageInitial" animate="pageAnimate" variants={{
                            pageInitial: {
                                opacity: 0
                            },
                            pageAnimate: {
                                opacity: 1
                            }
                        }} className={styles.border}></motion.div>
                    </a>
                </Link>
            ) : (
                <Link href="/projects">
                    <a className={`${styles.link}`}>_projects
                        <motion.div initial="pageInitial" animate="pageAnimate" variants={{
                            pageInitial: {
                                opacity: 0
                            },
                            pageAnimate: {
                                opacity: 1
                            }
                        }} className={styles.border}></motion.div>
                    </a>
                </Link>
            )}
        </div>
        <div className={styles.right}>
            {page == "contacts" ? (
                <Link href="/contacts">
                    <a className={`${styles.link} ${styles.active}`}>_contact-me
                        <motion.div initial="pageInitial" animate="pageAnimate" variants={{
                            pageInitial: {
                                opacity: 0
                            },
                            pageAnimate: {
                                opacity: 1
                            }
                        }} className={styles.border}></motion.div>
                    </a>
                </Link>
            ) : (
                <Link href="/contacts">
                    <a className={`${styles.link}`}>_contact-me
                        <motion.div initial="pageInitial" animate="pageAnimate" variants={{
                            pageInitial: {
                                opacity: 0
                            },
                            pageAnimate: {
                                opacity: 1
                            }
                        }} className={styles.border}></motion.div>
                    </a>
                </Link>
            )}
        </div>
    </header>
  )
}

export default Header