// Route promenades: création d'une promenade
// Auteur : KB
// 
// --------------------------------------------------

var express = require('express');
var router = express.Router();

const Walk = require('../models/walks');
const WalkEvent = require('../models/walkEvents');
const { checkBody } = require('../modules/checkBody');


router.get('/allwalks', (req, res) => {
  Walk.find().then(data => {
    res.json({ result: true, data: data });
  });
})

router.get('/allwalkevents', (req, res) => {
  WalkEvent.find().then(data => {
    res.json({ result: true, data: data });
  });
})


module.exports = router;