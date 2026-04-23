const express = require("express")
const router = express.Router()

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Student = require("../models/Student")


// ================= REGISTER =================

router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body

    // CHECK DUPLICATE EMAIL
    const userExists = await Student.findOne({ email })

    if (userExists) {
      return res.status(400).json({
        message: "Email already exists"
      })
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10)

    // CREATE USER
    const user = new Student({
      name,
      email,
      password: hashedPassword
    })

    await user.save()

    res.json({
      message: "User registered successfully"
    })

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    })

  }

})


// ================= LOGIN =================

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await Student.findOne({ email })

    // INVALID EMAIL
    if (!user) {
      return res.status(400).json({
        message: "Invalid email"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    // INVALID PASSWORD
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      message: "Login successful",
      token: token
    })

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    })

  }

})

module.exports = router