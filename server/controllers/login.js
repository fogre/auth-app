const axios = require('axios')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')
const loginRouter = require('express').Router()

const signUser = (res, user, next) => {
  try {
    const userForToken = {
      email: user.email,
      id: user._id
    }

    const token = jwt.sign(userForToken, config.JWTSECRET)
    res.status(200).send({ token, email: user.email, id: user.id })
  } catch (e) {
    next(e)
  }
}

loginRouter.post('/', async (req, res, next) => {
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

  signUser(res, user, next)
})

//callback middleware function called by github after logging in
const githubCallback = async (req, res, next) => {
  const reqToken = req.query.code
  const gitRes = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${config.GITHUB_CLIENT_ID}&client_secret=${config.GITHUB_CLIENT_SECRET}&code=${reqToken}`,
    headers: { accept: 'application/json' }
  })

  if (gitRes.data.error) {
    return res.status(401).json({
      error: 'github authentication failed'
    })
  }
  req.github = gitRes.data
  next()
}

loginRouter.get('/github', githubCallback, async (req, res, next) => {
  console.log('coming here')
  const gitUser = await axios({
    methrod: 'get',
    url: 'https://api.github.com/user',
    headers: { Authorization: `token ${req.github.access_token}` }
  })

  const user = await User.findOne({ email: gitUser.email })

  if (user._id) {
    signUser(res, user, next)
  } else {
    const newUser = await new User({
      email: gitUser.email
    }).save()
    
    signUser(res, newUser, next)
  }
})

module.exports = loginRouter