import React, { useState } from 'react'

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
      filter with: <input value={newFilter} onChange={onChangeFilter} />

      <h2>Add a new contact</h2>
      <form onSubmit={addContact}>
      <div>
        name: <input value={newName}
        onChange={onChangeName}/>
      </div>
      <div>
        number: <input value={newNumber}
        onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

      <h2>Numbers</h2>
      {contactsToShow.map(p => {
        return <p key={p.name}> {p.name} {p.number} </p>
      })}
    </div>
  )
}
/*
  {contactsToShow.map(p => {
    return <p key={p.name}>{p.name} {p.number}</p>
  })}
*/

const CheckIfIncluded = (what, where) => {
  return where.reduce((bool, item) => 
    bool + item.name.includes(what), false)
}

export default App