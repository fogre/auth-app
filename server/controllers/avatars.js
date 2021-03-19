const multer = require('multer')
const cloud = require('../utils/cloudStorage')
const validation = require('../utils/jwtValidation')
const imageUpload = multer()
const avatarsRouter = require('express').Router()

avatarsRouter.post('/:id', imageUpload.single('userImg'), async (req, res, next) => {
  try {
    const user = await validation.validateAndFindUserByID(req)

    if (user.avatar.cloudinaryId) {
      const upload = await cloud.upload(req.file, user.avatar.cloudinaryId)
      user.avatar.cloudinaryV = upload.version
      user.avatar.url = upload.url
      await user.save()

    }	else {
      const upload = await cloud.upload(req.file)
      const avatar = {
        cloudinaryId: upload.public_id,
        cloudinaryV: upload.version,
        url: upload.url
      }
      user.avatar = avatar
      await user.save()
    }

    res.json(user.toJSON())
  } catch (e) {
    next(e)
  }
})

avatarsRouter.delete('/:id', async (req, res, next) => {
  try {
    const user = await validation.validateAndFindUserByID(req)
    await cloud.destroy(user.avatar.cloudinaryId)
    user.avatar = undefined
    await user.save()
    res.status(204).end()
  } catch(e) {
    next(e)
  }
})

module.exports = avatarsRouter