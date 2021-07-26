import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  const onChangeName = (event) => {
    setNewName(event.target.value)
  }

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const onChangeFilter = (event) => {
    setNewFilter(event.target.value)
    if (event.target.value !== '') {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    if (CheckIfIncluded(newName, persons)){
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(contactObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const contactsToShow = showAll
    ? persons 
    : persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handler={onChangeFilter} />

      <h2>Add a new contact</h2>
      <PersonForm addContact={addContact} newName={newName} newNumber={newNumber} onChangeName={onChangeName} onChangeNumber={onChangeNumber} />

      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} />
    </div>
  )
}

const CheckIfIncluded = (what, where) => {
  return where.reduce((bool, item) => 
    bool + item.name.includes(what), false)
}

export default App