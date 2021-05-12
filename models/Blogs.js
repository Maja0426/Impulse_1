const mongoose = require('mongoose')

const Blogsschema = new mongoose.Schema({
  author: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    index: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  body: {
    type: String,
    index: true,
  },
})

Blogsschema.index({ title: 'text', body: 'text' })

const Blog = mongoose.model('Blog', Blogsschema)

module.exports = Blog
