const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

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

    const token = generateToken(newUser)

    return res.status(201).json({ 
        token, 
        message: `Welcome young master ${newUser.name}`,
        userID: newUser.id,
        email: newUser.email
      })
  } catch (err) {
    return res.status(500).json({ msg: 'Server Error - could not create new user' })
  }
})

// LOGIN USER
router.post('/login/user', auth, async (req, res) => {
  let { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  try {
    const user = await User.findOne({ email })
    
    if (!user) return res.status(400).json({ msg: 'User does not exist' })

    // Validate password
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)

      res.status(200).json({ 
        token, 
        message: `Welcome young master ${user.name}`,
        userID: user.id
      })
    } else {
      res.status(401).json({ msg: 'Invalid credentials'})
    }
  } catch (err) {
    res.status(500).json({ msg: 'Server Error - Could not log user in'})
  }
})

// GET LOGIN USER
router.get('/login/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userID)
    console.log(user)
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

function generateToken(user) {
  const payload = {
    userID: user.id,
    name: user.name,
    email: user.email
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, process.env.JWTSECRET, options)
}

module.exports = router