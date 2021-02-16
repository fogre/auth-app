const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const config = require('./config')

cloudinary.config(config.CLOUDINARY_CONF)

//If ID replace the old avatar image with upload
const options = id =>  {
  const sharedOptions = {
    format: 'png',
    allowed_formats: ['jpg', 'png']
  }

  if (id) return {
    public_id: id,
    ...sharedOptions
  }

  return {
    folder: 'UserAvatars',
    ...sharedOptions
  }
}

const callback = (resolve, reject, error, result) => {
  if (result) resolve(result)
  if (error) {
    console.log(error)
    reject(error)
  }
}

//Stream the image buffer to cloudinary image hosting
const upload = (file, id = null) => {
  return new Promise((resolve, reject) => {
    const cloudUpload = cloudinary.uploader.upload_stream(
      options(id),
      (error, result) => {
        callback(resolve, reject, error, result)
      }
    )
    streamifier.createReadStream(file.buffer).pipe(cloudUpload)
  })
}

//Delete image from cloudinary
const destroy = id => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      id,
      { invalidate: true },
      (error, result) => {
        callback(resolve, reject, error, result)
      }
    )
  })
}

module.exports = {
  upload,
  destroy
}