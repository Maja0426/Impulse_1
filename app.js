const express = require('express')
const mongoose = require('mongoose')
const blogRoute = require('./routes/blogs')
const cors = require('cors')
require('dotenv').config()

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB database is connected!')
  })
  .catch((err) => {
    console.log('Something went wrong')
    console.log(err)
  })

const app = express()
const port = 3000 || process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', blogRoute)

app.get('/', (req, res) => {
  res.send('Everything working correctly!')
})

app.get('*', (req, res) => {
  res.send('Page not found! Error 404')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
})
