const mongoose = require('mongoose');

const breedSchema = mongoose.Schema({
  name: String,
  image_link: String,
  good_with_children: Number, 
  good_with_other_dogs : Number, 
  good_with_strangers: Number, 
  shedding : Number, 
  coat_length : Number, 
  trainability : Number, 
  barking : Number, 
  min_life_expectancy: Number, 
  max_life_expectancy: Number, 
  max_height_male : Number, 
  max_height_female : Number, 
  max_weight_male: Number, 
  max_weight_female: Number, 
  min_height_male: Number, 
  min_height_female: Number, 
  min_weight_male: Number, 
  min_weight_female: Number, 
  grooming: Number, 
  drooling: Number, 
  playfulness: Number, 
  protectiveness: Number, 
  energy: Number,
  dateCreated: Date,
  dateModified: Date,
});

const Breed = mongoose.model('breeds', breedSchema);

module.exports = Breed;