const mongoose = require("mongoose");

const moneySchema = mongoose.Schema({
  username: String,
  money: Number,
  userID: String,
  serverID: String
})

module.exports = mongoose.model("Money", moneySchema)