const express = require('express')
const app = express()

let persons = require('./db.json')
let maxId = persons.reduce((prev, p) => Math.max(prev, p.id), 0)
const newId = () => { return ++maxId }

app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Phonebook backend')
})

app.get('/info', (_req, res) => {
  res.send(`
    <div> Phonebook has info for ${persons.length} people </div>
    <div>${new Date}</div>
  `)
})

app.get('/api/persons', (_req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const person = req.body
  // Check if the request is valid
  let error = false
  if (!person.name) {return res.status(400).json({error: 'name missing'})}
  if (!person.number) {return res.status(400).json({error: 'number missing'})}
  if (persons.find(p => p.name === person.name)) {
    return res.status(400).json({error: 'name must be unique'})
  }
  // Only keep name and number attributes
  newPerson = {
    name: person.name,
    number: person.number,
    id: newId()
  }
  persons.push(newPerson)
  res.json(newPerson)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id == id)
  if (person) {res.json(person)}
  else        {res.status(404).end()}
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id != id)
  res.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
