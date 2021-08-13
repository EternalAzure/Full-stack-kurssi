import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactService from './services/contactService'
import Notification from './components/Notification'

const App = () => {
  const [ contacts, setContacts] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)


  useEffect(() => {
    console.log('effect')
    contactService
    .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
      .catch()
  }, [])

  const onChangeName = (event) => {
    setNewName(event.target.value)
  }

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const onChangeFilter = (event) => {
    setNewFilter(event.target.value)
    event.target.value !== '' ? setShowAll(false) :  setShowAll(true)
  }

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }

    if (CheckIfIncluded(newName, contacts)){
      const oldContact = contacts.find(c => c.name === newName)
      let confirmation = window.confirm(`${newName} is already in the phonebook. Replace the old with new one?`)
      if (confirmation) {
        changeContact(oldContact.id)
      }

    } else {
      contactService
      .create(contactObject)
      .then(returnedContacts => {
        setContacts(contacts.concat(returnedContacts))
        setErrorMessage(
          `Contact '${newName}' was added successfully`
        )
        setIsError(false)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(`${JSON.stringify(error.response.data.error)}`)
        setIsError(true)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        contactService
        .getAll()
        .then(updatedContacts => {
          setContacts(updatedContacts)
        })
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const changeContact = id => {
    const contact = contacts.find(c => c.id === id)
    const changedContact = { ...contact, number: newNumber }
  
    contactService
      .update(id, changedContact)
      .then(returnedContact => {
        setContacts(contacts.map(contact => contact.id !== id ? contact : returnedContact))
        setErrorMessage(
          `Contact '${contact.name}' was updated successfully`
        )
        setIsError(false)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `${error} Contact '${contact.name}' is not on the server`
        )
        setIsError(true)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.log('error', error)
        setContacts(contacts.filter(c => c.id !== id))
      })
  }

  const contactsToShow = showAll
    ? contacts 
    : contacts.filter(c => c.name.toLowerCase().includes(newFilter.toLowerCase()))
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} isError={isError} />
      <Filter filter={newFilter} handler={onChangeFilter} />

      <h2>Add a new contact</h2>
      <PersonForm addContact={addContact} newName={newName} newNumber={newNumber} onChangeName={onChangeName} onChangeNumber={onChangeNumber} />

      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} contacts={contacts} setContacts={setContacts} setErrorMessage={setErrorMessage} setIsError={setIsError} />
    </div>
  )
}

const CheckIfIncluded = (name, contacts) => {

  return contacts.reduce((bool, item) => 
    bool + (item.name === name), false)
  
}


export default App