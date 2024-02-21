






var express = require("express");
var router = express.Router();

require("../models/connection");
const Trait = require("../models/traits");

// GET 1 trait par ID

router.post("/traitByID/", async (req, res) => {
  try{
    const trait = await Trait.findbyId(req.body.traitID);
      if(!trait) {
        return res.json({ result: false, error: "Trait de Caractère " });
      }
      res.json({ result: true, trait: trait });
     
      } catch (error){
          res.json({ result: false, error});
      }
  
});

// GET all traits

router.get("/", async (req, res) => {
   try{
    const traits = await Trait.find();
      if(!traits) {
        return res.json({ result: false, error: "Trait de Caractère " });
      }
      res.json({ result: true, trait: traits });
     
      } catch (error){
          res.json({ result: false, error});
      }
  
});





module.exports = router;