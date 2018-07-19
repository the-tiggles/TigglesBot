const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!rUser) return message.channel.send("Couldn't find User.");
  let reason = args.join(" ").slice(22);
  let theirPic = rUser.user.displayAvatarURL;
  let reportEmbed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}'s Report Summary`, `${message.author.avatarURL}`)
    .setColor("#e03721")
    .setThumbnail(theirPic)
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);
  let reportschannel = message.guild.channels.find(`name`, "naughty-or-nice");
  if (!reportschannel) return message.channel.send("Couldn't find reports channel.");
 
  message.delete().catch(O_o = {});
  reportschannel.send(reportEmbed);
}

module.exports.help = {
  name: "report"
}