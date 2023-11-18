import { useState, useEffect } from 'react';
import personServices from './services/persons';

const Person = ({name, number, handleRemove}) => {
  return (
    <li>
      <p>Name: {name}</p>
      <p>Phone: {number}</p>
      <button onClick={handleRemove}>Remove</button>
    </li>
  )
}

const Persons = ({persons, handleRemove}) => {
  return (
    <ul>
      {persons.map(person => {
        return <Person
          key={person.id}
          name={person.name}
          number={person.number}
          handleRemove={() => handleRemove(person.id)}
        />
      })}
    </ul>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        Name:
        <input
          value={props.name}
          onChange={props.handleName}
        />
      </div>
      <div>
        Number:
          <input
            value={props.number}
            onChange={props.handleNumber}
          />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Search = ({newSearch, handleSearch}) => {
  return (
    <input 
      value={newSearch}
      onChange={handleSearch}
    />
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');


  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const findPersonByName = (name) => {
    return persons.find(person => {
      return person.name.toLowerCase() === name.toLowerCase();
    })
  }

  const updatePersonById = (id, newPerson) => {
    return persons.map(person => person.id !== id ? person : newPerson);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const person = findPersonByName(newName);

    if (person) {
      const msg = `Do you want to update ${person.name}'s current number?`;
      
      if (window.confirm(msg)) {
        const id = person.id;

        personServices.update(id, { ...person, number: newNumber })
          .then(returnedPerson => {
            const updatedList = updatePersonById(id, returnedPerson);
    
            setPersons(updatedList);
            setNewName('');
            setNewNumber('');
          })
      }
    } else {
      personServices.add({ name: newName, number: newNumber })
        .then((addedPerson) => {
          const updatedList = persons.concat(addedPerson);
          console.log("added person");
          setPersons(updatedList);
          setNewName('');
          setNewNumber('');
        });
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value);
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleRemove = (id) => {
    const person = persons.find(person => person.id === id);
    const msg = `Are you sure you want to delete ${person.name}?`;

    if (window.confirm(msg)) {
      personServices.remove(id);
      setPersons(persons.filter(person => person.id !== id));
    }
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const getMatches = () => {
    if (search) {
      return persons.filter(person => {
        const name = person.name.toLowerCase();
        return search.toLowerCase() === name.slice(0, search.length);
      });
    } else {
      return persons;
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search 
        newSearch={search}
        handleSearch={handleSearch}
      />
      <h3>Add a New Contact</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={getMatches()} handleRemove={handleRemove}/>
    </div>
  )

}

export default App