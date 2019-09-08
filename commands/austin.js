// require the discord.js module
const Discord = require('discord.js');
// gets the bot's prefix
const {prefix} = require('../config.json');

module.exports = {
     name: 'austin',
     description: "Summons a pic of Austin's stand.",
     usage: `\`${prefix}austin\``,
     execute(message, args) {
          message.channel.send(new Discord.Attachment('https://i.imgur.com/4oQ5bAn.jpg', 'austin.jpg'));
     }
}
