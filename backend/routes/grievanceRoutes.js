const express = require("express")

const Grievance = require("../models/Grievance")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()


// CREATE GRIEVANCE
router.post("/", authMiddleware, async (req, res) => {

  const grievance = new Grievance(req.body)

  await grievance.save()

  res.json(grievance)

})


// GET ALL
router.get("/", authMiddleware, async (req, res) => {

  const grievances = await Grievance.find()

  res.json(grievances)

})


// GET BY ID
router.get("/:id", authMiddleware, async (req, res) => {

  const grievance = await Grievance.findById(req.params.id)

  res.json(grievance)

})


// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {

  const grievance = await Grievance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.json(grievance)

})


// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {

  await Grievance.findByIdAndDelete(req.params.id)

  res.json({ message: "Deleted successfully" })

})


// SEARCH
router.get("/search/title", authMiddleware, async (req, res) => {

  const title = req.query.title

  const grievances = await Grievance.find({
    title: { $regex: title, $options: "i" }
  })

  res.json(grievances)

})

module.exports = router