import User from '../backend/models/user.model.js'

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUsers = req.user._id
    const filteredUsers = await User.find({ _id: { $ne: loggedInUsers } }).select('-password')

    res.status(200).json(filteredUsers)
  } catch (error) {
    console.error(`Error in getUsersForSidebar method: ${error.message || error}`)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
