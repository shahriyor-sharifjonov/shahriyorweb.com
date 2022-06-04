import ContactsAccordion from './ContactsAccordion';
import PersonalInfo from './PersonalInfo';
import styles from '../styles/Contacts.module.scss'

const AboutSidebar = () => {
  return (
    <aside className={`${styles.sidebar} sidebar`}>
        <PersonalInfo />
        <ContactsAccordion />
    </aside>
  )
}

export default AboutSidebar