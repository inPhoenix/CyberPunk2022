const express = require("express")
const chalk = require("chalk")
const morgan = require("morgan")
const log = console.log
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const expressValidator = require("express-validator")
dotenv.config()

/*
  Database
*/

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  log(chalk.yellow("DB connected"))
})

mongoose.connection.on("error", err => {
  log(chalk.red(`connection error ${err.message}`))
})

const app = express()

/*
  Routes
*/

const postRoute = require("./routes/post")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

/*
  middleware
*/

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use("/", postRoute)
app.use("/", authRoutes)
app.use("/", userRoutes)

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'Unauthorized'});
  }
});

const port = process.env.PORT || 8080

app.listen(port, () => {
  log(chalk.blue(`Welcome.... The App is listening to  ${port}`))
})
