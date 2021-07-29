import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Content = ({countriesToShow, setNewFilter}) => 
countriesToShow().length > 1 ? Countries({countriesToShow, setNewFilter}) : Country({countriesToShow})

const Countries = ({countriesToShow, setNewFilter}) => 
countriesToShow().length > 10 ? FilterNotice() : CountryList({countriesToShow, setNewFilter})

const CountryList = ({countriesToShow, setNewFilter}) => 
    countriesToShow()
    .map(c => {
        let name = c.name
        const foo = () => {
            setNewFilter(name)
        }
        return (
        <p key={c.name}> {c.name} <button onClick={foo} > show </button> </p>
      )
    })

const FilterNotice = () => <div>Too many matches, specify another filter</div>

const Country = ({countriesToShow}) => {
  return (
    <div>
      {countriesToShow().map(c => {
        return(
          <div key={c.capital}>
            <h2 key={c.name}> {c.name} </h2>
            <p>Capital {c.capital} </p>
            <p>population {c.population} </p>
            <h3>languages</h3>
            <ul>
              {c.languages.map(l => <li key={l.name}> {l.name} </li>)}
            </ul>
            <img src={c.flag} height="100" />
            <Weather city={c.capital}/>
          </div>
        )
      })}
    </div>
  )
}

const Weather = ({city}) => {
  
  const [weather, setWeather] = useState({"current":{"temperature":99,"wind_speed":0,"wind_dir":'AA',"weather_icons":[]}})
  const api_key = process.env.REACT_APP_API_KEY
  const request = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
  
  useEffect(() => {
    axios
      .get(request)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>Temperature: {JSON.stringify(weather.current['temperature'])}</p>
      <p>Wind: {JSON.stringify(weather.current['wind_speed'])} m/s to {JSON.stringify(weather.current['wind_dir'])}</p>
      {weather.current['weather_icons'].map(pic => <img key={pic} src={pic} height={50} /> )}
    </div>
  )
}

export default Content