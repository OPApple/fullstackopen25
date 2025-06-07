import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
    const requset = axios.get(`${baseUrl}/all`)
    return requset.then(res => res.data)
}

const getMatching = (filter) => {
    const requset = axios.get(`${baseUrl}/all`)
    return (
        requset.then(res => 
            res.data.filter(country => 
                country.name.common.toLowerCase().includes(filter.toLowerCase())
            )   
        )
    )
}

export default { getMatching, getAll }