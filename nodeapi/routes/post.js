const express = require('express')
const validator = require('../validator')

const postController = require('../controllers/post')

const router = express.Router()

router.get('/', postController.getPosts)
router.post('/post', validator.createPostValidator, postController.createPost)

module.exports = router

