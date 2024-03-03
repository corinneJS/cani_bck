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
  WalkEvent.find()
  .populate('walkID')
  .populate('dogIDs')
  .then(data => {
    res.json({ result: true, data: data });
  });
})

router.get("/walkevent/:cityName", (req, res) => {
  if (!req.params.cityName) {
    res.json({ result: false, error: 'No valid city has been send' });
  } else {
    WalkEvent.find({
      eventCity: { $regex: new RegExp(req.params.cityName, "i") },
    }).populate('walkID')
      .populate('dogIDs')
      .then(dataWalkEvents => {
      if (dataWalkEvents === null) {
        res.json({ result: false, error: "No walkEvent in this city found" });
      } else {
        res.json({ result: true, walkEvents: dataWalkEvents });
      }
    });
  }
  
});

router.get("/history/:dogID", async (req, res) => {
  try {
    const dogID = req.params.dogID;
    console.log("Reception dogID du Frontend", dogID);
    if (!dogID) {
      res.json({ result: false, error: "No dog register for a promenade" });
    } else {
      const lstWalkEvents = await WalkEvent.find({ dogIDs: { $in: req.params.dogID } })
      console.log("lstWalkEvents, retour find", lstWalkEvents);   
      if (!lstWalkEvents) {
            res.json({
              result: false,
              error: "No walkEvent for this dog",
            });
          } else {
            res.json({ result: true, event: dataWalkEvents });
          }
        }
      
  } catch (error) {
    res.json({ result: false, error });
  }
});

router.get("/getWalkById/:id", (req, res) => {
  if (!req.params.id) {
    res.json({ result: false, error: 'No valid id has been send' });
  } else {
    Walk.findById(req.params.id).then(walk => {
      if (walk === null) {
        res.json({ result: false, error: "No walk found" });
      } else {
        res.json({ result: true, walk: walk });
      }
    });
  }  
});



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
  let valueOfDogID = "";
  if (req.body.dogID){
    valueOfDogID = req.body.dogID;
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
      console.log("new walk", newWalk);

      newWalk.save().then(newWalkDoc => {
        //res.json({ result: true, ID: newDoc._id });
        if (!checkBody(req.body, [
          'eventName',
          'eventDate', 
          'eventTime', 
          'eventCity', 
        ])) {
          res.json({ result: false, error: 'Missing or empty fields' });
          return;
        }
        const newWalkEvent = new WalkEvent ({
          eventName: req.body.eventName,
          eventDate: req.body.eventDate,
          eventTime: req.body.eventTime,
          eventCity: req.body.eventCity,
          dateCreated: new Date,
          walkID : newWalkDoc._id,
          //dogIDs: valueOfDogID && dogIDs.push(valueOfDogID),
          //dogIDs: valueOfDogID && WalkEvent.dogIDs.update( { $addToSet: { valueOfDogID } } ),
          dogIDs: valueOfDogID && WalkEvent.dogIDs.update( valueOfDogID ),
          registeredUsersIDs: WalkEvent.registeredUsersIDs.update(data._id),
        });
        newWalkEvent.save().then(newWalkEventDoc => {
          console.log("new walk:", newWalk, "new walkEvent:", newWalkEvent );
          res.json({ result: true, walkdID: newWalkDoc._id, walkEventID: newWalkEventDoc._id });          
        });

      });
    }
  });
});

// To register a user and its dog(s) to a walkEvent
router.post('/register', (req, res) => {
  // CheckBody functions checks that there are fields username, email and passwords in req.body
  if (!checkBody(req.body, [
    'eventID',
    'token', 
    'dogID', 
  ])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  
  // Token is used to search userID and username of user to register
  User.findOne({ token: req.body.token }).then(user => {
    if (user === null) {
      // The search with the token has not found any user !
      res.json({ result: false, error: "no user has been found with this token" });
      
    } else {
    // Ici, on cherche si le user est déjà inscrit, c'est-à-dire si l'ID du user se trouve dans
    // registeredUsersIDs
      WalkEvent.findOne({ id: req.body.eventID }).then(event => {
        if (event === null) {
          // The search with the eventID has not found any event !
          res.json({ result: false, error: "no walkEvent has been found with this ID" });
        } else {
          // si le user._id est contenu dans registeredUsersIDs, le user est déjà inscrit
          if (event.registeredUsersIDs.includes(user._id)) {
            res.json({ result: false, error: "User is already registered to this event" });
          } else {
            // Si le user n'est pas déjà inscrit, on l'inscrit
            WalkEvent.updateOne(
              {_id: req.body.eventID},
              {registeredUsersIDs: registeredUsersIDs.push(user._id) },
              ).then(() => {
                WalkEvent.find().then(event => {
                    console.log(event);
                });
            });
          }
          // Ici, on vérifie si le chien est déjà inscrit
          if (event.dogIDs.includes(req.body.dogID)) {
            res.json({ result: false, error: "Dog is already registered to this event" });
          } else {
            // Si le chien n'est pas déjà inscrit, on l'inscrit
            WalkEvent.updateOne(
              {_id: req.body.eventID},
              {dogIDs: dogIDs.push(req.body.dogID) },
              ).then(() => {
                WalkEvent.find().then(event => {
                    console.log(event);
                });
            });
          }
        }
      })
    }
  })
});

module.exports = router;