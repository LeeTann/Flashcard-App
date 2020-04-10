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

// Get a single flashcard
router.get('/flashcard/:id', async (req, res) => {
  try {
    const flashcardId = await FlashCard.findById(req.params.id)

    if (flashcardId) {
      return res.status(200).json({
        success: true,
        data: flashcardId
      })
    } else {
      res.status(400).json({
        success: false,
        error: 'No flashcard with that ID found'
      })
    }
    
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
    const flashcardId = await FlashCard.findById(req.params.id)

    if (!flashcardId) {
      return res.status(404).json({
        success: false,
        error: 'Could not delete. No flashcard found'
      })
    } else {
      await flashcardId.remove()

      return res.status(200).json({
        success: true,
        message: 'Delete was successful!',
        data: {},
      })
    }

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
})

// Update a flashcard
router.put('/flashcard/:id', async (req, res) => {
  const id = await FlashCard.findById(req.params.id)

  try {
    const { question, answer } = req.body   
    if (question && answer) {
      const updateCard = await FlashCard.findByIdAndUpdate(id, req.body, {new: true})
      if (updateCard) {
        res.status(200).json(updateCard)
      } else {
        res.status(404).json({ message: 'No flashcard with that ID exist'})
      }
    } else {
      res.status(400).json({ message: 'Missing required info'})
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
})

module.exports = router