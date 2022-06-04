import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/Accordion.module.scss'

const ContactsAccordion = ({id}) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={styles.accordion}>
            <motion.div onClick={()=>setIsOpen((prev) => !prev)} className={`${styles.button} ${isOpen ? styles.active : ''}`}>
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.24998 6.58521L-3.10421e-05 0.585206L8.5 0.585205L4.24998 6.58521Z" fill="white"/>
                </svg>
                contacts 
            </motion.div>
            <AnimatePresence>
                {isOpen ? (
                    <motion.div className={styles.content}
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
                        <a href="mailto:user@gmail.com" className={styles.link}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM12.06 11.683L5.648 6.238L4.353 7.762L12.073 14.317L19.654 7.757L18.346 6.244L12.061 11.683H12.06Z" />
                            </svg>
                            user@gmail.com
                        </a>
                        <a href="https://t.me/shahriyorweb/" rel="noreferrer" target="_blank" className={styles.link}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM8.89 13.17L8.903 13.163L9.773 16.033C9.885 16.344 10.039 16.4 10.226 16.374C10.414 16.349 10.513 16.248 10.636 16.13L11.824 14.982L14.374 16.87C14.84 17.127 15.175 16.994 15.291 16.438L16.948 8.616C17.131 7.888 16.811 7.596 16.246 7.828L6.513 11.588C5.849 11.854 5.853 12.226 6.393 12.391L8.89 13.171V13.17Z" />
                            </svg>
                            @shahriyorweb
                        </a>
                    </motion.div>
                ) : ('')}
            </AnimatePresence>
        </div>
    )
}

export default ContactsAccordion