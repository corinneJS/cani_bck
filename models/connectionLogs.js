const mongoose = require('mongoose');

const connectionLogSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  dateLoggedIn: Date,
  dateLoggedOff: Date,
  actions: [String], 
});

const ConnectionLog = mongoose.model('connectionLogs', connectionLogSchema);

module.exports = ConnectionLog;