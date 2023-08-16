const storeUserController = require('./controllers/storeUser')
const newUserController = require('./controllers/newUser')
const validateMiddleware = require('./middleware/validationMiddleware')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const ejs = require('ejs')
const express = require('express')
const app = new express()
app.use(fileUpload())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/posts/store',validateMiddleware)
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

app.listen(4000, () => {
  console.log('App listening on port 4000')
})

const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/posts/new', newPostController)
app.post('/posts/store', storePostController)
app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController)
