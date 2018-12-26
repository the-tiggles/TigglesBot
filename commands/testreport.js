const Discord = require("discord.js");

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/Reports');

module.exports.run = async (bot, message, args) => {


  //,report @bob this is the reason
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!rUser) return message.channel.send("Couldn't find User.");
  let reason = args.join(" ").slice(22);
  let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#e03721")
    .addField("Reported user", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);
  let reportschannel = message.guild.channels.find(`name`, "cookie-jar");
  if (!reportschannel) return message.channel.send("Couldn't find reports channel.")
  
  message.delete().catch(O_o = {});
  reportschannel.send(reportEmbed);
  // return;
}

module.exports.help = {
  name: "reportp"
}

// s