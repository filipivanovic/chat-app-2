export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmedPassword, gender } = req.body
  } catch (error) {
    console.error(`Error in signup method: ${error.message}`)
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
