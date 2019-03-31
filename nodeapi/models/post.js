const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
    minlength: 4,
    maxlength: 150
  },

  body: {
    type: String,
    required: "Body is required",
    minlength: 4,
    maxlength: 200
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  postedBy: {
    type: ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: ObjectId, ref: "User" }
    }
  ]
})

module.exports = mongoose.model("Post", postSchema)
