require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let JWTSECRET = process.env.SECRET

if (process.env.NODE_ENV !== 'production') {
  console.log('Using test database')
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  JWTSECRET,
  MONGODB_URI,
  PORT
}