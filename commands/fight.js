// require the discord.js module
const Discord = require('discord.js');
// gets the bot's prefix
const {prefix} = require('../config.json');
// create a new Discord client
const client = new Discord.Client();

module.exports = {
     name: 'fight',
     description: "Initiates a fight between two users and determines the winner.",
     usage: `\`${prefix}fight [@user]\``,
     execute(message, args) {
          // gets the first user tagged in the post
          let taggedUser = message.mentions.users.first();
          if (!message.mentions.users.size) {
               return message.reply('please tag a user to fight.');
          }

          // can't fight yourself!
          if (taggedUser.equals(message.author)) {
               return message.channel.send(`You can't fight yourself!`);
          }

          // initiates fight
          const text = [];
          const options = [`Them's fighting words!`, `Did someone insult ${message.author.username}'s waifu?`, `Yare yare daze...`, `My name isn't Inigo Montoya, but prepare to die anyway!`];
          let chance = Math.floor((Math.random() * options.length));
          text.push(options[chance]);
          text.push(`${message.author.username} challenges ${taggedUser.username} to a fight! (ง'̀-'́)ง`);
          message.channel.send(text);

          // determines winner
          client.setTimeout(() => {
               let winner = Math.floor(Math.random() * 2);
               if (winner === 0) {
                    message.channel.send(`And the winner is... ${message.author.username}!`);
               } else {
                    message.channel.send(`And the winner is... ${taggedUser.username}!`);
               }
          }, 1000 * Math.random() * 3 + 2000);
     }
}
