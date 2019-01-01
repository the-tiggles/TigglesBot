const Discord = require("discord.js");
const search = require('youtube-search');
const bot = new Discord.Client();
const yt = require('ytdl-core');
// var should ne be used anymore
// may want to define `queue, next, title, member, dispatcher, voiceChannel` per guild using sth like a Map
var queue = [];
var next;
var title;
var member;
var dispatcher;
var voiceChannel;
bot.on("message", msg => {
	let prefix = "!"; // should define this globally instead of every time the `bot.on('message')` gets fired
	bot.user.setActivity("Type !help for commands"); // should set this once after `bot.on('ready')` fired

	if (!msg.content.startsWith(prefix)) return;

	if (msg.member.voiceChannel != undefined) voiceChannel = msg.member.voiceChannel; // not sure anymore whether this produces problems with dm's
	if (msg.content.startsWith(prefix + "summon")) {
		if (!voiceChannel) return msg.channel.send("Connect to a channel first");
		msg.member.voiceChannel.join();
	}
	if (msg.content.startsWith(prefix + "play") || msg.content.startsWith(prefix + "yt")) {
		if (!voiceChannel) return msg.channel.send("Connect to a channel first");
		msg.member.voiceChannel.join().then(connection => {
			var input = msg.content.split(" ");
			input.splice(0, 1);
			input = input.join(" ");
			search(input, {
				maxResults: 3,
				key: , // good job deleting the key :wink:
				type: 'video'
			}, function (err, results) {
				if (err) return console.log(err) // no message for the user?
				for (var i = 0; i < results.length; i++) {
          // pls don't send 3 single messages when you can just do sth like
          // msg.channel.send(results.map(item, index => `${index+1}: ${item}`).join('\n'))
					msg.channel.send(i + ": " + results[i].title);
				}

				const filter = m => m.content.includes('0') || m.content.includes('1') || m.content.includes('2');
				const collector = msg.channel.createMessageCollector(filter, {
					time: 15000
				});

				collector.on('collect', m => {
					if (m.content == 0) {
						add(results[0]);
						collector.stop();
					}
					if (m.content == 1) {
						add(results[1]);
						collector.stop();
					}
					if (m.content == 2) {
						add(results[2]);
						collector.stop();
					}
				});

				collector.on('end', collected => {
					msg.channel.send('Song Request Closed!');
				});

				function add(song) {
					console.log(msg.author.username.toUpperCase() + " Requested " + song.title);
					msg.channel.send(song.title + " Requested");
          // not needed for ytdl-core, you can just pass it the raw id
					queue.push("https://www.youtube.com/watch?v=" + song.id);
					if (dispatcher === undefined) {
						play(queue[0]);
					}
				}

				function play(q) {
					dispatcher = connection.playStream(yt(q, {
						audioonly: true
					}), {
						passes: 2
					});
					let collector = msg.channel.createCollector(n => n);
					collector.on('collect', n => {
            // im not sure whether the dispatcher can be undefined in this block at all
            // i mean you (not) set it to null AFTER the collector was stopped
						if (n.content.startsWith(prefix + "pause")) {
							if (dispatcher === undefined) {
								return msg.channel.send("nothing to pause");
							} else {
								msg.channel.send("paused!");
								dispatcher.pause();
							}
						}
						if (n.content.startsWith(prefix + "skip")) {
							if (dispatcher !== undefined) {
								dispatcher.end();
							} else return msg.channel.send("nothing to skip");
						}
						if (n.content.startsWith(prefix + "resume")) {
							if (dispatcher !== undefined) {
								dispatcher.resume();
								msg.channel.send("resumed!");
							} else return msg.channel.send("nothing to resume");
						}
            // little heads up
            // pausing and resume might give problems with ytdl-core, don't know how lucky you are using it
					});
					dispatcher.on('end', () => {
						setTimeout(function () {
							collector.stop();
              // these 2 if statements are basicly the same
							if (queue.length >= 1) {
								queue.shift();
							}
							if (queue.length > 0) {
								play(queue[0]);
							}
              // this could be a simple else statement
							if (queue.length == 0) {
                // here is your main problem why you cant play music again
                // you never set your `dispatcher = undefined` again
								connection.disconnect();
							}
						}, 300);
					});
				}

			});
		});
	}
	if (msg.content.startsWith(prefix + "leave")) {
		if (!voiceChannel) return msg.channel.send("Connect to a channel first");
    // use msg.guild.me.voiceChannel.leave() here
		msg.guild.member(bot.user).voiceChannel.leave();
	}
	if (msg.content.startsWith(prefix + "queue")) {
		if (queue[0] !== undefined) {
			msg.channel.send(queue);
      // there is no add command /shrug
		} else return msg.channel.send("Nothing in queue. !add to add a song to queue");
	}
	if (msg.content.startsWith(prefix + "clear")) {
    // a queue with length = 0 doesn't count as empty here
		if (queue !== undefined) {
			queue = [];
			msg.channel.send("Queue has been cleared");
		} else return msg.channel.send("The queue is already empty");
	}
});