const express = require('express')
const validator = require('../validator')

const {getPosts, createPost} = require('../controllers/post')

const router = express.Router()

router.get('/', getPosts)
router.post('/post', validator.createPostValidator, createPost)

module.exports = router

