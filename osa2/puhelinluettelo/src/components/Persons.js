import contactService from "../services/contactService"

const Persons = ({contactsToShow, contacts, setContacts, setErrorMessage, setIsError}) => {
  return (
    <div>
      {createHTMLelements({contactsToShow, contacts, setContacts, setErrorMessage, setIsError})
      .filter(item => item.key !== null)}
    </div>
  )
}

const createHTMLelements = ({contactsToShow, contacts, setContacts, setErrorMessage, setIsError}) => {
  
  return (
    contactsToShow.map(contact => {
      const id = contact.id
      const action = createOnClickAction({setContacts, contacts, id, setErrorMessage, setIsError})
      return (
        <p key={contact.id}> {contact.name} {contact.number} <button onClick={action} > delete </button> </p>
      )
    })
  )
}

const createOnClickAction = ({contacts, id, setContacts, setErrorMessage, setIsError}) => {
  const action = () => {
    contactService
    .goodRiddance(id)
    .then(returnedContact => {
      setContacts(newCompleteContactsList({contacts, id, returnedContact}))
      setErrorMessage(
        `Contact was removed successfully`
      )
      setIsError(false)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    .catch(error => {
      console.log('error', error)
      setErrorMessage(
        `Contact was already removed from the server`
      )
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }
  return action
}

const newCompleteContactsList = ({contacts, id, returnedContact}) => {
  const newContacts =  
  contacts.map(contact => contact.id !== id ? contact : returnedContact)
  return newContacts.filter(value => Object.keys(value).length !== 0)
}

export default Persons