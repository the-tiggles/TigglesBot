const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply

}

module.exports.help = {
  name: ""
}