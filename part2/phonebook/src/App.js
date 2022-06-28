import { useState, useEffect } from 'react'
import service from './services/phonebook'
import Notification from './components/Notification'

const Person = ({ person, id, handleDel }) =>
  <li>{person.name}: {person.number} 
    <button onClick={() => handleDel(id)}>del</button>
  </li>

const Persons = (props) =>
  <ul>
    {props.persons
      .filter(p => p.name.toLowerCase().includes(props.filter))
      .map(p => <Person key={p.id} person={p} id={p.id} handleDel={props.handleDel} />) 
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
  const [persons, setPersons] = useState([]) // to store the data
  const [filter, setFilter] = useState('') // for search
  const [notificationMessage, setNotificationMessage] = useState(null)
  // for the form
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // Load the database from the server
  useEffect(() => {
    service
      .getAll()
      .then(data => {setPersons(data)})
  }, [])

  const sendNotification = (message, time = 3000) => {
    setNotificationMessage(message)
    setTimeout(() => setNotificationMessage(null), time)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase())
  const handleDel = (id) => {
    if (window.confirm(`Remove ${persons.find(p => p.id === id).name} ?`)) {
      service.del(id).catch(error => sendNotification('error: person has been deleted already'))
      setPersons(persons.filter(p => p.id !== id)) 

      sendNotification('Removed')
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const newPersonIndex = persons.findIndex(e => e.name === newName)

    // First case: the person isn't in the database yet
    if (newPersonIndex === -1) {
      // post the new person to the server
      service
        .add(newPerson)
        // and save the response (with the id) in the local database
        .then(data => {setPersons(persons.concat(data))})

      sendNotification(`Added ${newPerson.name}`)
      
    }
    // Second case: the person is already in the database
    else {
      // ask for confirmation
      if (window.confirm(
          `${newPerson.name} is already in the phonebook.
           Do you want to update their number to ${newPerson.number}?`
         )) {
        const newPersonId = persons[newPersonIndex].id
        service
          // update the backend
          .update(newPersonId, newPerson)
          // update the local copy
          .then(data => setPersons(persons.map(p => p.id === data.id ? data : p)))
          .catch(error => sendNotification('error: persone has been deleted'))
        sendNotification(`Updated ${newPerson.name}'s number`)
      }
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      <h2>Search</h2>
      <div>Filter: <input value={filter} onChange={handleFilterChange}/></div>
      <h2>Add a new entry</h2>
      <Form newName={newName}
            handleNameChange={handleNameChange}
            newNumber={newNumber}
            handleNumberChange={handleNumberChange}
            addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDel={handleDel}/>
      <div> debug: {filter} </div>
    </div>
  )
}

export default App
