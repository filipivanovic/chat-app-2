import bcryptjs from 'bcryptjs'
import User from '../backend/models/user.model.js'
import generateTokendAndSetCookie from '../backend/utils/generateToken.js'

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' })
    }

    const user = await User.findOne({ username })

    if (user) {
      return res.status(400).json({ message: 'Username already exists' })
    }
    //   hash password here
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
    })

    if (newUser) {
      // Generate jwt
      generateTokendAndSetCookie(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    console.error(`Error in signup method: ${error}`)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
  } catch (error) {
    console.error(`Error in login method: ${error.message}`)
  }
}

export const logout = async (req, res) => {
  try {
  } catch (error) {
    console.error(`Error in logout method: ${error.message}`)
  }
}
