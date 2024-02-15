
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
      res.json({ result: true, dog: data });
      return;
    }
    res.json({ result: false, error: "dog not found" });
  });
  
  
})


/* router.post("/create", (req,res) => {
const newDog = new Dog({
  dogName: "Toupie",
  description: "",
  birthdate: new Date(),
  isFemale: false,
  isSterilized: false,
  traitID: [{ type: mongoose.Schema.Types.ObjectId, ref: "traits" }],
  activityID: [{ type: mongoose.Schema.Types.ObjectId, ref: "activities" }], 
  dateCreated: new Date(),
  dateModified: new Date(),
  dogPhotos: [dogPhotoSchema], 
  userID: '65cd15729a02592f4d2c8810',
  reedID: { type: mongoose.Schema.Types.ObjectId, ref: "breeds" },})
newDog.save();
}); */

module.exports = router;