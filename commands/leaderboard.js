const Discord = require("discord.js");
const mongoose = require('mongoose');
const tokenfile = require("../token.json");
mongoose.connect(tokenfile.mongoMoney, {
  useNewUrlParser: true
});
const Money = require("../models/money.js");

module.exports.run = async (bot, message, args) => {
  await message.delete();

  //grab all of the users in said server

  Money.find({
    serverID: message.guild.id
  }).sort([
    ['money', 'descending']
  ]).exec((err, res) => {
    if (err) console.log(err);
    let embed = new Discord.RichEmbed()
    .setTitle("Moneys Leaderboard")
    // if there are no results
    if (res.length === 0) {
      embed.setColor("#cecece");
      embed.addField("No data found", "Please type in chat to gain moneys!")
      
    } else if (res.length < 10) {
      //less than 10 results
      embed.setColor("#3AFF43");
      for (i = 0; i < res.length; i++) {
        let member = message.guild.members.get(res[i].userID) || "User Left"
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, `**Moneys**: ${res[i].money}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**Moneys**: ${res[i].money}`);
        }
      }
    } else {
      //more than 10 results
      embed.setColor("#3AFF43");
      for (i = 0; i < 10; i++) {
        let member = message.guild.members.get(res[i].userID) || "User Left"
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, `**Moneys**: ${res[i].money}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**Moneys**: ${res[i].money}`);
        }
      }
    }
    message.channel.send(embed);
  })
}

module.exports.help = {
  name: "leaders",
  alias: "leaderboard"
}