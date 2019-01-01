const Discord = require('discord.js');
const mongoose = require("mongoose");
const tokenfile = require("../token.json");
mongoose.connect(tokenfile.mongoMoney, {
  useNewUrlParser: true
});
const Money = require("../models/money.js")

module.exports.run = async (bot, message, args) => {
  await message.delete();

  Money.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, (err, money) => {
      if (err) console.log(err);
      let embed = new Discord.RichEmbed()
        .setTitle("Coins")
        .setColor("#cecece")
        .setThumbnail()
        .setThumbnail(message.author.displayAvatarURL);
      if (!money) {
        embed.addField("Coins", "0", true);
        return message.channel.send(embed).then(embed => {
          embed.delete(7000)
        });
      } else {
        embed.addField("Coins", money.money, true);
        return message.channel.send(embed).then(embed => {embed.delete(7000)});
      }
  })


}

module.exports.help = {
  name: "money"
}