const express = require('express')
const router = express.Router()

const Subject = require('../schemas/Subject')

// Create a subject
router.post('/subject', async (req, res) => {
  try {
    const { name } = req.body

    const subject = await Subject.create(req.body)
    if (subject) {
      res.status(201).json(subject)
    } else {
      res.status(400).json({ msg: 'Please provide the name of subject' })
    }
  } catch (err) {
    res.status(500).json({ err: 'Error while trying to save subject to databse' })
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