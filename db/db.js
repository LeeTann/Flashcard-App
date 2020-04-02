const mongoose = require('mongoose')
const config = require('config')

const db = config.get('MONGO_URI')

const connectMongoDB = async () => {
  try {
    const connect = await mongoose.connect(db, {
      // check for errors in mongoDB
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })

    console.log(`MongoDB Connect: ${connect.connection.host}`.green.underline.bold)
  } catch (err) {
    console.log(`Error: ${err.message}`.red.bold)
    process.exit(1)
  }
}

module.exports = connectMongoDB