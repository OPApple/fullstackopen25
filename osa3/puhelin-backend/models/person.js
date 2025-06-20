const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
console.log('connecting to ', url)
mongoose.connect(url)
    .then(result => {
        console.log(result + '\nconnected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3
    },
    number:{
        type: String,
        minlength: 8,
        validate: {
            validator: (v) => {
                return /^[0-9]{2,3}-[0-9]+/.test(v)
            }
        }
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
