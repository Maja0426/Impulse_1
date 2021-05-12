const express = require('express')
const router = express.Router()
const blogs = require('../controllers/blogs')
const verifyToken = require('../middleware/middleware')

router.get('/posts', blogs.index)

router.post('/posts', verifyToken, blogs.create)

router.post('/login', blogs.login)

module.exports = router
