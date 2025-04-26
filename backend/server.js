import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.route.js'
import connectToMongoDB from './db/connectToMongoDB.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use('/api/auth', authRoutes)

// app.get('/', (req, res) => {
//   // root route http://localhost:5000/
//   res.send('Hello World!')
// })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectToMongoDB()
  console.log('Connected to MongoDB')
})
