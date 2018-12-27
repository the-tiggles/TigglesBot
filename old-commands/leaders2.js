const Discord = require("discord.js");
let xp = require("../xp.json");
let xpdata = eval("../xp.json");
let results = xpdata['results'];

results.sort(function(a, b) {
  //return a.attributes.xp - b.attributes.xp;
  if (a.attributes.xp == b.attributes.xp)
    return 0;
  if (a.attributes.xp < b.attributes.xp)
    return -1;
  if (a.attributes.xp > b.attributes.xp)
    return 1;
})

module.exports.run = async (bot, message, args) => {

console.log("about to do something")
  await message.delete();
  

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
          embed.addField(`${i + 1}. ${member}`, `**XP**: ${res[i].results}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**XP**: ${res[i].results}`);
        }
      }
    } else {
      // more than 10 results
      embed.setColor("#3AFF43");
      for (i = 0; i < 10; i++) {
        let member = message.guild.members.get(res[i].userID) || "User Left"
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, `**XP**: ${res[i].xpdata}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**XP**: ${res[i].xpdata}`);
        }
      }

    }

    message.channel.send(embed);
  }




module.exports.help = {
  name: "leaders2",
  alias: "leaderboard2"
}