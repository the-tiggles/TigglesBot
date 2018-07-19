const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let boticon = bot.user.displayAvatarURL;
    let helpEmbed = new Discord.RichEmbed()
        .setDescription("Helpful helps")
        .setColor("#ffffff")
        .setThumbnail(boticon)
        .addField("Field1", "this is the value");
    return message.channel.send(helpEmbed);



}

module.exports.help = {
  name: "help"
}