const mongoose = require('mongoose');

const traitSchema = mongoose.Schema({
  traitName: String,
  description: String,
  photoUrl:String,
  breedID: { type: mongoose.Schema.Types.ObjectId, ref: 'breeds' }, 
});

const Trait = mongoose.model('traits', traitSchema);

module.exports = Trait;