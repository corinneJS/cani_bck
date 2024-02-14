






var express = require("express");
var router = express.Router();

require("../models/connection");
const Dog = require("../models/dogs");

// GET 1 4pattes par ID
// {baseURL}/dogs?idDog=
router.get("/:idDog", (req, res) => {
  
  Dog.findbyId(req.params.idDog)
  .then((data) => {
    res.json({ result: true, dog: data });
  });
});
module.exports = router;