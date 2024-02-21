
var express = require("express");
var router = express.Router();

require("../models/connection");
const Dog = require("../models/dogs");


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
    res.json({ result: false, error: "dog not found" });
  });
  
  
})


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