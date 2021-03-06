const Discord = require("discord.js");
const ms = require("ms");


module.exports.run = async (bot, message, args) => {

	//!mute @user 1s/m/h/d


	let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	
	// non-admin trying command
	if(!message.member.hasPermission("VIEW_AUDIT_LOG")) return message.reply("Try again when you're older, kid");

	if (!tomute) return message.reply("Couldn't find user.");
	if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
	let muterole = message.guild.roles.find(`name`, "Bottom Barrel Bitch");

	// start of create role
	if(!muterole) {
		try {
			muterole = await message.guild.createRole({
				name: "Bottom Barrel Bitch",
				color: "#000000",
				permissions:[]
			});
			message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions(muterole, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				});
			});
		}catch(e){
			console.log(e.stack);
		}
	} //end of create role

	let mutetime = args[1];
	if(!mutetime) return message.reply("You didn't specify a time!");

	await(tomute.addRole(muterole.id));
	message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

	setTimeout(function(){
		tomute.removeRole(muterole.id);
		message.channel.send(`<@${tomute.id}> has been unmuted!`);
	}, ms(mutetime));

} //end of module

module.exports.help = {
  name: "mute"
}