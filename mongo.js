require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const name = process.argv[4]
const number = process.argv[5]
const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

person.save().then(() => {
  console.log(`added ${name} number ${number} to phonebook`)
})

Person.find({}).then(result => {
  console.log('phonebook:')
  result.forEach(person => {
    console.log(person.name, person.number)
  })
  mongoose.connection.close()
})