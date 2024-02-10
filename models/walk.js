const mongoose = require('mongoose');

const itinerarySchema = mongoose.Schema({
  uri: String,
  name: String,
  isProfilPhoto: Boolean,
 });

const walkSchema = mongoose.Schema({
  name: String,
  environnement: String,
  rythme: String,
  distance: Number,
  description: String,
  itineraries: [itinerarySchema],
  firstname: String,
  lastname: String,
  birthdate: Date,
  isDogOwner: Boolean,
  isProfessional: Boolean,
  isConnected: Boolean,
  isDeactivated: Boolean,
  photos: [photoSchema],  
});

const Walk = mongoose.model('walks', walkSchema);

module.exports = Walk;