import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/Accordion.module.scss'
import BioAccordion from './BioAccordion';
import EducationAccordion from './EducationAccordion';

const PersonalInfo = ({ id }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={`${styles.accordion} ${styles.borderOnActive}`}>
            <motion.div onClick={()=>setIsOpen((prev) => !prev)} className={`${styles.button} ${isOpen ? styles.active : ''} ${styles.borderOnActive}`}>
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.24998 6.58521L-3.10421e-05 0.585206L8.5 0.585205L4.24998 6.58521Z" fill="white"/>
                </svg>
                personal-info 
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
                        <BioAccordion />
                        <EducationAccordion />
                    </motion.div>
                ) : ('')}
            </AnimatePresence>
        </div>
    )
}

export default PersonalInfo