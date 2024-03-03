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
  registeredUsersIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

const WalkEvent = mongoose.model('walkEvents', walkEventSchema );

module.exports = WalkEvent;