const cloud = require('../utils/cloudStorage')
const validation = require('../utils/jwtValidation')
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.json(user.toJSON())
  } else {
    res.status(404).end()
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ error: 'email is required', type: 'email' })
    }
    const passwordHash = await validation.validateNewPassword(req.body.password)
    const user = await new User({
      email: req.body.email,
      name: null,
      phone: null,
      bio: null,
      passwordHash
    }).save()

    validation.signUser(res, user)
  } catch (e) {
    next(e)
  }
})

usersRouter.put('/:id', async (req, res, next) => {
  try {
    const user = await validation.validateAndFindUserByID(req)
    const keys = ['email', 'name', 'phone', 'bio']

    if (req.body.password) {
      user.passwordHash = await validation.validateNewPassword(req.body.password)
    }

    keys.forEach(k => {
      if (req.body[k]) {
        user[k] = req.body[k]
      } else if (user[k]) {
        user[k] = null
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
    const user = await validation.validateAndFindUserByID(req)

    if (user.avatar.cloudinaryId) {
      await cloud.destroy(user.avatar.cloudinaryId)
    }

    await User.findByIdAndRemove(user._id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = usersRouter