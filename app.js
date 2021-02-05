const config = require('./utils/config')
const express = require('express')
const app = express()
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

//DB connection
logger.info(`connecting to ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI, {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => logger.info('connected to mongoDB'))
  .catch(error => logger.error('error connecting MongoDB:', error))

//middleware
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

//routes
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
if (process.env.NODE_ENV !== 'production') {
  const testingRouter = require('./controllers/tests')
  app.use('/api/tests', testingRouter)
}

//errorhandling
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app