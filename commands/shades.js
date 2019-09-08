// require the discord.js module
const Discord = require('discord.js');
// gets the bot's prefix
const {prefix} = require('../config.json');

module.exports = {
     name: 'shades',
     description: "Sends the shades textface.",
     usage: `\`${prefix}shades\``,
     execute(message, args) {
          message.channel.send(`(▀̿Ĺ̯▀̿ ̿)`);
     }
}
