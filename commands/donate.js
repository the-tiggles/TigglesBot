const Discord = require("discord.js");
const mongoose = require("mongoose");
// const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
const Money = require("../models/money.js");
const dbName = 'money';





module.exports.run = async (bot, message, args) => {
  // the person receiving donation
  let dUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!dUser) return message.channel.send("Couldn't find User.");
    // how much they are donating
    // let damount = args.join(" ").slice(22);
  // Convert the specified amount from a string to a number.
  let damount = parseInt(args[1]);
  // Passing an invalid string to parseInt will return NaN. NaN === NaN returns false so use this method for checking.
  if (isNaN(damount)) return message.channel.send("Specify a valid amount!");
    // donator's avatar
    let theirPic = dUser.user.displayAvatarURL;
    let donateEmbed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}'s Transaction Summary`, `${message.author.avatarURL}`)
      .setColor("#95ff52")
      .setThumbnail(theirPic)
      .addField("Donated To", `${dUser} with ID: ${dUser.id}`)
      .addField("Time", message.createdAt)
      .addField("TickleBucks", "**₮" + damount + "**")
      .setFooter("Guilded.gg/Tiggles", 
    "http://markpalomino.sitewrench.com/sitefiles/2473/css/images/tiggles/avvy-sq.gif");
  let donatechannel = message.guild.channels.find(`name`, "ticklbucks");
  if (!donatechannel) return message.channel.send("Couldn't find donate channel.");
  console.log("amount being donated is " + damount);

  mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    //remove the amount from the user
    Money.findOne({
      userID: message.author.id,
      serverID: message.guild.id
    }, (err, money) => {
      if (err) console.log(err);
        if (!money) {
          return message.channel.send("You need to at LEAST have 1 TickleBuck. =(");
        } else if (damount > money.money) {
          return message.channel.send("bruh, you don't even have that much.");
        } else if (damount < 0) {
          return message.channel.send("lol, ur donation sounds like theft to me. Nah, bruh.");
        } else {
        money.money = money.money - damount;
          money.save().catch(err => console.log(err));
          console.log(damount + " has been removed from " + message.author.id);
          
          // this bit gives the amount
        Money.findOne({
          userID: dUser.id,
          serverID: message.guild.id
        }, (err, money) => {
            if (err) console.log(err);
            if (!money) {
              return message.channel.send("They don't even have a TickleBuck bank account");
            } else if (damount < 0) {
              console.log("negative value send was attempted");
              return null;
            } else {
              money.money = money.money + damount;
              money.save().catch(err => console.log(err));
              console.log(damount + " has been given to " + dUser)
              donatechannel.send(donateEmbed);
            }
        })
          
          
          
      }
      });
    
    
    
    
 
  })
  message.delete().catch(O_o = {});
 

}

module.exports.help = {
  name: "donate"
}
