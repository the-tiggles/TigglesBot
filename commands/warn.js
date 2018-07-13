const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

	// !warn @someone <reason>
	if(!message.member.hasPermission("VIEW_AUDIT_LOG")) return message.reply("No can do, pal!");
	let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
	if(!wUser) return message.reply("Couldnt find them, yo.");
	if(wUser.hasPermission("ADMINISTRATOR")) return message.reply("They waaaay too kewl");
	let reason = args.join(" ").slice();

	if(!warns[wUser.id]) warns[wUser.id] = {
		warns: 0
	};

	warns[wUser.id].warns++;

	fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
		if (err) console.log(err);
	});

	let warnEmbed = new Discord.RichEmbed()
		.setDescription("Warns")
		.setAuthor(message.author.username)
		.setColor("#fc6400")
		.addField("Warned User", wUser.tag)
		.addField("Warned In", message.channel)
		.addField("Number of Warnings", warns[wUser.id].warns)
		.addField("Reason", reason)

		let warnchannel = message.guild.channels.find(`name`, `naughty-or-nice`);
		if(!warnchannel) return message.reply("Couldn't find channel");

		warnchannel.send(warnEmbed);

		if(warns[wUser.id].warns == 1) {
			let muterole = message.guild.roles.find(`name`, "muted");
			if (!muterole) return message.reply("You should create that role, bruv");

			let mutetime = "30s";
			await(wUser.addRole(muterole.id));
			message.reply(`${wUser.tag} has been temporarily muted`);

			setTimeout(function() {
				wUser.removeRole(muterole.id)
				message.reply(`<@${wUser.id}> has been unmuted.`)
			}, ms(mutetime));
		}

		if(warns[wUser.id].warns == 2) {
			let muterole = message.guild.roles.find(`name`, "muted");
			if (!muterole) return message.reply("You should create that role, bruv");

			let mutetime = "2m";
			await(wUser.addRole(muterole.id));
			message.reply(`${wUser.tag} has been temporarily muted`);

			setTimeout(function() {
				wUser.removeRole(muterole.id)
				message.reply(`<@${wUser.id}> has been unmuted.`)
			}, ms(mutetime));
		}

		if(warns[wUser.id].warns == 3) {
			let muterole = message.guild.roles.find(`name`, "muted");
			if (!muterole) return message.reply("You should create that role, bruv");

			let mutetime = "10m";
			await(wUser.addRole(muterole.id));
			message.reply(`${wUser.tag} has been temporarily muted`);

			setTimeout(function() {
				wUser.removeRole(muterole.id)
				message.reply(`<@${wUser.id}> has been unmuted.`)
			}, ms(mutetime));
		}
		if(warns[wUser.id].warns >= 4) {
			let muterole = message.guild.roles.find(`name`, "muted");
			if (!muterole) return message.reply("You should create that role, bruv");

			let mutetime = "30m";
			await(wUser.addRole(muterole.id));
			message.channel.send(`${wUser.tag} has been temporarily muted`);

			setTimeout(function() {
				wUser.removeRole(muterole.id)
				message.reply(`<@${wUser.id}> has been unmuted.`)
			}, ms(mutetime));
		}
}

module.exports.help = {
  name: "warn"
}