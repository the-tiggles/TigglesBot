const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

	let {body} = await superagent
	.get(`https://www.reddit.com/r/aww.json`);

	var randIMG = body.data.children[Math.floor(Math.random() * body.data.children.length)].data.url;

	let cuteEmbed = new Discord.RichEmbed()
		.setColor("#ff9900")
		.setTitle("Cute :heart_eyes:")
		.setImage(randIMG);

	var allowed = ["image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp"];
	var found = false;

	allowed.forEach(function(extension) {
		if (randIMG.mimetype == allowed[0] || allowed[1] || allowed[2] || allowed[3] || allowed[4]) {
			found = true;
		}
	})

	if(found) {
		message.channel.send(cuteEmbed);
	}
	else {
		message.channel.send("Oh, this one is a vid! :fire:");
		message.channel.send(cuteEmbed);
	}

}

module.exports.help = {
  name: "cute"
}