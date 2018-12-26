const Discord = require("discord.js");
const Report = require("../models/report.js");
const mongoose = require("mongoose");
const tokenfile = require("../token.json");



module.exports.run = async (bot, message, args) => {


  //,report @bob this is the reason
  // let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  // if (!rUser) return message.channel.send("Couldn't find User.");
  // let reason = args.join(" ").slice(22);
  // let reportEmbed = new Discord.RichEmbed()
  //   .setDescription("Reports")
  //   .setColor("#e03721")
  //   .addField("Reported user", `${rUser} with ID: ${rUser.id}`)
  //   .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  //   .addField("Channel", message.channel)
  //   .addField("Time", message.createdAt)
  //   .addField("Reason", reason);
  // let reportschannel = message.guild.channels.find(`name`, "cookie-jar");
  // if (!reportschannel) return message.channel.send("Couldn't find reports channel.")
  
  // message.delete().catch(O_o = {});
  // reportschannel.send(reportEmbed);
  // return;

  await message.delete();
  // if (message.author.id != '464785300221329418') return;
  // console.log("about to connect to mongoose");
  mongoose.connect(tokenfile.mongooseCreds);
  // console.log("we connected to mongoose")
  let rUser = message.mentions.members.first();
  if (!rUser) return message.reply("Cannot find that member, brusef.");
  let rreason = args.slice(1).join(" ");
  if (!rreason) return message.reply("you gotsa tell me why.");

  const report = new Report({
    _id: mongoose.Types.ObjectId(),
    username: rUser.user.username,
    userID: rUser.id,
    reason: rreason,
    rUsername: message.author.username,
    rID: message.author.id,
    time: message.createdAt
  });
  report.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
  
  message.reply("that report has been saved to the database!");
}

module.exports.help = {
  name: "testreport"
}

// ss