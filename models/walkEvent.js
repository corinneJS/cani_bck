const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  uri: String,
  name: String,
  isProfilPhoto: Boolean,
 });

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  dateCreated: Date,
  dateModified: Date,
  firstname: String,
  lastname: String,
  birthdate: Date,
  isDogOwner: Boolean,
  isProfessional: Boolean,
  isConnected: Boolean,
  isDeactivated: Boolean,
  photos: [photoSchema],  
});

const User = mongoose.model('users', userSchema);

module.exports = User;