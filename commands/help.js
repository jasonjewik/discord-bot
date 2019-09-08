// require the discord.js module
const Discord = require('discord.js');
// gets the bot's prefix
const {prefix} = require('../config.json');

module.exports = {
     name: 'help',
     description: 'Lists all commands or displays info on a specific one.',
     usage: `\`${prefix}help [command]\``,
     execute(message, args) {
          const data = [];
          const {commands} = message.client;
          // if no args are provided
          if (!args.length) {
               data.push('Here\'s a list of all my commands:');
               data.push(commands.map(command => command.name).join(', '));
               data.push(`\nYou can send \`${prefix}help [command name]\` to get info on that specific command!`);

               message.channel.send(data);
          } else {
               const name = args[0].toLowerCase();
               const command = commands.get(name);

               if (!command) { // terminate early if not a command
                    return message.channel.send('That\'s not a valid command!');
               }

               // command description
               if (command.name) data.push(`**Name:** ${command.name}`);
               if (command.description) data.push(`**Description:** ${command.description}`);
               if (command.usage) data.push(`**Usage:** ${command.usage}`);

               message.channel.send(data);
          }
     }
}
