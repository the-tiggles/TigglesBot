const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let cUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!cUser) return message.channel.send("Couldn't find User.");
  let reason = args.join(" ").slice(22);
  let theirPic = cUser.user.displayAvatarURL;
  let commendEmbed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}'s Report Summary`, `${message.author.avatarURL}`)
    .setColor("#95ff52")
    .setThumbnail(theirPic)
    .addField("Commended User", `${cUser} with ID: ${cUser.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);
  let commendchannel = message.guild.channels.find(`name`, "naughty-or-nice");
  if (!commendchannel) return message.channel.send("Couldn't find reports channel.");
 
  message.delete().catch(O_o = {});
  commendchannel.send(commendEmbed);
}

module.exports.help = {
  name: "commend"
}