const express = require('express');
const breads = express.Router();
const Bread = require('../models/bread.js');

// INDEX
breads.get('/', (req, res) => {
  Bread.find()
      .then(foundBreads => {
          res.render('index', {
              breads: foundBreads,
              title: 'Index Page'
          })
      })
})

breads.get('/new', (req, res) => {
  res.render('new')
})

// CREATE
breads.post('/', (req, res) => {
  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})


//EDIT
breads.get('/:arrayIndex/edit', (req,res) => {
  res.render('edit', {
    bread: Bread[req.params.arrayIndex],
    index: req.params.arrayIndex,
  })
})

// SHOW
// breads.get('/:arrayIndex', (req, res) => {
//   if (Bread[req.params.arrayIndex]) {
//     res.render('Show', {
//       bread:Bread[req.params.arrayIndex],
//       index: req.params.arrayIndex
//     })
//   } else {
//     res.send('404')
//   }
// })
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .then(foundBread => {
      res.render('show', {
        bread: foundBread
      })
    })
    .catch(err => {
      res.send('404')
    })
})


// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread[req.params.arrayIndex] = req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})

// DELETE
//splice removes item from array
breads.delete('/:arrayIndex', (req, res) => {
  Bread.splice(req.params.arrayIndex, 1)
  res.status(303).redirect('/breads')
})


module.exports = breads;