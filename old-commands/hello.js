const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

	// !hello

  	return message.channel.send("Hello!");
}

module.exports.help = {
  name: "hello"
}