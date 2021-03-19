const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('../models/user')

const signUser = (res, user) => {
  const userForToken = {
    email: user.email,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.JWTSECRET)
  res.status(200).send({ token, user: { ...user.toJSON() } })
}

const validateToken = req => {
  const decodedToken = jwt.verify(req.token, config.JWTSECRET)
  if (decodedToken.id !== req.params.id) {
    throw({ name: 'UnauthorizedError' })
  }
  return decodedToken
}

const validateAndFindUserByID = req => {
  const decodedToken = validateToken(req)
  return User.findById(decodedToken.id)
}

const validateNewPassword = async password => {
  if (!password || password.length <= 5) {
    throw({ name: 'PasswordError' })
  }
  const newHash =  await bcrypt.hash(password, 10)
  return newHash
}

module.exports = {
  signUser,
  validateToken,
  validateAndFindUserByID,
  validateNewPassword
}