import axios from 'axios'
import { useState } from 'react'
const baseUrl = '/api/notes'

export const useResource = () => {
  [token, setToken] = useState(null)
  [config, setConfig] = useState(null)
  [response, setResponse] = useState('')
  [data, setData] = useState('')

  const getAll = async () => {
    setResponse(await axios.get(baseUrl))
    setData(response.data)
  }

  const create = async newObject => {
    setConfig({
      headers: { Authorization: token },
    })
  
    setResponse(await axios.post(baseUrl, newObject, config))
    setData(response.data)
  }

  const newToken = (value) => {
    setToken(`bearer ${value}`)
  }

  return [
    {
      token,
      response,
      data,
      config,
    },
    {
      newToken,
      getAll,
      create,
    }
  ]
}

// const update = async (id, newObject) => {
//   const response = await axios.put(`${ baseUrl }/${id}`, newObject)
//   return response.data
// }

// export default { getAll, create, update, setToken }

// Extract the code for communicating with the backend into its own useResource hook
// sufficient to implement fetching all resources and creating a new resource

// custom hook returns an array of two items
// first item of the array contains all individual resources
// second item is an object that can be used for manipulating the resource collection (like creating new ones)

// if implemented correctly is can be used for both notes and phone numbers

// start server with the npm run server command at port 3005