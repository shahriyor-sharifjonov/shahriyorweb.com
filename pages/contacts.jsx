import Head from 'next/head'
import styles from '../styles/Contacts.module.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion, AnimatePresence } from 'framer-motion';
import SubHeaderItem from '../components/SubHeaderItem'
import { useState, useEffect } from 'react'
import ContactsAccordion from '../components/ContactsAccordion';
import FindMeAccordion from '../components/FindMeAccordion';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

export default function Contacts() { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const date = new Date
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const formattedDate = date.toLocaleDateString("en-US", options)

  const [code, setCode] = useState(`
    const button = document.querySelector('#sendBtn'); 

    const message = {
      name: "${name}",
      email: "${email}",
      message: "${message}",
      date: "${formattedDate}"
    }

    button.addEventListener('click', () => {
      form.send(message); 
    })
  `)

  useEffect(() => {
    setCode(`
      const button = document.querySelector('#sendBtn'); 

      const message = {
        name: "${name}",
        email: "${email}",
        message: "${message}",
        date: "${formattedDate}"
      }

      button.addEventListener('click', () => {
        form.send(message); 
      })
    `)
  }, [name, email, message]);

  return (
    <div className={`${styles.wrapper} wrapper`}>
      <Head>
        <title>Shahriyorweb Full-stack developer</title>
        <meta name="description" content="Shahriyorweb Full-stack developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header page="contacts"/>
      <motion.div className={`${styles.container} main inner`} initial="pageInitial" animate="pageAnimate" variants={{pageInitial: {opacity: 0},pageAnimate: {opacity: 1}}}>
        <aside className={`${styles.sidebar} sidebar`}>
          <ContactsAccordion />
          <FindMeAccordion />
        </aside>
        <div className={`${styles.content} content`}>
          <div className={`subheader`}>
            <SubHeaderItem title='contacts'/> 
          </div>
          <div className={`${styles.contentRow}`}>
            <div className={`${styles.form}`}>
              <div className={styles.formInner}>
                <label htmlFor="name" className={`${styles.label}`}>_name:</label>
                <input autoComplete='off' id="name" className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <label htmlFor="email" className={`${styles.label}`}>_email:</label>
                <input autoComplete='off' id="email" className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="message" className={`${styles.label}`}>_message:</label>
                <textarea autoComplete='off' id="message" className={`${styles.input} ${styles.textarea}`} value={message} onChange={(e) => setMessage(e.target.value)} required />
                <motion.button type="submit" className={`btn ${styles.btn}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.9 }}
                >
                  submit-message
                </motion.button>
              </div>
            </div>
            <div className={`${styles.result}`}>
              <Editor 
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.js)}
                padding={0}
                disabled
              />
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  )
}