const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

// Bring in the required models
const Subject = require('../schemas/Subject')
const User = require('../schemas/User')

// Create a subject
router.post('/subject', auth, async (req, res) => {
  try {
    // find the userID created by the auth 
    const user = await User.findById(req.user.userID)

    // create a new Subject
    const newSubject = new Subject({
      name: req.body.name,
      createdBy: req.user.userID
    })

    // save the new subject
    const subject = await newSubject.save()
    
    // return the subject
    res.json(subject)
  } catch (err) {
    res.status(500).json({ err: 'Error while trying to save subject to database' })
  }
})

// Get all subjects
router.get('/subject', async (req, res) => {
  try {
    const subjects = await Subject.find()
    return res.status(200).json(subjects)
  } catch (err) {
    res.status(500).json({ err: 'Could not retrieve subjects' })
  }
})

// Get a single subject
router.get('/subject/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)

    if (subject) {
      res.status(200).json(subject)
    } else {
      res.status(404).json({ msg: 'The subject with the specified ID does not exist' })
    }
  } catch (err) {
    res.status(500).json({ err: 'Could not retrieve subject'})
  }
})

// Delete a subject
router.delete('/subject/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
    if (subject) {
      await subject.remove()
      res.status(200).json({ msg: 'Delete was successful', data: {}})
    } else {
      res.status(404).json({ msg: 'Could not delete. No subject fount' })
    }
  } catch (err) {
    res.status(500).json({ err: 'Server error - could not remove subject' })
  }
})

// Update a subject
router.put('/subject/:id', async (req, res) => {
  const subject = await Subject.findById(req.params.id)

  try {
    const { name } = req.body
    if (name) {
      const updateSubject = await Subject.findByIdAndUpdate(subject, req.body, {new: true})
      if (updateSubject) {
        res.status(200).json(updateSubject)
      } else {
        res.status(404).json({ msg: 'No subject with that ID exist' })
      }
    } else {
      res.status(400).json({ msg: 'Missing required info' })
    }
  } catch (err) {
    res.status(500).json({ msg: 'Server Error - could not update subject' })
  }
})

module.exports = router