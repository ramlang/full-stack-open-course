const express = require('express');
const morgan = require('morgan');
const app = express();

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('body', req => {
  return JSON.stringify(req.body);
})

app.use(express.json());
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :body',
  { skip: function (req, res) { return req.method !== 'POST' } }
));

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons/', (request, response) => {
  response.json(persons);
})

app.get('/api/persons/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} pepople.</p
    <p>${new Date().toUTCString()}</p>`
  );
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.send(
      `<p>Name: ${person.name}</p>
      <p>Phone Number: ${person.number}</p>`
    );
  } else {
    response.status(404).end();
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id);

  response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
  const id = Math.floor(Math.random() * 1000);
  const body = request.body;
  const names = persons.map(person => person.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and number missing',
    })
  } else if (names.includes(body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: id,
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person);
  response.json(person);
})

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
