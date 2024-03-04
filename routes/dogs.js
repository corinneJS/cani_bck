
var express = require("express");
var router = express.Router();

require("../models/connection");
const Dog = require("../models/dogs");


// get dig by ID
router.get("/getdogbyid/:id", (req, res) => {
  if (!req.params.id) {
    res.json({ result: false, error: 'No valid id has been send' });
  } else {
    Dog.findById(req.params.id)
    .populate('userID')
    .populate('breedID')
    .then(dog => {
      if (dog === null) {
        res.json({ result: false, error: "No dog with this id found" });
      } else {
        dogID = dog._id;
        dogName = dog.dogName;
        isFemale = dog.isFemale 
        photoUri = dog.dogPhotos.uri;
        username = dog.userID.username;
        userPhoto = dog.userID.photos;

        res.json({ result: true, dog: {
          dogID,
          dogName,
          isFemale, 
          photoUri,
          username,
          userPhoto,
        }});
      }
    });
  }  
});

// GET le 1er 4pattes par userID
// 
router.get("/first_fromuser/:userID", (req, res) => {
  const userID=  req.params.userID;
  console.log("route first_fromuser ", userID)
  Dog.findOne({ userID})
  .then((data) => {
    console.log(data);
    if (data) {
      console.log(data)
      res.json({ result: true, dog: data });
      return;
    }
    res.json({ result: false, error: "Veuillez ajouter un 4pattes" });
  });
  
  
})

// POST new Dog 
// ajout dog
router.post("/addDog", (req, res) => {
  // Check if the dog has not already been registered
  Dog.findOne({ dogName : req.body.dogName, userID:req.body.userID })
  .then((data) => {
    if (data === null) {
      const newDog = new Dog({
        dogName: req.body.dogName,
        description: req.body.description,
        birthdate: req.body.birthdate,
        isFemale: req.body.isFemale,
        isSterilized: req.body.isSterilized,
        dateCreated: Date,
        dateModified: Date,
        traitID: req.body.traitID,
        activityID: req.body.activityID,
        userID: req.body.userID,
        breedID: req.body.breedID,
        dogPhotos: req.body.dogPhotos,
      });

      newDog.save().then(() => {
        res.json({ result: true});
      });
    } else {
      // Dog already exists in database
      res.json({ result: false, error: "Dog already exists" });
    }
  });
});

// update dog
router.put("/updateDog/:dogID", async (req, res) => {
   try {
    const dogID = req.params.dogID;
    const update = req.body;
    console.log("Reception infoDog du Frontend",update);
    const options = { new: true }; // Pour retourner le document modifié

    const updatedDog = await Dog.findOneAndUpdate({ _id: dogID }, update, options);
     console.log("UpdateDog, retour updatedDog", updatedDog);   
     if (!updatedDog) {
        return res.json({ result: false, error: "updatedog pb" });  
     }    
      return res.json({ result: true, dog: updatedDog });;
    } catch (error){
          res.json({ result: false, error});
    }
  });





router.post("/create", (req,res) => {
const newDog = new Dog({
  dogName: "Olea",
  description: "",
  birthdate: new Date(),
  isFemale: false,
  isSterilized: false,
  traitID: ['65cd466235cbacf79a033e62','65cd466235cbacf79a033e64'],
  activityID: [], 
  dateCreated: new Date(),
  dateModified: new Date(),
  dogPhotos: [{}], 
  userID: '65cd15729a02592f4d2c8810',
  breedID: '65cfc64f91cf1c81a76e0b9b',})
newDog.save();
}); 

module.exports = router;