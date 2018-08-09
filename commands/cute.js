const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

	let {body} = await superagent
	.get(`https://www.reddit.com/r/aww.json`);

	var cuteEmbed = getImage(body);
//   message.channel.send(cuteEmbed);


	


	function getImage(body) {
		// var allowed = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/bmp", "image/webp"];
		var allowed2 = ["jpeg", "jpg", "png", "gif", "bmp", "webp"];
		var randIMG = body.data.children[Math.floor(Math.random() * body.data.children.length)].data.url;
		var linkType = randIMG.substr(randIMG.lastIndexOf('.')).toLowerCase();



		// var found = false;
		
		let cuteEmbed = new Discord.RichEmbed()
			.setColor("#ff9900")
			.setTitle("Cute :heart_eyes:")
			.setImage(randIMG);

		// function getExtension(randIMG) {
		// 	var basename = randIMG.split(/[\\/]/).pop(),  // extract file name from full path ...
		// 											// (supports `\\` and `/` separators)
		// 		pos = basename.lastIndexOf(".");       // get last position of `.`
	
		// 	if (basename === "" || pos < 1)            // if file name is empty or ...
		// 		return "";                             //  `.` not found (-1) or comes first (0)
	
		// 	return basename.slice(pos + 1);            // extract extension ignoring `.`
		// }
	
		// allowed.forEach(function(extension) {
		// 	if (randIMG.mimetype == allowed[0] || allowed[1] || allowed[2] || allowed[3] || allowed[4]) {
		// 		found = true;
		// 	}
		// })


		if ( linkType === '.jpg' || '.jpeg' || '.png' || '.gif') {
			// found = true;
			console.log("woohoo, found something!");
			console.log(randIMG)
			console.log(linkType);
			return message.channel.send(cuteEmbed);
		} 
		else {
			console.log("cannot find any extension - last else.");
			return false;
			
		}
	}
		


		// if (found) {
		// 	console.log(randIMG)
		// 	console.log(getExtension(randIMG));
		// //   return message.channel.send(cuteEmbed);
		// 	return message.channel.send(cuteEmbed);
		// } else {
		// 	return message.channel.send(randIMG);
		// 	// return getImage(body); 
		// }
	
}


module.exports.help = {
  name: "cute"
}