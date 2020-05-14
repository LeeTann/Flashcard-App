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
router.get('/subject', async (req, res) => {
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

module.exports = router