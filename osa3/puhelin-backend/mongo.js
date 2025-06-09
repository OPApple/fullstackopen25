const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('Need more juice')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ttenma:${password}@puhelinluettelo-db.dakplyx.mongodb.net/people?retryWrites=true&w=majority&appName=puhelinluettelo-db`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person)
            })
            mongoose.connection.close()
        })
} else {
    const newName   = process.argv[3]
    const newNumber = process.argv[4]

    const newPerson = new Person({
        name: newName,
        number: newNumber,
    })

    newPerson.save()
        .then(result => {
            console.log(`added ${result.name} number ${result.number} to phonebook`)
            mongoose.connection.close()
        })
}
