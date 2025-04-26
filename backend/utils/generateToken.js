import jwt from 'jsonwebtoken'

const generateTokendAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d'
  })
  res.cookie('jwt', token, {
    maxAge: 1000 * 60 * 60 * 24 * 15, // miliseconds
    httpOnly: true, // prevent XSS attacks - cross-site scripting attacks
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development'
  })
}

export default generateTokendAndSetCookie
