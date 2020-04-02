const express = require('express')
const router = express.Router()

const FlashCard = require('../schemas/Flashcard')

// Get all flashcards
router.get('/flashcard', async (req, res) => {
  try {
    const flashcards = await FlashCard.find()

    return res.status(200).json({
      success: true,
      count: flashcards.length,
      data: flashcards
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
})

// Add a flashcard
router.post('/flashcard', async (req, res) => {
  try {
    const { question, answer } = req.body

    const flashcard = await FlashCard.create(req.body)

    return res.status(201).json({
      success: true,
      data: flashcard
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
})

// Delete a flashcard
router.delete('/flashcard/:id', async (req, res) => {
  try {
    const flashcard = await FlashCard.findById(req.params.id)

    if (!flashcard) {
      return res.status(404).json({
        success: false,
        error: 'Count not delete. No flashcard found'
      })
    }

    await flashcard.remove()

    return res.status(200).json({
      success: true,
      data: {}
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
})

module.exports = router