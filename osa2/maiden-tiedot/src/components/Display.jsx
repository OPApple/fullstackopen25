import weatherService from '../services/weather'
import { useEffect, useState } from 'react'

const WetherDisplay = ({country}) => {
    const latlng = country.capitalInfo.latlng
    
    const [weather, setWeather] = useState(null)

    const getWeatherPic = (icon) => {
        return <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}></img>
    }

    useEffect(() => {
        weatherService
            .weatherAt(latlng[0], latlng[1])
            .then(data => {
                    setWeather(data)
                }
            )

    }, [])
    

    if(!weather){
        return null
    }

    return(
        <div>
            <h2>Weather in {country.capital[0]}</h2>
            <p>Temperature {weather.main.temp} C°</p>
            {getWeatherPic(weather.weather[0].icon)}
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

const CountryDisplay = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital(s) {country.capital.join(', ')}</p>
            <p>Area {country.area}</p>
            
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(lang => 
                    <li key={lang}>{lang}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <WetherDisplay country={country}/>
        </div>
    )
}

const CountryListing = ({country, changeDisplay}) => {
    return (
        <>
            <p key={country.cca2}>
                {country.name.common} <button onClick={() => changeDisplay(country)}>Show</button>
            </p> 
        </>
    )
} 

const Display = ({countries, showCountry, changeDisplay}) => {
    
    if(showCountry){
        return(
            <>
                <CountryDisplay country={showCountry} />
            </>
        )
    }
    else if(countries.length === 1){
        return(
            <>
               <CountryDisplay country={countries[0]} /> 
            </>
        )
    }else if(countries.length <= 10) {
        return(
            <>
                {
                    countries.map(country => 
                        <CountryListing 
                            country={country} 
                            changeDisplay={changeDisplay}
                            key={country.cca2}
                        />
                    )
                }
            </>
            
        )
    }else{
        return (
            <>
               Over 10 matches, try to be more specific 
            </>
        )
    }
}

export default Display