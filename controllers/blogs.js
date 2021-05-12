const Blog = require('../models/Blogs')
const jwt = require('jsonwebtoken')

module.exports.index = async (req, res) => {
  const { keyword } = req.query
  if (keyword) {
    const foundedTitle = await Blog.find({
      title: keyword,
    }).sort({
      createdAt: -1,
    })
    const foundedBody = await Blog.find({
      $text: { $search: keyword },
    }).sort({
      createdAt: -1,
    })
    const foundedTag = await Blog.find({ tags: keyword }).sort({
      createdAt: -1,
    })
    if (foundedBody || foundedTag || foundedTitle) {
      const allBlogs = [...foundedBody, ...foundedTag, ...foundedTitle]
      res.json(allBlogs)
    }
  } else {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 })
    res.json(allBlogs)
  }
}

module.exports.create = (req, res) => {
  const { author, title, tags, body } = req.body
  const newTags = tags.split(',').map((el) => el.trim())
  const newBlog = new Blog({
    author,
    title,
    tags: newTags,
    body,
  })
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      newBlog.save()
      res.json(newBlog)
      // res.json({ newBlog, ...authData })
    }
  })
}

module.exports.login = (req, res) => {
  const user = {
    id: 43243244,
    username: 'Tamas',
    email: 'tmsmajoros@gmail.com',
  }
  jwt.sign({ user }, 'secretkey', (err, token) => {
    res.json({ token })
  })
}
