import { useState } from 'react'

const Person = ({ person }) =>
  <li>{person.name}: {person.number}</li>

const Persons = (props) =>
  <ul>
    {props.persons
      .filter(p => p.name.toLowerCase().includes(props.filter))
      .map(p => <Person key={p.name} person={p} />) 
    }
  </ul>

const Form = ({ newName, handleNameChange, newNumber, handleNumberChange, addPerson }) =>
  <form onSubmit={addPerson}>
    <div> name: <input value={newName} onChange={handleNameChange} /> </div>
    <div> number: <input value={newNumber} onChange={handleNumberChange} /> </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0348562946'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.findIndex(e => e.name === newName) === -1) {
      setPersons(persons.concat(newPerson))
    }
    else {alert(`${newPerson.name} is already in the phonebook`)}
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Search</h2>
      <div>Filter: <input value={filter} onChange={handleFilterChange}/></div>
      <h2>Add a new entry</h2>
      <Form newName={newName}
            handleNameChange={handleNameChange}
            newNumber={newNumber}
            handleNumberChange={handleNumberChange}
            addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
      <div> debug: {filter} </div>
    </div>
  )
}

export default App
