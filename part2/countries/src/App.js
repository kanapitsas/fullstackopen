import { useState, useEffect } from 'react'
import axios from 'axios'

const List = ({ list }) => 
  <ul>
    {list.map(name => (<li key={name}>{name}</li>))}
  </ul>

const CountryCard = ({ country }) =>
  <>
    <h1>{country.name.common}</h1>
    <div>Capital: {country.capital[0]}</div>
    <div>Population: {country.population} inhabitants</div>
    <h2>Languages:</h2>
    <List list={Object.values(country.languages)} />
    <img src={country.flags.svg} width='300'/>
  </>

const Results = ({ countries, filter }) => {
  const countryNames = 
    countries
      .map(country => country.name.common)
      .filter(name => name.toLowerCase().includes(filter))

  console.log(countryNames)
  if (countryNames.length > 10) {
    return <div>Too many matches, be more precise</div>
  }
  if (countryNames.length > 1) {
    return <List list={countryNames} />
  }
  if (countryNames.length === 1) {
    const match = countries.filter(c => c.name.common.toLowerCase().includes(filter))[0]
    console.log(match)
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
    console.log('effect!')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return(
    <div>
      <div>Find countries: <input value={filter} onChange={handleFilter} /></div>
      <Results countries={countries} filter={filter} />
    </div>
  )
}

export default App;
