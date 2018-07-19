const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    // !announce <announcement>

  if(!args[2]) return message.reply("Did you forget the announcement?");
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No can do pal!");
  let theicon = message.guild.iconURL;
  let announcement = args.slice(1).join(" ");
  let annembed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}`, `${message.author.avatarURL}`)
    .setColor("FFFFFF")
    .setThumbnail(theicon)
    .addField("Tiggles Announcements", announcement)
    .setFooter("Check out Guilded.gg/Tiggles for more News and Announcements!", 
    "http://markpalomino.sitewrench.com/sitefiles/2473/css/images/tiggles/avvy-sq.gif");
  
    let announceChannel = message.guild.channels.find(`name`, "all-chat");
    if (!announceChannel) return message.channel.send("this channel doesn't exist.");

    message.delete().catch(O_o = {});
    announceChannel.send(annembed);  
} 

module.exports.help = {
  name: "announce"
}

