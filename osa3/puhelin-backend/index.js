require('dotenv').config()
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('content', (request) => {
    return JSON.stringify(request.body)
})

const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/', (request, response) => {
    response.send('<h1>Wonderhoy~~!!</h1>')
})

app.get('/info', (request, response) => {
    const time = new Date()
    let people = 0
    axios.get('http://localhost:3001/api/persons')
        .then(peeps => {
            people = peeps.data.length
            console.log(people)
            response.send(
                `<p>phoenbook has info for ${people} people</p> <p>${time}</p>`
            )
        })
})


app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person){
                response.json(person)
            }else{
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            console.log(result)
            response.status(204).end()
        })
        .catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const newPerson = new Person({
        name: body.name,
        number: body.number,
    })

    if(!newPerson.name){
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if(!newPerson.number){
        return response.status(400).json({
            error: 'number missing'
        })
    }

    newPerson.save().then(result => {
        response.json(result)
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const newNumber = request.body.number

    Person.findById(request.params.id)
        .then(person => {
            if(!person){
                return response.status(404).end()
            }

            person.number = newNumber

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformated id' })
    }else if (error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})