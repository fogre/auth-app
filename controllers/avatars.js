const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const Avatar = require('../models/avatar')
const User = require('../models/user')
const avatarsRouter = require('express').Router()
const cloud = require('../utils/cloudStorage')
const imageUpload = multer()

const validateToken = req => {
  const decodedToken = jwt.verify(req.token, config.JWTSECRET)
  if (decodedToken.id !== req.params.id) {
    throw({ name: 'UnauthorizedError' })
  }
  return decodedToken
}

avatarsRouter.post('/:id', imageUpload.single('userImg'), async (req, res, next) => {
  try {
    const decodedToken = validateToken(req)
    const user = await User
      .findById(decodedToken.id)
      .populate('avatar')

    let upload = null
    let avatar = null

    if (user.avatar) {
      avatar = user.avatar
      upload = await cloud.upload(req.file, avatar.cloudinaryId)
      avatar.cloudinaryV = upload.version
      avatar.url = upload.url
      await avatar.save()
    }	else {
      upload = await cloud.upload(req.file)
      avatar = await new Avatar({
        cloudinaryId: upload.public_id,
        cloudinaryV: upload.version,
        url: upload.url,
        user: user._id
      }).save()

      user.avatar = avatar._id
      await user.save()
    }

    res.json(avatar.toJSON())
  } catch (e) {
    next(e)
  }
})

avatarsRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = validateToken(req)
    const user = await User
      .findById(decodedToken.id)
      .populate('avatar')

    await cloud.destroy(user.avatar.cloudinaryId)
    await Avatar.findByIdAndRemove(user.avatar._id)
    user.avatar = null
    await user.save()
    res.status(204).end()
  } catch(e) {
    next(e)
  }
})

module.exports = avatarsRouter