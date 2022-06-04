import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/SubAccordion.module.scss';
import Link from 'next/link'

const EducationAccordion = ({ id }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={`${styles.accordion}`}>
            <motion.div onClick={()=>setIsOpen((prev) => !prev)} className={`${styles.button} ${isOpen ? styles.active : ''}`}>
                <svg className={styles.arrow} width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.69658 7.18971L0.746582 2.23971L2.16058 0.82571L8.52458 7.18971L2.16058 13.5537L0.746582 12.1397L5.69658 7.18971Z" fill="#607B96"/>
                </svg>
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.0802 4.49392V13.1606C15.0802 13.3521 15.0041 13.5358 14.8687 13.6713C14.7332 13.8067 14.5495 13.8828 14.358 13.8828H1.35796C1.16642 13.8828 0.982719 13.8067 0.847276 13.6713C0.711833 13.5358 0.635742 13.3521 0.635742 13.1606V3.7717H14.358C14.5495 3.7717 14.7332 3.84779 14.8687 3.98324C15.0041 4.11868 15.0802 4.30238 15.0802 4.49392ZM8.15696 2.32726H0.635742V1.60503C0.635742 1.41349 0.711833 1.22979 0.847276 1.09435C0.982719 0.958904 1.16642 0.882813 1.35796 0.882812H6.71252L8.15696 2.32726Z" fill="#3A49A4"/>
                </svg>
                education
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
                        <Link href='/about'>
                            <a className={styles.link}>
                                <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.811096 0H15.4108C15.6259 0 15.8322 0.0854545 15.9844 0.237565C16.1365 0.389675 16.2219 0.59598 16.2219 0.811096V13.7886C16.2219 14.0038 16.1365 14.2101 15.9844 14.3622C15.8322 14.5143 15.6259 14.5997 15.4108 14.5997H0.811096C0.59598 14.5997 0.389675 14.5143 0.237565 14.3622C0.0854545 14.2101 0 14.0038 0 13.7886V0.811096C0 0.59598 0.0854545 0.389675 0.237565 0.237565C0.389675 0.0854545 0.59598 0 0.811096 0V0ZM4.05548 10.1387V6.89432L5.67767 8.51651L7.29987 6.89432V10.1387H8.92206V4.46103H7.29987L5.67767 6.08322L4.05548 4.46103H2.43329V10.1387H4.05548ZM12.9775 7.70541V4.46103H11.3553V7.70541H9.73315L12.1664 10.1387L14.5997 7.70541H12.9775Z"/>
                                </svg>
                                high-school
                            </a>
                        </Link>
                        <Link href='/about'>
                            <a className={styles.link}>
                                <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.811096 0H15.4108C15.6259 0 15.8322 0.0854545 15.9844 0.237565C16.1365 0.389675 16.2219 0.59598 16.2219 0.811096V13.7886C16.2219 14.0038 16.1365 14.2101 15.9844 14.3622C15.8322 14.5143 15.6259 14.5997 15.4108 14.5997H0.811096C0.59598 14.5997 0.389675 14.5143 0.237565 14.3622C0.0854545 14.2101 0 14.0038 0 13.7886V0.811096C0 0.59598 0.0854545 0.389675 0.237565 0.237565C0.389675 0.0854545 0.59598 0 0.811096 0V0ZM4.05548 10.1387V6.89432L5.67767 8.51651L7.29987 6.89432V10.1387H8.92206V4.46103H7.29987L5.67767 6.08322L4.05548 4.46103H2.43329V10.1387H4.05548ZM12.9775 7.70541V4.46103H11.3553V7.70541H9.73315L12.1664 10.1387L14.5997 7.70541H12.9775Z"/>
                                </svg>
                                proweb
                            </a>
                        </Link>
                    </motion.div>
                ) : ('')}
            </AnimatePresence>
        </div>
    )
}

export default EducationAccordion