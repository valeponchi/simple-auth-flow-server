const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET

const createToken = user => {
  return jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" })
}

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, payload) => {
      if (error) reject(error)

      resolve(payload)
    })
  })
}

module.exports = {
  createToken,
  verifyToken,
}
