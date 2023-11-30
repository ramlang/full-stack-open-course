import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// const useResource = () => {
//   [token, setToken] = useState(null)
//   [config, setConfig] = useState(null)
//   [response, setResponse] = useState('')
//   [data, setData] = useState('')

//   const getAll = async () => {
//     setResponse(await axios.get(baseUrl))
//     setData(response.data)
//   }

//   const create = async newObject => {
//     setConfig({
//       headers: { Authorization: token },
//     })
  
//     setResponse(await axios.post(baseUrl, newObject, config))
//     setData(response.data)
//   }


const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    // axios.get(baseUrl).then(response =>
    //   setResources(response.data)  
    // )

    (async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    })()
  }, [])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources([...resources, response.data])
  }

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources([...response.data])
  }

  const service = {
    create,
    getAll,
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')
  
  const handleNoteSubmit = (event) => {
    console.log('notes', notes)
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }
  

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App