import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)
const add = (newPerson) => axios.post(baseUrl, newPerson).then(response => response.data)
const del = (id) => axios.delete(`${baseUrl}/${id}`) 
const update = (id, newPerson) => axios
                                    .put(`${baseUrl}/${id}`, newPerson)
                                    .then(r => r.data)

const service = { getAll, add, del, update }
export default service;
