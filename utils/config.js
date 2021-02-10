require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let JWTSECRET = process.env.SECRET

if (process.env.NODE_ENV !== 'production') {
  console.log('Using test database')
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

let CLOUDINARY_CONF = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
}

module.exports = {
  CLOUDINARY_CONF,
  JWTSECRET,
  MONGODB_URI,
  PORT
}