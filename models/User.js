var mongoose = require('mongoose');

var User = new mongoose.Schema({
  name: String,
  userid: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', User);