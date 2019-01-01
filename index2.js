/**
 *
 * TigglesBot
 * @link https://github.com/tiggaaaaah/TigglesBot
 * Design/Dev: Tiggles 
 *
 */

// ================================
//  Index
// ================================
// 0 - Dependencies
// 1 - Start-up & Status
// 2 - Commands
//        -- Auto-Responses
// 3 - Events
//        -- Guild mate add
//        -- Guild mate leave
//        -- Spam
//
//
//
//
//
//

// ================================
//  0 - Dependencies
// ================================

const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const bot = new Discord.Client({
  disableEveryone: true
});
const fs = require("fs"); //require a file system

bot.commands = new Discord.Collection();

// let xp = require("./xp.json");
// var antispam = require("discord-anti-spam");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;




//this will boot up the bot and load the commands in the folder
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  //'f' is for file
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return
  }
  // this will spit out which commands were loaded
  console.group("Commands");
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    // this will print a colored console
    console.log('\x1b[36m%s\x1b[0m', `${f}`);
    bot.commands.set(props.help.name, props);
  });
  console.groupEnd();

});


// ================================
//  1 - Start-up & Status
// ================================


// Online success message and game he playing
bot.on("ready", async () => {
  console.log(`${bot.user.username}: ONLINE (${bot.guilds.size})!`);
  bot.user.setActivity("patch 7.20", {
    type: "PLAYING"
  });
  bot.user.setUsername("TigglesBot");


  // bot.user.setActivity('Patch Notes', { type: 'READING' })
  //   .catch(console.err);
});





// ================================
//  2 - Commands
// ================================

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") {
    //Reply to the user via DM.
    message.reply("lemme ask for you");
    //This logs the message to the console.
    console.log('\x1b[42m%s\x1b[0m', `(BotPM) ${message.author.username}: ${message.content}`);
    //This get the user by their ID and assigns it to a variable.
    let userid = bot.users.get("320721242833289229");
    //Send the username and message content to the user
    return userid.send(`(BotPM) ${message.author.username}: ${message.content}`);
  }

  const mongoose = require("mongoose");
  mongoose.connect(tokenfile.mongoMoney, {
    useNewUrlParser: true
  });
  const Money = require("./models/money.js")

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
          userID: message.author.id,
          serverID: message.guild.id
        })
        newMoney.save().catch(err => console.log(err));
      } else {
        money.money = money.money + coinstoadd;
        money.save().catch(err => console.log(err));
      }
  })

  mongo ds241570.mlab.com:41570/tigglesbot -u tiggah -p Lovemenow3!





  // message.reply("that xp has been saved to the database!");

  // end XP stuffs


  // means that a level up will occur every 300 xp points

  // console.log(`level is ${xp[message.author.id].level}`);






  // eyes everywhere
  console.log(`[ ${message.guild} | ${message.channel.name} ] ${message.author.username}: ${message.content}`);




  let prefix = botconfig.prefix;
  //spam control 

  // if(!message.content.startsWith(prefix)) return;
  // if (cooldown.has(message.author.id)) {
  //   message.delete();
  //   return message.reply("You have to wait 5 seconds between commands.")
  // }
  // if (!message.member.hasPermission("ADMINISTRATOR")) {
  //   cooldown.add(message.author.id);
  // }





  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let string = message.content;




  // 
  //   - Auto Responses
  // ================================


  //finds the word tickle in any string input
  let matchString = 'tickle';
  if (string.toLowerCase().indexOf(matchString) != -1) {
    return message.channel.send("Tickle Tickle!");
  }

  //stop playing that video
  let matchString2 = 'K9bf4PT';
  if (string.indexOf(matchString2) !== -1) {
    return message.channel.send("Bro, I swear...stop playing that shitty song!");
  }
  let matchString3 = 'young signorino';
  if (string.indexOf(matchString3) !== -1) {
    return message.channel.send("Bro, I swear...stop playing that shitty song!");
  }

  //find repeats 
  //still working on this thing

  // let lastThing = message.author.lastMessage;
  // let serverLast = message.channel.lastMessage;

  // if (lastThing == serverLast) {
  //   return message.channel.send("You just said that");
  //   console.log("Found a repeat");

  //   message.delete();
  // }





  //force users to use the prefix we specify
  if (!message.content.startsWith(botconfig.prefix)) return;



  // instead of putting the commands in this file -
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000);


});


// ================================
//  3 - Events
// ================================


bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} joined the server.`);

  let welcomechannel = member.guild.channels.find(`name`, "all-chat");
  welcomechannel.send(`Welcome, ${member}! Check out our site at https://www.guilded.gg/tiggles to stay up-to-date with more of our shenanigans, and for News and Announcements!`);

  let newRole = member.guild.roles.find(`name`, "Happy to be here");
  member.addRole(newRole);
  welcomechannel.send(`${member} is now happy to be here. Aren't we all?`);

});



bot.on("guildMemberRemove", async member => {
  console.log(`${member.id} left the server.`);

  let welcomechannel = member.guild.channels.find(`name`, "all-chat");
  welcomechannel.send(`${member} has left the building. Moment of Silence or nah?`);

  // remove from coin system

  const mongoose = require("mongoose");
  mongoose.connect(tokenfile.mongoMoney, {
    useNewUrlParser: true
  });
  const Money = require("./models/money.js")

  Money.findOneAndDelete({
    userID: member.id,
    serverID: member.guild.id
  }, (err, res) => {
      if (err) console.log(err)
      console.log("User with ID " + member.id + " has been deleted from the money database.");
      welcomechannel.send(`${member}'s moneys has been given to Hydra. Hail Hydra.`);
  })


});





// antispam(bot, {
//   warnBuffer: 3, //Maximum amount of messages allowed to send in the interval time before getting warned. 
//   maxBuffer: 20, // Maximum amount of messages allowed to send in the interval time before getting banned. 
//   interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned. 
//   warningMessage: "! Bruh! You're spamming too much. Stahp.", // Warning message send to the user indicating they are going to fast. 
//   banMessage: "spam is too stronk. Had to kick.", // Ban message, always tags the banned user in front of it. 
//   maxDuplicatesWarning: 7, // Maximum amount of duplicate messages a user can send in a timespan before getting warned 
//   maxDuplicatesBan: 20 // Maximum amount of duplicate messages a user can send in a timespan before getting banned 
// });








bot.login(tokenfile.token);