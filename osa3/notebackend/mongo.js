require('dotenv').config()
const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

//const password = process.argv[2]

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note(
  {
    content: 'give me 4* tsukasa pls',
    important: false,
  }
)

note.save().then(result => {
  console.log(result + '\nnote saved!')
  mongoose.connection.close()
})