const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(req.body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  res.status(200).send({ token, email: user.email })
})

module.exports = loginRouter