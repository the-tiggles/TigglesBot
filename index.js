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
const fs = require("fs"); //require a file system
bot.commands = new Discord.Collection();

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


// Online success message and game he playing
bot.on("ready", async () => {
  console.log(`${bot.user.username}: ONLINE (${bot.guilds.size})!`);
  bot.user.setActivity("your mom", {
    type: "LISTENING"
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

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  // instead of putting the commands in this file -
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);


  // eyes everywhere
  console.log(`[ ${message.guild} | ${message.channel.name} ] ${message.author.username}: ${message.content}`);

  let string = message.content;
  let matchString = 'tickle';
  if (string.toLowerCase().indexOf(matchString) != -1) { 
    return message.channel.send("Tickle Tickle!");
  } 


});


bot.login(tokenfile.token);