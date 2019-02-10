const express = require("express")
const { userById, allUsers } = require("../controllers/user")

const router = express.Router()


router.get("/users", allUsers)

// execute if there is :userId on the url.
// UserById method will trigger validation
router.param('userId', userById)

module.exports = router
