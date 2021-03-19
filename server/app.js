const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const path = require('path')
const helmet = require('helmet')
const app = express()
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const avatarsRouter = require('./controllers/avatars')
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
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../frontend/build')))
app.use('/public', express.static(
  path.resolve(__dirname, '../frontend/public')
))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'default-src': ["'self", 'authappdevchallenge.herokuapp.com'], // eslint-disable-line quotes
      'font-src': ['fonts.gstatic.com'],
      'img-src': [
        "'self'", // eslint-disable-line quotes
        'avatars.githubusercontent.com',
        'res.cloudinary.com/auth-app-images/'
      ],
    }
  }
}))

//routes
app.use('/api/login', loginRouter)
app.use('/api/avatar', avatarsRouter)
app.use('/api/users', usersRouter)
if (process.env.NODE_ENV !== 'production') {
  const testingRouter = require('./controllers/tests')
  app.use('/api/tests', testingRouter)
}
app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
})

//errorhandling
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app