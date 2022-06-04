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
                    <motion.div 
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
                            <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.811096 0H15.4108C15.6259 0 15.8322 0.0854545 15.9844 0.237565C16.1365 0.389675 16.2219 0.59598 16.2219 0.811096V13.7886C16.2219 14.0038 16.1365 14.2101 15.9844 14.3622C15.8322 14.5143 15.6259 14.5997 15.4108 14.5997H0.811096C0.59598 14.5997 0.389675 14.5143 0.237565 14.3622C0.0854545 14.2101 0 14.0038 0 13.7886V0.811096C0 0.59598 0.0854545 0.389675 0.237565 0.237565C0.389675 0.0854545 0.59598 0 0.811096 0V0ZM8.15963 7.04275L2.95888 2.62633L1.90851 3.86244L8.17017 9.17918L14.3191 3.85838L13.2582 2.6312L8.16044 7.04275H8.15963Z"/>
                            </svg>
                            user@gmail.com
                        </a>
                    </motion.div>
                ) : ('')}
            </AnimatePresence>
        </div>
    )
}

export default ContactsAccordion