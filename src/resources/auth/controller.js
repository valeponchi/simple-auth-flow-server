const prisma = require("../../utils/database")

const User = prisma.user

const signup = async (req, res) => {
  const userToCreate = {
    ...req.body,
  }

  if (!userToCreate.email || !userToCreate.password) {
    res.status(400).json({ error: "Missing email or password." })
  }

  try {
    const user = await User.create({
      data: {
        ...userToCreate,
      },
    })

    res.status(201).json({ user })
  } catch (error) {
    console.error("[ERROR] /signup route: ", error)

    if (error.code === "P2002") {
      res.status(501).json({
        error: {
          ...error,
          message: "User already exists.",
        },
      })
    } else {
      res.status(500).json({ error })
    }
  }
}

const signin = async (req, res) => {
  const userCredentials = {
    ...req.body,
  }

  if (!userCredentials.email || !userCredentials.password) {
    res.status(400).json({ error: "Missing email or password." })
  }

  try {
    const user = await User.findUnique({
      where: {
        email: userCredentials.email,
      },
    })

    if (!user) {
      res.status(401).json({ error: "Authentication failed." })
    }

    if (userCredentials.password === user.password) {
      res.status(201).json({ user })
    } else {
      res.status(401).json({ error: "Authentication failed." })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

const protect = async (req, res, next) => {
  const userId = req.headers.authorization

  const user = await User.findUnique({
    where: {
      id: parseInt(userId),
    },
  })

  if (!user) {
    return res.status(401).end()
  }

  req.user = user

  next()
}

const adminRoute = async (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    res.status(401).end()
  } else {
    next()
  }
}

module.exports = {
  signup,
  signin,
  protect,
  adminRoute,
}
