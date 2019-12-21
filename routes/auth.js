const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { registerValidation, loginValidation } = require("../validation")

router.post("/register", async (req, res) => {
  //Lets validate a data
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //Checking if Email exists
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send("Email Already Exists")
  console.log(req.body.password)
  // //hash passwords
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  try {
    const savedUser = await user.save()
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

//Login
router.post("/login", async (req, res) => {
  //Lets validate a data
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //Checking if Email exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send("Email is not Found")

  //Password is Correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send("Invalid Password")

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header("auth-token", token).send(token)
})

module.exports = router
