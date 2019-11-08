const express = require('express')
const app = express()

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
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })