const mongoose = require("mongoose");

const xpSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  userID: String,
  xp: String,
  level: String
});

module.exports = mongoose.model("Experience", xpSchema)