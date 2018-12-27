const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

	let {body} = await superagent
	.get(`https://dog.ceo/api/breeds/image/random`);

	let dogembed = new Discord.RichEmbed()
	.setColor("#ff9900")
	.setTitle("Doggo :dog:")
	.setImage(body.message);

	message.channel.send(dogembed);

  
}

module.exports.help = {
  name: "doggo"
}