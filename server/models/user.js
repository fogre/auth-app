const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
/*eslint-disable */
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
/*eslint-enable */

const userSchema = mongoose.Schema({
  name: String,
  bio: String,
  phone: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    match: [emailRegex, 'Please enter valid email address']
  },
  avatar: {
    cloudinaryId: String,
    cloudinaryV: Number,
    url: String,
  },
  githubAccount: String,
  passwordHash: String
})

userSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.githubAccount
    delete returnedObj.passwordHash
  }
})
userSchema.plugin(
  uniqueValidator,
  { message: 'An account for {VALUE} already exists' }
)
const User = mongoose.model('User', userSchema)

module.exports = User