const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Subject = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

module.exports = mongoose.model('subject', Subject)