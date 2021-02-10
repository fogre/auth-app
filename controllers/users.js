const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const validateToken = req => {
  const decodedToken = jwt.verify(req.token, config.JWTSECRET)
  if (decodedToken.id !== req.params.id) {
    throw({ name: 'UnauthorizedError' })
  }
  return decodedToken
}

usersRouter.get('/:id', async (req, res) => {
  const user = await User
    .findById(req.params.id)
    .populate('avatar')

  if (user) {
    res.json(user.toJSON())
  } else {
    res.status(404).end()
  }
})

usersRouter.post('/', async (req, res, next) => {
  if (!req.body.password || req.body.password.length <= 5) {
    return res.status(400).json({
      error: 'password too short or not provided'
    })
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10)
  const user = new User({
    email: req.body.email,
    name: null,
    phone: null,
    bio: null,
    photo: null,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    res.json(savedUser.toJSON())
  } catch (e) {
    next(e)
  }
})

usersRouter.put('/:id', async (req, res, next) => {
  try {
    const decodedToken = validateToken(req)
    const user = await User.findById(decodedToken.id)
    const keys = ['email', 'name', 'phone', 'bio']

    if (req.body.password) {
      user.passwordHash = await bcrypt.hash(req.body.password, 10)
    }

    keys.forEach(k => {
      if (req.body[k]) {
        user[k] = req.body[k]
      }
    })

    await user.save()
    res.json(user.toJSON())
  } catch (e) {
    next(e)
  }
})

usersRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = validateToken(req)
    await User.findByIdAndRemove(decodedToken.id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = usersRouter