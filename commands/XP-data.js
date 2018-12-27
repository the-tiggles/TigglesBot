const Discord = require("discord.js");
const Report = require("../models/report.js");
const mongoose = require("mongoose");
const tokenfile = require("../token.json");




module.exports.run = async (bot, message, args) => {


  await message.delete();
  // if (message.author.id != '464785300221329418') return;
  // console.log("about to connect to mongoose");
  mongoose.connect('tokenfile.mongooseXP', {
    useNewUrlParser: true
  });
  // console.log("we connected to mongoose")

  const report = new Report({
    _id: mongoose.Types.ObjectId(),
    username: message.author.username,
    userID: message.author.username.id,
    xp: message.author.username,
    // username: String,`
    // userID: String,
    // xp: String,
    // level: String
  });
  report.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
  
  message.reply("that xp has been saved to the database!");
}

module.exports.help = {
  name: "experience"
}

// ss