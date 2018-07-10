const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");

const bot = new Discord.Client({
  disableEveryone: true
});


// Online success message and game he playing

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("your girlfriend", {
    type: "WATCHING"
  });
  // bot.user.setGame("Tickling!");
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);





  // Public reports


  if (cmd === `${prefix}report`) {

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
    let reportschannel = message.guild.channels.find(`name`, "reports");
    if (!reportschannel) return message.channel.send("Couldn't find reports channel.")
    message.delete().catch(O_o = {});
    reportschannel.send(reportEmbed);
    // return;
  }


  // private reports

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


  //,say Hello

  if (cmd === `${prefix}hello`) {
    return message.channel.send("Hello!");
  }
});

bot.login(tokenfile.token);