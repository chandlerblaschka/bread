const express = require('express');
const breads = express.Router();
const Bread = require('../models/bread.js');
const seed = require('../models/seed.js');
const Baker = require('../models/baker.js')

// Index:
//look into method for displaying multiple or option to skip or option to change how many are seen 5/10/25/all etc
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean()
  const foundBreads = await Bread.find().limit(5).lean()
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})

breads.get('/new', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      res.render('new', {
        bakers: foundBakers
      })
    })
})


// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})


//CREATE SEED 
breads.get('/data/seed', (req, res) => {
  Bread.insertMany(seed)
    .then(createdBreads => {
      res.redirect('/breads')
    })
})

//EDIT
// breads.get('/:arrayIndex/edit', (req,res) => {
//   res.render('edit', {
//     bread: Bread[req.params.arrayIndex],
//     index: req.params.arrayIndex,
//   })
// })
// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.findById(req.params.id)
        .then(foundBread => {
          res.render('edit', {
            bread: foundBread,
            bakers: foundBakers
          })
        })
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
// breads.get('/:id', (req, res) => {
//   Bread.findById(req.params.id)
//     .populate('baker')
//     .then(foundBread => {
//       const bakedBy = foundBread.getBakedBy()
//       // console.log(bakedBy)
//       res.render('show', {
//         bread: foundBread
//       })
//     })
//     .catch(err => {
//       res.send('404')
//     })
// })
breads.get("/:id", (req, res, next) => {
  Bread.findById(req.params.id)
    .populate("baker")
    .then((foundBread) => {
      res.render("show", {
        bread: foundBread,
      });
    })
    .catch((err) => {
      next(err);
    });
});


// UPDATE
// breads.put('/:arrayIndex', (req, res) => {
//   if(req.body.hasGluten === 'on'){
//     req.body.hasGluten = true
//   } else {
//     req.body.hasGluten = false
//   }
//   Bread[req.params.arrayIndex] = req.body
//   res.redirect(`/breads/${req.params.arrayIndex}`)
// })
breads.put('/:id', (req, res) => {
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(updatedBread => {
      console.log(updatedBread)
      res.redirect(`/breads/${req.params.id}`)
    })
})



// DELETE
//splice removes item from array
// breads.delete('/:arrayIndex', (req, res) => {
//   Bread.splice(req.params.arrayIndex, 1)
//   res.status(303).redirect('/breads')
// })
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
    .then(deletedBread => {
      res.status(303).redirect('/breads')
    })
})

module.exports = breads;