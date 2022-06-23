import { useState, useEffect } from 'react'
import axios from 'axios'

// Simple list
const List = ({ list }) => 
  <ul>
    {list.map(name => (<li key={name}>{name}</li>))}
  </ul>

// Shows the potential matches along with a button to show each
const CountryList = ({ list, setFilter }) => 
  <ul>
    {list.map(name => (
      <li key={name}>
        {name}
        <button onClick={() => setFilter(name.toLowerCase())}>
          Show
        </button>
      </li>)
    )}
  </ul>

// Shows the weather of the provided weather data
const Weather = ({ weather }) => {
  // Check if the data has loaded
  if (Object.keys(weather).length  === 0) {
    return(<div>Weather loading...</div>)
  }
  else {
    // If so, return the weather data, formated to one decimal place
    return(
    <>
      <h2>Weather</h2>
      <div>Temperature: {(weather.main.temp-273.15).toFixed(1)} °C</div>
      <div>Wind: {(weather.wind.speed*3.6).toFixed(1)} km/h from {weather.wind.deg}</div>
    </>)
  }
}

// Shows data for a specific country, along with the weather of its capital
const CountryCard = ({ country }) => {
  const [weather, setWeather] = useState({})
  const [lat, lon] = country.capitalInfo.latlng
  const api = process.env.REACT_APP_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`
  useEffect(() => {
    console.log('weather effet')
    axios
      .get(url)
      .then(response => { setWeather(response.data) })
  }, [url])
  return(<>
    <h1>{country.name.common}</h1>
    <div>Capital: {country.capital[0]}</div>
    <div>Population: {country.population} inhabitants</div>
    <Weather weather={weather} />
    <h2>Languages:</h2>
    <List list={Object.values(country.languages)} />
    <img src={country.flags.svg} alt='country flag' width='300'/>
  </>)
}

// Shows the results based on the filter
// the shape depends on how many matches there are
const Results = ({ countries, filter, setFilter }) => {
  const countryNames = 
    countries
      .map(country => country.name.common)
      .filter(name => name.toLowerCase().includes(filter))

  //console.log(countryNames)
  if (countryNames.length > 10) {
    return <div>Too many matches, be more precise</div>
  }
  if (countryNames.length > 1) {
    return <CountryList list={countryNames} setFilter={setFilter} />
  }
  if (countryNames.length === 1) {
    const match = countries.filter(c => c.name.common.toLowerCase().includes(filter))[0]
    //console.log(match)
    return <CountryCard country={match} />
  }
  else {
    return <div>No result</div>
  }
  
  
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return(
    <div>
      <div>Find countries: <input value={filter} onChange={handleFilter} /></div>
      <Results countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App;
