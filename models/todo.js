const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const todoSchema = new Schema({
  text: {
    type: String,
    trim: true,
    lowercase: true,
    index: true
  },
  done: Boolean,
  ownerId: {
    type: ObjectId,
    require: true,
    index: true,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema)
