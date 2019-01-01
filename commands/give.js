const Discord = require("discord.js");
const mongoose = require("mongoose");
const MONGODB_URI = 'mongodb://' + process.env.USER + ':' + process.env.PASS + '@' + process.env.HOST + ':' + process.env.DB_PORT + '/' + process.env.DB;
const Money = require("../models/money.js");





module.exports.run = async (bot, message, args) => {
  // the person receiving donation
  let dUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!dUser) return message.channel.send("Couldn't find User.");
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Oof. You must think you're a big boy, pal!");

  // how much they are taking

  let damount = parseInt(args[1]);
  // Passing an invalid string to parseInt will return NaN. NaN === NaN returns false so use this method for checking.
  if (isNaN(damount)) return message.channel.send("Specify a valid amount!");
  // donator's avatar
  let theirPic = dUser.user.displayAvatarURL;
  let donateEmbed = new Discord.RichEmbed()
    .setAuthor(`${dUser.user.username}'s Transaction Summary`, `${theirPic}`)
    .setColor("#3AFF43")
    .setThumbnail(theirPic)
    .addField("User", `${dUser} with ID: ${dUser.id}`)
    .addField("Time", message.createdAt)
    .addField("TickleBucks", "**₮" + damount + "**")
    .setFooter("Guilded.gg/Tiggles",
      "http://markpalomino.sitewrench.com/sitefiles/2473/css/images/tiggles/avvy-sq.gif");
  let donatechannel = message.guild.channels.find(`name`, "ticklebucks");
  if (!donatechannel) return message.channel.send("Couldn't find donate channel.");
  console.log("amount being donated is " + damount);

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
  }, function(err, db) {
    if (err) throw err;
    //give the amount from the user
    Money.findOne({
      userID: dUser.id,
      serverID: message.guild.id
    }, (err, money) => {
      if (err) console.log(err);
      if (!money) {
        const newMoney = new Money({
          username: dUser.user.username,
          money: damount,
          server: message.guild,
          userID: dUser.id,
          serverID: message.guild.id
        })
        newMoney.save().catch(err => console.log(err));
        donatechannel.send(donateEmbed);
      } else if (damount < 0) {
        return message.channel.send("You can't give a negative value, thief!");
        
      } else {
        var beforeBal = money.money;
        var afterBal = money.money + damount;
        // message.channel.send(dUser + " had " + "₮" + beforeBal + ". Now they have " + "₮" + afterBal + ". Here's your receipt, bruv:");
        console.log(dUser + " had " + "₮" + beforeBal + ". Now they have " + "₮" + afterBal + ". Here's your receipt, bruv:");

        money.money = money.money + damount;
        money.save().catch(err => console.log(err));

        console.log(damount + " has been given to " + dUser);

        donatechannel.send(donateEmbed);


      }
    });





  })
  message.delete().catch(O_o = {});


}

module.exports.help = {
  name: "give"
}