const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Bring in User Model
const User = require('../schemas/User')

// REGISTER NEW USER
router.post('/register/user', async (req, res) => {
  let { name, email, password } = req.body

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }
  
  // hash the password and then set password to the hash
  const hash = bcrypt.hashSync(password, 12)
  password = hash

  try {
    // check if user email already exist
    const user = await User.findOne({ email })

    if (user) return status(400).json({ msg: 'User already exist' })
    
    // create new user
    const newUser = await User.create({ name, email, password })
    return res.status(201).json(newUser)
  } catch (err) {
    return res.status(500).json({ msg: 'Server Error - could not create new user' })
  }
})

module.exports = router