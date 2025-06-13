require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const middleWare = require('./utils/middleware')

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
app.use(middleWare.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleWare.errorHandler)

module.exports = app
