






var express = require("express");
var router = express.Router();

require("../models/connection");
const Breed = require("../models/breeds");


// GET 1 race par ID
// {baseURL}/breeds?idBreed=
router.get("/:idBreed", (req, res) => {
  
  Breed.findbyId(req.params.idBreed)
  .then((data) => {
    res.json({ result: true, breed: data });
  });
});
router.get("/", async (req, res) => {
  try {
    const breeds = await Breed.find();
    if (!breeds) {
      return res.json({ result: false, error: "Races de Chiens " });
    }
    res.json({ result: true, breed: breeds });
  } catch (error) {
    res.json({ result: false, error });
  }
});
module.exports = router;