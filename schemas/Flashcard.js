const mongoose = require('mongoose')

const FlashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    trim: true,
    required: [true, "Please add a question"]
  },
  answer: {
    type: String,
    trim: true,
    required: [true, "Please provide an answer"]
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
})

module.exports = Flashcard = mongoose.model('flashcard', FlashcardSchema)