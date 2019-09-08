// require the discord.js module
const Discord = require('discord.js');
// gets the bot's prefix
const {prefix} = require('../config.json');

module.exports = {
     name: 'lolice',
     description: 'Contacts the lolice.',
     usage: `\`${prefix}lolice [@user]\``,
     execute(message, args) {
          // gets the first user tagged in the post
          let taggedUser = message.mentions.users.first();
          // if no user is tagged, reply with this
          if (!message.mentions.users.size) {
               return message.channel.send("You've successfully reached the lolice. Please tag a user to proceed.");
          }
          // otherwise reply with this
          message.channel.send(new Discord.RichEmbed()
               .setImage('https://media.giphy.com/media/1n4b041E8nyUCwztMQ/giphy.gif')
               .setDescription(`${taggedUser.username}, open up! This is the lolice!`)
          );
     }
}
