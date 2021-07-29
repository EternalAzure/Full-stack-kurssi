import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const onChangeFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = () => countries.filter(c => c.name.toLowerCase().includes(newFilter.toLowerCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter newFilter={newFilter} onChangeFilter={onChangeFilter} />
      <Content countriesToShow={countriesToShow} setNewFilter={setNewFilter} />
    </div>
  );
}

export default App;
