const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectMongoDB = require('./db/db')

dotenv.config({ path: '.env'})

// Connect to MongoDB
connectMongoDB()

// Initialize express app
const app = express()

app.get('/', (req, res) => res.send('Hello. Testing server'))

// process.env is how you access the global config file
const PORT = process.env.PORT || 5000

// Run server
app.listen(PORT, console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} Mode`.yellow.bold))