const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users.map(user => user.toJSON()))
})

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user)
    res.json(user.toJSON())
  else
    res.status(404).end()
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
    res.json(savedUser)
  } catch (e) {
    next(e)
  }
})

usersRouter.put('/:id', async (req, res, next) => {
  const user = {
    name: req.body.name || null,
    phone: req.body.phone || null,
    bio: req.body.bio || null,
    //photo:
  }

  try {
    const updatedUser = await User
      .findByIdAndUpdate(req.params.id, user, { new: true })
    res.json(updatedUser.toJSON())
  } catch (e) {
    next(e)
  }
})

module.exports = usersRouter