const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config({ path: '.env'})

function auth(req, res, next) {
  const token = req.header('Authorization')

  // check for token
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" })

  try {
    // verify token
    const verifiedToken = jwt.verify(token, process.env.JWTSECRET)

    req.user = verifiedToken
    next()
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' })
  }
}

module.exports = auth