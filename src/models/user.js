const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    index: true
  },
  password: String,
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    address: String
  },
  friendIds: {
    type: [ObjectId],
    ref: 'User',
    index: true
  }
}, { timestamps: true })

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save (next) {
  const currentUser = this
  if (!currentUser.isNew || !currentUser.isModified('password')) { return next() }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(currentUser.password, salt, undefined, (err, hash) => {
      if (err) { return next(err) }
      currentUser.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

module.exports = mongoose.model('User', userSchema)
