const Post = require('../models/post')
exports.getPosts = (req, res) => {
  res.json({
    posts: [
      { title: "First post" },
      { title: "Second post" },
      { title: "First post" }
    ]
  })
}


exports.createPost = (req, res) => {
  const post = new Post(req.body)
  console.log('create post', post)
}
