require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleWare = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

const url = config.MONGODB_URI

logger.info('connecting to ', url)
mongoose.connect(url)
    .then(() => {
        logger.info('connected to mongo')
    })
    .catch(error => {
        logger.error(error)
    })

app.use(express.json())
app.use(middleWare.tokenExtractor)
app.use(middleWare.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleWare.errorHandler)

module.exports = app
