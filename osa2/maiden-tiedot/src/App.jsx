import { useState, useEffect } from 'react'
import Search from './components/Search'
import Display from './components/Display'
import countryService from './services/countries'


const App = () => {
  const [countries, setCountries] = useState(null)
  const [showCountry, setShowCountry] = useState(null)

  const showSingleCountry = (country) => {
    setShowCountry(country)
  }


  useEffect(() => {
    console.log('fetching...')
    countryService
      .getAll()
      .then(allCountries=> {
        setCountries(allCountries)
      })
  }, [])

  if(!countries){
    return null
  }

  const handleSearch = (event) => {
    setShowCountry(null)
    countryService
      .getMatching(event.target.value)
      .then(matching => {
        console.log(matching)
        console.log(event.target.value)
        setCountries(matching)
      })
    
  }
  
  return (
    <div>
      <Search onChange={handleSearch}/>
      <br />
      <Display 
        countries={countries} 
        showCountry={showCountry} 
        changeDisplay={showSingleCountry}
      />
    </div>
  )
}

export default App
