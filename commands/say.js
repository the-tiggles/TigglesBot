const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // !say Hi!

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No. Oof.");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
}

module.exports.help = {
  name: "say"
}