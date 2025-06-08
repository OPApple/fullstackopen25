const express = require('express')
const cors = require('cors')
const morgan = require('morgan')


morgan.token('content', (request) => {
    return JSON.stringify(request.body)
})

const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },

    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },

    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },

    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Wonderhoy~~!!</h1>')
})

app.get('/info', (request, response) => {
    const time = new Date()
    response.send(
        `<p>phoenbook has info for ${persons.length} people</p> <p>${time}</p>`
    )
})


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if(person){
       response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    console.log(id)
    persons.forEach(p => console.log(p.id !== id))
    persons = persons.filter(p => p.id !== id)
    console.log(persons)

    response.status(204).end()

})

const generateId = () => {
    return String(Math.round((Math.random() * 10000)))
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

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

    if(persons.map(p => p.name).includes(newPerson.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    persons = persons.concat(newPerson)

    response.json(newPerson)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})