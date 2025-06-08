const People = ({persons, filter, onClick: handleDelete}) => {    
    if (filter === ''){
      return(
        persons.map(person => 
          <div key={person.id}>
            <p>
                {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>Delete</button>
            </p>
          </div>
        )
      )
    }else{
      return(
        persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => 
          <div key={person.id}>
              <p>
                {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>Delete</button>
              </p>
              
          </div>

        )
      )
    }
}

export default People