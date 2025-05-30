import { useState, useEffect } from 'react'
import peopleServices from './services/people'
import People from './components/People'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import people from './services/people'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    peopleServices
      .getAll()
      .then(initPersons => {
        setPersons(initPersons)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    const newObject = {name: newName, number: newNumber}

    if(persons.map(person => person.name).includes(newName)){
      const existing = persons.find(p => p.name === newName)
      if(window.confirm(`${newName} is already in the phonebook.\nDo you want change their number?`)){
        peopleServices
          .changeNumber(existing.id, newObject)
          .then(newPerson => {
            setPersons(persons.map(p => p.id !== newPerson.id ? p : newPerson))
          })      
      }

    }else{
      peopleServices
        .create(newObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    const check = window.confirm(`Delete ${person.name}`)
    if(check){
      peopleServices
        .deletePerson(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}/>
      <h3>Add new</h3>
      <PersonForm handleNameChange={handleNameChange}handleNumberChange={handleNumberChange} addNumber={addNumber}/>
      <h2>Numbers</h2>
      <People 
        persons={persons} 
        filter={filter} 
        onClick={handleDelete}
      />
    </div>
  )

}

export default App