/**
 *
 * TigglesBot
 * @link https://github.com/tiggaaaaah/TigglesBot
 * Design/Dev: Tiggles
 *
 */

const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const bot = new Discord.Client({
  disableEveryone: true
});




// ================================
//  Index
// ================================
//
// 1 - Start-up
// 2 - Commands
//
//
//
//
//
//
//


// ================================
//  1 - Start-up
// ================================
//

// Online success message and game he playing
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("yo mama", {
    type: "LISTENING"
  });
  // bot.user.setGame("Tickling!");
  bot.user.setAvatar("./img/penguin-avatar.png");
  bot.user.setUsername("TigglesBot");
});


// ================================
//  2 - Commands
// ================================
//


bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  // Botinfo
  if (cmd === `${prefix}botinfo`) {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
      .setDescription("Bot Information")
      .setColor("#2dfccf")
      .setThumbnail(bicon)
      .addField("Bot Name", bot.user.username);
    // .addField("Created On", bot.user.createdAt);

    return message.channel.send(botembed);
  }

  // Hello
  if (cmd === `${prefix}hello`) {
    return message.channel.send("Hello!");
  }

  // Report-Public
  if (cmd === `${prefix}report`) {
    //,report @bob this is the reason
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send("Couldn't find User.");
    let reason = args.join(" ").slice(22);
    let reportEmbed = new Discord.RichEmbed()
      .setDescription("Report Summary")
      .setColor("#e03721")
      .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
      .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
      .addField("Channel", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", reason);
    let reportschannel = message.guild.channels.find(`name`, "reports");
    if (!reportschannel) return message.channel.send("Couldn't find reports channel.")
    message.delete().catch(O_o = {});
    reportschannel.send(reportEmbed);
    // return;
  }

  // Report-Private
  if (cmd === `${prefix}reportp`) {

    //,report @bob this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send("Couldn't find User.");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
      .setDescription("Reports")
      .setColor("#e03721")
      .addField("Reported user", `${rUser} with ID: ${rUser.id}`)
      .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
      .addField("Channel", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", reason);

    let reportschannel = message.guild.channels.find(`name`, "cookie-jar");
    if (!reportschannel) return message.channel.send("Couldn't find reports channel.")

    message.delete().catch(O_o = {});
    reportschannel.send(reportEmbed);

    // message.channel.send(reportEmbed);
    return;
  }

  // Serverinfo
  if (cmd === `${prefix}serverinfo`) {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
      .setDescription("Server Info")
      // the lime green
      .setColor("#2dfccf")
      .setThumbnail(sicon)
      .addField("Server Name", message.guild.name)
      // .addField("Created on", message.guild.createdAt)
      // .addField("You joined", message.member.joinedAt)
      .addField("Total Members", message.guild.memberCount);
    return message.channel.send(serverembed);
  }





});


bot.login(tokenfile.token);