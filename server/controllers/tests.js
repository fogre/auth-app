const router = require('express').Router()
const User = require('../models/user')
const Avatar = require('../models/avatar')

router.post('/reset', async (req, res) => {
  await Avatar.deleteMany({})
  await User.deleteMany({})
  res.status(204).end()
})

module.exports = router