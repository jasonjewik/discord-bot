// require the discord.js module
const Discord = require('discord.js');
// gets the bot's prefix
const {prefix} = require('../config.json');

module.exports = {
     name: 'info',
     description: 'Provides info about Ferret bot.',
     usage: `\`${prefix}info\``,
     execute(message, args) {
          message.channel.send(`**Hello! My name is Ferret!**\nSimilar to how the actual Pokémon is an HM slave, I am a Discord command slave. In other words, I can carry out a bunch of situational commands that other bots deem too stupid to have. My command prefix is \`f.\` and to find out more about what exactly I can do, type \`f.help\`.`);
     }
}
