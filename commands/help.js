const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let boticon = bot.user.displayAvatarURL;
    let helpEmbed = new Discord.RichEmbed()
        .setDescription("Helpful helps")
        .setColor("#ffffff")
        .setThumbnail(boticon)
        .addField("Commands", "```!8ball <question> - Get instant answer to that burning question.``` ```!botinfo - info about yours truly!``` ```!commend @user <reason> - Give mad props to someone, and put em on blast.``` ```!doggo - good boyo incoming!``` ```!report @user <reason> - Publicly shame someone``` ```!reportp @user <reason> - Privately shame someone to admin(s)``` ```!serverinfo - The first step in self-awareness```", true)
        .addBlankField()
        .addField("Moderation", "```!announce <your message here> - Pretty embed for something important``` ```!kick @user - gives em the boot``` ```!clear <number> - deletes the last X msgs in channel``` ```!mute @user <number>s/m/h - Silences user for X secs, mins, or hrs.``` ```!roleadd @user <name of role> - Bestows existing role to user.``` ```!roledel @user <name of role> - Removes assigned role from user. :(``` ```!warn @user <reason> - temp mutes user, and logs why. 1st - 10s; 2nd - 20s; 3rd+ - 30min.```", true)
        .setURL('https://github.com/tiggaaaaah/TigglesBot')
        .setFooter("Check out Guilded.gg/Tiggles for more News and Announcements!", 
    "http://markpalomino.sitewrench.com/sitefiles/2473/css/images/tiggles/avvy-sq.gif");
      
    return message.channel.send(helpEmbed);



}

module.exports.help = {
  name: "help"
}