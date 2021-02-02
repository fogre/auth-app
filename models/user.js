const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
/*eslint-disable */
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
/*eslint-enable */

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Email required'],
    unique: true,
    match: [emailRegex, 'Please enter valid email']
  },
  passwordHash: String,
  name: String,
  phone: String,
  bio: String,
  photo: { data: Buffer, contentType: String }
})

userSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})
userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema)

module.exports = User