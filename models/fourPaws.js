const mongoose = require('mongoose');

const fourPawSchema = mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  dateCreated: Date,
  dateModified: Date,
  name: String,
  birthdate: Date,
  breed: String,
  gender: String,
  isSterilized: Boolean,
  charactere: String,
  activity: String,
  photos: [photoSchema],  
});

const FourPaw = mongoose.model('users', fourPawSchema);

module.exports = FourPaw;