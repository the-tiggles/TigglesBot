const Discord = require("discord.js");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {


  await message.delete();
  xp.find({
    serverID: message.guild.id
  }).sort([
    ['xp', 'descending']
  ]).exec((err, res) => {
    if (err) console.log(err);

    let embed = new Discord.RichEmbed()
      .setTitle("xp Leaderboard")

    // if there are no results
    if (res.length === 0) {
      embed.setColor("#cecece");
      embed.addField("No data found", "Please type in chat to gain xp!")
    } else if (res.length < 10) {
      embed.setColor("#3AFF43");
      for (i = 0; i < res.length; i++) {
        let member = message.guild.members.get(res[i].userID) || "User Left"
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, `**XP**: ${res[i].xp}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**XP**: ${res[i].xp}`);
        }
      }
    } else {
      // more than 10 results
      embed.setColor("#3AFF43");
      for (i = 0; i < 10; i++) {
        let member = message.guild.members.get(res[i].userID) || "User Left"
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, `**XP**: ${res[i].xp}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**XP**: ${res[i].xp}`);
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