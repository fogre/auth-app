const mongoose = require('mongoose')

const avatarSchema = mongoose.Schema({
  cloudinaryId: String,
  cloudinaryV: Number,
  url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

avatarSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Avatar', avatarSchema)