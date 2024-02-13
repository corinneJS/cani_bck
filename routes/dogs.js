var express = require("express");
var router = express.Router();

require("../models/connection");
const Dog = require("../models/dogs");

router.get("/dogs/save/:id", (req, res) => {
  // Regex to find dog regardless of name case
  Dog.find({
    dogName: { $regex: new RegExp(req.params.dogname, "i") },
  }).then((data) => {
    res.json({ result: true, dog: data });
  });
});
