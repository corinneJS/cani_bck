// Route promenades: création d'une promenade
// Auteur : KB
// 
// --------------------------------------------------
var express = require('express');
var router = express.Router();

const Walk = require('../models/walks');
const WalkEvent = require('../models/walkEvents');
const User = require('../models/users');
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

router.post('/create', (req, res) => {
  // CheckBody functions checks that there are fields username, email and passwords in req.body
  if (!checkBody(req.body, [
    'name',
    'environment', 
    'rythme', 
    'description', 
    'token',
  ])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  let valueOfDistance = 0;
  if (req.body.distance >= 0){
    valueOfDistance = req.body.distance;
  } 

  let valueOfDuration = 0;
  if (req.body.duration >= 0){
    valueOfDuration = req.body.duration;
  } 

  let valueOfItinerary = [];
  // Array.isArray(req.body.itinerary) returns true if req.body.itinerary is an array
  if (Array.isArray(req.body.itinerary) && req.body.itinerary.length >= 1){
    valueOfItinerary = req.body.itinerary;
  } 
  
  // Token is used to search userID and username of user who created the walk
  User.findOne({ token: req.body.token }).then(data => {
    if (data === null) {
      // The search with the token has not found any user !
      res.json({ result: false, error: "no user has been found with this token" });
      
    } else {
      // A user has been found using the token
      const newWalk = new Walk({
        name: req.body.name,
        environment: req.body.environment,
        rythme: req.body.rythme,
        distance: valueOfDistance,
        description: req.body.description,
        duration : valueOfDuration,
        dateCreated: new Date,
        dateModified: new Date,
        itinerary: valueOfItinerary,
        userID: data._id,
      });
      console.log("new walk", newWalk)

      newWalk.save().then(newDoc => {
        res.json({ result: true, ID: newDoc._id });
      });
    }
  });
});


module.exports = router;