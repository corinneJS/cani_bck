const mongoose = require('mongoose');

const itineraryPointSchema = mongoose.Schema({
  id: Number,
  lat: Number,
  lon: Number,
 });

const walkSchema = mongoose.Schema({
  name: String,
  environment: String,
  rythme: String,
  distance: Number,
  description: String,
  duration : Number,
  dateCreated: Date,
  dateModified: Date,
  itinerary: [itineraryPointSchema],
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

const Walk = mongoose.model('walks', walkSchema);

module.exports = Walk;