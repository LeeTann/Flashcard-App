const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectMongoDB = require('./db/db')

const flashCardRouter = require('./routes/flashcards')
const authRouter = require('./routes/auth')

// Initialize express app
const app = express()

// Bodyparser middleware
app.use(express.json())

// DB config
dotenv.config({ path: '.env'})

// Connect to MongoDB
connectMongoDB()

// Connect routes to app
app.use('/api', flashCardRouter)
app.use('/api', authRouter)


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => res.status(200).json({ api: "Server up and running"}))

// process.env is how you access the global config file
const PORT = process.env.PORT || 5000

// Run server
app.listen(PORT, console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} Mode`.yellow.bold))