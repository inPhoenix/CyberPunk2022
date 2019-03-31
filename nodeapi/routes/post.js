const express = require("express")
const {
  postById,
  getPosts,
  createPost,
  postsByUser,
  isPoster,
  deletePost,
  updatePost,
  singlePost,
  comment,
  uncomment
} = require("../controllers/post")
const { createPostValidator } = require("../validator")
const { userById } = require("../controllers/user")
const { requireSignin } = require("../controllers/auth")

const router = express.Router()

router.get("/posts", getPosts)

// comments
router.put('/post/comment', requireSignin, comment)
router.put('/post/uncomment', requireSignin, uncomment)


router.get('/post/:postId', singlePost)
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator)
router.get("/posts/by/:userId", postsByUser)
router.put('/post/:postId', requireSignin, isPoster, updatePost)
router.delete('/post/:postId', requireSignin, isPoster, deletePost)

// execute if there is :param on the url.
router.param("userId", userById)
router.param("postId", postById)

module.exports = router
