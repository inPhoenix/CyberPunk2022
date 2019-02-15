const express = require("express")
const { createPostValidator } = require("../validator")
const { userById } = require("../controllers/user")
const { requireSignin } = require("../controllers/auth")

const { getPosts, createPost, postsByUser } = require("../controllers/post")

const router = express.Router()

router.get("/", getPosts)
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator)

router.get('/posts/by/:userId', requireSignin, postsByUser)

// execute if there is :userId on the url.
// UserById method will trigger validation
router.param("userId", userById)

module.exports = router
