const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const FlashCard = require('../schemas/Flashcard')
const Subject = require('../schemas/Subject')
const User = require('../schemas/User')

// Create a flashcard belongs to subject id.
router.post('/flashcard/subject/:id', auth, async (req, res) => {
  try {
    // find the subject id
    const subject = await Subject.findById(req.params.id)
    if (subject) {
      // check if created by id is equal to user ID with auth
      if (subject.createdBy.toString() === req.user.userID) {
        //create a new flashcard
        const newFlashcard = new FlashCard({
          question: req.body.question,
          answer: req.body.answer,
          subject: req.params.id,
          createdBy: req.user.userID
        })
        // save the new flashcard
        const flashcard = await newFlashcard.save()
        // return the json response of flashcard
        res.json(flashcard)
      } else {
        res.status(404).json({ msg: 'Could not add flashcard. Not authorized.'})
      }
    } else {
      res.status(404).json({ msg: 'No subject found to add flashcard'})
    }
  } catch (err) {
    res.status(500).json({ err: 'Server Error - can not save flashcard' })
  }
})

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

// Get all flashcards by subject
router.get('/flashcard/subject/:id', auth, async (req, res) => {
  try {
    const flashcards = await FlashCard.find({ subject: req.params.id })

    if (flashcards) {
      return res.status(200).json(flashcards)
    } else {
      res.status(404).json({ msg: 'Flashcards by subject id not found' })
    }
  } catch (err) {
    res.status(500).json({ err: 'Server error - could not retrieve flashcards' })
  }
})

// Get a single flashcard
router.get('/flashcard/:id', async (req, res) => {
  try {
    const flashcard = await FlashCard.findById(req.params.id)
    if (flashcard) {  
      if (flashcard.createdBy.toString() === req.user.userID) {
        return res.status(200).json(flashcard)
      } else {
        res.status(404).json({ msg: 'Not yours.... could not get. Not authorized' })
      }
    } else {
      res.status(400).json({ error: 'No flashcard with that ID found' })
    }  
  } catch (err) {
    return res.status(500).json({ error: 'Server Error' })
  }
})

router.delete('/flashcard/:id', auth, async (req, res) => {
  try {
    const flashcard = await FlashCard.findById(req.params.id)
    console.log(flashcard)
    if (flashcard) {
      if (flashcard.createdBy.toString() === req.user.userID) {
        await flashcard.remove()
        res.status(200).json({ msg: 'Delete was successful', data: {} })
      } else {
        res.status(404).json({ msg: 'Not yours.... could not delete. Not authorized' })
      }
    } else {
      res.status(404).json({ msg: 'Could not delete. No flashcard found' })
    }
  } catch (err) {
    res.status(500).json({ err: 'Server error - could not remove flashcard' })
  }
})

// Update a flashcard
router.put('/flashcard/:id', auth, async (req, res) => {
  const flashcard = await FlashCard.findById(req.params.id)

  try {
    const { question, answer } = req.body   
    if (question && answer) {
      if (flashcard.createdBy.toString() === req.user.userID) {
        const updateCard = await FlashCard.findByIdAndUpdate(flashcard, req.body, {new: true})
        res.status(200).json(updateCard)
      } else {
        res.status(404).json({ message: 'You did not create this flashcard and not authorized to edit'})
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