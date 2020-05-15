const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Subject = mongoose.model('subject', SubjectSchema)