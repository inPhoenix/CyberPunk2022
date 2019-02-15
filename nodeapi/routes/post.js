const express = require("express")
const { createPostValidator } = require("../validator")
const { userById } = require("../controllers/user")
const { requireSignin } = require("../controllers/auth")

const { getPosts, createPost } = require("../controllers/post")

const router = express.Router()

router.get("/", getPosts)
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator)

// execute if there is :userId on the url.
// UserById method will trigger validation
router.param("userId", userById)

module.exports = router
