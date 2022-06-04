import ContactsAccordion from './ContactsAccordion';
import FindMeAccordion from './FindMeAccordion';
import styles from '../styles/Contacts.module.scss'

const ContactsSidebar = () => {
  return (
    <aside className={`${styles.sidebar} sidebar`}>
        <ContactsAccordion />
        <FindMeAccordion />
    </aside>
  )
}

export default ContactsSidebar