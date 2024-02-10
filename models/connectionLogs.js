const mongoose = require('mongoose');

const connectionLogSchema = mongoose.Schema({
  dateLoggedIn: Date,
  dateLoggedOff: Date,
  dateCreated: Date,
  dateModified: Date,
  actions: [String], 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

const ConnectionLog = mongoose.model('connectionLogs', connectionLogSchema);

module.exports = ConnectionLog;