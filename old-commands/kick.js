const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!kUser) return message.channel.send("Can't find user!");
  let kReason = args.join(" ").slice(22);
  // if non-admin tries command
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do, pal!");
  if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
  let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick Report~")
    // dark red
    .setColor("#e20d2d")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);
  let kickChannel = message.guild.channels.find(`name`, `all-chat`);
  if (!kickChannel) return message.channel.send("can't find this channel, bruh");
  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);
  return;

}

module.exports.help = {
  name: "kick"
}