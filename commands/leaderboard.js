const Discord = require("discord.js");
const botconfig = require("../botconfig");
let purple = botconfig.purple;
let xp = require("../xp.json");


module.exports.run = async (bot, message, args) => {

    let userlist = xp[message.author.id].xp[0];
    let userlvl = xp[message.author.id].level;
    let leaderBoard = new Discord.RichEmbed()

    .setAuthor(message.author.username)
    .setColor(purple)
    .addField("User", userlist, true)
    .addField("Level", userlvl, true);
    console.log("the userlist is " + userlist);
    message.channel.send(leaderBoard);
   

 
}
 
module.exports.help = {
  name: "leaderboard"
}