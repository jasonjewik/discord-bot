// require the discord.js module
const Discord = require('discord.js');
// gets the bot's prefix
const {prefix} = require('../config.json');

module.exports = {
     name: 'lenny',
     description: "Sends the lenny textface.",
     usage: `\`${prefix}shrug\``,
     execute(message, args) {
          message.channel.send(`( ͡° ͜ʖ ͡°)`);
     }
}
