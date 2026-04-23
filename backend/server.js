const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/db")

const authRoutes = require("./routes/authRoutes")
const grievanceRoutes = require("./routes/grievanceRoutes")

const app = express()

app.use(express.json())
app.use(cors())

connectDB()

app.use("/api", authRoutes)
app.use("/api/grievances", grievanceRoutes)

app.get("/", (req, res) => {
    res.send("API Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})