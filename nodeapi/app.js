const express = require("express")
const chalk = require("chalk")
const morgan = require("morgan")
const log = console.log
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const expressValidator = require('express-validator')

dotenv.config()

//db

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  log(chalk.yellow("DB connected"))
})

mongoose.connection.on("error", err => {
  log(chalk.red(`connection error ${err.message}`))
})

const app = express()

// bring in routes
const postRoute = require("./routes/post")
const authRoutes = require("./routes/auth")

// middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())


app.use("/", postRoute)
app.use("/", authRoutes)

const port = process.env.PORT || 8080

app.listen(port, () => {
  log(chalk.blue(`Welcome.... The App is listening to  ${port}`))
})
