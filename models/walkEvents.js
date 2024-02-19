const mongoose = require('mongoose');

const walkEventSchema = mongoose.Schema({
  eventName: String,
  eventDate: Date,
  eventTime: Date,
  eventCity: String,
  dateCreated: Date,
  dateModified: Date,
  walkID : { type: mongoose.Schema.Types.ObjectId, ref: 'fourPaws' },
  fourPawsIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fourPaws' }],
});

const WalkEvent = mongoose.model('walkEvents', walkEventSchema );

module.exports = WalkEvent;