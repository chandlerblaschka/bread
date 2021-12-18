// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

// baker.get('/data/seed', (req, res) => {
//     Baker.insertMany(bakerSeedData)
//         .then(res.redirect('/breads'))
// })

//async await version
baker.get("/data/seed", async (req, res) => {
    try {
        await Baker.insertMany(bakerSeedData)
        res.redirect("/breads")
    } catch (err) {
        res.send("ERROR")
    }
})

// export
module.exports = baker                    