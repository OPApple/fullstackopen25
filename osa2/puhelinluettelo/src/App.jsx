import { useState } from 'react'

const People = ({persons, filter}) => {
  
  if (filter === ''){
    return(
      persons.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )
    )
  }else{
    return(
      persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )
    )
  }
}

const PersonForm = ({addNumber, handleNameChange, handleNumberChange}) => {
  return(
    <form onSubmit={addNumber}>
        <div>name: <input onChange={handleNameChange}/></div>
        <div>number: <input onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
  )
}

const Filter = ({handleFilter}) => {
  return(
    <div>
        filter shown with<input onChange={handleFilter}/>
    </div>
  )
} 

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    
    if(persons.map(person => person.name).includes(newName)){
      window.alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat({name: newName, number: newNumber}))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}/>
      <h3>Add new</h3>
      <PersonForm handleNameChange={handleNameChange}handleNumberChange={handleNumberChange} addNumber={addNumber}/>
      <h2>Numbers</h2>
      <People persons={persons} filter={filter}/>
    </div>
  )

}

export default App