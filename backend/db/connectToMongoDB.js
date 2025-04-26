import mongoose from 'mongoose'

const connectToMongoDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URI)
    console.log(`Connected to MongoDB: ${db.connection.host}`)
  } catch (error) {
    console.error(`Error in connectToMongoDB method: ${error.message}`)
  }
}

export default connectToMongoDB
