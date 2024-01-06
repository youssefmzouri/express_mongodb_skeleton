import mongoose, { ConnectOptions, Document } from 'mongoose'
const connectionString = process.env.MONGO_DB_URI ?? ''

// connection to mongo
const options: ConnectOptions = {}

mongoose.connect(connectionString, options)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(error => console.error('Error connecting to MongoDB:', error.message))

process.on('uncaughtException', (error) => {
  mongoose.disconnect()
    .then(() => console.log('Disconnected from MongoDB!'))
    .catch((err: Error) => console.error('Error  disconnecting from MongoDB:', err.message))
    .finally(() => {
      console.error('Unhandled error: ', error.message)
    })
})

export { mongoose, Document }
