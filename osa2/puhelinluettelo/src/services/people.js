import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(res => res.data)
}

const deletePerson = id => {
    const url = `${baseUrl}/${id}`
    const request = axios.delete(url)
    return request.then(res => res.data)
}

const changeNumber = (id, newPerson) => {
    const url = `${baseUrl}/${id}`
    const request = axios.put(url, newPerson)
    return request.then(res => res.data)
}

export default { getAll, create, deletePerson, changeNumber }