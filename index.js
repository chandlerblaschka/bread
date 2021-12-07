// DEPENDENCIES
const express = require('express')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

//MIDDLEWARE - points at views folder
app.use(express.static('public'))
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
})

app.get('*', (req, res) => {
  res.send('404')
})

// Breads
const breadsController = require('./controllers/breads_controller.js')

//not needed/errors out
//const Index = require('../views/index.jsx')

app.use('/breads', breadsController)

// LISTEN
app.listen(PORT, () => {
  console.log('nomming at port', PORT);
})