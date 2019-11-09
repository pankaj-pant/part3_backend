const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())

//app.use(morgan('tiny'))

morgan.token('person-name', function (req, res) { return `{"name":"${req.body.name}",` })
morgan.token('number', function (req, res) { return `"number":"${req.body.number}"}` })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person-name :number'));

let persons = [
    {
      name: "Arto Hellas",
      number: "123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "459328329",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "88983277",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "38923892",
      id: 4
    }
  ]

  const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id)) 
    : 0

    return maxId + 1;
  }

  app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>`+
        new Date()
        )
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
  
    res.status(204).end()
  })

  app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
      return res.status(400).json({ 
        error: 'name missing' 
      })
    } else if (!body.number){
      return res.status(400).json({ 
        error: 'number missing' 
      })
    } else if (persons.find(p => p.name === body.name)) {
      return res.status(400).json({ 
        error: 'name must be unique' 
      })
    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    persons = persons.concat(person)

    res.json(person)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })