import Link from 'next/link'
import { motion } from 'framer-motion'

const SubHeaderItem = ({title}) => {
  return (
    <motion.div className='subheader__item' 
      initial={{ opacity: 0, x: '-10%' }} animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.5,
        },
      }}
      exit={{
        opacity: 0,
        x: '-10%',
        transition: {
          duration: 0.5,
        },
      }}
    >
        {title}
        <Link href="/">
          <a>
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.00005 8.65244L12.7126 4.93994L13.7731 6.00044L10.0606 9.71294L13.7731 13.4254L12.7126 14.4859L9.00005 10.7734L5.28755 14.4859L4.22705 13.4254L7.93955 9.71294L4.22705 6.00044L5.28755 4.93994L9.00005 8.65244Z"/>
            </svg>
          </a>
        </Link>
    </motion.div>
  )
}

export default SubHeaderItem