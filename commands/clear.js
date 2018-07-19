const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!clear <number>


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry you can't use this command!");
  let dmUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(isNaN(args[0])) return message.channel.send("**ERROR:** _Please supply a valid number of messages to purge._");
  if(args[0] > 100) return message.channel.send("**ERROR:** _Please supply a number less than 100._")

  await message.delete();
  await message.channel.bulkDelete(args[0])
    // .then(messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages.**`))
    .catch(error => message.channel.send(`**ERROR:** _${error}_`));
}

module.exports.help = {
  name:"clear"
}