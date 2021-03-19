const axios = require('axios')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const validation = require('../utils/jwtValidation')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(req.body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password',
        type: 'login'
      })
    }

    validation.signUser(res, user, next)
  } catch (e) {
    next(e)
  }
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
    console.log(gitRes.data.error)
    return res.status(401).json({
      error: 'github authentication failed',
      type: 'general'
    })
  }
  req.github = gitRes.data
  next()
}

loginRouter.get('/github/login', githubCallback, async (req, res, next) => {
  try {
    const gitUser = await axios({
      methrod: 'get',
      url: 'https://api.github.com/user',
      headers: { Authorization: `token ${req.github.access_token}` }
    })

    const gitLogin = gitUser.data.login
    const user = await User.findOne({ githubAccount: gitLogin })

    if (user && user._id) {
      validation.signUser(res, user, next)
    } else {
      console.log('creating new')
      const newUser = await new User({
        email: gitUser.data.email,
        avatar: { url: gitUser.data['avatar_url'] },
        bio: gitUser.data.bio,
        name: gitUser.data.name,
        githubAccount: gitLogin
      }).save()

      validation.signUser(res, newUser, next)
    }
  } catch (e) {
    next (e)
  }
})

module.exports = loginRouter