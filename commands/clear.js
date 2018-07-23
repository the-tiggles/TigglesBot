const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!clear <number>


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Oof, you can't do this yet, bud. !");
  if(!args[0]) return message.channel. send("oof");
  let dmUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(isNaN(args[0])) return message.channel.send("Bro, that ain't no number.");
  if(args[0] > 100) return message.channel.send("That's waay too many messages. C'mon now.")

  await message.delete();
  await message.channel.bulkDelete(args[0])
    // .then(messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages.**`))
    .catch(error => message.channel.send(`**ERROR:** _${error}_`));
}

module.exports.help = {
  name:"clear"
}