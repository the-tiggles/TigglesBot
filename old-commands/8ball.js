const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    //!8ball <question alsdkfjaldkj>

    if(!args[2]) return message.reply("Please ask a full question!");
    let replies = ["Yes.", "No.", "I don't know.", "Ask again later.", "Wow, what a Mercii question!", "Oh, that is spicy! Ask me again.", "I find it hard to believe that you don't even know..", ":Ednigma:", "Oh whoaoaw :open_mouth: Great question."];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#FF9900")
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballembed);
  
}

module.exports.help = {
  name: "8ball"
}