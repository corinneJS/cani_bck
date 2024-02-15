const mongoose = require('mongoose');

const dogPhotoSchema = mongoose.Schema({
  uri: String,
  dogPhotoName: String,
  isProfilPhoto: Boolean,
 });
 
const dogSchema = mongoose.Schema({
  dogName: String,
  description: String,
  birthdate: Date,
  isFemale: Boolean,
  isSterilized: Boolean,
  traitID: [{ type: mongoose.Schema.Types.ObjectId, ref: "traits" }],
  activityID: [{ type: mongoose.Schema.Types.ObjectId, ref: "activities" }],
  dateCreated: Date,
  dateModified: Date,
  dogPhotos: [dogPhotoSchema],
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  breedID: { type: mongoose.Schema.Types.ObjectId, ref: "breeds" },
});

const Dog = mongoose.model('dogs', dogSchema);

module.exports = Dog;