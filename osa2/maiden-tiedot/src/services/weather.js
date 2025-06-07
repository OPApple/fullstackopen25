import axios from "axios"

const api_key = import.meta.env.VITE_SOME_KEY

const generateUrl = (lat, lon) => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
}



const weatherAt = (lat, lon) => {
    const requset = axios.get(generateUrl(lat, lon))
    return requset.then(res => res.data)
}

export default {weatherAt}