/** @format */

const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())

morgan.token('body', (req, res) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ' '
})

app.use(
    morgan(
        ':method :url :status ' +
            ':res[content-length] - :response-time ms :body'
    )
)

let persons = [
    {
        id: '1',
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: '2',
        name: 'Ada Lovelace',
        number: '39-45-5323523',
    },
    {
        id: '3',
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: '4',
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
]

app.get('/', (req, res) => {
    res.send('<h1>hello</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const entriesLength = persons.length
    const dateReceived = new Date()

    const resData =
        `<p>Phonebook has info for ${entriesLength} people</p>` +
        `<p>${dateReceived}</p>`

    res.send(resData)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find((person) => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter((person) => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (
        !body.name ||
        persons.find((person) => person.name === body.name) ||
        !body.number
    ) {
        return res.status(400).json({
            error: 'Name/number missing or name is already in the phonebook.',
        })
    }

    const newPerson = {
        id: persons.length + 1 + '',
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(newPerson)

    res.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
