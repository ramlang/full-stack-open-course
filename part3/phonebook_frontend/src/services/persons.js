import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then((response) => response.data);
}

const add = (newPerson) => {
  const request = axios.post(baseURL, newPerson)
  return request.then((response) => response.data);
}

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`);
}

const update = (id, person) => {
  const request = axios.put(`${baseURL}/${id}`, person);
  return request.then(response => response.data);
}

export default { getAll, add, remove, update }