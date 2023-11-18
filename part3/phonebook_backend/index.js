const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

morgan.token('body', req => JSON.stringify(req.body));
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :body',
  { skip: req => req.method !== 'POST' }
));

const unknownEndpoint = (req, res) => {
 res.status(404).send({ error: 'unknown endpoint' });
}

let persons = [
  { 
    "id": 1,
    "name": "Teess", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Rachelee", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Alllen", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Wesston", 
    "number": "39-23-6423122"
  }
]

// app.use(express.static('dist'))

app.get('/api/persons', (req, res) => res.json(persons));

app.get('/api/persons/info', (req, res) => {
  const timestamp = new Date().toUTCString();
  const count = persons.length;
  const msg = `<p>Phonebook has information for ${count} people.</p>` +
    `<p>${timestamp}</p>`;

  res.send(msg);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  const msg = `<p>Name: ${person.name}</p><p>Phone: ${person.number}</p>`;

  person ? res.send(msg) : res.status(404).end();
});

app.post('/api/persons/', (req, res) => {
  const id = Math.floor(Math.random() * 1_000);
  const input = req.body;
  const namesList = persons.map(person => person.name);
  
  if (!(input.name && input.number)) {
    return res.status(400).json({ error: 'name and number missing' });
  } else if (namesList.includes(input.name)) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const newPerson = {
    id: id,
    name: input.name,
    number: input.number,
  }

  persons = persons.concat(newPerson);

  res.json(newPerson);
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));