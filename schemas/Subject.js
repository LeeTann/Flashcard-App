const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
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