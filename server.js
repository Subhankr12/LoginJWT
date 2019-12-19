const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")
//Import Routes
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

dotenv.config()

const port = process.env.PORT || 5000

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to DB")
)

//Middleware
app.use(cors())
app.use(express.json())

//Route Middleware
app.use("/api/user", authRoute)
app.use("/api/posts", postRoute)

app.listen(port, () => console.log(`Server Up and Running on ${port}`))
