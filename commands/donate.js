const Discord = require("discord.js");
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
const Money = require("../models/money.js");
const dbName = 'money';





module.exports.run = async (bot, message, args) => {
  // the person receiving donation
  let dUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!dUser) return message.channel.send("Couldn't find User.");
    // how much they are donating
    let damount = args.join(" ").slice(22);
    // donator's avatar
    let theirPic = dUser.user.displayAvatarURL;
    let donateEmbed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}'s Transaction Summary`, `${message.author.avatarURL}`)
      .setColor("#95ff52")
      .setThumbnail(theirPic)
      .addField("Donated User", `${dUser} with ID: ${dUser.id}`)
      .addField("Time", message.createdAt)
      .addField("Amount", damount);
  let donatechannel = message.guild.channels.find(`name`, "ticklebucks");
  if (!donatechannel) return message.channel.send("Couldn't find donate channel.");
  console.log("amount being donated is " + damount);

  mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    //remove the amount from the user
    Money.findOneAndUpdate({
      userID: message.author.id,
      serverID: message.guild.id
    }, (err, money) => {
      if (err) console.log(err);
        if (!money) {
          return message.channel.send("You need to at LEAST have 1 TickleBuck. =(");
        } else if (damount > money.money) {
          return message.channel.send("bruh, you don't even have that much.");
        } else {
        money.money = money.money - damount;
          money.save().catch(err => console.log(err));
          console.log(damount + " has been removed from " + message.author.id);
      }
      });
    // this bit gives the amount
    Money.findOneAndUpdate({
      userID: dUser.id,
      serverID: message.guild.id
    }, (err, money) => {
        if (err) console.log(err);
        if (!money) {
          return message.channel.send("They don't even have a TickleBuck bank account");
        } else {
          money.money = money.money + damount;
          money.save().catch(err => console.log(err));
          console.log(damount + " has been given to " + dUser)
        }
    })
    
    
    
 
  })
  message.delete().catch(O_o = {});
  donatechannel.send(donateEmbed);

}

module.exports.help = {
  name: "donate"
}


//////examples

const MongoClient = require('mongodb').MongoClient;
  const MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
  const test = require('assert');
  const dbName = 'money';

  mongoose.connect(MONGODB_URI, {useNewUrlParser: true }, function(err, db) {
    if(err) throw err;

    Money.findOneAndDelete({
      userID: member.id,
      serverID: member.guild.id
    }, (err, res) => {
      if (err) console.log(err)
      console.log("User with ID " + member.id + " has been deleted from the money database.");
      welcomechannel.send(`All of their TickleBucks have also been given to Hydra. Hail Hydra.`);
      }
    });


    ///example 2


const MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
const test = require('assert');
  //database name
const dbName = 'money';
  
mongoose.connect(MONGODB_URI, {useNewUrlParser: true }, function(err, db) {
  if(err) throw err;
    let coinstoadd = Math.ceil(Math.random() * 50);
    console.log(coinstoadd + " coins");
    Money.findOne({
      userID: message.author.id,
      serverID: message.guild.id
    }, (err, money) => {
        if (err) console.log(err);
        if (!money) {
          const newMoney = new Money({
            username: message.author.username,
            money: coinstoadd,
            server: message.guild,
            userID: message.author.id,
            serverID: message.guild.id
            
          })
          newMoney.save().catch(err => console.log(err));
        } else {
          money.money = money.money + coinstoadd;
          money.save().catch(err => console.log(err));

        }
      })
  
});