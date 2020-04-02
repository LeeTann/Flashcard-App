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
  }
})

module.exports = mongoose.model('Flashcard', FlashcardSchema)