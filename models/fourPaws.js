const mongoose = require('mongoose');

const dogPhotoSchema = mongoose.Schema({
  uri: String,
  name: String,
  isProfilPhoto: Boolean,
 });

const fourPawSchema = mongoose.Schema({
  name: String,
  birthdate: Date,
  gender: String,
  isSterilized: Boolean,
  charactere: String,
  activity: String,
  dateCreated: Date,
  dateModified: Date,
  dogPhotos: [dogPhotoSchema], 
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  breedID: { type: mongoose.Schema.Types.ObjectId, ref: 'breeds' }, 
});

const FourPaw = mongoose.model('fourPaws', fourPawSchema);

module.exports = FourPaw;