const mongoose = require("mongoose")

const [ , , dbPassword , newName, newNumber ] = process.argv

const url = `mongodb+srv://fullstack:${dbPassword}@cluster0.aogvfbb.mongodb.net/phonebook?retryWrites=true&w=majority`

const Person = mongoose.model('Person', new mongoose.Schema({
  name: String,
  number: String
}))

mongoose
  .connect(url)
  .then((_result) => {
    console.log('connected')
    if (!newName) {
      console.log('Phonebook:')
      return Person
        .find({})
        .then( persons => persons.forEach(p => console.log(p.name, p.number)) )
    } 

    const person = new Person({
      name: newName,
      number: newNumber,
    })
    return person.save()

  })
  .then(() => {
    console.log('done, closing connection')
    return mongoose.connection.close()
  })
