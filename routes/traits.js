






var express = require("express");
var router = express.Router();

require("../models/connection");
const Trait = require("../models/traits");

// GET 1 race par ID
// {baseURL}/traits?idTrait=
router.get("/:idTrait", (req, res) => {
  
  Trait.findbyId(req.params.idTrait)
  .then((data) => {
    res.json({ result: true, trait: data });
  });
});
module.exports = router;