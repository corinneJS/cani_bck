const mongoose = require('mongoose');

const walkEventSchema = mongoose.Schema({
  eventName: String,
  eventDate: String,
  eventTime: String,
  eventCity: String,
  dateCreated: Date,
  dateModified: Date,
  walkID: { type: mongoose.Schema.Types.ObjectId, ref: 'walks' },
  dogIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'dogs' }],
});

const WalkEvent = mongoose.model('walkEvents', walkEventSchema );

module.exports = WalkEvent;