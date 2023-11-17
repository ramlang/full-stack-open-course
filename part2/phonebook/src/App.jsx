import { useState, useEffect } from 'react'
import personServices from './services/persons'

const Persons = ({search, persons, onRemove}) => {
  return (
    <ul>
      {persons.map(person => {
        if (person.name.toLowerCase().slice(0, search.length) === search.toLowerCase()) {
          return <Person
            key={person.id}
            name={person.name}
            number={person.number}
            onRemove={() => onRemove(person.id)}
          />
        }
      })}
    </ul>
  )
}

const Person = ({name, number, onRemove}) => {
  return (
    <li>
      <p>Name: {name}</p>
      <p>Phone: {number}</p>
      <button onClick={onRemove}>Remove</button>
    </li>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        Name: <input 
          value={props.newName}
          onChange={props.onChangeName}/>
      </div>
      <div>
        Phone Number: <input
          value={props.newNumber}
          onChange={props.onChangeNumber}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Filter = (props) => {
  return (
    <input 
      onChange={props.onChangeSearch}
      value={props.newSearch}
    />
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setSearch] = useState('');

  useEffect(() => {
    personServices.getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name);
    let newPerson = {name: newName, number: newNumber};
    
    if (names.includes(newName)) {
      const person = persons.find((elem) => {
        return elem.name.toLowerCase() === newName.toLowerCase()
      });
      const msg = `Do you want to overwrite ${person.name}'s current number?`;

      if (window.confirm(msg)) {
        const newInfo = {...person, number: newPerson.number};

        personServices.update(person.id, newInfo)
          .then(returnedPerson => {
            setPersons(persons.map(person => {
              return person.id !== returnedPerson.id ? person : returnedPerson
            }));
            setNewName('');
            setNewNumber('');
          })
      }
    } else {
      personServices.add(newPerson)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson));
          setNewName('');
          setNewNumber('');
        });
    }
  }

  const onRemove = (id) => {
    const person = persons.find((elem) => elem.id === id);
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personServices.remove(id);
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  // noteService
  // .update(id, changedNote)
  // .then(returnedNote => {
  //   setNotes(notes.map(note => note.id !== id ? note : returnedNote))
  // })

  const onUpdate = (id, number) => {
    // const person = persons.find((elem) => elem.id === id);
    // if (window.confirm(`Do you want to overwrite ${person.name}'s current number?`)) {
    //   personServices.update(id, {...person, number: number});
    //   setPersons(persons.filter(person => person.id !== id))
    //   setPersons(persons.concat({...person, number: number}))
    // }
  }

  const onChangeName = (event) => {
    setNewName(event.target.value);
  }

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        onChangeSearch={onChangeSearch}
        newSearch={newSearch}
      />
      <h3>Add a New Contact</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onChangeName={onChangeName}
        onChangeNumber={onChangeNumber}
        onSubmit={onSubmit}
      />
      <h3>Numbers</h3>
      <Persons search={newSearch} persons={persons} onRemove={onRemove}/>
    </div>
  )
}

export default App