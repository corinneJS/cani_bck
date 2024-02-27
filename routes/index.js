var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'caniConnect' });
});
const cloudinary = require("cloudinary").v2;
const uniqid = require("uniqid");
const fs = require("fs");


// CP upload fichiers : Photos
router.post("/upload", async (req, res) => {
  console.log("req.files.photo",req.files.photoFromFront)
  const photoPath = `./tmp/photo.jpg`;
  // const photoPath = `./tmp/${uniqid()}.jpg`;
  const resultMove = await req.files.photoFromFront.mv(photoPath);
   console.log("result.move",resultMove)
  if (!resultMove) {
    const resultCloudinary = await cloudinary.uploader.upload(photoPath);
    res.json({ result: true, url: resultCloudinary.secure_url });
  } else {
    res.json({ result: false, error: resultMove });
  } 

  fs.unlinkSync(photoPath);
});
module.exports = router;
