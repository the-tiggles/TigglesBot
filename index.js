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
//        --"Auto-Responses"
// 3 - Events
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
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs"); //require a file system

bot.commands = new Discord.Collection();

let coins = require("./coins.json");
let xp = require("./xp.json");
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
  bot.user.setActivity("love games with your mom", {
    type: "PLAYING"
  });
  // bot.user.setGame("Tickling!");
  // bot.user.setAvatar("./img/penguin-avatar.png");
  bot.user.setUsername("TigglesBot");
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


  // fun little coin game 

  if (!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  // console.log(`${coinAmt} ; ${baseAmt}`);

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };

    // keep track of coins here
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    });

    // coins embed
    let coinEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor("#0000FF")
      .addField("💸", `${coinAmt} coins added!`);

    //flash current coins
    message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  }



  // adding in an experience system
  let xpAdd = Math.floor(Math.random() * 7) + 8;
  // console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  // means that a level up will occur every 300 xp points
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;

  xp[message.author.id].xp = curxp + xpAdd;
  if (nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;

    //cool little level up message
    let lvlup = new Discord.RichEmbed()
      .setAuthor(`🏆 ${message.author.username} level Up! 🏆`, `${message.author.avatarURL}`)
      // .setTitle(" 🏆 Level Up!")
      .setColor(purple)
      .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});

       
    
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

  // console.log(`level is ${xp[message.author.id].level}`);


  // eyes everywhere
  console.log(`[ ${message.guild} | ${message.channel.name} ] ${message.author.username}: ${message.content}`);
   



  let prefix = botconfig.prefix;
  //spam control 

  // if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You have to wait 5 seconds between commands.")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    cooldown.add(message.author.id);
  }




  
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
  if(!message.content.startsWith(botconfig.prefix)) return;



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
});





bot.login(tokenfile.token);