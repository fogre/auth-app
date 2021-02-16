require('dotenv').config()

let PORT = process.env.PORT
let JWTSECRET = process.env.SECRET
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'development') {
  console.log('Using development database')
  MONGODB_URI = process.env.DEV_MONGODB_URI
}

if (process.env.NODE_ENV === 'test') {
  console.log('Using test database')
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

let CLOUDINARY_CONF = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
}

let GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
let GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
let GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL

module.exports = {
  CLOUDINARY_CONF,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
  JWTSECRET,
  MONGODB_URI,
  PORT
}