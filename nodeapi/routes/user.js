const express = require("express")
const { userById, allUsers, getUser, updateUser } = require("../controllers/user")
const { requireSignin } = require("../controllers/auth")

const router = express.Router()


router.get("/users", allUsers)

// get single user: Note that the router.param will intercept this based
// on :userId

router.get("/user/:userId", requireSignin, getUser)
router.put("/user/:userId", requireSignin, updateUser)

// execute if there is :userId on the url.
// UserById method will trigger validation
router.param('userId', userById)

module.exports = router
