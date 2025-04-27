import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if (!token) {
      return res.status(401).json({ message: 'Not authorized - No token provided' })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!decodedToken) {
      return res.status(401).json({ message: 'Not authorized - Invalid token' })
    }

    const user = await User.findById(decodedToken.userId).select('-password')

    if (!user) {
      return res.status(401).json({ message: 'Not authorized - User not found' })
    }

    req.user = user
    
    next()
  } catch (error) {
    console.error(`Error in protectRoute method: ${error.message || error}`)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default protectRoute
