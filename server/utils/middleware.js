const logger = require('./logger')

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  switch(error.name) {
  case 'CastError':
    return res.status(400).send({ error: 'malformatted id' })
  case 'ValidationError':
    return res.status(400).json({
      error: error.message.substring(31),
      type: Object.keys(error.errors)[0]
    })
  case 'JsonWebTokenError':
    return res.status(401).json({ error: 'invalid token', type: 'login' })
  case 'UnauthorizedError':
    return res.status(401).json({ error: 'unauthorized', type: 'login' })
  case 'PasswordError':
    return res.status(400).json({
      error: 'password too short or not provided',
      type: 'password'
    })
  case 'CloudinaryError':
    return res.status(400).json({ error: error.message, type: 'general' })
  default:
    next(error)
  }
}

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7)
  }
  next()
}

module.exports = {
  errorHandler,
  requestLogger,
  unknownEndpoint,
  tokenExtractor
}