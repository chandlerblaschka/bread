const express = require('express');
const breads = express.Router();
const Bread = require('../models/bread.js');

// INDEX
breads.get('/', (req, res) => {
  //res.send(Bread)
  res.render("index", {
    breads: Bread
  });
})

// SHOW
breads.get('/:arrayIndex', (req, res) => {
  //res.send(Bread[req.params.arrayIndex])
  if(Bread[req.params.arrayIndex]){
    res.render('show', {
      bread: Bread[req.params.arrayIndex]
    })
  } else {
    res.send("404")
  }
  
});



module.exports = breads;